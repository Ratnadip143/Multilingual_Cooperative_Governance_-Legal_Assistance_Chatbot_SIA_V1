from fastapi import FastAPI

from pydantic import BaseModel

from fastapi.staticfiles import StaticFiles

from fastapi.responses import FileResponse

from pathlib import Path

from fastapi import UploadFile, File, HTTPException

from backend.voice.tts import text_to_speech

import os

import re

import base64

import traceback

import requests

from bs4 import BeautifulSoup

from urllib.parse import quote_plus

from datetime import datetime

from dotenv import load_dotenv

from sarvamai import SarvamAI

from backend.language_detection import detect_language, normalize_language

from rag.retrieve import retrieve, load_vector_store


# =========================================================
# LOAD ENVIRONMENT
# =========================================================

load_dotenv()

SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

if not SARVAM_API_KEY:
    raise RuntimeError("SARVAM_API_KEY is missing from .env")


# =========================================================
# SARVAM CLIENT
# =========================================================

client = SarvamAI(
    api_subscription_key=SARVAM_API_KEY
)


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="SIA – Smart Indian Assistant"
)


# =========================================================
# FRONTEND
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIR = BASE_DIR / "frontend"


app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)


@app.get("/greeting")
def greeting():

    audio_file = text_to_speech(
        text="Hello! I am SIA, your Smart Indian Assistant. How can I help you today?",
        language_code="en-IN",
        output_file="greeting.wav"
    )

    return FileResponse(
        audio_file,
        media_type="audio/wav",
        filename="greeting.wav"
    )


@app.get("/")
def serve_frontend():

    return FileResponse(
        FRONTEND_DIR / "index.html"
    )


@app.get("/scheme-details.html")
def serve_scheme_details():

    return FileResponse(
        FRONTEND_DIR / "scheme-details.html"
    )


@app.get("/chat.html")
def serve_chat():

    return FileResponse(
        FRONTEND_DIR / "chat.html"
    )


@app.get("/mail.html")
def serve_mail():

    return FileResponse(
        FRONTEND_DIR / "mail.html"
    )


# =========================================================
# REQUEST MODEL
# =========================================================

class QuestionRequest(BaseModel):

    question: str

    language: str = "English"


# =========================================================
# LOAD KNOWLEDGE BASE
# =========================================================

print("========================================")

print("Loading FAISS knowledge base...")

print("========================================")


try:

    vector_store, chunks = load_vector_store()

    print("FAISS knowledge base ready.")

    print("Total vectors:", vector_store.ntotal)

    print("Total chunks:", len(chunks))


except Exception as e:

    print("ERROR loading FAISS knowledge base:", e)

    vector_store = None

    chunks = []


def expand_query(question: str) -> str:

    """
    Adds context to short or acronym-based questions
    before sending them to the knowledge-base retriever.
    """

    original = question.strip()

    normalized = original.lower().strip(" ?.!")

    short_query_map = {

        "pacs": (
            "What is PACS? Explain the full form, meaning, role, "
            "functions, and importance of Primary Agricultural Credit Societies "
            "in the cooperative sector."
        ),

        "what is pacs": (
            "What is PACS? Explain the full form, meaning, role, "
            "functions, and importance of Primary Agricultural Credit Societies "
            "in the cooperative sector."
        ),

        "pacs full form": (
            "What is the full form of PACS and what does Primary Agricultural "
            "Credit Society mean?"
        ),

        "pacs meaning": (
            "Explain the meaning and functions of Primary Agricultural Credit Societies."
        )

    }

    if normalized in short_query_map:

        return short_query_map[normalized]

    # Add context to other very short questions

    if len(original.split()) <= 2:

        return (
            f"Explain {original} in the context of "
            "Indian cooperatives and government schemes."
        )

    return original


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {

        "status": "healthy",

        "knowledge_base_loaded":
            bool(chunks),

        "documents":
            len(chunks)

    }


# =========================================================
# CLEAN ANSWER
# =========================================================

