from flask import Blueprint, jsonify, request

users = Blueprint('user', __name__)

@users.route('/list', methods=['GET'])
def get_users():
    return jsonify({"message": "List of users"})

@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    return jsonify({'user': username, 'password': password})

@users.route('/signup', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    return jsonify({'user': username, 'password': password})