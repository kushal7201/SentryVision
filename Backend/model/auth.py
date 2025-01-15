from functools import wraps
import re
import json
from flask import make_response, request
import jwt # for generating token
from pymongo import MongoClient
from config.config import mongodb_config

class auth():
    def __init__(self):
        try:
            self.client = MongoClient(mongodb_config["connection_string"])
            self.db = self.client[mongodb_config["database"]]
            self.accessibility = self.db.accessibility
            print("MongoDB Connection successful")
        except:
            print("MongoDB Connection ERROR!")

    def token_auth(self, endpoint=""):
        def m_func(og_func):
            @wraps(og_func)
            def check(*args):
                endpoint = request.url_rule
                auth = request.headers.get("Authorization")
                if re.match("^Bearer *([^ ]+) *$", auth, flags=0):
                    token = auth.split(" ")[1]
                    try:
                        jwt_decoded = jwt.decode(token, "kushal", algorithms="HS256")
                    except jwt.ExpiredSignatureError:
                        return make_response({"message":"Token expired"}, 201)

                    role_id = jwt_decoded['payload']['role_id']
                    result = self.accessibility.find_one({"endpoint": str(endpoint)})
                    if result:
                        allowed_roles = json.loads(result['roles'])
                        if role_id in allowed_roles:
                            return og_func(*args)
                        return make_response({"message":"Access Denied!"}, 201)
                    return make_response({"message":"Unknown ENDPOINT"}, 404)
                return make_response({"message":"INVALID_TOKEN"}, 401)
            return check
        return m_func