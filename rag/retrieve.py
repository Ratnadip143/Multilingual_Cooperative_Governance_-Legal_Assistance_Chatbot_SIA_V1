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


def retrieve(query, vector_store, documents, top_k=20):
    """Retrieve the most relevant document chunks."""

    if vector_store is None or not documents:
        return []

    # ==================================================
    # 1. NORMALIZE QUERY
    # ==================================================

    clean_query = " ".join(
        str(query).strip().split()
    )

    clean_query = (
        clean_query
        .replace("?", "")
        .replace("!", "")
        .replace(",", "")
        .replace(".", "")
        .replace(":", "")
        .replace(";", "")
        .strip()
    )

    query_lower = clean_query.lower()
    # ==================================================
    # 2. MULTILINGUAL PACS QUERY NORMALIZATION
    # ==================================================

    PACS_QUERY_MAP = {
        # Hindi
        "पैक्स क्या है": "What is PACS Primary Agricultural Credit Society cooperative society",
        "पैक्स क्या सेवाएं प्रदान करता है": "What services does PACS Primary Agricultural Credit Society provide loans credit storage marketing CSC farmer services",
        "मै पैक्स का सदस्य कैसे बन सकता हु": "How can I become a member of PACS Primary Agricultural Credit Society membership admission eligibility requirements",
        "पैक्स में जुड़ने के लिए किस प्रकार के दस्तावेजों की जरुरत पड़ती है": "What documents are required to become a member of PACS Primary Agricultural Credit Society membership documents KYC identity residence land holding",
        "पैक्स में जुड़ने के लिए हमारे पास क्या होना चाहिए": "What are the requirements to join PACS Primary Agricultural Credit Society membership documents KYC eligibility",
        "पैक्स ऋण के लिए कौन पात्र है": "Who is eligible for PACS loans Primary Agricultural Credit Society agricultural rural borrowers members loan eligibility",

        # Punjabi
        "ਪੈਕਸ ਕੀ ਹੈ": "What is PACS Primary Agricultural Credit Society cooperative society",
        
        # Bengali
        "প্যাক্স কী": "What is PACS Primary Agricultural Credit Society cooperative society",

                # Government scheme list
        "WHERE CAN I CHECK THE LIST OF ACTIVE SCHEME":
            "Official PACS Related Schemes Ministry of Cooperation Government of India list of schemes",

        # Tamil PMFBY definition
        "PMBFY என்பது என்ன":
            "What is PMFBY Pradhan Mantri Fasal Bima Yojana crop insurance scheme farmers",

        # Crop insurance claim
        "HOW CAN I CLAIM FOR CROP INSURANCE":
            "How do I report crop loss and claim crop insurance under PMFBY Crop Insurance App KRPH 14447 loss intimation claim assessment",

        # Marathi PMFBY application
        "पीक विम्यसाठी मी कसा अर्ज करू":
            "How can I apply for crop insurance under PMFBY farmer enrolment application NCIP Aadhaar mobile CSC bank",

        # Kharif premium
        "WHAT IS THE PREMIUM RATE OF KHARIF CROP":
            "What is the farmer premium rate for Kharif crops under PMFBY Kharif crop insurance premium 2 percent of Sum Insured",

        # Bengali crop damage reporting
        "ক্ষতিগ্রস্ত ফসলের রিপোর্ট কীভাবে নথিভুক্ত করব":
            "How to report crop damage under PMFBY crop loss intimation Crop Insurance App KRPH 14447 loss assessment",

        # Crop-loss reporting time
        "WITHIN HOW MANY HOURS CROP LOSS MUST BE":
            "Within how many hours must crop loss be reported under PMFBY crop loss intimation 72 hours Crop Insurance App KRPH",

        # Loan definition
        "लोन (ऋण) क्या है और यह कैसे काम करता है":
            "What is a loan and how does a loan work financial literacy borrowing repayment interest principal",

        # Cooperative vs commercial bank
        "ਇੱਕ ਵਪਾਰਕ ਬੈਂਕ ਅਤੇ ਸਹਿਕਾਰੀ ਬੈਂਕ ਵਿੱਚ ਕੀ ਫਰਕ ਹੈ":
            "What is the difference between a commercial bank and a cooperative bank ownership membership services customers rural cooperative banking",
    }

    if clean_query in PACS_QUERY_MAP:
        clean_query = PACS_QUERY_MAP[clean_query]

    # ==================================================
    # 2. IMPROVE PACS QUERIES
    # ==================================================

    if query_lower == "pacs":

        clean_query = (
            "PACS Primary Agricultural Credit Society "
            "cooperative society "
            "Primary Agricultural Credit Societies"
        )

    elif "pacs" in query_lower:

        clean_query = (
            clean_query
            + " Primary Agricultural Credit Society "
            "Primary Agricultural Credit Societies "
            "PACS cooperative society"
        )

    # ==================================================
    # 3. IMPROVE ELIGIBILITY / MEMBERSHIP QUERIES
    # ==================================================

    eligibility_words = [
        "eligibility",
        "eligible",
        "qualify",
        "qualified",
        "qualification",
        "eligibility criteria",

        "who can apply",
        "who is eligible",
        "who is eligible to become a member",

        "who can become a member",
        "who can be a member",
        "who can join",

        "membership",
        "member eligibility",
        "membership criteria",
        "membership requirements",

        "requirements for membership",
        "requirements to join",

        "can i become a member",
        "can i join"
    ]

    is_eligibility_query = any(
        word in query_lower
        for word in eligibility_words
    )

    if is_eligibility_query:

        clean_query += (
            " membership "
            "membership rules "
            "types of membership "
            "admission to membership "
            "eligibility for membership "
            "membership eligibility "
            "membership criteria "
            "membership requirements "
            "who can become a member "
            "who can join "
            "A class membership "
            "B class members "
            "eligible persons "
            "CHAPTER III MEMBERSHIP "
            "MEMBERSHIP "
            "ELIGIBILITY FOR A CLASS MEMBERSHIP"
        )

    # ==================================================
    # 4. SPECIAL PACS MEMBERSHIP QUERY BOOST
    # ==================================================

    if (
        "pacs" in query_lower
        and is_eligibility_query
    ):

        clean_query += (
            " PACS membership "
            "PACS member "
            "Primary Agricultural Credit Society membership "
            "cooperative society membership"
        )

    # ==================================================
    # 5. CREATE QUERY EMBEDDING
    # ==================================================

    query_embedding = create_embedding(
        clean_query
    )

    query_embedding = np.asarray(
        [query_embedding],
        dtype="float32"
    )

    # ==================================================
    # 6. SEARCH FAISS
    # ==================================================

    distances, indices = vector_store.search(
        query_embedding,
        top_k
    )

    # ==================================================
    # 7. BUILD RESULTS
    # ==================================================

    results = []

    for distance, index in zip(
        distances[0],
        indices[0]
    ):

        if 0 <= index < len(documents):

            result = documents[index].copy()

            result["similarity"] = float(
                distance
            )

            results.append(result)

    # ==================================================
    # 8. MEMBERSHIP-SPECIFIC RERANKING
    # ==================================================

    if (
        "pacs" in query_lower
        and is_eligibility_query
        and results
    ):

        membership_terms = [
            "membership",
            "member",
            "eligibility for",
            "a class membership",
            "b class members",
            "chapter iii",
            "admission"
        ]

        def membership_score(result):

            text = result.get(
                "text",
                ""
            ).lower()

            score = result.get(
                "similarity",
                0
            )

            for term in membership_terms:

                if term in text:
                    score += 0.08

            return score

        results.sort(
            key=membership_score,
            reverse=True
        )

    return results


def test_queries():
    """Test important PACS retrieval queries."""

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

    test_questions = [
        "PACS",
        "PACS?",
        "What is PACS?",
        "Who can become a member of PACS?",
        "What are the eligibility criteria for PACS membership?",
        "Who can join PACS?",
        "What are the requirements to become a PACS member?"
    ]

    for query in test_questions:

        print("\n" + "=" * 80)
        print(f"QUERY: {query}")
        print("=" * 80)

        results = retrieve(
            query,
            vector_store,
            documents,
            top_k=20
        )

        if not results:

            print("NO RESULTS")
            continue

        for i, result in enumerate(
            results,
            start=1
        ):

            print(
                f"\nRESULT {i}"
            )

            print(
                f"Similarity: "
                f"{result.get('similarity', 0):.4f}"
            )

            print(
                f"Source: "
                f"{result.get('source', 'Unknown')}"
            )

            print(
                f"Page: "
                f"{result.get('page', 'N/A')}"
            )

            print(
                "\nText:"
            )

            print(
                result.get(
                    "text",
                    ""
                )[:700]
            )


if __name__ == "__main__":

    test_queries()