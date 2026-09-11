from pathlib import Path
import sys
import json

import pandas as pd
import numpy as np
import faiss

# ---------------------------------------------------------
# PROJECT ROOT
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from rag.embeddings import create_embedding


# ---------------------------------------------------------
# PATHS
# ---------------------------------------------------------

TEST_FILE = BASE_DIR / "tests" / "QUESTIONS.xlsx"
RESULTS_FILE = BASE_DIR / "tests" / "retrieval_results.json"
VECTORSTORE_DIR = BASE_DIR / "vectorstore"

INDEX_PATH = VECTORSTORE_DIR / "index.faiss"
METADATA_PATH = VECTORSTORE_DIR / "metadata.json"


# ---------------------------------------------------------
# EXCEL COLUMN STRUCTURE
# ---------------------------------------------------------

SERIAL_COL = 0

LANGUAGE_COLS = {
    "English": 1,
    "Hindi": 4,
    "Punjabi": 7,
    "Bengali": 10,
    "Tamil": 13,
    "Marathi": 16,
}

ANSWER_COL = 17
SOURCE_COL = 18


# ---------------------------------------------------------
# SETTINGS
# ---------------------------------------------------------

TOP_K = 5
THRESHOLD = 0.50


# ---------------------------------------------------------
# LOAD VECTOR STORE
# ---------------------------------------------------------

def load_vector_store():

    if not INDEX_PATH.exists():
        raise FileNotFoundError(
            f"FAISS index not found:\n{INDEX_PATH}\n\n"
            "Run: python -m rag.build_index"
        )

    if not METADATA_PATH.exists():
        raise FileNotFoundError(
            f"Metadata file not found:\n{METADATA_PATH}\n\n"
            "Run: python -m rag.build_index"
        )

    index = faiss.read_index(str(INDEX_PATH))

    with open(METADATA_PATH, "r", encoding="utf-8") as f:
        metadata = json.load(f)

    return index, metadata


# ---------------------------------------------------------
# HELPERS
# ---------------------------------------------------------

def is_serial(value):

    if pd.isna(value):
        return False

    try:
        number = int(float(value))
        return number >= 1
    except (ValueError, TypeError):
        return False


def clean_cell(value):

    if pd.isna(value):
        return ""

    text = str(value).replace("\n", " ").strip()

    return " ".join(text.split())


# ---------------------------------------------------------
# LOAD QUESTIONS
# ---------------------------------------------------------

def load_questions():

    print("Loading QUESTIONS.xlsx...")

    df = pd.read_excel(
        TEST_FILE,
        header=None
    )

    print(f"Excel rows found: {len(df)}")
    print(f"Excel columns found: {len(df.columns)}")

    questions = []

    current = None

    for _, row in df.iterrows():

        serial = row[SERIAL_COL]

        # -------------------------------------------------
        # NEW QUESTION
        # -------------------------------------------------

        if is_serial(serial):

            if current is not None:
                questions.append(current)

            current = {
                "serial": int(float(serial)),
                "questions": {},
                "expected_answer": "",
                "source": "",
            }

            # Read language questions
            for language, col in LANGUAGE_COLS.items():

                if col < len(row):

                    text = clean_cell(row[col])

                    if text:
                        current["questions"][language] = text

            # Expected answer
            if ANSWER_COL < len(row):

                current["expected_answer"] = clean_cell(
                    row[ANSWER_COL]
                )

            # Expected source
            if SOURCE_COL < len(row):

                current["source"] = clean_cell(
                    row[SOURCE_COL]
                )

        # -------------------------------------------------
        # CONTINUATION ROW
        # -------------------------------------------------

        elif current is not None:

            # Continue language questions
            for language, col in LANGUAGE_COLS.items():

                if col < len(row):

                    text = clean_cell(row[col])

                    if text:

                        if language in current["questions"]:

                            current["questions"][language] += (
                                " " + text
                            )

                        else:

                            current["questions"][language] = text

            # Continue expected answer
            if ANSWER_COL < len(row):

                text = clean_cell(row[ANSWER_COL])

                if text:

                    if current["expected_answer"]:

                        current["expected_answer"] += (
                            " " + text
                        )

                    else:

                        current["expected_answer"] = text

            # Continue source
            if SOURCE_COL < len(row):

                text = clean_cell(row[SOURCE_COL])

                if text:

                    if current["source"]:

                        current["source"] += (
                            " " + text
                        )

                    else:

                        current["source"] = text

    # Save final question
    if current is not None:
        questions.append(current)

    return questions


