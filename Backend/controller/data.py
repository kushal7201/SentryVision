from base import app

@app.route("/user/data")
def data():
    response = {
        'status':"fight", 
        'time':"03:02:30", 
        }
    return response