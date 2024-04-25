from flask import Flask
import threading

from flask_cors import CORS
from AI_MODEL.model1 import main, args

app = Flask(__name__)
from flask import Flask

app = Flask(__name__)
CORS(app)
app.secret_key = 'ebb0017f0bf8a59a607d6b06ac3bca2e05e810da06b703275166ea5b922b1a0a'

# Define a function to run main(args) in a separate thread
def run_model(id):
    main(args,id)

from controller import *

# Start the model in a separate thread
# model_thread = threading.Thread(target=run_model(a))
# model_thread.start()

# Define your Flask routes below
@app.route('/')
def index():
    return 'Hello, World!'

# Add other routes as needed

# if __name__ == "__main__":
#     app.run(debug=True)
