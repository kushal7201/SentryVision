import cv2
import tensorflow as tf
import numpy as np
import time
from utilities.save_video import save_video_toDB
from utilities.view_video import record_video
from googlesol import ColabArgs, main

import tracemalloc

tracemalloc.start()


def model2(frame_list):
    model = tf.keras.models.load_model("Models\exp_vs_acc_vs_normal_for_img.h5")
    result = model.predict(np.asarray(frame_list))
    ct = [0] * 4
    for i in range(10):
        if np.argmax(result) == 0:
            ct[0] += 1
        elif np.argmax(result) == 1:
            ct[1] += 1
        elif np.argmax(result) == 2: 
            ct[2] += 1

    max_value = max(ct)
    max_indices = [i for i, value in enumerate(ct) if value == max_value]
    if max_indices == 1:
        prediction = "explosion"
    elif max_indices == 2:
        prediction = "accident"
    else:
        prediction = "normal"
    return prediction


def detect(rtsp_url, camera_id, device_token):
    print(camera_id)
    print(device_token)
    flag = 0
    while True:
        frame_list_for_model2 = record_video(rtsp_url)
        test_data = ColabArgs(
            "models\model_16_m3_0.8888.pth",
            False,
            "video\\recorded_video.avi",
            "test/sample.mp4",
            16,
            20,
            True,
        )
        result_from_model1 = main(test_data)
        print(result_from_model1)

        if len(result_from_model1) == 0:
            flag = 1
            break
        fighting_prob = result_from_model1[0][0]
        normal_prob = result_from_model1[0][1]

        fighting_prob_ = float(f"{fighting_prob:.5f}")
        normal_prob_ = float(f"{normal_prob:.5f}")

        if fighting_prob_ >= 0.92: 
            prediction = "fighting" 
            break
        elif normal_prob_ >= 0.92:
            continue
        else:
            if len(frame_list_for_model2) < 10:
                flag = 1
                break
            model2_result = model2(frame_list_for_model2)
            if model2_result != "normal":
                prediction = model2_result
                break

    if flag == 0:
        save_video_toDB(camera_id, prediction, device_token)