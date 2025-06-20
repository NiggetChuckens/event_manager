import sqlite3, os

DATABASE = os.path.join(os.path.dirname(__file__), '..', os.environ.get("DB_NAME"))

"""         id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            fecha_inicio DATETIME NOT NULL,
            fecha_fin DATETIME NOT NULL,
            organizador TEXT NOT NULL,
            organizador_id INTEGER NOT NULL,
            plataforma TEXT NOT NULL,
            url TEXT NOT NULL,
            asistencia INTEGER DEFAULT 0,
            estado TEXT NOT NULL DEFAULT 'pendiente',
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organizador_id) REFERENCES User(id) ON DELETE SET NULL, 
            FOREIGN KEY (organizador) REFERENCES User(name) ON DELETE SET NULL
"""

def fetch_eventos_proximos():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("SELECT id, nombre, fecha_inicio FROM Eventos WHERE fecha_inicio >= date('now') ORDER BY fecha_inicio ASC")
    eventos = cursor.fetchall()
    connection.close()

    eventos_list = [
        {"id": evento[0], "nombre": evento[1], "fecha_inicio": evento[2]}
        for evento in eventos
    ]

    return {"success": True, "eventos": eventos_list}

def get_pending_events(user_id):
    # Mock implementation, replace with actual database query
    pending_events = [
        {'nombre': 'Evento 1', 'fecha_inicio': '2025-06-21'},
        {'nombre': 'Evento 2', 'fecha_inicio': '2025-06-22'},
    ]
    return pending_events