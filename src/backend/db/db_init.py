import os, sqlite3, dotenv; dotenv.load_dotenv()

class Database:
    def __init__(self):
        self.db_name = os.environ.get("DB_NAME")
        self.connection = sqlite3.connect(os.path.join(os.path.dirname(__file__), '..', self.db_name), check_same_thread=False)
        self.cursor = self.connection.cursor()
        
    def check_if_exists(self):
        return os.path.exists(os.path.join(os.path.dirname(__file__), self.db_name)) 
    
    def initialize(self):
        if self.check_if_exists(): 
            return("Database exists and initialized.")
        self.create_tables()
        return("Database created and initialized.")
    
    def create_tables(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Department (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            manager_name TEXT NOT NULL,
            manager_email TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(manager_email),
            FOREIGN KEY (manager_name) REFERENCES User(name) ON DELETE SET NULL,
            FOREIGN KEY (manager_email) REFERENCES User(email) ON DELETE SET NULL
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            user_role TEXT NOT NULL DEFAULT 'user',
            department TEXT NOT NULL DEFAULT 'general',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_by TEXT NOT NULL DEFAULT 'system',
            created_by TEXT NOT NULL DEFAULT 'system',
            UNIQUE(email),
            FOREIGN KEY (department) REFERENCES Department(name) ON DELETE SET NULL
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Login (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES User(id)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Event (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            start_date DATETIME NOT NULL,
            end_date DATETIME NOT NULL,
            moderator TEXT NOT NULL,
            moderator_id INTEGER NOT NULL,
            department TEXT NOT NULL,
            importance TEXT NOT NULL,
            url TEXT NOT NULL,
            assistance INTEGER DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (moderator_id) REFERENCES User(id) ON DELETE SET NULL, 
            FOREIGN KEY (moderator) REFERENCES User(name) ON DELETE SET NULL
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Assistance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            event_id INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            FOREIGN KEY (user_id) REFERENCES User(id),
            FOREIGN KEY (event_id) REFERENCES Event(id)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Recording (
            id INTEGER PRIMARY KEY,
            event_id INTEGER NOT NULL,
            url TEXT NOT NULL,
            uploaded_at DATETIME NOT NULL,
            FOREIGN KEY (event_id) REFERENCES Event(id)
        )
        ''')
        self.connection.commit()
        self.connection.close()
        # Poblar la base de datos con datos de prueba si es una nueva creación
        try:
            from .populate_test_data import populate_test_data
            populate_test_data()
        except Exception as e:
            print(f"[DB INIT] Error al poblar datos de prueba: {e}")

if __name__ == "__main__":
    db = Database()
    print(db.initialize())