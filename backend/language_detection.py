from langdetect import detect, DetectorFactory, LangDetectException

DetectorFactory.seed = 0

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "pa": "Punjabi",
    "bn": "Bengali",
    "ta": "Tamil",
    "mr": "Marathi"
}


def detect_language(text: str):
    if not text or not text.strip():
        return {
            "code": "unknown",
            "language": "Unknown"
        }

    try:
        language_code = detect(text)

        if language_code in SUPPORTED_LANGUAGES:
            return {
                "code": language_code,
                "language": SUPPORTED_LANGUAGES[language_code]
            }

        return {
            "code": language_code,
            "language": "Other"
        }

    except LangDetectException:
        return {
            "code": "unknown",
            "language": "Unknown"
        }