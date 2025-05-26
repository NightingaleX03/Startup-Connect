from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_user, logout_user
from .models import User
from database import db
from flask import session

users = Blueprint('user', __name__)

@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data['name']
    password = data['password']

    session['username'] = username
    session.permanent = True

    user = User.query.filter_by(name=username).first()

    if user and user.password == password:
        login_user(user)
        return jsonify({
            "message": "Login successful",
            "username": user.name,
            "userType": user.type
        }), 200
    else:
        return 'Invalid username or password', 401

@users.route('/logout')
def logout():
    logout_user()
    session.pop('username', None)

    return redirect(url_for('login'))

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    try:
        new_user = User(
            name=data['name'],
            type=data['type'],
            email=data['email'],
            telephone=data['phone'],
            password=data['password']
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    
    except Exception as e:
        db.session.rollback()
        print(f"Signup error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    finally:
        db.session.close()
