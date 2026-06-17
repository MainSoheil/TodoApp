from flask import Flask, send_from_directory, request, jsonify
from database import init_db_command, close_db, get_db, init_db
from flask_cors import CORS
from json import loads
from threading import Thread
import webbrowser
import time
import os

SECRET_KEY = "65f73805345c23ac01e2d546059b74ac"

app = Flask(__name__, static_folder="frontend", static_url_path="/")
CORS(app)

app.config["SECRET_KEY"] = SECRET_KEY
app.config['DATABASE'] = 'database.db'
app.teardown_appcontext(close_db)
app.cli.add_command(init_db_command)


@app.route("/api", methods=["GET", "POST"])
def data():
    db = get_db()
    if request.method == "GET":
        cur = db.execute("SELECT * FROM Timers;")
        data = [{"id": id, "title": title, "startDate": startDate, "endDate": endDate} for (id, title, startDate, endDate) in cur.fetchall()]
        cur.close()
        return jsonify(data)
    data = loads(request.data)
    db.execute("INSERT INTO Timers VALUES (null, ?, ?, ?);", [data['title'], data['startDate'], data['endDate']])
    db.commit()
    return jsonify(dict())


@app.route("/api/delete", methods=["DELETE"])
def delete():
    id = loads(request.data)['id']
    db = get_db()
    db.execute("DELETE FROM Timers WHERE id=?;", [id])
    db.commit()
    return jsonify(dict())

@app.route("/")
@app.route("/<path:path>")
def serve_react(path=None):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

def open_browser():
    # time.sleep(1)
    webbrowser.open("http://127.0.0.1:5000")

if __name__ == "__main__":
    with app.app_context():
        init_db()
    Thread(target=open_browser).start()
    app.run(host="127.0.0.1", port=5000, debug=False)
