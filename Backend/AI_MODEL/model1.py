
import io
from base64 import b64encode

import os
import cv2
import time
import copy
import torch
import argparse
import threading
import torchvision
import numpy as np
import pandas as pd
import torch.nn as nn
# from moviepy.editor import *
import albumentations as A
from collections import deque
# from google.colab.patches import cv2_imshow
#from google.colab.patches import cv2_imshow
from model.user import user
from sendMail import sendMail

obj = user()
buffer = 1

def setBuffer():
    global buffer
    time.sleep(35)
    print("READY AGAIN|||||||||||||")
    buffer = 1


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
CLASSES_LIST = ['fight','normal']
SEQUENCE_LENGTH = 16
predicted_class_name = ""

def transform_():
    transform = A.Compose(
    [A.Resize(128, 171, always_apply=True),A.CenterCrop(112, 112, always_apply=True),
     A.Normalize(mean = [0.43216, 0.394666, 0.37645],std = [0.22803, 0.22145, 0.216989], always_apply=True)]
     )
    return transform

def loadModel(modelPath):
  PATH=modelPath
  model_ft = torchvision.models.video.mc3_18(weights=True, progress=False)
  num_ftrs = model_ft.fc.in_features
  model_ft.fc = torch.nn.Linear(num_ftrs, 2)
  model_ft.load_state_dict(torch.load(PATH,map_location=torch.device(device)))
  model_ft.to(device)
  model_ft.eval()
  return model_ft

def PredTopKClass(k, clips, model):
  with torch.no_grad():

      input_frames = np.array(clips)

      input_frames = np.expand_dims(input_frames, axis=0)

      input_frames = np.transpose(input_frames, (0, 4, 1, 2, 3))

      input_frames = torch.tensor(input_frames, dtype=torch.float32)
      input_frames = input_frames.to(device)

      outputs = model(input_frames)

      soft_max = torch.nn.Softmax(dim=1)
      probs = soft_max(outputs.data)
      print(probs)
      prob, indices = torch.topk(probs, k)

  Top_k = indices[0]
  Classes_nameTop_k=[CLASSES_LIST[item].strip() for item in Top_k]
  ProbTop_k=prob[0].tolist()

  ProbTop_k = [round(elem, 5) for elem in ProbTop_k]
  return Classes_nameTop_k[0]

def PredTopKProb(k,clips,model):
  with torch.no_grad():
      input_frames = np.array(clips)

      input_frames = np.expand_dims(input_frames, axis=0)

      input_frames = np.transpose(input_frames, (0, 4, 1, 2, 3))

      input_frames = torch.tensor(input_frames, dtype=torch.float32)
      input_frames = input_frames.to(device)

      outputs = model(input_frames)

      soft_max = torch.nn.Softmax(dim=1)
      probs = soft_max(outputs.data)
      print(probs)
      prob, indices = torch.topk(probs, k)

  Top_k = indices[0]
  Classes_nameTop_k=[CLASSES_LIST[item].strip() for item in Top_k]
  ProbTop_k=prob[0].tolist()
  ProbTop_k = [round(elem, 5) for elem in ProbTop_k]
  return list(zip(Classes_nameTop_k,ProbTop_k))


### BEST
def predict_on_video(id,video_file_path, model, SEQUENCE_LENGTH, skip=2, showInfo=False):
    global buffer
    video_reader = cv2.VideoCapture(0)
    original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))

    frames_queue = deque(maxlen=SEQUENCE_LENGTH)
    transform = transform_()
    predicted_class_name = ''

    counter = 0
    recording_duration = 0
    recording_frames = []
    is_recording = False

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = None

    while video_reader.isOpened():
        ok, frame = video_reader.read()

        if not ok:
            break

        image = frame.copy()
        framee = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        framee = transform(image=framee)['image']
        if counter % skip == 0:
            frames_queue.append(framee)

        if len(frames_queue) == SEQUENCE_LENGTH:
            predicted_class_name = PredTopKClass(1, frames_queue, model)
            if showInfo:
                print(predicted_class_name)
                frames_queue = deque(maxlen=SEQUENCE_LENGTH)
            else:
                frames_queue = deque(maxlen=SEQUENCE_LENGTH)

        if predicted_class_name == "fight":
            cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
            if not is_recording:
                is_recording = True
                random_name = str(int(time.time()))
                user_id = id
                select_query = f"SELECT videos FROM users WHERE id = {user_id}"
                obj.cursor.execute(select_query)
                result = obj.cursor.fetchone()

                if buffer == 1:
                    buffer = 0
                    if result and result['videos']:  # If videos column is not empty
                        videos_list = result['videos'].split(',')
                        videos_list.append(random_name)
                        updated_videos = ','.join(videos_list)
                        update_query = f"UPDATE users SET videos = '{updated_videos}' WHERE id = {user_id}"
                        obj.cursor.execute(update_query)
                    else:
                        update_query = f"UPDATE users SET videos = '{random_name}' WHERE id = {user_id}"
                        obj.cursor.execute(update_query)

                    buffer_thread = threading.Thread(target=setBuffer)
                    buffer_thread.start()
                    emailQuery = f"SELECT email FROM users WHERE id = {user_id}"
                    obj.cursor.execute(emailQuery)
                    res = obj.cursor.fetchone()
                    email = res['email']
                    emailThread = threading.Thread(target=sendMail,args=(email,))
                    emailThread.start()
                    print(f"Saved video file: AI_MODEL/bin/{random_name}")
                    out = cv2.VideoWriter(rf'AI_MODEL/bin/{random_name}.mp4', fourcc, 30.0, (original_video_width, original_video_height))
        else:
            cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            if is_recording:
                is_recording = False
                if out is not None: out.release()
                out = None

        if is_recording:
            recording_duration += 1
            recording_frames.append(frame)

        if recording_duration >= 300:  # 10 seconds (assuming 30 frames per second)
            is_recording = False
            if out is not None: out.release()
            out = None
            recording_duration = 0

        counter += 1

        if out is not None:
            out.write(frame)
        
        cv2.imshow('Video Feed', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    if showInfo:
        print(counter)
    video_reader.release()


torch.backends.cudnn.benchmark = True

class ColabArgs:
    def __init__(self, model_path, streaming, input_path, output_path, sequence_length, skip, show_info):
        self.modelPath = model_path
        self.streaming = streaming
        self.inputPath = input_path
        self.outputPath = output_path
        self.sequenceLength = sequence_length
        self.skip = skip
        self.showInfo = show_info

args = ColabArgs(
    model_path='AI_MODEL\Models\model_16_m3_0.8888.pth',
    streaming=False,
    input_path='Test/test.mp4',
    output_path='bin/sample.mp4',
    sequence_length=16,
    skip=20,
    show_info=True
)

def main(args,id=1):
    model = loadModel(args.modelPath)

    start = time.time()
    predict_on_video(id,r"AI_MODEL\Test\a.mp4",model, args.sequenceLength, args.skip, args.showInfo)
    # predict_on_video(model, args.sequenceLength, args.skip, args.showInfo)
    end = time.time()
    print(round(end-start,2),"seconds")

# main(args)

# fighting, explosion, road acindent