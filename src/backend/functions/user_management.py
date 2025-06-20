import sqlite3, os, jwt, dotenv; dotenv.load_dotenv()
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE = os.path.join(os.path.dirname(__file__), '..',os.environ.get("DB_NAME"))
SECRET_KEY = os.environ.get("SECRET_KEY", "default_secret")

def create_user(name, email, password, admin_email, rol):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM User WHERE email = ?", (email,))
    if cursor.fetchone():
        connection.close()
        return {"success": False, "message": "Email already exists"}

    hashed_password = generate_password_hash(password)
    cursor.execute(
        "INSERT INTO User (name, email, password, user_role, created_by) VALUES (?, ?, ?, ?, ?)",
        (name, email, hashed_password, rol, admin_email)
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": f"User '{name}' created successfully"}

def login_user(email, password):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT email, password, name, user_role FROM User WHERE email = ?", (email,))
    user = cursor.fetchone()
    connection.close()

    if not user:
        return {"success": False, "message": "Invalid email or password"}

    stored_password = user[1]  
    if not isinstance(stored_password, str):
        return {"success": False, "message": "Password format is invalid"}

    if not check_password_hash(stored_password, password):
        return {"success": False, "message": "Invalid email or password"}
    
    if user[3] not in ['user', 'moderator', 'admin']:
        return {"success": False, "message": "Invalid user role"}
    
    token = jwt.encode({"email": email, "rol": user[3], "username": user[2]}, SECRET_KEY, algorithm="HS256")

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO Login (user_id, token) VALUES ((SELECT id FROM User WHERE email = ?), ?)",
        (email, token)
    )
    connection.commit()
    connection.close()

    return {"success": True, "user-type": user[3], "message": "Login successful", "token": token}

def delete_user(admin_email, target_email):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT user_role FROM User WHERE email = ?", (admin_email,))
    admin_status = cursor.fetchone()

    if not admin_status or admin_status[0] != 'admin':
        connection.close()
        return {"success": False, "message": "Unauthorized: Only admins can delete users"}

    cursor.execute("SELECT * FROM User WHERE email = ?", (target_email,))
    user = cursor.fetchone()

    if not user:
        connection.close()
        return {"success": False, "message": "User not found"}

    cursor.execute("DELETE FROM User WHERE email = ?", (target_email,))
    connection.commit()
    connection.close()

    return {"success": True, "message": "User deleted successfully"}

def get_user_details_by_token(token):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM User WHERE token = ?", (token,))
    user = cursor.fetchone()
    connection.close()

    if not user:
        return {"success": False,"message": "Invalid token"}

    return {"success": True, "username": user[1]}

def validate_token(token):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT token FROM Login WHERE token = ?", (token,))
    valid_token = cursor.fetchone()
    connection.close()

    if not valid_token:
        return {"success": False, "message": "Invalid or expired token"}

    return {"success": True, "message": "Token is valid"}

def fetch_all_users():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, email, user_role FROM User")
    users = cursor.fetchall()
    connection.close()

    user_list = [
        {"id": user[0], "name": user[1], "email": user[2], "role": user[3]}
        for user in users
    ]

    return {"success": True, "users": user_list}

def get_user_details_by_id(user_id):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, email, user_role FROM User WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    connection.close()

    if not user:
        return {"success": False, "message": "User not found"}

    return {
        "success": True,
        "id": user[0],
        "name": user[1],
        "email": user[2],
        "role": user[3],
    }

def update_user(user_id, name, email, role, admin_email):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT user_role FROM User WHERE email = ?", (admin_email,))
    admin_status = cursor.fetchone()

    if not admin_status or admin_status[0] != 'admin':
        connection.close()
        return {"success": False, "message": "Unauthorized: Only admins can update users"}

    cursor.execute("SELECT * FROM User WHERE id = ?", (user_id,))
    user = cursor.fetchone()

    if not user:
        connection.close()
        return {"success": False, "message": "User not found"}

    cursor.execute(
        "UPDATE User SET name = ?, email = ?, user_role = ? WHERE id = ?",
        (name, email, role, user_id)
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": "User updated successfully"}

if __name__ == "__main__":
    response = create_user('John Doe', 'jd@test.com', 'password123', 'jd2@test.com', 'user')
    print(response)
    
    response = create_user('John Doe 2', 'jd2@test.com', 'password123', 'None', 'admin')
    print(response)
    
    response = create_user('Rodrigo', 'rodrigo@test.com', 'Choripan.132', 'None', 'admin')
    print(response)
    
    response = create_user('Moderator Test', 'modtest@test.com', 'password123', 'rodrigo@test.com', 'moderator')
    print(response)