def clean_answer(answer: str):

    if not answer:

        return ""

    answer = answer.strip()

    # Remove Markdown symbols

    answer = answer.replace(
        "**",
        ""
    )

    answer = answer.replace(
        "*",
        ""
    )

    # Remove heading symbols

    answer = re.sub(
        r"^#{1,6}\s*",
        "",
        answer,
        flags=re.MULTILINE
    )

    # Unwanted starting phrases

    unwanted_phrases = [

        "Based on the provided knowledge base context, here is the information available about",

        "Based on the provided knowledge base context, here is the information",

        "Based on the provided knowledge base context",

        "Based on the provided context, here is the information",

        "Based on the provided context",

        "Here is the information available about",

        "Here is the information about",

        "Here is the information",

        "The information available is",

        "According to the provided context",

        "According to the knowledge base"

    ]

    # Remove unwanted phrase if present

    changed = True

    while changed:

        changed = False

        for phrase in unwanted_phrases:

            if answer.lower().startswith(
                phrase.lower()
            ):

                answer = answer[
                    len(phrase):
                ].strip()

                changed = True

    return answer


# =========================================================
# TRANSLATE QUERY TO ENGLISH
# =========================================================

def translate_query_to_english(
    question: str
):

    try:

        print(
            "Translating query to English..."
        )

        response = client.chat.completions(

            model="sarvam-105b",

            messages=[

                {
                    "role": "system",

                    "content": """
Translate the user's question into clear English.

The translation will be used ONLY for searching
a government knowledge base.

Return ONLY the English translation.

Do not answer the question.

Do not explain anything.
"""
                },

                {
                    "role": "user",

                    "content": question
                }

            ],

            temperature=0,

            max_tokens=100,

            reasoning_effort=None
        )

        translated = (
            response
            .choices[0]
            .message
            .content
            .strip()
        )

        print(
            "English query:",
            translated
        )

        return translated


    except Exception as e:

        print(
            "Translation error:",
            e
        )

        # Use original question if
        # translation fails

        return question


# =========================================================
# LOCALIZED FALLBACK MESSAGES
# =========================================================

UNAVAILABLE_MESSAGES = {

    "en": "The information is not available in the knowledge base.",

    "hi": "यह जानकारी नॉलेज बेस में उपलब्ध नहीं है।",

    "pa": "ਇਹ ਜਾਣਕਾਰੀ ਨੌਲਿਜ ਬੇਸ ਵਿੱਚ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",

    "bn": "এই তথ্যটি নলেজ বেসে উপলব্ধ নেই।",

    "ta": "இந்தத் தகவல் அறிவுத் தளத்தில் கிடைக்கவில்லை.",

    "mr": "ही माहिती नॉलेज बेसमध्ये उपलब्ध नाही.",

    "gu": "આ માહિતી નોલેજ બેઝમાં ઉપલબ્ધ નથી.",

    "te": "ఈ సమాచారం నాలెడ్జ్ బేస్‌లో అందుబాటులో లేదు.",

    "kn": "ಈ ಮಾಹಿತಿ ನಲೇಜ್ ಬೇಸ್‌ನಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ.",

    "ml": "ഈ വിവരം നോളജ് ബേസിൽ ലഭ്യമല്ല.",

    "or": "ଏହି ସୂଚନା ନଲେଜ୍ ବେସରେ ଉପଲବ୍ଧ ନାହିଁ।",

    "as": "এই তথ্যটো নলেজ বেছত উপলব্ধ নহয়।",

}


def unavailable_message(language_code: str) -> str:

    return UNAVAILABLE_MESSAGES.get(
        language_code,
        UNAVAILABLE_MESSAGES["en"]
    )


# =========================================================
# ASK ENDPOINT
# =========================================================

@app.post("/ask")

