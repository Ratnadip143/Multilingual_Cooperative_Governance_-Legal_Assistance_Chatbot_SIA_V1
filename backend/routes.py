# SIH26187 – API Routes

from flask import Blueprint, request, jsonify

api = Blueprint("api", __name__)


@api.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "message": "Border Surveillance Backend is active"
    })


@api.route("/detect", methods=["POST"])
def detect():
    return jsonify({
        "threat_detected": False,
        "message": "Detection module ready"
    })
