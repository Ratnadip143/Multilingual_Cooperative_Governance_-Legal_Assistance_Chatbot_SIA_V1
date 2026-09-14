import json
from pathlib import Path

import faiss
import numpy as np

from .embeddings import create_embedding


SHORT_QUERY_MAP = {

    "HOW CAN I CLAIM FOR CROP INSURANCE": "How do I report crop loss and claim crop insurance under PMFBY? Crop Insurance App KRPH 14447 loss intimation claim assessment",
    "पीक विम्यसाठी मी कसा अर्ज करू?": "How can I apply for crop insurance under PMFBY? Farmer enrolment application NCIP Aadhaar mobile CSC bank",
    "WHERE CAN I CHECK THE LIST OF ACTIVE SCHEME": "Official PACS Related Schemes Ministry of Cooperation Government of India list of schemes",
    "WHAT IS THE PREMIUM RATE OF KHARIF CROP": "What is the farmer premium rate for Kharif crops under PMFBY? Kharif crop insurance premium 2% of Sum Insured",
        # PACS definition
    "पैक्स क्या है?": "What is PACS?",
    "पैक्‍स क्या है?": "What is PACS?",
    "ਪੈਕਸ ਕੀ ਹੈ": "What is PACS?",
    "ਪੈਕਸ ਕੀ ਹੈ?": "What is PACS?",
    "প্যাক্স কী?": "What is PACS?",
        # PACS membership
    "मै  पैक्स का सदस्य कैसे बन सकता हु": "How can I become a member of PACS?",
    "मैं पेक्स का मेम्बर कैसे बन सकता हआ": "How can I become a member of PACS?",
    "ਮੈਂ ਪੈਕਸ ਦਾ ਮੇਮ੍ਬਰ ਕਿਵੇਂ ਬਣ ਸਕਦਾ ਹਆ": "How can I become a member of PACS?",    
    "কীভাবে আমি প্যাক্স (PACS)-এর সদস্য হতে পারি?": "How can I become a member of PACS?",
    "நான் எப்படி PACS இல் உறுப்பினராகலாம்?": "How can I become a member of PACS?",
    "मी पॅक्स (PACS) चा सदस्य कसा होऊ शकतो?": "How can I become a member of PACS?",

    # PACS membership documents
    "पैक्स में जुड़ने के लिए किस प्रकार के दस्तावेजों की जरुरत पड़ती है": "What documents are needed to become a member of PACS?",
    "ਪੈਕਸ ਵਿਚ ਸ਼ਾਮਿਲ ਹੋਣ ਲਈ ਕਹਿੰਦੇ ਦਸਤਾਵੇਜ਼ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ": "What documents are needed to become a member of PACS?",
    "প্যাক্স (PACS)-এর সদস্য হতে কী কী নথিপত্র প্রয়োজন?": "What documents are needed to become a member of PACS?",
    "PACS இல் உறுப்பினராக என்னென்ன ஆவணங்கள் தேவை?": "What documents are needed to become a member of PACS?",
    "पॅक्स (PACS) चा सदस्य होण्यासाठी कोणती कागदपत्रे आवश्यक आहेत?": "What documents are needed to become a member of PACS?",

    # PACS membership eligibility
    "पैक्स में जुड़ने के लिए हमारे पास क्या होना चाहिए": "What is eligibility to join PACS?",
    "ਪੈਕਸ ਵਿਚ ਜੁੜਨ ਲਈ ਕਿ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ": "What is eligibility to join PACS?",
    "প্যাক্স (PACS)-এ যুক্ত হওয়ার জন্য আমাদের কী কী থাকতে হবে?": "What is eligibility to join PACS?",
    "PACS இல் சேருவதற்கு நம்மிடம் என்ன இருக்க வேண்டும்": "What is eligibility to join PACS?",
    "पॅक्स (PACS) मध्ये सामील होण्यासाठी आपल्याकडे काय असणे आवश्यक आहे?": "What is eligibility to join PACS?",

    # PACS loan eligibility
    "पैक्स ऋण के लिए कौन पात्र है": "Who qualifies for a PACS loan?",
    "ਪੈਕਸ ਕਰਜੇ ਲਈ ਕੌਣ ਯੋਗ ਹੈ": "Who qualifies for a PACS loan?",
    "প্যাক্স (PACS) ঋণের জন্য কারা যোগ্য?": "Who qualifies for a PACS loan?",
    "PACS கடனுக்கு யார் தகுதியானவர்?": "Who qualifies for a PACS loan?",
    "पॅक्स (PACS) कर्जासाठी कोण पात्र आहे?": "Who qualifies for a PACS loan?",
    # PACS tenant farmer
    "CAN A TENANT FARMER JOIN PACS": "Can a tenant farmer join PACS?",

    # Cooperative bank
    "সমবায় ব্যাংক কি?": "What is a cooperative bank?",

    # Loan basics
    "लोन (ऋण) क्या है और यह कैसे काम करता है?": "What is a loan and how does it work?",
}


BASE_DIR = Path(__file__).resolve().parent.parent
VECTORSTORE_DIR = BASE_DIR / "vectorstore"

INDEX_PATH = VECTORSTORE_DIR / "index.faiss"
METADATA_PATH = VECTORSTORE_DIR / "metadata.json"


def load_vector_store():
    """Load the saved FAISS index and document metadata."""

    if not INDEX_PATH.exists():
        raise FileNotFoundError(f"FAISS index not found: {INDEX_PATH}")

    if not METADATA_PATH.exists():
        raise FileNotFoundError(f"Metadata not found: {METADATA_PATH}")

    vector_store = faiss.read_index(str(INDEX_PATH))

    with open(METADATA_PATH, "r", encoding="utf-8") as file:
        documents = json.load(file)

    return vector_store, documents


def retrieve(query, vector_store, documents, top_k=3):
    """Retrieve the most relevant document chunks."""

    if vector_store is None or not documents:
        return []

    normalized_query = query.strip().replace(" ?", "?")
    query_for_retrieval = SHORT_QUERY_MAP.get(normalized_query, normalized_query)
    query_embedding = create_embedding(query_for_retrieval)
    query_embedding = np.asarray(
        [query_embedding],
        dtype="float32"
    )

    distances, indices = vector_store.search(
        query_embedding,
        top_k
    )

    results = []

    for distance, index in zip(distances[0], indices[0]):

        if 0 <= index < len(documents):

            result = documents[index].copy()

            result["similarity"] = float(distance)

            results.append(result)

    return results


def test_retrieval():
    """Test FAISS retrieval with a sample cooperative question."""

    print("\nLoading FAISS index...")

    vector_store, documents = load_vector_store()

    print(f"FAISS vectors loaded: {vector_store.ntotal}")
    print(f"Metadata entries loaded: {len(documents)}")

    query = input("\nEnter your question: ")
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

    for i, result in enumerate(results, start=1):

        print("=" * 70)
        print(f"RESULT {i}")
        print("=" * 70)

        print(f"Similarity: {result.get('similarity', 0):.4f}")
        print(f"Document: {result.get('document', 'Unknown')}")
        print(f"Source: {result.get('source', 'Unknown')}")
        print(f"Page: {result.get('page', 'N/A')}")
        print("\nText:")
        print(result.get("text", "")[:1000])
        print()


if __name__ == "__main__":
    test_retrieval()
