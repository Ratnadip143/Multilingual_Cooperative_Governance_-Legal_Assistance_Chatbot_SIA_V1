# SIH26187 - AI-Based Intelligent Border Surveillance
# Backend application
from flask import Flask
from flask_cors import CORS
from routes import api

app = Flask(__name__)
CORS(app)

app.register_blueprint(api, url_prefix="/api")


@app.route("/")
def home():
    return {
        "message": "SIH26187 Border Surveillance Backend",
        "status": "running"
    }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
