from flask import Flask
from database import test_connection
from auth.routes import users

app = Flask(__name__)
app.register_blueprint(users, url_prefix='/users')

@app.route('/')
def hello():
    if test_connection():
        return "Database connection successful!"
    else:
        return "Database connection failed!"

if __name__ == '__main__':
    app.run(debug=True)