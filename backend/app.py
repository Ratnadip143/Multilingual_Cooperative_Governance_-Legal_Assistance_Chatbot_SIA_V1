from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="SIA - Smart Indian Assistant")


class QuestionRequest(BaseModel):
    question: str
    language: str = "English"


@app.get("/")
def root():
    return {
        "message": "SIA Backend is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/ask")
def ask_question(request: QuestionRequest):
    return {
        "question": request.question,
        "language": request.language,
        "answer": "SIA received your question. RAG response generation will be connected next."
    }
