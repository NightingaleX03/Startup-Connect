from flask import Flask
from database import test_connection
from auth.routes import users
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(users, url_prefix='/auth')

@app.route('/')
def hello():
    if test_connection():
        return "Database connection successful!"
    else:
        return "Database connection failed!"

if __name__ == '__main__':
    app.run(debug=True)