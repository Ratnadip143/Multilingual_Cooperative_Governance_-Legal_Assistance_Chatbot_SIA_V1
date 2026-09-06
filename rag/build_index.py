from pathlib import Path
import json

from .ingest import load_and_chunk_documents
from .embeddings import create_embeddings
from .vectorstore import create_vector_store


BASE_DIR = Path(__file__).resolve().parent.parent
VECTORSTORE_DIR = BASE_DIR / "vectorstore"

VECTORSTORE_DIR.mkdir(exist_ok=True)


def main():
    print("Loading and chunking documents...")
    chunks = load_and_chunk_documents()

    print(f"Total chunks: {len(chunks)}")

    if not chunks:
        print("No chunks found. Check your documents.")
        return

    print("\nGenerating embeddings...")
    texts = [chunk["text"] for chunk in chunks]

    embeddings = create_embeddings(texts)

    print(f"Embedding shape: {embeddings.shape}")

    print("\nBuilding FAISS index...")
    index = create_vector_store(embeddings)

    if index is None:
        print("Failed to create FAISS index.")
        return

    index_path = VECTORSTORE_DIR / "index.faiss"
    metadata_path = VECTORSTORE_DIR / "metadata.json"

    import faiss
    faiss.write_index(index, str(index_path))

    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)

    print("\nSUCCESS!")
    print(f"FAISS index saved to: {index_path}")
    print(f"Metadata saved to: {metadata_path}")
    print(f"Vectors stored: {index.ntotal}")


if __name__ == "__main__":
    main()