def ask_question(

    request: QuestionRequest

):

    # =====================================================
    # RESPONSE LANGUAGE
    #
    # IMPORTANT:
    # The language selected in the SIA UI is authoritative.
    #
    # We DO NOT allow langdetect to override the user's
    # selected language.
    # =====================================================

    detected = detect_language(
        request.question,
        request.language
    )

    language_code = detected["code"]

    language_name = detected["language"]


    print()

    print("========================================")

    print(
        "USER QUESTION:",
        request.question
    )

    print(
        "SELECTED LANGUAGE:",
        language_name,
        f"({language_code})"
    )

    print("========================================")


    # =====================================================
    # KNOWLEDGE BASE CHECK
    # =====================================================

    if vector_store is None:

        return {

            "question":
                request.question,

            "language":
                language_name,

            "answer":
                unavailable_message(language_code),

            "sources": []

        }


    # =====================================================
    # CREATE SEARCH QUERY
    # =====================================================

    search_query = expand_query(
        request.question
    )


    # For non-English selected languages,
    # translate ONLY the search query to English.
    #
    # This does NOT change the language of the final answer.

    if language_code != "en":

        search_query = (
            translate_query_to_english(
                request.question
            )
        )


    # =====================================================
    # SEARCH TRANSLATED QUERY
    # =====================================================

    print(
        "Searching translated query..."
    )


    translated_results = retrieve(

        search_query,

        vector_store,

        chunks,

        top_k=5

    )


    print(
        "Translated query results:",
        len(translated_results)
    )


    # =====================================================
    # SEARCH ORIGINAL QUERY
    # =====================================================

    print(
        "Searching original query..."
    )


    original_results = retrieve(

        request.question,

        vector_store,

        chunks,

        top_k=5

    )


    print(
        "Original query results:",
        len(original_results)
    )


    # =====================================================
    # COMBINE RESULTS
    # =====================================================

    results = []

    seen = set()


    # First add translated results

    for result in translated_results:

        text = result.get(
            "text",
            ""
        )

        if text and text not in seen:

            results.append(
                result
            )

            seen.add(
                text
            )


    # Then add original results

    for result in original_results:

        text = result.get(
            "text",
            ""
        )

        if text and text not in seen:

            results.append(
                result
            )

            seen.add(
                text
            )


    # Keep maximum 5 chunks

    results = results[:5]


    print(
        "Final RAG results:",
        len(results)
    )


    # =====================================================
    # NO RESULTS
    # =====================================================

    if not results:

        return {

            "question":
                request.question,

            "language":
                language_name,

            "answer":
                unavailable_message(language_code),

            "sources": []

        }


    # =====================================================
    # BUILD CONTEXT
    # =====================================================

    context_parts = []


    for result in results:

        text = result.get(
            "text",
            ""
        )

        if text:

            context_parts.append(
                text
            )


    context = "\n\n".join(
        context_parts
    )
        # =====================================================
    # LLM PROMPT
    # =====================================================

    prompt = f"""

You are SIA (Smart Indian Assistant), a helpful
government information assistant.

ABSOLUTE RESPONSE LANGUAGE RULE:

The user selected {language_name}
(language code: {language_code}) in the SIA interface.

You MUST write the final answer ONLY in {language_name}.

Do NOT answer in English unless {language_name} is English.

The selected UI language has priority over:

1. The language of the user's question.
2. Automatic language detection.
3. The language used in the knowledge context.
4. The language used during RAG retrieval.

Use the native script of {language_name}.


You answer questions about:

- Cooperative societies
- PACS
- Government schemes
- Agriculture
- Rural development
- Cooperative laws
- Government services


IMPORTANT RULES:

1. Answer ONLY using the knowledge context below.

2. Do not invent facts.

3. Do not invent laws.

4. Do not invent schemes.

5. Do not invent dates.

6. Do not invent statistics.

7. Do not make assumptions that are not supported
by the context.

8. If the context does not contain enough information
to answer the user's question, respond in {language_name}
using the correct native script.


Fallback messages:

English:
The information is not available in the knowledge base.

Hindi:
यह जानकारी नॉलेज बेस में उपलब्ध नहीं है।

Punjabi:
ਇਹ ਜਾਣਕਾਰੀ ਨੌਲਿਜ ਬੇਸ ਵਿੱਚ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।

Bengali:
এই তথ্যটি নলেজ বেসে উপলব্ধ নেই।

Marathi:
ही माहिती नॉलेज बेसमध्ये उपलब्ध नाही.

Tamil:
இந்தத் தகவல் அறிவுத் தளத்தில் கிடைக்கவில்லை.


8.5. ALWAYS use the native script of {language_name}.

Native script rules:

- English → English / Latin script
- Hindi → Devanagari script
- Punjabi → Gurmukhi script
- Bengali → Bengali script
- Marathi → Devanagari script
- Tamil → Tamil script
- Telugu → Telugu script
- Gujarati → Gujarati script
- Kannada → Kannada script
- Malayalam → Malayalam script
- Odia → Odia script
- Assamese → Assamese script


Even if the user types in English or Roman letters,
answer using the selected language's native script.

Example:

User selects Bengali.

User asks:
"What is PACS?"

Correct:
Answer in Bengali script.

User selects Punjabi.

User asks:
"What is PACS?"

Correct:
Answer in Gurmukhi script.

For Punjabi:

NEVER use Roman Punjabi.

NEVER answer in English.

Use Gurmukhi script only.


9. Respond ONLY in {language_name}.

10. Start DIRECTLY with the answer.

11. NEVER start with:

"Based on the provided knowledge base context"

"Based on the provided context"

"Here is the information"

"The information available is"

"According to the knowledge base"


12. Do not mention the knowledge base when you
can directly answer the question.

13. Do not repeat the user's question.

14. Do not use unnecessary Markdown.

15. Do not use:

*
**
#
##
###
|
tables


16. Keep the answer clear, natural and concise.

17. Make the answer easy to understand for rural users.


KNOWLEDGE CONTEXT:

{context}


USER QUESTION:

{request.question}


Provide ONLY the final answer.


FORMAT RULES:

- When the answer contains multiple points,
  write one short introductory sentence on its own line.

- The introductory sentence must NOT be numbered.

- Start numbering only the actual points.

- Use:
  1. ...
  2. ...
  3. ...

- Put each point on a separate line.

- Do not combine multiple services or facts
  into one paragraph.

- Keep the answer simple and easy to understand.

"""


    # =====================================================
    # SARVAM LLM
    # =====================================================

    try:

        print(
            "Generating answer with Sarvam..."
        )


        response = client.chat.completions(

            model="sarvam-105b",

            messages=[

                {

                    "role": "system",

                    "content": (
                        f"""
You are SIA, a precise government information assistant.

The user selected:
{language_name}

Language code:
{language_code}

ABSOLUTE RULE:

The final answer MUST be written ONLY in
{language_name}.

The selected UI language is authoritative.

Ignore the language of the user's question
when deciding the output language.

Use the native script of {language_name}.

Do not switch to English unless the selected
language is English.
"""
                    )

                },

                {

                    "role": "user",

                    "content": prompt

                }

            ],

            temperature=0,

            max_tokens=400,

            reasoning_effort=None

        )


        answer = (

            response
            .choices[0]
            .message
            .content

        )


        # =================================================
        # CLEAN ANSWER
        # =================================================

        answer = clean_answer(
            answer
        )


        print(
            "FINAL ANSWER:",
            answer
        )


    except Exception as e:

        print(
            "Sarvam LLM error:",
            e
        )


        return {

            "question":
                request.question,

            "language":
                language_name,

            "answer":
                unavailable_message(
                    language_code
                ),

            "sources": []

        }


    # =====================================================
    # SOURCES
    # =====================================================

    sources = []

    seen = set()


    for result in results:

        source = result.get(
            "source",
            "Unknown"
        )

        page = result.get(
            "page"
        )

        key = source


        if key not in seen:

            seen.add(
                key
            )

            sources.append({

                "source":
                    source,

                "page":
                    page

            })


    # =====================================================
    # FINAL RESPONSE
    # =====================================================

    return {

        "question":
            request.question,

        "language":
            language_name,

        "answer":
            answer,

        "sources":
            sources

    }


