import sqlite3, os, random
from datetime import datetime, timedelta
from functions.user_management import create_user

DB_PATH = os.path.join(os.path.dirname(__file__), '../eventos.db')

roles = ['user', 'moderator', 'admin']
departments = [f"Depto{i}" for i in range(1, 6)]
users = []
events = []

for i in range(15):
    name = f"Usuario{i+1}"
    email = f"usuario{i+1}@test.com"
    password = f"password{i+1}"
    role = random.choice(roles)
    department = random.choice(departments)
    create_user(name, email, password, 'system', department, role)
    users.append((name, email, password, role, department))

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()
user_ids = [row[0] for row in c.execute("SELECT id FROM User").fetchall()]

now = datetime.now()
for i in range(15):
    title = f"Evento{i+1}"
    description = f"Descripción del evento {i+1}"
    start_date = (now + timedelta(days=i)).strftime('%Y-%m-%dT%H:%M:%S')
    end_date = (now + timedelta(days=i, hours=2)).strftime('%Y-%m-%dT%H:%M:%S')
    moderator_id = user_ids[i % len(user_ids)]
    c.execute("SELECT name FROM User WHERE id = ?", (moderator_id,))
    moderator = c.fetchone()[0]
    department = random.choice(departments)
    importance = random.choice(['alta', 'media', 'baja'])
    url = f"http://evento{i+1}.com"
    c.execute("INSERT OR IGNORE INTO Event (title, description, start_date, end_date, moderator, moderator_id, department, importance, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (title, description, start_date, end_date, moderator, moderator_id, department, importance, url))

# Insertar asistencias (pending y confirmed)
event_ids = [row[0] for row in c.execute("SELECT id FROM Event").fetchall()]
for i in range(15):
    user_id = random.choice(user_ids)
    event_id = random.choice(event_ids)
    status = random.choice(['pending', 'confirmed'])
    c.execute("INSERT INTO Assistance (user_id, event_id, status) VALUES (?, ?, ?)", (user_id, event_id, status))

# Insertar departamentos
for d in departments:
    manager_id = random.choice(user_ids)
    c.execute("SELECT name, email FROM User WHERE id = ?", (manager_id,))
    manager_name, manager_email = c.fetchone()
    c.execute("INSERT OR IGNORE INTO Department (name, manager_name, manager_email) VALUES (?, ?, ?)", (d, manager_name, manager_email))

conn.commit()
conn.close()

def populate_test_data():
    print("Base de datos poblada con datos de prueba.")
