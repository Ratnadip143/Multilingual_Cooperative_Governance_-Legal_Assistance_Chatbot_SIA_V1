# SIH26187 – API Routes

from flask import Blueprint, request, jsonify
import cv2
import numpy as np
from model import detect_threats

api = Blueprint("api", __name__)


@api.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "message": "Border Surveillance Backend is active"
    })


@api.route("/detect", methods=["POST"])
def detect():

    # Check whether an image was uploaded
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    image = request.files["image"]

    # Check whether a file was actually selected
    if image.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected"
        }), 400

    # Read uploaded image
    file_bytes = np.frombuffer(image.read(), np.uint8)
    frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Check whether image could be decoded
    if frame is None:
        return jsonify({
            "success": False,
            "message": "Unable to read image"
        }), 400

    # Run YOLO detection
    result = detect_threats(frame)

    # Return detection result
    return jsonify({
        "success": True,
        "filename": image.filename,
        **result
    })