# =========================================================
# NOTIFICATION / UNREAD MESSAGE ENDPOINT
# =========================================================

@app.get("/api/messages")

def get_messages():

    return {

        "unreadCount":
            0,

        "messages":
            []

    }


# =========================================================
# SPEECH FORMATTER
# =========================================================

def format_for_speech(text: str) -> str:

    """
    Creates a natural speech version without changing
    the text displayed on the screen.
    """

    # Convert numbered points into natural spoken words

    ordinal_words = {

        "1": "First",

        "2": "Second",

        "3": "Third",

        "4": "Fourth",

        "5": "Fifth",

        "6": "Sixth",

        "7": "Seventh",

        "8": "Eighth",

        "9": "Ninth",

        "10": "Tenth",

    }


    def replace_number(match):

        number = match.group(1)

        spoken_number = ordinal_words.get(
            number,
            f"Point {number}"
        )

        return f"\n{spoken_number}, "


    # Convert formats such as:
    # 1. Text
    # 2) Text

    text = re.sub(
        r"(?:^|\n)\s*(\d{1,2})[.)]\s*",
        replace_number,
        text
    )


    # Remove bullet symbols

    text = re.sub(
        r"(?:^|\n)\s*[-•*]\s*",
        "\n",
        text
    )


    # Remove Markdown headings

    text = re.sub(
        r"#+\s*",
        "",
        text
    )


    # Remove excessive blank lines

    text = re.sub(
        r"\n{2,}",
        "\n\n",
        text
    )


    return text.strip()


