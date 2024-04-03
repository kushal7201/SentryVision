
#### BEST
# def predict_on_video(video_file_path, model, SEQUENCE_LENGTH, skip=2, showInfo=False):
#     video_reader = cv2.VideoCapture(video_file_path)
#     original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
#     original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))

#     frames_queue = deque(maxlen=SEQUENCE_LENGTH)
#     transform = transform_()
#     predicted_class_name = ''

#     counter = 0
#     recording_duration = 0
#     recording_frames = []
#     is_recording = False

#     fourcc = cv2.VideoWriter_fourcc(*'mp4v')
#     out = None

#     while video_reader.isOpened():
#         ok, frame = video_reader.read()

#         if not ok:
#             break

#         image = frame.copy()
#         framee = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         framee = transform(image=framee)['image']
#         if counter % skip == 0:
#             frames_queue.append(framee)

#         if len(frames_queue) == SEQUENCE_LENGTH:
#             predicted_class_name = PredTopKClass(1, frames_queue, model)
#             if showInfo:
#                 print(predicted_class_name)
#                 frames_queue = deque(maxlen=SEQUENCE_LENGTH)
#             else:
#                 frames_queue = deque(maxlen=SEQUENCE_LENGTH)

#         if predicted_class_name == "fight":
#             cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
#             if not is_recording:
#                 is_recording = True
#                 random_name = str(int(time.time()))
#                 out = cv2.VideoWriter(rf'AI_MODEL/bin/{random_name}.mp4', fourcc, 30.0, (original_video_width, original_video_height))
#         else:
#             cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#             if is_recording:
#                 is_recording = False
#                 out.release()
#                 out = None

#         if is_recording:
#             recording_duration += 1
#             recording_frames.append(frame)

#         if recording_duration >= 300:  # 10 seconds (assuming 30 frames per second)
#             is_recording = False
#             out.release()
#             out = None
#             recording_duration = 0

#         counter += 1

#         if out is not None:
#             out.write(frame)

#     if showInfo:
#         print(counter)
#     video_reader.release()




#### for MP4 video:
# def predict_on_video(video_file_path, model, SEQUENCE_LENGTH,skip=2,showInfo=False):

#     video_reader = cv2.VideoCapture(video_file_path)

#     original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
#     original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
#     frames_queue = deque(maxlen = SEQUENCE_LENGTH)
#     transform= transform_()
#     predicted_class_name = ''

#     counter=0
#     while video_reader.isOpened():

#         ok, frame = video_reader.read()

#         # Check if frame is not read properly then break the loop.
#         if not ok:
#             break

#         image = frame.copy()
#         framee = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         framee = transform(image=framee)['image']
#         if counter % skip==0:
#           frames_queue.append(framee)

#         if len(frames_queue) == SEQUENCE_LENGTH:
#           predicted_class_name= PredTopKClass(1,frames_queue, model)
#           if showInfo:
#             print(predicted_class_name)
#             frames_queue = deque(maxlen = SEQUENCE_LENGTH)
#           else:
#             frames_queue = deque(maxlen = SEQUENCE_LENGTH)

#         if predicted_class_name=="fight":
#           cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
#         else:
#           cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#         counter+=1

#     if showInfo:
#       print(counter)
#     video_reader.release()

#### for live webcam
# def predict_on_video(model, SEQUENCE_LENGTH, skip=2, showInfo=False):
#     video_reader = cv2.VideoCapture(0) # Capture from camera
#     if not video_reader.isOpened():
#         print("Error opening video stream or file")
#         return

#     frames_queue = deque(maxlen=SEQUENCE_LENGTH)
#     transform = transform_()
#     predicted_class_name = ''
#     counter = 0

#     while True: # Continuously capture frames
#         ok, frame = video_reader.read()
#         if not ok:
#             break

#         image = frame.copy()
#         framee = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         framee = transform(image=framee)['image']
#         if counter % skip == 0:
#             frames_queue.append(framee)

#         if len(frames_queue) == SEQUENCE_LENGTH:
#             predicted_class_name = PredTopKClass(1, frames_queue, model)
#             if showInfo:
#                 print(predicted_class_name)
#                 frames_queue = deque(maxlen=SEQUENCE_LENGTH)
#             else:
#                 frames_queue = deque(maxlen=SEQUENCE_LENGTH)

#         if predicted_class_name == "fight":
#             cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
#         else:
#             cv2.putText(frame, predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#         counter += 1

#         cv2.imshow('Frame', frame) # Display the resulting frame
#         if cv2.waitKey(1) & 0xFF == ord('q'): # Exit loop if 'q' is pressed
#             break

#     video_reader.release()
#     cv2.destroyAllWindows()
