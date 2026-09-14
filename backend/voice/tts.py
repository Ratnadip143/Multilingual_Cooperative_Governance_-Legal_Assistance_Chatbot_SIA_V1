import base64
import os
import re

from dotenv import load_dotenv
from sarvamai import SarvamAI


load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)


def text_to_speech(
    text,
    language_code="en-IN",
    output_file="response.wav"
):
    """
    Convert text to speech using Sarvam Bulbul.
    """
    text = re.sub(r"\bSIA\b", "siːə", text, flags=re.IGNORECASE)
    response = client.text_to_speech.convert(
    text=text,
    language_code=language_code,
    model="bulbul:v3",
    speaker="ishita",
    pace=0.85
)

    audio_base64 = response.audios[0]

    audio_data = base64.b64decode(audio_base64)

    with open(output_file, "wb") as audio_file:
        audio_file.write(audio_data)

    print(f"TTS audio saved to: {output_file}")

    return output_file

if __name__ == "__main__":
    text_to_speech(
        text="Hello, I am SIA, your Smart Indian Assistant. How can I help you today?",
        language_code="en-IN",
        output_file="test_sia.wav"
    )