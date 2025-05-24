from flask import Blueprint, jsonify, request

users = Blueprint('user', __name__)

@users.route('/list', methods=['GET'])
def get_users():
    return jsonify({"message": "List of users"})

@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return data

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    return data
