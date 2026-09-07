from backend.voice.microphone import record_audio
from backend.voice.stt import speech_to_text

print("SIA Voice Test")
print("Speak after recording starts...\n")

audio_file = record_audio(
    "test_audio.wav",
    duration=5
)

result = speech_to_text(audio_file)

print("\n--- SIA STT RESULT ---")
print("Text:", result["text"])
print("Language:", result["language_code"])
print("Confidence:", result["language_probability"])