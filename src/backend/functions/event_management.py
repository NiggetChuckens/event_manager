import sqlite3, os
from datetime import datetime

DATABASE = os.path.join(os.path.dirname(__file__), '..', os.environ.get("DB_NAME"))

def fetch_upcoming_events():
    """
    Fetch upcoming events from the database.

    Returns:
        dict: A dictionary with a success flag and a list of upcoming events. Each event includes 'id', 'nombre', and 'fecha_inicio'.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id, title, start_date FROM Event WHERE start_date >= date('now') ORDER BY start_date ASC")
    events = cursor.fetchall()
    connection.close()

    events_list = [
        {"id": event[0], "title": event[1], "start_date": datetime.strptime(event[2], "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M") if event[2] else event[2]}
        for event in events
    ]

    return {"success": True, "events": events_list}

def get_pending_events(user_id):
    """
    Get pending events for a specific user.

    Args:
        user_id (int): The ID of the user for whom to fetch pending events.

    Returns:
        list: A list of pending events for the user.
    """
    # Mock implementation, replace with actual database query
    pending_events = [
        {'nombre': 'Evento 1', 'fecha_inicio': '2025-06-21'},
        {'nombre': 'Evento 2', 'fecha_inicio': '2025-06-22'},
    ]
    return pending_events

def is_admin(email):
    """
    Check if the user has an admin role.

    Args:
        email (str): The email of the user.

    Returns:
        bool: True if the user is an admin, False otherwise.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT user_role FROM User WHERE email = ?", (email,))
    role = cursor.fetchone()
    connection.close()

    return role and role[0] == 'admin'

