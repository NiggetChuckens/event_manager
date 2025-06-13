import os, sys, flask

# Ensure the db directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'db'))

from db_init import Database

db = Database()
app = flask.Flask(__name__)
@app.route('/')
def index():
    return f"{db.initialize()}"

if __name__ == '__main__':
    app.run(debug=True)