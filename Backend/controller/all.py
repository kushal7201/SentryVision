import threading
import time
import cv2
from base import app
from model.user import user
from flask import Response, request,send_file, session
from werkzeug.utils import secure_filename # for files
from datetime import datetime
from model.auth import *

user_obj = user()
auth_obj = auth()

@app.route("/users")
@auth_obj.token_auth()
def user():
    return user_obj.get_users()

@app.route("/signup", methods=["POST"])
# @auth_obj.token_auth()
def signup():
    data = request.form
    return user_obj.user_signup(data)

@app.route("/login",methods=["POST"])
def login():
    return user_obj.user_login(request.form)

@app.route("/logout")
def logout():
    return user_obj.user_logout()

@app.route("/user/<uid>/profile")
# @app.route("/user/profile")
def profile(uid):
# def profile():
#     data = {
#         "firstname":"Kushal",
#         "lastname":"Bansal"
#     }
#     return data
    if "user_id" in session:
        return user_obj.user_profile(uid)

@app.route("/user/update", methods=["PUT"])
def update():
    data = request.form
    return user_obj.user_update(data)

@app.route("/user/patch/<id>", methods=["PATCH"])
def patch(id):
    data = request.form
    return user_obj.user_patch(data,id)

@app.route("/user/delete/<id>", methods=["DELETE"])
def delete(id):
    return user_obj.user_delete(id)

@app.route("/users/limit/<limit>/page/<page>", methods=["GET"])
def pagination(limit,page):
    return user_obj.user_pagination(int(limit),int(page))

@app.route("/user/<uid>/upload/avatar",methods=["PUT"])
def upload_avatar(uid):

    ### for multiple file uploads:
    # files = request.files.getlist('avatar')
    # for file in files:
    #     if file and file.filename != '':
    #         # Save each file to the server
    #         # You might want to generate a unique filename for each file
    #         file.save(secure_filename(f"uploads/{file.filename}"))
    
    file = request.files['avatar']
    print(file)
    Uniquefile =  str(datetime.now().timestamp()).replace(".","")
    extension = file.filename.split(".")[-1]  # file extension

    path = f"uploads/{uid}_{Uniquefile}.{extension}"
    file.save(path)

    return user_obj.user_upload_avatar(uid,path)

@app.route("/uploads/<filename>")
def get_avatar(filename):
    return send_file(f"uploads/{filename}")

@app.route('/videos/<filename>', methods=['GET'])
def get_recorded_video(filename):
    video_path = rf'AI_MODEL\bin\{filename}'
    return send_file(video_path, as_attachment=True)

@app.route("/user/<uid>/home")
def dashboard(uid):
    return user_obj.user_home(uid)

@app.route("/user/<uid>/home/turnon")
def model_turnon(uid):
    return user_obj.user_model_turnon(uid)

@app.route("/user/<uid>/home/turnoff")
def model_turnoff(uid):
    return user_obj.user_model_turnoff(uid)

# time.sleep(2.0)

# Initialize a lock used to ensure thread-safe exchanges of the output frames
lock = threading.Lock()
active_clients = 0

def gen_frames():
    global active_clients
    video_capture = cv2.VideoCapture(0)
    active_clients += 1
    try:
        while True:
            if active_clients == 0:
                break
            success, frame = video_capture.read()
            if not success:
                break
            else:
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    finally:
        active_clients -= 1
        if active_clients == 0:
            video_capture.release()

@app.route('/video_feed')
def video_feed():
    global active_clients
    active_clients = 0
    video_thread = threading.Thread(target=gen_frames)
    video_thread.start()
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route("/user/logout")
# def logout():
    