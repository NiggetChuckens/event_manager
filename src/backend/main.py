import os
import sys
import flask
from flask import request, jsonify

# Ensure the db and functions directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'functions'))

from db_init import Database
from user_auth import signup_user, login_user

db = Database()
app = flask.Flask(__name__)

@app.route('/')
def index():
    return f"{db.initialize()}"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    rol = data.get("rol", "user")

    if not nombre or not email or not password:
        return jsonify({"success": False, "message": "Name, email, and password are required"}), 400

    result = signup_user(nombre, email, password, rol)
    return jsonify(result)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    result = login_user(email, password)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)