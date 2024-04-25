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

def getUID(token):
    try:
        jwt_decoded = jwt.decode(token,"ebb0017f0bf8a59a607d6b06ac3bca2e05e810da06b703275166ea5b922b1a0a",algorithms="HS256")
        uid = jwt_decoded['payload']['id']
        return uid
    except jwt.ExpiredSignatureError:
        return -1

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

# @app.route("/user/<uid>/profile")
@app.route("/user/profile",methods=["POST"])
def profile():
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)

    # return make_response({"message":"User created successfully"},201)
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

@app.route("/user/<uid>/upload/avatar",methods=["POST"])
def upload_avatar(uid):    
    file = request.files['avatar']
    print(file)
    # Uniquefile =  str(datetime.now().timestamp()).replace(".","")
    extension = file.filename.split(".")[-1]  # file extension

    # path = f"uploads/{uid}_{Uniquefile}.{extension}"
    path = f"uploads/{uid}.{extension}"
    file.save(path)

    return user_obj.user_upload_avatar(uid,path)

@app.route("/uploads/<filename>")
def get_avatar(filename):
    return send_file(f"uploads/{filename}")

@app.route('/videos/<filename>', methods=['GET'])
def get_recorded_video(filename):
    video_path = rf'AI_MODEL\bin\{filename}'
    return send_file(video_path, as_attachment=True)

@app.route('/videos/delete/<filename>', methods=['DELETE'])
def delete_video(filename):
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)
    
    return user_obj.user_delete_video(filename,uid)

@app.route("/user/home",methods=["POST"])
def dashboard():
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)

    return user_obj.user_home(uid)

@app.route("/user/home/turnon",methods=["POST"])
def model_turnon():
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)
    return user_obj.user_model_turnon(uid)

@app.route("/user/home/turnoff",methods=["POST"])
def model_turnoff():
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)
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

@app.route("/user/password",methods=["POST"])
def change_password():
    token = request.form["token"]
    uid = getUID(token)
    
    if uid == -1:
        return make_response({"message":"Token expired"},201)
    data = request.form
    print(data)
    # return make_response({"message":"updated"},201)
    return user_obj.user_change_password(data,uid)

# @app.route("/user/logout")
# def logout():
    