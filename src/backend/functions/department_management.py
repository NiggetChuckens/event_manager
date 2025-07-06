import sqlite3, os

DATABASE = os.path.join(os.path.dirname(__file__), '..', os.environ.get("DB_NAME"))

def create_department(name, manager_name, manager_email):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    if not name or not manager_name or not manager_email:
        return {"success": False, "message": "All fields are required."}
    try:
        cursor.execute("""
            INSERT INTO Department (name, manager_name, manager_email)
            VALUES (?, ?, ?)
        """, (name, manager_name, manager_email))
        connection.commit()
        return {"success": True, "message": "Department created successfully."}
    except Exception as e:
        return {"success": False, "message": str(e)}

def fetch_departments():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT id, name, manager_name, manager_email FROM Department")
        departments = [
            {
                "id": row[0],
                "name": row[1],
                "manager_name": row[2],
                "manager_email": row[3]
            }
            for row in cursor.fetchall()
        ]
        return {"success": True, "departments": departments}
    except Exception as e:
        return {"success": False, "message": str(e), "departments": []}

def edit_department(id, name, manager_name, manager_email):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    if not id or not name or not manager_name or not manager_email:
        return {"success": False, "message": "All fields are required."}
    try:
        cursor.execute("""
            UPDATE Department
            SET name = ?, manager_name = ?, manager_email = ?
            WHERE id = ?
        """, (name, manager_name, manager_email, id))
        connection.commit()
        if cursor.rowcount == 0:
            return {"success": False, "message": "Department not found."}
        return {"success": True, "message": "Department updated successfully."}
    except Exception as e:
        return {"success": False, "message": str(e)}


def fetch_department_by_id(id):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT id, name, manager_name, manager_email FROM Department WHERE id = ?", (id,))
        row = cursor.fetchone()
        if row:
            department = {
                "id": row[0],
                "name": row[1],
                "manager_name": row[2],
                "manager_email": row[3]
            }
            return {"success": True, "department": department}
        else:
            return {"success": False, "message": "Department not found."}
    except Exception as e:
        return {"success": False, "message": str(e)}

def delete_department(id):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    try:
        cursor.execute("DELETE FROM Department WHERE id = ?", (id,))
        connection.commit()
        if cursor.rowcount == 0:
            return {"success": False, "message": "Department not found."}
        return {"success": True, "message": "Department deleted successfully."}
    except Exception as e:
        return {"success": False, "message": str(e)}
