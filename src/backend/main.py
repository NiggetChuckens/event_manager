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

@app.route("/", methods=["GET"])
def home():
    create_user('John Doe', 'jd@test.com', 'password123', 'jd2@test.com', 'user')
    create_user('John Doe 2', 'jd2@test.com', 'password123', 'None', 'admin')
    create_user('Rodrigo', 'rodrigo@test.com', 'Choripan.132', 'None', 'admin')
    create_user('Moderator Test', 'modtest@test.com', 'password123', 'rodrigo@test.com', 'moderator')
    return jsonify({"message": "User creation test successful"}), 200

@app.route("/create_user", methods=["POST"])
def create_user_api():
    """
    API endpoint to create a new user.

    Expects:
        JSON object with 'nombre', 'email', 'password', 'admin_email', and 'role'.

    Returns:
        JSON response with success or error message.
    """
    data = request.get_json()
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
    """
    API endpoint for user login.

    Expects:
        JSON object with 'email' and 'password'.

    Returns:
        JSON response with success message and token.
    """
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    result = login_user(email, password)
    return jsonify(result)

@app.route("/delete_user", methods=["POST"])
def delete_user_api():
    """
    API endpoint to delete a user.

    Expects:
        JSON object with 'admin_email' and 'target_email'.

    Returns:
        JSON response with success or error message.
    """
    data = request.get_json()
    admin_email = data.get("admin_email")
    target_email = data.get("target_email")

    if not admin_email or not target_email:
        return jsonify({"success": False, "message": "Admin email and target email are required"}), 400

    result = delete_user(admin_email, target_email)
    return jsonify(result)

@app.route("/user-details", methods=["GET"])
def user_details():
    """
    API endpoint to fetch user details.

    Expects:
        'Authorization' header with token.

    Returns:
        JSON response with user details or error message.
    """
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required"}), 400

    token = token.replace("Bearer ", "")
    result = get_user_details_by_token(token)
    return jsonify(result)

@app.route("/validate_token", methods=["POST"])
def validate_token_api():
    """
    API endpoint to validate a token.

    Expects:
        JSON object with 'token'.

    Returns:
        JSON response with validation result.
    """
    data = request.get_json()
    token = data.get("token")

    if not token:
        return jsonify({"success": False, "message": "Token is required"}), 400

    result = validate_token(token)
    return jsonify(result)

@app.route("/fetch_users", methods=["GET"])
def fetch_users_api():
    """
    API endpoint to fetch all users.

    Returns:
        JSON response with list of users.
    """
    result = fetch_all_users()
    return jsonify(result)

@app.route("/get_user_by_id", methods=["GET"])
def get_user_by_id():
    """
    API endpoint to fetch user details by ID.

    Expects:
        Query parameter 'id'.

    Returns:
        JSON response with user details or error message.
    """
    user_id = request.args.get("id")
    if not user_id:
        return jsonify({"success": False, "message": "User ID is required"}), 400

    result = get_user_details_by_id(user_id)
    return jsonify(result)

@app.route("/update_user", methods=["POST"])
def update_user_api():
    """
    API endpoint to update user details.

    Expects:
        JSON object with 'id', 'name', 'email', 'role', and 'admin_email'.

    Returns:
        JSON response with success or error message.
    """
    data = request.get_json()
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

@app.route("/upcoming_events", methods=["GET"])
def eventos_proximos_api():
    """
    API endpoint to fetch upcoming events.

    Returns:
        JSON response with list of upcoming events.
    """
    result = fetch_eventos_proximos()
    return jsonify(result)

@app.route('/pending_events', methods=['GET'])
def pending_events():
    """
    API endpoint to fetch pending events for a user.

    Expects:
        'Authorization' header with token.

    Returns:
        JSON response with list of pending events.
    """
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'success': False, 'message': 'Authorization token missing'}), 401

    user_id = jwt.decode(token, algorithms=["HS256"], options={"verify_signature": False}).get('user_id')  
    if not user_id:
        return jsonify({'success': False, 'message': 'Invalid token'}), 401

    events = get_pending_events(user_id)
    return jsonify({'success': True, 'events': events})


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  
    app.run(debug=True, port=port, host='0.0.0.0')
