from langdetect import detect, DetectorFactory, LangDetectException


# =========================================================
# LANGUAGE DETECTION CONFIGURATION
# =========================================================

# Make langdetect deterministic.
DetectorFactory.seed = 0


# =========================================================
# SUPPORTED LANGUAGES
# =========================================================

# These language codes are used by the SIA frontend
# and backend.
SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "pa": "Punjabi",
    "bn": "Bengali",
    "ta": "Tamil",
    "mr": "Marathi",
    "gu": "Gujarati",
    "te": "Telugu",
    "kn": "Kannada",
    "ml": "Malayalam",
    "or": "Odia",
    "as": "Assamese",
}


# =========================================================
# LANGUAGE ALIASES
# =========================================================

# Accept both language codes and full language names.
# This keeps the backend compatible with older frontend code.

LANGUAGE_ALIASES = {
    "english": "en",
    "hindi": "hi",
    "punjabi": "pa",
    "bengali": "bn",
    "bangla": "bn",
    "tamil": "ta",
    "marathi": "mr",
    "gujarati": "gu",
    "telugu": "te",
    "kannada": "kn",
    "malayalam": "ml",
    "odia": "or",
    "oriya": "or",
    "assamese": "as",
}


# =========================================================
# NORMALIZE LANGUAGE
# =========================================================

def normalize_language(language):
    """
    Convert the language received from the frontend
    into a standard language code and language name.

    Examples:

        "bn"       -> ("bn", "Bengali")
        "Bengali"  -> ("bn", "Bengali")
        "hi"       -> ("hi", "Hindi")
        "Hindi"    -> ("hi", "Hindi")
        "bn-IN"    -> ("bn", "Bengali")

    If the language is missing or unsupported,
    English is used as the default.
    """

    # No language supplied.
    if language is None:
        return "en", "English"

    # Convert to string and remove extra spaces.
    value = str(language).strip()

    # Empty language.
    if not value:
        return "en", "English"

    # Normalize case.
    code = value.lower()

    # -----------------------------------------------------
    # Direct language code
    # -----------------------------------------------------

    # Example:
    # "bn" -> Bengali
    # "hi" -> Hindi
    # "pa" -> Punjabi
    if code in SUPPORTED_LANGUAGES:
        return code, SUPPORTED_LANGUAGES[code]

    # -----------------------------------------------------
    # Full language name
    # -----------------------------------------------------

    # Example:
    # "bengali" -> bn
    # "hindi" -> hi
    alias_code = LANGUAGE_ALIASES.get(code)

    if alias_code:
        return alias_code, SUPPORTED_LANGUAGES[alias_code]

    # -----------------------------------------------------
    # Regional language code
    # -----------------------------------------------------

    # Example:
    # "bn-IN" -> "bn"
    # "hi-IN" -> "hi"
    # "ta-IN" -> "ta"
    short_code = code.split("-")[0]

    if short_code in SUPPORTED_LANGUAGES:
        return short_code, SUPPORTED_LANGUAGES[short_code]

    # Unsupported language.
    return "en", "English"


# =========================================================
# LANGUAGE DETECTION
# =========================================================

def detect_language(text: str, preferred_language=None):
    """
    Determine the language that SIA should use.

    IMPORTANT:
    If the user has selected a language from the SIA
    language dropdown, that selected language has priority.

    Automatic language detection is used only when no
    preferred language is supplied.

    This prevents a problem such as:

        Selected language = Bengali
        User question    = "What is PACS?"

    langdetect would detect English from the question,
    but SIA must still answer in Bengali because the user
    explicitly selected Bengali.
    """

    # =====================================================
    # PRIORITY 1: USER-SELECTED LANGUAGE
    # =====================================================

    if preferred_language is not None:

        code, language = normalize_language(
            preferred_language
        )

        return {
            "code": code,
            "language": language,
            "source": "selected",
        }

    # =====================================================
    # PRIORITY 2: AUTOMATIC DETECTION
    # =====================================================

    if not text or not text.strip():

        return {
            "code": "unknown",
            "language": "Unknown",
            "source": "detected",
        }

    try:

        language_code = detect(text)

        # -------------------------------------------------
        # Detected language is supported
        # -------------------------------------------------

        if language_code in SUPPORTED_LANGUAGES:

            return {
                "code": language_code,
                "language": SUPPORTED_LANGUAGES[language_code],
                "source": "detected",
            }

        # -------------------------------------------------
        # Detected language is not supported
        # -------------------------------------------------

        return {
            "code": language_code,
            "language": "Other",
            "source": "detected",
        }

    except LangDetectException:

        return {
            "code": "unknown",
            "language": "Unknown",
            "source": "detected",
        }