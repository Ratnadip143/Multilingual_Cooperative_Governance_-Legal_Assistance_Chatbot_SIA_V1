from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolo11n.pt")


def detect_threats(frame):
    """
    Detect objects in the supplied image/frame
    and return the detection results.
    """

    results = model(frame, verbose=False)

    detections = []

    for result in results:

        if result.boxes is None:
            continue

        for box in result.boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            class_name = model.names[class_id]

            detections.append({
                "object": class_name,
                "confidence": round(confidence, 2)
            })

    # For now, we consider a person detection
    # as something that needs further analysis.
    threat_detected = any(
        detection["object"] == "person"
        and detection["confidence"] >= 0.50
        for detection in detections
    )

    return {
        "threat_detected": threat_detected,
        "detections": detections,
        "message": (
            "Potential threat detected"
            if threat_detected
            else "No potential threat detected"
        )
    }