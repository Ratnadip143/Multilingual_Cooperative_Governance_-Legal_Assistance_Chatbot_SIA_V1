from sentence_transformers import SentenceTransformer

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

model = SentenceTransformer(MODEL_NAME)


def create_embedding(text):
    return model.encode(text)


def create_embeddings(texts):
    return model.encode(texts)
