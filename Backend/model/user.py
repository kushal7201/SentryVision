import os
import bcrypt
import mysql.connector as mysql
import json
from flask import make_response, redirect, session, url_for
from datetime import datetime,timedelta, timezone
import jwt # for generating token
from config.config import db_config
import time, pytz
import threading

class user():
    def __init__(self):
        try:
            self.con = mysql.connect(
                host = db_config["hostname"],
                user = db_config["username"],
                password = db_config["password"],
                database = db_config["database"]
            )
            print("Connection successful")

            self.con.autocommit = True            
            self.cursor = self.con.cursor(dictionary=True)
            
            
        except:
            print("Connection ERRROR!")

    def get_users(self):
        self.cursor.execute("SELECT * FROM users")
        result = self.cursor.fetchall()
        if len(result)>0:
            # print(result)
            res = make_response({"payload":result},200)
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res   # in json format
            # return result  # in json format
        else:
            return make_response({"message":"No data found!"}, 204)
        # return "This is the users page"
        # return json.dumps(result)  # in string

    def user_signup(self,data):
        print(data)
        password = data["password"]
        hashed_password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        print(hashed_password)
        try:
            self.cursor.execute("INSERT INTO users (firstname,lastname,email,phone,password) VALUES (%s,%s,%s,%s,%s)",(data["firstname"],data["lastname"],data["email"],data["phone"],hashed_password))
            return make_response({"message":"User created successfully"},201)
        except:
            return make_response({"message":"Duplicate entry NOT allowed"},400)
        
    
    def user_login(self, data):
        # print(data)
        password = data["password"]
        self.cursor.execute(f"SELECT id, firstname,lastname, phone, avatar, role_id, model_status, password FROM users WHERE email='{data['email']}'")
        result = self.cursor.fetchall()
        try:
            userdata = result[0]
        except:
            return make_response({"message":"Invalid Credentials"},401)
        database_password = result[0]["password"]
        if bcrypt.checkpw(password.encode('utf-8'), database_password.encode('utf-8')) == False:
            return make_response({"message":"Invalid Credentials"},401)
        
        # session['user_id'] = userdata["id"]
        # session['role_id'] = userdata["role_id"]

        expiry = datetime.now() + timedelta(days=15)
        exp_epoch_time = int(expiry.timestamp())
        payload = {
            "payload":userdata,
            "exp":exp_epoch_time  # exp should be only named for expiration time
        }
        jwtoken = jwt.encode(payload,"ebb0017f0bf8a59a607d6b06ac3bca2e05e810da06b703275166ea5b922b1a0a",algorithm="HS256")
        # print(jwtoken)
        # res.headers["Access-Control-Allow-Origin"] = "*"
        return make_response({"token":jwtoken},200)
    
    def user_logout(self):
        # print(data)
        try:
            session.clear()
            return redirect(url_for('login'))
        except:
            return make_response({"message":"logout successful"},201)
    
    def user_update(self,data):
        print(data)
        self.cursor.execute(f"UPDATE users SET firstname='{data['firstname']}', lastname='{data['lastname']}', email= '{data['email']}', phone='{data['phone']}', password='{data['password']}' WHERE id={data['id']}")
        if self.cursor.rowcount>0:
            return make_response({"message":"User details updated successfully"},201)
        else:
            return make_response({"message":"Nothing to change!"},202)
    
    def user_patch(self,data,id):
        # print(data,id)
        query = "UPDATE users SET "
        for key in data:
            query += f"{key}='{data[key]}', "

        query = query[:-2] + f" WHERE id={id}"

        self.cursor.execute(query)

        if self.cursor.rowcount>0:
            return make_response({"message":"User details updated successfully"},201)
        else:
            return make_response({"message":"Nothing to change!"},202)
    
    def user_delete(self,id):
        print(id)
        self.cursor.execute(f"DELETE FROM users WHERE id = {id} ")
        if self.cursor.rowcount>0:
            return make_response({"message":"User deleted successfully"},200)
        else:
            return make_response({"message":"User NOT found!"},202)
        
    def user_pagination(self,limit,page):
        start = (page*limit) - limit
        query = F"SELECT * FROM users LIMIT {start}, {limit}"
        print(query)

        self.cursor.execute(query)

        result = self.cursor.fetchall()
        if len(result)>0:
            res = make_response({"payload":result, "page_no":page, "limit":limit},200)
            return res   # in json format
            # return result  # in json format
        else:
            return make_response({"message":"No data found!"}, 204)
        
    def user_upload_avatar(self,uid,path):
        self.cursor.execute(f"UPDATE users SET avatar = '{path}' WHERE id = {uid}")
        res_suc = make_response({"message":"File uploaded successfully"},200)
        res_fail = make_response({"message":"Upload failed!"},500)
        res_suc.headers["Access-Control-Allow-Origin"] = "*" 
        res_fail.headers["Access-Control-Allow-Origin"] = "*" 
        if self.cursor.rowcount>0:
            return res_suc
        else:
            return res_suc
        
    def user_home(self,uid):
        self.cursor.execute(f"SELECT * FROM users WHERE id = {uid}")
        result = self.cursor.fetchall()
        if len(result)>0:
            videos = json.loads(f"[{result[0]['videos']}]")
            target_timezone = pytz.timezone('Asia/Kolkata')
            videos_time = []
            for vid in videos:
                utc_time = datetime.fromtimestamp(vid, tz=timezone.utc)
                target_time = utc_time.astimezone(target_timezone)
                videos_time.append(str(target_time)[:-6])
                print(vid,target_time)

            return make_response({"timestamp":videos_time, "videos":videos},200)
        else:
            return make_response({"message":"No data found!"}, 204)
        
    def user_model_turnon(self,uid):

        self.cursor.execute(f"SELECT model_status FROM users WHERE id={uid} ")
        result = self.cursor.fetchall()
        is_model_running = result[0]['model_status']
        print(is_model_running)
        
        if is_model_running ==0:
            from base import run_model
            model_thread = threading.Thread(target=run_model, args=(uid,))
            model_thread.start()
            self.cursor.execute(f"UPDATE users SET model_status=1 WHERE id={uid}")
            is_model_running = 1
        else:
            return make_response({"message":"model already ON"},400)
        
        if is_model_running==1:
            return make_response({"message":"model turned ON"},200)
        else:
            return make_response({"message":"ERROR turning on model"}, 500)
        
    def user_model_turnoff(self, uid):
        self.cursor.execute("UPDATE users SET model_status=0 WHERE id=%s", (uid,))
        if self.cursor.rowcount > 0:
            return make_response({"message": "model turned OFF"}, 200)
        else:
            return make_response({"message": "Model already OFF"}, 400)
        
    def user_profile(self,uid):
        self.cursor.execute(f"SELECT firstname,lastname,email,phone,avatar,id FROM users WHERE id={uid}")
        result = self.cursor.fetchall()
        if len(result)>0:
            # print(result)
            res = make_response({"payload":result},200)
            res.headers["Access-Control-Allow-Origin"] = "*"
            return res   # in json format
            # return result  # in json format
        else:
            return make_response({"message":"No data found!"}, 204)
        
    def user_change_password(self,data,uid):
        print(data)
        cur_password = data["cur_password"]
        new_password = data["new_password"]

        self.cursor.execute(f"SELECT id, firstname,lastname, phone, avatar, role_id, model_status, password FROM users WHERE id='{uid}'")
        check_pass = self.cursor.fetchall()
        try:
            userdata = check_pass[0]
        except:
            return make_response({"message":"Invalid Credentials"},401)
        database_password = check_pass[0]["password"]

        if bcrypt.checkpw(cur_password.encode('utf-8'), database_password.encode('utf-8')) == False:
            return make_response({"message":"Invalid Credentials"},401)
        # print(cur_password,new_password)
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'),bcrypt.gensalt())
        hashed_password = f"{hashed_password}"[1:]

        query = f"UPDATE users SET password={hashed_password} WHERE id={uid}"
        try:
            self.cursor.execute(query)
            return make_response({"message":"Password changed successfully"},201)
        except Exception as e:
            return make_response({"message":f"{e} Failed to change the password"},500)
    
    def user_delete_video(self,filename,uid):
        filename = str(filename)
        video_path = rf'AI_MODEL\bin\{filename}'

        self.cursor.execute(f"SELECT id, firstname,lastname, phone, avatar, role_id, model_status, videos FROM users WHERE id='{uid}'")
        result = self.cursor.fetchall()
        try:
            userdata = result[0]
        except:
            return make_response({"message":"Internal Server Error"},401)
        videos = json.loads(f"[{userdata['videos']}]")
        video_list = []
        for vid in videos:
            vid = str(vid)
            if f"{vid}.mp4" != filename:
                video_list.append(vid)
        updated_videos = ','.join(video_list)
        update_query = f"UPDATE users SET videos = '{updated_videos}' WHERE id = {uid}"
        try:
            self.cursor.execute(update_query)
            os.remove(video_path)
            return make_response({"message":"Video Deleted Successfully"},201)

        except Exception as e:
            return make_response({"message":f"{e} Failed to delete the video"},500)