def create_event(admin_email, moderator_email, title, description, start_date, end_date, department, importance, url):
    """
    Create a new event as an admin.

    Args:
        admin_email (str): The email of the admin creating the event.
        title (str): Title of the event.
        description (str): Description of the event.
        start_date (str): Start date of the event.
        end_date (str): End date of the event.
        platform (str): Platform of the event.
        url (str): URL of the event.

    Returns:
        dict: Success or error message.
    """
    if not is_admin(admin_email):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    
    # Fetch moderator ID and name based on email
    mod_data = cursor.execute("SELECT name, id FROM User WHERE email = ?", (moderator_email,))
    mod_data = mod_data.fetchone()
    
    if not mod_data:
        connection.close()
        return {"success": False, "message": "Moderator not found."}

    cursor.execute(
        '''INSERT INTO Event 
        (title, description, start_date, end_date, moderator, moderator_id, department, importance, url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''', 
        # mod_data[0] is the moderator name and mod_data[1] is the moderator ID
        (title, description, start_date, end_date, mod_data[0], mod_data[1], department, importance, url) 
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event created successfully."}

def edit_event(admin_email, event_id, moderator_email=None, title=None, description=None, start_date=None, end_date=None, platform=None, importance=None, department=None, url=None):
    """
    Edit an event as an admin.

    Args:
        admin_email (int): The ID of the admin editing the event.
        event_id (int): The ID of the event to edit.
        title (str): New title of the event.
        description (str): New description of the event.
        start_date (str): New start date of the event.
        end_date (str): New end date of the event.
        platform (str): New platform of the event.
        url (str): New URL of the event.

    Returns:
        dict: Success or error message.
    """
    if not is_admin(admin_email):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    if not event_id:
        return {"success": False, "message": "Missing required fields."}
    
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    updates = []
    params = []
    if title:
        updates.append("title = ?")
        params.append(title)
    if moderator_email:
        mod_data = cursor.execute("SELECT name, id FROM User WHERE email = ?", (moderator_email[0],) if isinstance(moderator_email, list) else (moderator_email,)) # Ensure `moderator_email` is a single value
        mod_data = mod_data.fetchone()
        
        if not mod_data:
            connection.close()
            return {"success": False, "message": "Moderator not found."}
        updates.append("moderator = ?")
        params.append(mod_data[0])  
        updates.append("moderator_id = ?")
        params.append(mod_data[1])  
    if description:
        updates.append("description = ?")
        params.append(description)
    if start_date:
        updates.append("start_date = ?")
        params.append(start_date)
    if end_date:
        updates.append("end_date = ?")
        params.append(end_date)
    if platform:
        updates.append("platform = ?")
        params.append(platform)
    if department:
        updates.append("department = ?")
        params.append(department)
    if importance:
        updates.append("importance = ?")
        params.append(importance)
    if url:
        updates.append("url = ?")
        params.append(url)

    if not updates:
        return {"success": False, "message": "No fields to update."} # Ensure updates list is not empty

    cursor.execute(f"UPDATE Event SET {', '.join(updates)} WHERE id = ?", params + [event_id]) # Ensure params match placeholders
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event updated successfully."}

def delete_event(admin_email, event_id):
    """
    Delete an event as an admin.

    Args:
        admin_email (str): The email of the admin deleting the event.
        event_id (int): The ID of the event to delete.

    Returns:
        dict: Success or error message.
    """
    if not is_admin(admin_email):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM Event WHERE id = ?", (event_id,))
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event deleted successfully."}

def fetch_all_events_as_admin(email):
    """
    Fetch all events from the database if the user is an admin.

    Args:
        user_id (int): The ID of the user making the request.

    Returns:
        dict: A dictionary with a success flag and a list of all events, or an error message if the user is not an admin.
    """
    if not is_admin(email):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    cursor.execute("SELECT id, title, description, start_date, end_date, moderator_id, department, importance, url FROM Event ORDER BY start_date ASC")
    events = cursor.fetchall()
    

    events_list = []
    for event in events:
        cursor.execute("SELECT email FROM User WHERE id = ?", (event[5],))
        mail = cursor.fetchone()
        try:
            start_disp = datetime.strptime(event[3], "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M") if event[3] else event[3]
            end_disp = datetime.strptime(event[4], "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M") if event[4] else event[4]
        except Exception:
            start_disp = event[3]
            end_disp = event[4]
        events_list.append({
            "id": event[0],
            "title": event[1],
            "description": event[2],
            "start_date": start_disp,
            "end_date": end_disp,
            "moderator_id": event[5],
            "moderator_email": mail,
            "department": event[6],
            "importance": event[7],
            "url": event[8]
        })
    connection.close()
    return {"success": True, "events": events_list}

def fetch_event_by_id(event_id):
    """
    Fetch event details by ID.

    Args:
        event_id (int): The ID of the event to fetch.

    Returns:
        dict: Event details or an error message.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id, title, description, start_date, end_date, moderator, moderator_id, department, importance, url FROM Event WHERE id = ?", (event_id,))
    event = cursor.fetchone()
    connection.close()

    if not event:
        return {"success": False, "message": "Event not found."}

    try:
        start_disp = datetime.strptime(event[3], "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M") if event[3] else event[3]
        end_disp = datetime.strptime(event[4], "%Y-%m-%dT%H:%M:%S").strftime("%d/%m/%Y %H:%M") if event[4] else event[4]
    except Exception:
        start_disp = event[3]
        end_disp = event[4]

    return {
        "success": True,
        "event": {
            "id": event[0],
            "title": event[1],
            "description": event[2],
            "start_date": start_disp,
            "end_date": end_disp,
            "moderator": event[5],
            "moderator_id": event[6],
            "department": event[7],
            "importance": event[8],
            "url": event[9]
        }
    }

def fetch_event_id_by_details(title, start_date):
    """
    Fetch event ID based on title and start date.

    Args:
        title (str): Title of the event.
        start_date (str): Start date of the event.

    Returns:
        int: Event ID or None if not found.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id FROM Event WHERE title = ? AND start_date = ?", (title, start_date))
    event = cursor.fetchone()
    connection.close()

    return event[0] if event else None