# ---------------------------------------------------------
# RETRIEVAL
# ---------------------------------------------------------

def retrieve(question, index, metadata, top_k=TOP_K):

    query_embedding = create_embedding(question)

    query_embedding = np.asarray(
        [query_embedding],
        dtype="float32"
    )

    scores, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for score, idx in zip(
        scores[0],
        indices[0]
    ):

        if idx < 0 or idx >= len(metadata):
            continue

        row = metadata[int(idx)]

        results.append({
            "score": float(score),
            "source": row.get("source", ""),
            "document": row.get("document", ""),
            "page": row.get("page", ""),
            "chunk_id": row.get("chunk_id", ""),
            "text": row.get("text", ""),
        })

    return results


# ---------------------------------------------------------
# MAIN
# ---------------------------------------------------------

def main():

    print()
    print("=" * 80)
    print("MULTILINGUAL RAG RETRIEVAL EVALUATION")
    print("=" * 80)
    print()

    # -----------------------------------------------------
    # Load vector store
    # -----------------------------------------------------

    print("Loading FAISS vector store...")

    index, metadata = load_vector_store()

    print(f"Vectors loaded   : {index.ntotal}")
    print(f"Metadata records : {len(metadata)}")
    print()

    # -----------------------------------------------------
    # Load questions
    # -----------------------------------------------------

    questions = load_questions()

    print()
    print(f"Questions detected: {len(questions)}")

    if len(questions) == 0:

        print()
        print("ERROR: No questions found.")
        return

    # -----------------------------------------------------
    # Counters
    # -----------------------------------------------------

    total_queries = 0

    top1_success = 0
    top3_success = 0

    all_top1_scores = []

    language_stats = {}

    weak_queries = []

    # -----------------------------------------------------
    # Evaluate
    # -----------------------------------------------------

    for item in questions:

        serial = item["serial"]

        for language, question in item["questions"].items():

            if not question:
                continue

            total_queries += 1

            # Initialize language stats
            if language not in language_stats:

                language_stats[language] = {
                    "queries": 0,
                    "top1_scores": [],
                    "top1_success": 0,
                    "top3_success": 0,
                    "weak": 0,
                }

            language_stats[language]["queries"] += 1

            # -------------------------------------------------
            # Retrieve
            # -------------------------------------------------

            results = retrieve(
                question,
                index,
                metadata,
                top_k=TOP_K
            )

            if not results:
                continue

            top1_score = results[0]["score"]

            top3_score = max(
                result["score"]
                for result in results[:3]
            )

            # -------------------------------------------------
            # Overall statistics
            # -------------------------------------------------

            all_top1_scores.append(top1_score)

            language_stats[language]["top1_scores"].append(
                top1_score
            )

            if top1_score >= THRESHOLD:
                top1_success += 1
                language_stats[language]["top1_success"] += 1

            if top3_score >= THRESHOLD:
                top3_success += 1
                language_stats[language]["top3_success"] += 1

            # -------------------------------------------------
            # Weak query
            # -------------------------------------------------

            if top1_score < THRESHOLD:
                language_stats[language]["weak"] += 1

                weak_queries.append({
                    "serial": serial,
                    "language": language,
                    "question": question,
                    "top1": top1_score,
                    "top3": top3_score,
                    "source": results[0]["source"] if results else "",
                    "page": results[0]["page"] if results else None,
                    "retrieved_text": results[0]["text"] if results else ""
                })

        # ------------------------------------------------------------
        # Detailed output
        # ------------------------------------------------------------

        print()
        print("=" * 80)
        print(f"QUESTION {serial} | {language}")
        print("=" * 80)

        print(f"Query: {question}")

        print()
        print("Top retrieved passages:")
        print("-" * 80)

        for rank, result in enumerate(results, start=1):
            print()
            print(f"RESULT {rank}")

            print(
                f"Similarity Score : "
                f"{result['score']:.4f}"
            )

            print(
                f"Source           : "
                f"{result['source']}"
            )

            print(
                f"Document         : "
                f"{result['document']}"
            )

            print(
                f"Page             : "
                f"{result['page']}"
            )

            print(
                f"Chunk ID         : "
                f"{result['chunk_id']}"
            )

            print()
            print("Retrieved Text:")
            print(result["text"])

            print()
            print("-" * 80)

    # -----------------------------------------------------
    # Final evaluation summary
    # -----------------------------------------------------

    total_queries = len(all_top1_scores)

    average_top1 = (
        sum(all_top1_scores) / total_queries
        if total_queries
        else 0
    )

    top1_percentage = (
        (top1_success / total_queries) * 100
        if total_queries
        else 0
    )

    top3_percentage = (
        (top3_success / total_queries) * 100
        if total_queries
        else 0
    )

    print()
    print("=" * 80)
    print("FINAL RETRIEVAL EVALUATION")
    print("=" * 80)

    print(f"Total questions       : {len(questions)}")
    print(f"Total language queries: {total_queries}")

    print()
    print(f"Average Top-1 score   : {average_top1:.4f}")

    print()
    print(
        f"Top-1 success         : "
        f"{top1_success}/{total_queries}"
    )

    print(
        f"Top-3 success         : "
        f"{top3_success}/{total_queries}"
    )

    print()
    print(
        f"Top-1 percentage      : "
        f"{top1_percentage:.2f}%"
    )

    print(
        f"Top-3 percentage      : "
        f"{top3_percentage:.2f}%"
    )

    print()
    print(
        f"Weak queries          : "
        f"{len(weak_queries)}"
    )

    # -----------------------------------------------------
    # Language-wise results
    # -----------------------------------------------------

    print()
    print("=" * 80)
    print("LANGUAGE-WISE RESULTS")
    print("=" * 80)

    for language, stats in language_stats.items():

        total = len(stats["top1_scores"])

        if total == 0:
            continue

        avg_score = sum(stats["top1_scores"]) / total

        success_percentage = (
            stats["top1_success"] / total
        ) * 100

        print()
        print(f"Language: {language}")
        print(f"Queries : {total}")
        print(f"Average : {avg_score:.4f}")
        print(
            f"Success : "
            f"{stats['top1_success']}/{total} "
            f"({success_percentage:.2f}%)"
        )
        print(f"Weak    : {stats['weak']}")

    # -----------------------------------------------------
    # Save results
    # -----------------------------------------------------

    output = {
        "total_questions": len(questions),
        "total_queries": total_queries,
        "average_top1_score": average_top1,
        "top1_success": top1_success,
        "top3_success": top3_success,
        "top1_percentage": top1_percentage,
        "top3_percentage": top3_percentage,
        "weak_queries": weak_queries,
        "language_stats": language_stats
    }

    with open(
        RESULTS_FILE,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            output,
            f,
            ensure_ascii=False,
            indent=2
        )

    print()
    print("=" * 80)
    print("REPORT SAVED")
    print("=" * 80)
    print(RESULTS_FILE)

    print()
    print("NOTE:")
    print(
        "Similarity score measures retrieval relevance, "
        "not final answer correctness."
    )
    print(
        "Final answer accuracy must be verified against "
        "official government sources."
    )
    print("=" * 80)


if __name__ == "__main__":
    main()