from fastapi import FastAPI
from pydantic import BaseModel

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
        "knowledge_base_chunks": len(chunks)
    }


@app.post("/ask")
def ask_question(request: QuestionRequest):

    results = retrieve(
        request.question,
        vector_store,
        chunks,
        top_k=3
    )

    return {
        "question": request.question,
        "language": request.language,
        "retrieved_results": results
    }