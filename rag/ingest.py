from pathlib import Path


DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def load_documents():
    documents = []

    for file_path in DATA_DIR.rglob("*"):
        if file_path.suffix.lower() not in [".txt", ".md"]:
            continue

        try:
            text = file_path.read_text(encoding="utf-8").strip()

            if not text:
                continue

            documents.append({
                "source": str(file_path.relative_to(DATA_DIR)),
                "text": text
            })

        except UnicodeDecodeError:
            print(f"Skipping unreadable file: {file_path}")

    return documents


def chunk_text(text, chunk_size=500, overlap=50):
    words = text.split()

    chunks = []

    start = 0

    while start < len(words):
        end = start + chunk_size

        chunk = " ".join(words[start:end])

        if chunk.strip():
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def load_and_chunk_documents():
    documents = load_documents()

    chunks = []

    for document in documents:
        text_chunks = chunk_text(document["text"])

        for i, chunk in enumerate(text_chunks):
            chunks.append({
                "source": document["source"],
                "chunk_id": i,
                "text": chunk
            })

    return chunks