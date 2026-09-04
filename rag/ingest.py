from pathlib import Path

DATA_DIR = Path("../data")


def load_documents():
    documents = []

    for file_path in DATA_DIR.rglob("*"):
        if file_path.is_file():
            documents.append(str(file_path))

    return documents


if __name__ == "__main__":
    docs = load_documents()
    print(f"Found {len(docs)} files.")
