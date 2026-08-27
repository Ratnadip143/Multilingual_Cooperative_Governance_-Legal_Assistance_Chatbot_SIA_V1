# SIH26187 – Utility functions

def format_detection_result(threat_detected, confidence=0):
    return {
        "threat_detected": threat_detected,
        "confidence": confidence
    }
