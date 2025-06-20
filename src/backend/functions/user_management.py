import sqlite3, os, jwt, dotenv; dotenv.load_dotenv()
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE = os.path.join(os.path.dirname(__file__), '..',os.environ.get("DB_NAME"))
SECRET_KEY = os.environ.get("SECRET_KEY", "default_secret")

def signup_user(nombre, email, password):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM User WHERE email = ?", (email,))
    if cursor.fetchone():
        connection.close()
        return {"success": False, "message": "Email already exists"}

    hashed_password = generate_password_hash(password)
    cursor.execute("INSERT INTO User (name, email, password) VALUES (?, ?, ?)", (nombre, email, hashed_password))
    connection.commit()
    connection.close()

    return {"success": True, "message": "User signed up successfully"}

def signup_mod(nombre, email, password, rol='moderator'):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM User WHERE email = ?", (email,))
    if cursor.fetchone():
        connection.close()
        return {"success": False, "message": "Email already exists"}

    hashed_password = generate_password_hash(password)
    cursor.execute("INSERT INTO User (name, email, password, user_role) VALUES (?, ?, ?, ?)", (nombre, email, hashed_password, rol))
    connection.commit()
    connection.close()

    return {"success": True, "message": "User signed up successfully"}

def signup_admin(nombre, email, password, rol='admin'):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM User WHERE email = ?", (email,))
    if cursor.fetchone():
        connection.close()
        return {"success": False, "message": "Email already exists"}

    hashed_password = generate_password_hash(password)
    cursor.execute("INSERT INTO User (name, email, password, user_role) VALUES (?, ?, ?, ?)", (nombre, email, hashed_password, rol))
    connection.commit()
    connection.close()

    return {"success": True, "message": "User signed up successfully"}

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


if __name__ == "__main__":
    response = signup_user("John Doe", "jd@test.com", "password123")
    print(response)
    
    response = signup_admin("John Doe 2", "jd2@test.com", "password123")
    print(response)
    
    response = login_user("jd@test.com", "password123")
    print(response)
    
    response = login_user("jd2@test.com", "password123")
    print(response)