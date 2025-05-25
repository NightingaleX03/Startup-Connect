from flask import Flask
from auth import users
from flask_cors import CORS
from database import db
from flask_session import Session
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv("SECRET_KEY", "DEV_SECRET_KEY")
app.config["SESSION_PERMANENT"] = False 
app.config["SESSION_TYPE"] = "filesystem" 

db.init_app(app)
Session(app)
CORS(app)

app.register_blueprint(users, url_prefix='/auth')

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/dashboard')
def home():
    return "Dashboard"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)