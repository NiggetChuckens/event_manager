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
            return("Base de datos existente e inicializada.")
        self.create_tables()
        return("Base de datos creada e inicializada.")
    
    def create_tables(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            user_role TEXT NOT NULL DEFAULT 'user'
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Evento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            fecha_inicio DATETIME NOT NULL,
            fecha_fin DATETIME NOT NULL,
            organizador_id INTEGER NOT NULL,
            plataforma TEXT,
            FOREIGN KEY (organizador_id) REFERENCES Usuario(id)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Asistencia (
            idAsistencia INTEGER PRIMARY KEY,
            usuario_id INTEGER NOT NULL,
            evento_id INTEGER NOT NULL,
            estado TEXT,
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
            FOREIGN KEY (evento_id) REFERENCES Evento(id)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Grabacion (
            idGrabacion INTEGER PRIMARY KEY,
            evento_id INTEGER NOT NULL,
            url TEXT NOT NULL,
            fechaSubida DATETIME NOT NULL,
            FOREIGN KEY (evento_id) REFERENCES Evento(id)
        )
        ''')
        self.connection.commit()
        self.connection.close()

if __name__ == "__main__":
    db = Database()
    print(db.initialize())