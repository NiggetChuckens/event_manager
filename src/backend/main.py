import os, sys, flask, jwt
from flask import request, jsonify
from flask_cors import CORS

# Ensure the db and functions directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db')); sys.path.append(os.path.join(os.path.dirname(__file__), 'functions'))

from db.db_init import Database
from functions.user_management import create_user, login_user, delete_user, get_user_details_by_token, validate_token, fetch_all_users, get_user_details_by_id, update_user
from functions.event_management import fetch_eventos_proximos, get_pending_events

db = Database().initialize()
app = flask.Flask(__name__)
CORS(app)


###################################################################################
# User Management Endpoints

@app.route("/create_user", methods=["POST"])
def create_user_api():
    data = request.json
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    admin_email = data.get("admin_email")
    rol = 'user' if data.get('role') not in ['user', 'moderator', 'admin'] else data.get('role') 

    if not nombre or not email or not password or not admin_email:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    result = create_user(nombre, email, password, admin_email, rol)
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

@app.route("/user-details", methods=["GET"])
def user_details():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required"}), 400

    token = token.replace("Bearer ", "")
    result = get_user_details_by_token(token)
    return jsonify(result)

@app.route("/validate_token", methods=["POST"])
def validate_token_api():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"success": False, "message": "Token is required"}), 400

    result = validate_token(token)
    return jsonify(result)

@app.route("/fetch_users", methods=["GET"])
def fetch_users_api():
    result = fetch_all_users()
    return jsonify(result)

@app.route("/get_user_by_id", methods=["GET"])
def get_user_by_id():
    user_id = request.args.get("id")
    if not user_id:
        return jsonify({"success": False, "message": "User ID is required"}), 400

    result = get_user_details_by_id(user_id)
    return jsonify(result)

@app.route("/update_user", methods=["POST"])
def update_user_api():
    data = request.json
    user_id = data.get("id")
    name = data.get("name")
    email = data.get("email")
    role = data.get("role")
    admin_email = data.get("admin_email")

    if not user_id or not name or not email or not role or not admin_email:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    result = update_user(user_id, name, email, role, admin_email)
    return jsonify(result)


###################################################################################
# Event Management Endpoints

@app.route("/eventos-proximos", methods=["GET"])
def eventos_proximos_api():
    result = fetch_eventos_proximos()
    return jsonify(result)

@app.route('/pending_events', methods=['GET'])
def pending_events():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'success': False, 'message': 'Authorization token missing'}), 401

    user_id = jwt.decode(token, algorithms=["HS256"], options={"verify_signature": False}).get('user_id')  
    if not user_id:
        return jsonify({'success': False, 'message': 'Invalid token'}), 401

    events = get_pending_events(user_id)
    return jsonify({'success': True, 'events': events})

# New Endpoints Added:
# - /pending_events: Fetches pending events for a user based on their token.
# - /eventos-proximos: Fetches upcoming events.

if __name__ == '__main__':
    app.run(debug=True, port=5000)