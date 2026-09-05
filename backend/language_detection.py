from langdetect import detect, LangDetectException


SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "bn": "Bengali",
    "pa": "Punjabi",
    "mr": "Marathi",
    "ta": "Tamil",
    "te": "Telugu",
    "gu": "Gujarati",
    "kn": "Kannada",
    "ml": "Malayalam",
    "or": "Odia",
    "as": "Assamese",
    "ur": "Urdu",
    "ne": "Nepali"
}


def detect_language(text: str):
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