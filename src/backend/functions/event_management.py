import sqlite3, os

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
        {"id": event[0], "title": event[1], "start_date": event[2]}
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

def is_admin(user_id):
    """
    Check if the user has an admin role.

    Args:
        user_id (int): The ID of the user.

    Returns:
        bool: True if the user is an admin, False otherwise.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT role FROM User WHERE id = ?", (user_id,))
    role = cursor.fetchone()
    connection.close()

    return role and role[0] == 'admin'

def create_event(admin_id, title, description, start_date, end_date, importance, url):
    """
    Create a new event as an admin.

    Args:
        admin_id (int): The ID of the admin creating the event.
        title (str): Title of the event.
        description (str): Description of the event.
        start_date (str): Start date of the event.
        end_date (str): End date of the event.
        platform (str): Platform of the event.
        url (str): URL of the event.

    Returns:
        dict: Success or error message.
    """
    if not is_admin(admin_id):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO Event (title, description, start_date, end_date, organizer_id, importance, url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (title, description, start_date, end_date, admin_id, importance, url)
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event created successfully."}

def edit_event(admin_id, event_id, title=None, description=None, start_date=None, end_date=None, platform=None, url=None):
    """
    Edit an event as an admin.

    Args:
        admin_id (int): The ID of the admin editing the event.
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
    if not is_admin(admin_id):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    updates = []
    params = []
    if title:
        updates.append("title = ?")
        params.append(title)
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
    if url:
        updates.append("url = ?")
        params.append(url)

    params.append(event_id)

    cursor.execute(f"UPDATE Event SET {', '.join(updates)} WHERE id = ?", params)
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event updated successfully."}

def delete_event(admin_id, event_id):
    """
    Delete an event as an admin.

    Args:
        admin_id (int): The ID of the admin deleting the event.
        event_id (int): The ID of the event to delete.

    Returns:
        dict: Success or error message.
    """
    if not is_admin(admin_id):
        return {"success": False, "message": "Unauthorized: Admin role required."}

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("DELETE FROM Event WHERE id = ?", (event_id,))
    connection.commit()
    connection.close()

    return {"success": True, "message": "Event deleted successfully."}

def confirm_assistance(user_id, event_id):
    """
    Confirm assistance to an event.

    Args:
        user_id (int): The ID of the user confirming assistance.
        event_id (int): The ID of the event.

    Returns:
        dict: Success or error message.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE Event SET assistance = assistance + 1 WHERE id = ?",
        (event_id,)
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": "Assistance confirmed successfully."}

def cancel_assistance(user_id, event_id):
    """
    Cancel assistance to an event.

    Args:
        user_id (int): The ID of the user canceling assistance.
        event_id (int): The ID of the event.

    Returns:
        dict: Success or error message.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE Event SET assistance = assistance - 1 WHERE id = ? AND assistance > 0",
        (event_id,)
    )
    connection.commit()
    connection.close()

    return {"success": True, "message": "Assistance canceled successfully."}

def fetch_confirmed_assistance_events(user_id):
    """
    Fetch events with confirmed assistance for a user.

    Args:
        user_id (int): The ID of the user.

    Returns:
        list: A list of events with confirmed assistance.
    """
    # Mock implementation, replace with actual database query
    confirmed_events = [
        {'name': 'Event 1', 'start_date': '2025-06-21'},
        {'name': 'Event 2', 'start_date': '2025-06-22'},
    ]
    return confirmed_events

def fetch_pending_assistance_confirmations(user_id):
    """
    Fetch events with pending assistance confirmations for a user.

    Args:
        user_id (int): The ID of the user.

    Returns:
        list: A list of events with pending assistance confirmations.
    """
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id, title, start_date FROM Event WHERE assistance = 0 AND organizer_id = ?",
        (user_id,)
    )
    pending_events = cursor.fetchall()
    connection.close()

    return [
        {"id": event[0], "title": event[1], "start_date": event[2]}
        for event in pending_events
    ]