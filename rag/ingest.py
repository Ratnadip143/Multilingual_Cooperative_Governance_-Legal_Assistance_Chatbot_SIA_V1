from pathlib import Path

DATA_DIR = Path("../data")


def load_documents():
    documents = []

    for file_path in DATA_DIR.rglob("*"):
        if file_path.is_file() and file_path.suffix.lower() in [".txt", ".md"]:
            try:
                text = file_path.read_text(encoding="utf-8")

                if text.strip():
                    documents.append({
                        "source": str(file_path),
                        "text": text
                    })

            except UnicodeDecodeError:
                continue

    return documents


if __name__ == "__main__":
    docs = load_documents()
    print(f"Loaded {len(docs)} documents.")
