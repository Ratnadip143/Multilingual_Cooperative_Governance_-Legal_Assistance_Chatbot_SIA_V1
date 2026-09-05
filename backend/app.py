from fastapi import FastAPI
from pydantic import BaseModel

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

from rag.ingest import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vectorstore import create_vector_store
from rag.retrieve import retrieve

app = FastAPI(title="SIA - Smart Indian Assistant")


class QuestionRequest(BaseModel):
    question: str
    language: str = "English"


# Load knowledge base when the server starts
chunks = load_and_chunk_documents()

if chunks:
    embeddings = create_embeddings([chunk["text"] for chunk in chunks])
    vector_store = create_vector_store(embeddings)
else:
    vector_store = None


@app.get("/")
def root():
    return {
        "message": "SIA Backend is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "knowledge_base_loaded": bool(chunks),
        "documents": len(chunks)
    }


@app.post("/ask")
def ask_question(request: QuestionRequest):
    if vector_store is None:
        return {
            "question": request.question,
            "language": request.language,
            "answer": "Knowledge base is not available.",
            "sources": []
        }

    results = retrieve(
        request.question,
        vector_store,
        chunks,
        top_k=3
    )

    if not results:
        return {
            "question": request.question,
            "language": request.language,
            "answer": "I could not find relevant information in the knowledge base.",
            "sources": []
        }

    context = "\n\n".join(
        result["text"] for result in results
    )

    prompt = f"""
You are SIA (Smart Indian Assistant), a helpful government information assistant.

Answer the user's question using ONLY the provided knowledge base context.

If the context does not contain enough information to answer the question,
say that the information is not available in the knowledge base.

Do not invent laws, schemes, rules, dates, or facts.

Respond in {request.language}.

Knowledge Base Context:
{context}

User Question:
{request.question}
"""

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    answer = response.output_text

    sources = list({
        result["source"]
        for result in results
    })

    return {
        "question": request.question,
        "language": request.language,
        "answer": answer,
        "sources": sources
    }