from flask import Flask
import threading
from AI_MODEL.model1 import main, args

app = Flask(__name__)
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
