import sounddevice as sd
import soundfile as sf


def record_audio(
    filename="test_audio.wav",
    duration=5,
    sample_rate=16000
):
    print("Recording... Speak now.")

    audio = sd.rec(
        int(duration * sample_rate),
        samplerate=sample_rate,
        channels=1,
        dtype="float32"
    )

    sd.wait()

    sf.write(filename, audio, sample_rate)

    print(f"Recording saved to {filename}")

    return filename
if __name__ == "__main__":
    record_audio(
        filename="test_audio.wav",
        duration=5,
        sample_rate=16000
    )