import faiss
import numpy as np


def create_vector_store(embeddings):
    embeddings = np.asarray(embeddings, dtype="float32")

    if len(embeddings) == 0:
        return None

    dimension = embeddings.shape[1]

    # Normalized embeddings + inner product = cosine similarity
    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings)

    return index