import numpy as np

from embeddings import create_embedding


def retrieve(query, vector_store, documents, top_k=3):
    query_embedding = create_embedding(query)
    query_embedding = np.asarray([query_embedding]).astype("float32")

    distances, indices = vector_store.search(query_embedding, top_k)

    results = []

    for index in indices[0]:
        if index < len(documents):
            results.append(documents[index])

    return results