# =========================================================
# VOICE ENDPOINT
# =========================================================

@app.post("/voice")

async def voice_endpoint(

    audio: UploadFile = File(...),

    language: str = "en"

):

    try:

        # Save uploaded audio

        temp_audio = BASE_DIR / "temp_input.wav"


        audio_data = await audio.read()


        with open(
            temp_audio,
            "wb"
        ) as f:

            f.write(
                audio_data
            )


        # =================================================
        # SPEECH TO TEXT
        # =================================================

        with open(
            temp_audio,
            "rb"
        ) as audio_file:

            stt_response = (
                client
                .speech_to_text
                .transcribe(
                    file=audio_file,
                    model="saaras:v4"
                )
            )


        transcript = stt_response.transcript


        if not transcript:

            raise HTTPException(

                status_code=400,

                detail="Could not understand audio."

            )


        # =================================================
        # EXISTING RAG LOGIC
        # =================================================

        result = ask_question(

            QuestionRequest(

                question=transcript,

                language=language

            )

        )


        answer = result["answer"]


        # =================================================
        # FIRST CONVERSATION GREETING
        # =================================================

        if not hasattr(
            app.state,
            "first_conversation_done"
        ):

            answer = (

                "Hello! I am SIA, your Smart Indian Assistant. "

                + answer

            )

            app.state.first_conversation_done = True


        # =================================================
        # CREATE SPEECH VERSION
        # =================================================

        speech_answer = format_for_speech(
            answer
        )


        audio_file = text_to_speech(

            text=speech_answer,

            output_file="response.wav"

        )


        with open(
            "response.wav",
            "rb"
        ) as f:

            audio_bytes = f.read()


        audio_base64 = base64.b64encode(
            audio_bytes
        ).decode(
            "utf-8"
        )


        return {

            "answer":
                answer,

            "audio":
                audio_base64

        }


    except Exception as e:

        print(
            "\n========== VOICE ENDPOINT ERROR =========="
        )

        traceback.print_exc()

        print(
            "==========================================\n"
        )


        raise HTTPException(

            status_code=500,

            detail=(
                f"Voice processing failed: {str(e)}"
            )

        )


# =========================================================
# INTERNET STATUS
# =========================================================

@app.get("/api/internet-status")

def internet_status():

    try:

        response = requests.get(

            "https://www.google.com/generate_204",

            timeout=3

        )


        return {

            "online":
                response.status_code == 204

        }


    except requests.RequestException:

        return {

            "online":
                False

        }
        