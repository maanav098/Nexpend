from flask import Flask
from flask_cors import CORS
from models.db import db
from routes.api import api_bp
import os

app = Flask(__name__)
CORS(app)

# Load DB config
app.config.from_pyfile('config.py')

# Initialize DB
db.init_app(app)

# Register routes
app.register_blueprint(api_bp)

@app.route('/')
def home():
    return "Nexpend API is live!"

if __name__ == '__main__':
    app.run(debug=True)
