from flask import Flask, jsonify
from auth import users, User
from profile import profile
from flask_cors import CORS
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
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
app.config['SESSION_COOKIE_SAMESITE'] = "None"   # Allow cross-site
app.config['SESSION_COOKIE_SECURE'] = False      

db.init_app(app)
Session(app)
CORS(app, supports_credentials=True, origins=["http://localhost:4200"])

login_manager = LoginManager()
login_manager.init_app(app)

bcrypt = Bcrypt(app)

app.register_blueprint(users, url_prefix='/auth')
app.register_blueprint(profile, url_prefix='/profile')


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)

from flask import request

@app.route('/check')
def check():
    print("Incoming cookies:", request.cookies)
    return {'cookies': request.cookies}


@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)