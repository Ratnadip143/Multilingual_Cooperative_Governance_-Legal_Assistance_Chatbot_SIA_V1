import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


def speech_to_text(audio_file):
    """
    Convert audio to text and automatically detect the spoken language.
    """

    with open(audio_file, "rb") as audio:
        response = client.speech_to_text.transcribe(
            file=audio,
            model="saaras:v4",
            mode="transcribe",
            language_code="unknown"
        )

    return {
        "text": response.transcript,
        "language_code": response.language_code,
        "language_probability": response.language_probability
    }