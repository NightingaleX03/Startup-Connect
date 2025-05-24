from flask import Flask
from auth import users
from flask_cors import CORS
from database import db
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)

app.register_blueprint(users, url_prefix='/auth')

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)