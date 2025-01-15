from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import jwt
import json
from flask import make_response, redirect, session, url_for
from datetime import datetime, timedelta, timezone
import time, pytz
import os
import threading
from config.config import mongodb_config

class user():
    def __init__(self):
        try:
            self.client = MongoClient(mongodb_config["connection_string"])
            self.db = self.client.sentryvision
            self.users = self.db.users
            print("Connection successful")
        except:
            print("Connection ERROR!")

    def get_users(self):
        result = list(self.users.find({}, {'password': 0}))
        if result:
            for user in result:
                user['_id'] = str(user['_id'])
            res = make_response({"payload": result}, 200)
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res
        return make_response({"message":"No data found!"}, 204)

    def user_signup(self, data):
        hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
        user_data = {
            "firstname": data["firstname"],
            "lastname": data["lastname"],
            "email": data["email"],
            "phone": data["phone"],
            "password": hashed_password.decode('utf-8'),
            "role_id": 33
        }
        try:
            if self.users.find_one({"email": data["email"]}):
                return make_response({"message": "Email already exists"}, 400)
            result = self.users.insert_one(user_data)
            if result.inserted_id:
                return make_response({"message": "User created successfully"}, 201)
            return make_response({"message": "Failed to create user"}, 400)
        except Exception as e:
            return make_response({"message": str(e)}, 400)

    def user_login(self, data):
        password = data["password"]
        userdata = self.users.find_one(
            {"email": data['email']},
            {"firstname": 1, "lastname": 1, "phone": 1, 
             "avatar": 1, "role_id": 1, "model_status": 1, "password": 1}
        )
        
        if not userdata:
            return make_response({"message": "Invalid Credentials"}, 401)
        
        if not bcrypt.checkpw(password.encode('utf-8'), userdata["password"].encode('utf-8')):
            return make_response({"message": "Invalid Credentials"}, 401)
        
        expiry = datetime.now() + timedelta(days=15)
        exp_epoch_time = int(expiry.timestamp())
        
        payload = {
            "payload": {
                "id": str(userdata["_id"]),
                "firstname": userdata["firstname"],
                "lastname": userdata.get("lastname"),
                "phone": userdata["phone"],
                "avatar": userdata.get("avatar"),
                "role_id": userdata.get("role_id", 33),
                "model_status": userdata.get("model_status", 0)
            },
            "exp": exp_epoch_time
        }
        
        jwtoken = jwt.encode(payload, "ebb0017f0bf8a59a607d6b06ac3bca2e05e810da06b703275166ea5b922b1a0a", algorithm="HS256")
        return make_response({"token": jwtoken}, 200)

    def user_logout(self):
        try:
            session.clear()
            return redirect(url_for('login'))
        except:
            return make_response({"message":"logout successful"}, 201)

    def user_update(self, data):
        result = self.users.update_one(
            {"_id": ObjectId(data['id'])},
            {"$set": {
                "firstname": data['firstname'],
                "lastname": data['lastname'],
                "email": data['email'],
                "phone": data['phone'],
                "password": data['password']
            }}
        )
        if result.modified_count > 0:
            return make_response({"message":"User details updated successfully"}, 201)
        return make_response({"message":"Nothing to change!"}, 202)

    def user_patch(self, data, id):
        update_data = {key: data[key] for key in data}
        result = self.users.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        if result.modified_count > 0:
            return make_response({"message":"User details updated successfully"}, 201)
        return make_response({"message":"Nothing to change!"}, 202)

    def user_delete(self, id):
        result = self.users.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return make_response({"message":"User deleted successfully"}, 200)
        return make_response({"message":"User NOT found!"}, 202)

    def user_pagination(self, limit, page):
        skip = (page * limit) - limit
        result = list(self.users.find().skip(skip).limit(limit))
        if result:
            for user in result:
                user['_id'] = str(user['_id'])
            return make_response({"payload": result, "page_no": page, "limit": limit}, 200)
        return make_response({"message":"No data found!"}, 204)

    def user_upload_avatar(self, uid, path):
        try:
            if uid == 'undefined' or not uid:
                res_fail = make_response({"message": "Invalid user ID"}, 400)
                res_fail.headers["Access-Control-Allow-Origin"] = "*"
                return res_fail
                
            result = self.users.update_one(
                {"_id": ObjectId(uid)},
                {"$set": {"avatar": path}}
            )
            
            res_suc = make_response({"message": "File uploaded successfully"}, 200)
            res_suc.headers["Access-Control-Allow-Origin"] = "*"
            return res_suc
            
        except Exception as e:
            res_fail = make_response({"message": f"Upload failed: {str(e)}"}, 500)
            res_fail.headers["Access-Control-Allow-Origin"] = "*"
            return res_fail

    def user_home(self, uid):
        result = self.users.find_one({"_id": ObjectId(uid)})
        if result and result.get('videos'):
            videos = json.loads(f"[{result['videos']}]")
            target_timezone = pytz.timezone('Asia/Kolkata')
            videos_time = []
            for vid in videos:
                utc_time = datetime.fromtimestamp(vid, tz=timezone.utc)
                target_time = utc_time.astimezone(target_timezone)
                videos_time.append(str(target_time)[:-6])
            return make_response({"timestamp": videos_time, "videos": videos}, 200)
        return make_response({"message": "No data found!"}, 204)

    def user_model_turnon(self, uid):
        result = self.users.find_one({"_id": ObjectId(uid)})
        is_model_running = result.get('model_status', 0)
        
        if is_model_running == 0:
            from base import run_model
            model_thread = threading.Thread(target=run_model, args=(uid,))
            model_thread.start()
            self.users.update_one(
                {"_id": ObjectId(uid)},
                {"$set": {"model_status": 1}}
            )
            is_model_running = 1
        else:
            return make_response({"message":"model already ON"}, 400)
        
        if is_model_running == 1:
            return make_response({"message":"model turned ON"}, 200)
        return make_response({"message":"ERROR turning on model"}, 500)

    def user_model_turnoff(self, uid):
        result = self.users.update_one(
            {"_id": ObjectId(uid)},
            {"$set": {"model_status": 0}}
        )
        if result.modified_count > 0:
            return make_response({"message": "model turned OFF"}, 200)
        return make_response({"message": "Model already OFF"}, 400)

    def user_profile(self, uid):
        result = self.users.find_one(
            {"_id": ObjectId(uid)},
            {"firstname": 1, "lastname": 1, "email": 1, "phone": 1, "avatar": 1}
        )
        if result:
            result['_id'] = str(result['_id'])
            res = make_response({"payload": [result]}, 200)
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res
        return make_response({"message": "No data found!"}, 204)

    def user_change_password(self, data, uid):
        cur_password = data["cur_password"]
        new_password = data["new_password"]

        user = self.users.find_one({"_id": ObjectId(uid)})
        if not user:
            return make_response({"message": "Invalid Credentials"}, 401)

        if not bcrypt.checkpw(cur_password.encode('utf-8'), user["password"].encode('utf-8')):
            return make_response({"message": "Invalid Credentials"}, 401)

        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        try:
            self.users.update_one(
                {"_id": ObjectId(uid)},
                {"$set": {"password": hashed_password.decode('utf-8')}}
            )
            return make_response({"message": "Password changed successfully"}, 201)
        except Exception as e:
            return make_response({"message": f"Failed to change the password: {str(e)}"}, 500)

    def user_delete_video(self, filename, uid):
        filename = str(filename)
        video_path = rf'AI_MODEL\bin\{filename}'

        user = self.users.find_one({"_id": ObjectId(uid)})
        if not user:
            return make_response({"message": "Internal Server Error"}, 401)

        videos = json.loads(f"[{user['videos']}]")
        video_list = [str(vid) for vid in videos if f"{vid}.mp4" != filename]
        updated_videos = ','.join(video_list)

        try:
            self.users.update_one(
                {"_id": ObjectId(uid)},
                {"$set": {"videos": updated_videos}}
            )
            os.remove(video_path)
            return make_response({"message": "Video Deleted Successfully"}, 201)
        except Exception as e:
            return make_response({"message": f"Failed to delete the video: {str(e)}"}, 500)
