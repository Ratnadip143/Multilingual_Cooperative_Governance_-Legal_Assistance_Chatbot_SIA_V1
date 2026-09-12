import json
from pathlib import Path

import faiss
import numpy as np

from .embeddings import create_embedding


BASE_DIR = Path(__file__).resolve().parent.parent
VECTORSTORE_DIR = BASE_DIR / "vectorstore"

INDEX_PATH = VECTORSTORE_DIR / "index.faiss"
METADATA_PATH = VECTORSTORE_DIR / "metadata.json"


def load_vector_store():
    """Load the saved FAISS index and document metadata."""

    if not INDEX_PATH.exists():
        raise FileNotFoundError(
            f"FAISS index not found: {INDEX_PATH}"
        )

    if not METADATA_PATH.exists():
        raise FileNotFoundError(
            f"Metadata not found: {METADATA_PATH}"
        )

    vector_store = faiss.read_index(str(INDEX_PATH))

    with open(METADATA_PATH, "r", encoding="utf-8") as file:
        documents = json.load(file)

    return vector_store, documents


def retrieve(query, vector_store, documents, top_k=3):
    """Retrieve the most relevant document chunks."""

    if vector_store is None or not documents:
        return []

    # --------------------------------------------------
    # 1. Normalize the query
    # --------------------------------------------------

    clean_query = " ".join(str(query).strip().split())

    clean_query = (
        clean_query
        .replace("?", "")
        .replace("!", "")
        .replace(",", "")
        .replace(".", "")
        .strip()
    )

    query_lower = clean_query.lower()

    # --------------------------------------------------
    # 2. Improve short PACS queries
    # --------------------------------------------------

    if query_lower == "pacs":

        clean_query = (
            "PACS Primary Agricultural Credit Society "
            "cooperative society"
        )

    elif "pacs" in query_lower:

        clean_query = (
            clean_query
            + " Primary Agricultural Credit Society "
            "cooperative society"
        )

    # --------------------------------------------------
    # 3. Improve eligibility queries
    # --------------------------------------------------

    eligibility_words = [
    "eligibility",
    "eligible",
    "eligibility criteria",
    "qualify",
    "qualified",
    "qualification",
    "who can apply",
    "who is eligible",
    "who is able to apply",
    "who can enroll",
    "who is allowed to apply",
    "can i apply",
    "can i enroll",
    "am i eligible",
    "am i allowed",
    "requirements to apply",
    "requirements for applying"
]

    if any(word in query_lower for word in eligibility_words):

        clean_query += (
            " eligibility eligible requirements "
            "who can apply qualification documents application"
        )

    # --------------------------------------------------
    # 4. Create query embedding
    # --------------------------------------------------

    query_embedding = create_embedding(clean_query)

    query_embedding = np.asarray(
        [query_embedding],
        dtype="float32"
    )

    # --------------------------------------------------
    # 5. Search FAISS
    # --------------------------------------------------

    distances, indices = vector_store.search(
        query_embedding,
        top_k
    )

    # --------------------------------------------------
    # 6. Build results
    # --------------------------------------------------

    results = []

    for distance, index in zip(
        distances[0],
        indices[0]
    ):

        if 0 <= index < len(documents):

            result = documents[index].copy()

            result["similarity"] = float(distance)

            results.append(result)

    return results


def test_retrieval():
    """Test FAISS retrieval with a sample cooperative question."""

    print("\nLoading FAISS index...")

    vector_store, documents = load_vector_store()

    print(
        f"FAISS vectors loaded: "
        f"{vector_store.ntotal}"
    )

    print(
        f"Metadata entries loaded: "
        f"{len(documents)}"
    )

    query = (
        "What is a Primary Agricultural "
        "Credit Society (PACS)?"
    )

    print(f"\nQuery: {query}")
    print("\nSearching...\n")

    results = retrieve(
        query,
        vector_store,
        documents,
        top_k=3
    )

    if not results:

        print("No results found.")

        return

    for i, result in enumerate(
        results,
        start=1
    ):

        print("=" * 70)

        print(f"RESULT {i}")

        print("=" * 70)

        print(
            f"Similarity: "
            f"{result.get('similarity', 0):.4f}"
        )

        print(
            f"Document: "
            f"{result.get('document', 'Unknown')}"
        )

        print(
            f"Source: "
            f"{result.get('source', 'Unknown')}"
        )

        print(
            f"Page: "
            f"{result.get('page', 'N/A')}"
        )

        print("\nText:")

        print(
            result.get("text", "")[:1000]
        )

        print()


if __name__ == "__main__":

    test_retrieval()