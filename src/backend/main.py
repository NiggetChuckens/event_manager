import os, sys, flask 
from flask import request, jsonify
from flask_cors import CORS

# Ensure the db and functions directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db')); sys.path.append(os.path.join(os.path.dirname(__file__), 'functions'))

from db_init import Database
from user_management import signup_user, login_user, delete_user, get_user_details_by_token

db = Database().initialize()
app = flask.Flask(__name__)
CORS(app)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    result = login_user(email, password)
    return jsonify(result)

@app.route("/delete_user", methods=["POST"])
def delete_user_api():
    data = request.json
    admin_email = data.get("admin_email")
    target_email = data.get("target_email")

    if not admin_email or not target_email:
        return jsonify({"success": False, "message": "Admin email and target email are required"}), 400

    result = delete_user(admin_email, target_email)
    return jsonify(result)

@app.route("/user-details", methods=["GET"])
def user_details():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required"}), 400

    token = token.replace("Bearer ", "")
    result = get_user_details_by_token(token)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)