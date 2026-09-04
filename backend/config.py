import os

APP_NAME = "SIA - Smart Indian Assistant"

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

LLM_API_KEY = os.getenv("LLM_API_KEY", "")
