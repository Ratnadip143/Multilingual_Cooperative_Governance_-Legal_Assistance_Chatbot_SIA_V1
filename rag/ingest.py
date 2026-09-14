from pathlib import Path
import re

import fitz  # PyMuPDF


DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def clean_text(text):
    """Clean extracted text while preserving meaningful content."""

    text = text.replace("\x00", " ")

    # Normalize spaces and tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    return text.strip()


def extract_pdf(file_path):
    """Extract text from every page of a PDF."""
    documents = []
    pdf = fitz.open(file_path)
    for page_number, page in enumerate(pdf, start=1):
        text = page.get_text("text")
        text = clean_text(text)

        # Skip pages containing only page numbers / Roman numerals
        if not text or re.fullmatch(r"(?:[ivxlcdm]+|\d+)", text.lower()):
            continue

        documents.append(
            {
                "source": str(file_path.relative_to(DATA_DIR)),
                "document": file_path.stem,
                "page": page_number,
                "text": text,
            }
        )
    pdf.close()
    return documents
def load_documents():
    """Load PDF, TXT and Markdown documents."""

    documents = []

    for file_path in DATA_DIR.rglob("*"):

        if not file_path.is_file():
            continue

        suffix = file_path.suffix.lower()

        # PDF files
        if suffix == ".pdf":

            try:
                documents.extend(extract_pdf(file_path))
            except Exception as e:
                print(f"Could not process {file_path}: {e}")

        # TXT and Markdown files
        elif suffix in {".txt", ".md"}:

            try:
                text = file_path.read_text(encoding="utf-8")
                text = clean_text(text)

                if text:
                    documents.append(
                        {
                            "source": str(file_path.relative_to(DATA_DIR)),
                            "document": file_path.stem,
                            "page": None,
                            "text": text,
                        }
                    )

            except UnicodeDecodeError:
                print(f"Could not decode {file_path}")

    return documents


def chunk_text(text, chunk_size=500, overlap=50):
    """Split text into overlapping word-based chunks."""

    words = text.split()

    chunks = []

    start = 0

    while start < len(words):

        end = min(start + chunk_size, len(words))

        chunk = " ".join(words[start:end])

        if chunk.strip():
            chunks.append(chunk)

        if end == len(words):
            break

        start = end - overlap

    return chunks


def load_and_chunk_documents():
    """Load documents and divide them into searchable chunks."""

    documents = load_documents()

    chunks = []

    for document in documents:

        text_chunks = chunk_text(document["text"])

        for i, chunk in enumerate(text_chunks):

            chunks.append(
                {
                    "source": document["source"],
                    "document": document["document"],
                    "page": document["page"],
                    "chunk_id": i,
                    "text": chunk,
                }
            )

    return chunks


if __name__ == "__main__":

    documents = load_documents()

    print(f"Documents/pages loaded: {len(documents)}")

    chunks = load_and_chunk_documents()

    print(f"Total chunks created: {len(chunks)}")

    if chunks:
        print("\nFirst chunk:")
        print(chunks[0])