from flask import Flask
from auth import users
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(users, url_prefix='/auth')

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)