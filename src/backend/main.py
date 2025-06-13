import os, sys, flask 
from flask import request, jsonify

# Ensure the db and functions directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db')); sys.path.append(os.path.join(os.path.dirname(__file__), 'functions'))

from db_init import Database
from user_magnament import signup_user, login_user, delete_user

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

@app.route("/delete_user", methods=["POST"])
def delete_user_api():
    data = request.json
    admin_email = data.get("admin_email")
    target_email = data.get("target_email")

    if not admin_email or not target_email:
        return jsonify({"success": False, "message": "Admin email and target email are required"}), 400

    result = delete_user(admin_email, target_email)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)