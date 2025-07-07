import os, sys, flask, jwt
from flask import request, jsonify
from flask_cors import CORS
from datetime import datetime

# Ensure the db and functions directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db')); sys.path.append(os.path.join(os.path.dirname(__file__), 'functions'))

from db.db_init import Database
from functions.user_management import create_user, login_user, delete_user, get_user_details_by_token, fetch_all_users, get_user_details_by_id, update_user
from functions.event_management import create_event, edit_event, delete_event, fetch_upcoming_events, fetch_all_events_as_admin, fetch_event_by_id, fetch_pending_events
from functions.department_management import create_department, fetch_departments, edit_department, fetch_department_by_id, delete_department, fetch_department_names

db = Database().initialize()
app = flask.Flask(__name__)
CORS(app, origins=["https://event-manager-amber-alpha.vercel.app/"], supports_credentials=True)

# Import fetch_events_by_department at the bottom to avoid circular import issues
import functions.event_management as event_mgmt

###################################################################################
# User Management Endpoints
@app.route("/", methods=["POST"])
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
        JSON response with success message and token (if login is successful).
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

@app.route("/validate_token", methods=["POST", "OPTIONS"])
def validate_token():
    """
    API endpoint to validate a token.

    Expects:
        'Authorization' header with token.

    Returns:
        JSON response with success message and user data, or error message.
    """
    token = request.headers.get("Authorization")
    print(f"[VALIDATE TOKEN] Received token: {token}")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400

    token = token.replace("Bearer ", "")
    try:
        user_data = get_user_details_by_token(token)
        return jsonify({"success": True, "user": user_data}), 200
    except Exception:
        return jsonify({"success": False, "message": "Invalid token."}), 401

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
        JSON object with 'id', 'name', 'email', 'role', 'departamento', and 'admin_email'.

    Returns:
        JSON response with success or error message.
    """
    data = request.json
    
    print(f"[UPDATE USER] Received data: {data}")
    
    user_id = data.get("id")
    name = data.get("name")
    email = data.get("email")
    role = data.get("role")
    departamento = data.get("departamento")

    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400
    token = token.replace("Bearer ", "")
    try:
        user_data = get_user_details_by_token(token)
        admin_email = user_data["email"]
    except Exception:
        return jsonify({"success": False, "message": "Invalid token."}), 401

    if not user_id or not name or not email or not role or not departamento:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    result = update_user(user_id, name, email, role, admin_email, departamento)
    return jsonify(result)


###################################################################################
# Event Management Endpoints

@app.route("/create_event", methods=["POST"])
def create_event_api():
    """
    API endpoint to create an event as an admin.

    Expects:
        JSON object with admin_email, moderator_email, title, description, start_date, end_date, department, importance and url.

    Returns:
        JSON response with success or error message.
    """
    data = request.json
    admin_email = data.get("admin_email")
    moderator_email = data.get("moderator_email")
    title = data.get("title")
    description = data.get("description")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    department = data.get("department")  
    importance = data.get("importance")
    url = data.get("url")

    # Format start_date and end_date for display (optional, for logging or debugging)
    try:
        start_date_disp = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M")
        end_date_disp = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M")
        print(f"[CREATE EVENT] {title} | {start_date_disp} - {end_date_disp}")
    except Exception as e:
        print(f"[CREATE EVENT] Date parse error: {e}")

    if not admin_email or not moderator_email or not title or not description or not start_date or not end_date or not department or not importance or not url:
        return jsonify({"success": False, "message": "Missing required fields."}), 400
    
    result = create_event(admin_email, moderator_email, title, description, start_date, end_date, department, importance, url)
    return jsonify(result)

@app.route("/edit_event", methods=["POST"])
def edit_event_api():
    """
    API endpoint to edit an event as an admin.

    Expects:
        JSON object with 'admin_id', 'event_id', and optional fields to update.

    Returns:
        JSON response with success or error message.
    """
    data = request.json    
    id = data.get("id")
    admin_email = data.get("admin_email")
    moderator_email = data.get("moderator_email")
    title = data.get("title")
    description = data.get("description")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    department = data.get("department")  
    importance = data.get("importance")
    url = data.get("url")

    if not id or not admin_email or not moderator_email or not title or not description or not start_date or not end_date or not department or not importance or not url:
        return jsonify({"success": False, "message": "Missing required fields."}), 400
    
    result = edit_event(event_id=id, 
                        admin_email=admin_email,
                        moderator_email=moderator_email,
                        title=title, 
                        description=description, 
                        start_date=start_date, 
                        end_date=end_date, 
                        department=department, 
                        importance=importance, 
                        url=url)
    return jsonify(result)

@app.route("/fetch_all_events", methods=["GET"])
def fetch_all_events_api():
    """
    API endpoint to fetch all events if the user is an admin.

    Expects:
        'Authorization' header with token.

    Returns:
        JSON response with list of all events or an error message.
    """
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400

    token = token.replace("Bearer ", "")
    try:
        user_data = get_user_details_by_token(token)
    except Exception:
        return jsonify({"success": False, "message": "Invalid token."}), 401
    
    result = fetch_all_events_as_admin(user_data['email'])
    return jsonify(result)
    
@app.route("/delete_event", methods=["POST"])
def delete_event_api():
    """
    API endpoint to delete an event as an admin.

    Expects:
        JSON object with 'event_id'.
        'Authorization' header with token.

    Returns:
        JSON response with success or error message.
    """
    data = request.json
    event_id = data.get("event_id")
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400
    token = token.replace("Bearer ", "")
    try:
        user_data = get_user_details_by_token(token)
        if user_data['role'] != 'admin':
            return jsonify({"success": False, "message": "Only admins can delete events."}), 403
        admin_email = user_data['email']
    except Exception:
        return jsonify({"success": False, "message": "Invalid token."}), 401

    if not event_id:
        return jsonify({"success": False, "message": "Event ID is required"}), 400

    result = delete_event(admin_email, event_id)
    return jsonify(result)

@app.route("/get_event_by_id", methods=["GET"])
def get_event_by_id_api():
    """
    API endpoint to fetch event details by ID.

    Expects:
        Query parameter 'event_id'.

    Returns:
        JSON response with event details or error message.
    """
    event_id = request.args.get("event_id")
    if not event_id:
        return jsonify({"success": False, "message": "Event ID is required"}), 400

    result = fetch_event_by_id(event_id)
    print(result)
    return jsonify(result)

@app.route("/events_by_department", methods=["GET"])
def events_by_department_api():
    """
    API endpoint to fetch all events for a specific department.
    Expects:
        Query parameter 'department'.
    Returns:
        JSON response with list of events for the department or error message.
    """
    department = request.args.get("department")
    if not department:
        return jsonify({"success": False, "message": "Department is required."}), 400
    # Query events for the department
    result = event_mgmt.fetch_events_by_department(department)
    return jsonify(result)

@app.route("/confirmed_events", methods=["GET"])
def confirmed_events_api():
    """
    API endpoint to fetch confirmed events for the logged-in user.
    Expects:
        'Authorization' header with token.
    Returns:
        JSON response with confirmed events.
    """
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400
    token = token.replace("Bearer ", "")
    user_data = get_user_details_by_token(token)
    if not user_data or not user_data.get("email"):
        return jsonify({"success": False, "message": "Invalid token."}), 401
    result = event_mgmt.fetch_confirmed_events(user_data["email"])
    return jsonify(result)

@app.route("/pending_events", methods=["GET"])
def pending_events_api():
    """
    API endpoint to fetch pending events for the logged-in user.
    Expects:
        'Authorization' header with token.
        Optional query param 'department'.
    Returns:
        JSON response with pending events.
    """
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"success": False, "message": "Token is required."}), 400
    token = token.replace("Bearer ", "")
    user_data = get_user_details_by_token(token)
    if not user_data or not user_data.get("email"):
        return jsonify({"success": False, "message": "Invalid token."}), 401
    department = request.args.get("department")
    result = event_mgmt.fetch_pending_events(user_data["email"], department)
    return jsonify(result)

@app.route("/upcoming_events", methods=["GET"])
def upcoming_events_api():
    """
    API endpoint to fetch all upcoming events (sin filtro de usuario).
    Returns:
        JSON response with list of upcoming events.
    """
    result = event_mgmt.fetch_upcoming_events()
    return jsonify(result)


###################################################################################
# Department Management Endpoints

@app.route("/create_department", methods=["POST"])
def create_department_api():
    """
    API endpoint to create a new department.
    Expects:
        JSON object with 'name', 'manager_name', and 'manager_email'.
    Returns:
        JSON response with success or error message.
    """
    data = request.json
    name = data.get("name")
    manager_name = data.get("manager_name")
    manager_email = data.get("manager_email")
    result = create_department(name, manager_name, manager_email)
    return jsonify(result)

@app.route("/edit_department", methods=["POST"])
def edit_department_api():
    """
    API endpoint to edit a department.
    Expects:
        JSON object with 'id', 'name', 'manager_name', and 'manager_email'.
    Returns:
        JSON response with success or error message.
    """
    data = request.json
    department_id = data.get("id")
    name = data.get("name")
    manager_name = data.get("manager_name")
    manager_email = data.get("manager_email")
    result = edit_department(department_id, name, manager_name, manager_email)
    return jsonify(result)

@app.route("/fetch_departments", methods=["GET"])
def fetch_departments_api():
    """
    API endpoint to fetch all departments.
    Returns:
        JSON response with list of departments.
    """
    result = fetch_departments()
    return jsonify(result)

@app.route("/get_department_by_id", methods=["GET"])
def get_department_by_id_api():
    """
    API endpoint to fetch a department by id.
    Expects:
        Query parameter 'id'.
    Returns:
        JSON response with department data or error message.
    """
    id = request.args.get("id")
    result = fetch_department_by_id(id)
    return jsonify(result)

@app.route("/departments", methods=["GET"])
def get_department_names_api():
    """
    API endpoint to fetch only department names for dropdowns.
    Returns:
        JSON response with list of department names.
    """
    result = fetch_department_names()
    return jsonify(result)

@app.route("/delete_department", methods=["POST"])
def delete_department_api():
    """
    API endpoint to delete a department.
    Expects:
        JSON object with 'id'.
    Returns:
        JSON response with success or error message.
    """
    data = request.json
    department_id = data.get("id")
    result = delete_department(department_id)
    return jsonify(result)

@app.route("/cancel_assistance", methods=["POST"])
def cancel_assistance_api():
    """
    API endpoint to cancel assistance for a user in an event.
    Expects:
        JSON object with 'event_id', 'user_email', and optionally 'token'.
    Returns:
        JSON response with success or error message.
    """
    data = request.json
    event_id = data.get("event_id")
    user_email = data.get("user_email")
    if not event_id or not user_email:
        return jsonify({"success": False, "message": "Missing event_id or user_email."}), 400
    import sqlite3, os
    DATABASE = os.path.join(os.path.dirname(__file__), 'backend', os.environ.get("DB_NAME")) if not os.path.exists(os.path.join(os.path.dirname(__file__), os.environ.get("DB_NAME"))) else os.path.join(os.path.dirname(__file__), os.environ.get("DB_NAME"))
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    # Obtener el id del usuario
    cursor.execute("SELECT id FROM User WHERE email = ?", (user_email,))
    user_row = cursor.fetchone()
    if not user_row:
        connection.close()
        return jsonify({"success": False, "message": "User not found."}), 404
    user_id = user_row[0]
    # Actualizar el status a 'pending' (o eliminar la asistencia si prefieres)
    cursor.execute("UPDATE Assistance SET status = 'pending' WHERE user_id = ? AND event_id = ?", (user_id, event_id))
    connection.commit()
    connection.close()
    return jsonify({"success": True, "message": "Asistencia cancelada correctamente."})

@app.route("/confirm_assistance", methods=["POST"])
def confirm_assistance_api():
    """
    API endpoint to confirm assistance for a user in an event.
    Expects:
        JSON object with 'event_id', 'user_email', and optionally 'token'.
    Returns:
        JSON response with success or error message.
    """
    data = request.json
    event_id = data.get("event_id")
    user_email = data.get("user_email")
    if not event_id or not user_email:
        return jsonify({"success": False, "message": "Missing event_id or user_email."}), 400
    import sqlite3, os
    DATABASE = os.path.join(os.path.dirname(__file__), 'backend', os.environ.get("DB_NAME")) if not os.path.exists(os.path.join(os.path.dirname(__file__), os.environ.get("DB_NAME"))) else os.path.join(os.path.dirname(__file__), os.environ.get("DB_NAME"))
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    # Obtener el id del usuario
    cursor.execute("SELECT id FROM User WHERE email = ?", (user_email,))
    user_row = cursor.fetchone()
    if not user_row:
        connection.close()
        return jsonify({"success": False, "message": "User not found."}), 404
    user_id = user_row[0]
    # Actualizar el status a 'confirmed'
    cursor.execute("UPDATE Assistance SET status = 'confirmed' WHERE user_id = ? AND event_id = ?", (user_id, event_id))
    connection.commit()
    connection.close()
    return jsonify({"success": True, "message": "Asistencia confirmada correctamente."})

if __name__ == '__main__':
    import db.populate_test_data
    db.populate_test_data.populate_test_data()
    print("Starting Flask server...") 

    app.run(debug=True, port='5000', host='0.0.0.0')
