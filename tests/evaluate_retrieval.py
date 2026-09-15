import json
import sys
from pathlib import Path

import openpyxl

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from rag.retrieve import load_vector_store, retrieve

BASE_DIR = Path(__file__).resolve().parent.parent
QUESTIONS_PATH = BASE_DIR / "tests" / "QUESTIONS.xlsx"
RESULTS_PATH = BASE_DIR / "tests" / "retrieval_results.json"


LANGUAGE_COLUMNS = {
    "English": 2,
    "Hindi": 5,
    "Punjabi": 8,
    "Bengali": 11,
    "Tamil": 14,
    "Marathi": 17,
}


def load_questions():
    workbook = openpyxl.load_workbook(QUESTIONS_PATH, data_only=True)
    sheet = workbook.active

    questions = []

    for row in range(4, sheet.max_row + 1):
        serial = sheet.cell(row, 1).value

        # Skip continuation rows.
        if not isinstance(serial, int):
            continue

        for language, column in LANGUAGE_COLUMNS.items():
            value = sheet.cell(row, column).value
            if value is None:
                continue

            question = str(value).strip()
            if question:
                questions.append(
                    {
                        "serial": serial,
                        "language": language,
                        "question": question,
                    }
                )

    return questions


def main():
    print("\nLoading current FAISS index...")
    vector_store, documents = load_vector_store()

    print(f"FAISS vectors : {vector_store.ntotal}")
    print(f"Metadata      : {len(documents)}")

    questions = load_questions()
    print(f"Queries loaded: {len(questions)}")

    results = []
    weak_queries = []
    top1_scores = []

    for item in questions:
        retrieved = retrieve(
            item["question"],
            vector_store,
            documents,
            top_k=20,
        )

        if not retrieved:
            top1 = 0.0
            top1_result = {}
        else:
            top1_result = retrieved[0]
            top1 = float(top1_result.get("similarity", 0.0))

        top1_scores.append(top1)

        result = {
            "serial": item["serial"],
            "language": item["language"],
            "question": item["question"],
            "top1": top1,
            "source": top1_result.get("source"),
            "page": top1_result.get("page"),
            "retrieved_text": top1_result.get("text", ""),
            "top3": [
                {
                    "similarity": float(r.get("similarity", 0.0)),
                    "source": r.get("source"),
                    "page": r.get("page"),
                    "text": r.get("text", ""),
                }
                for r in retrieved
            ],
        }

        results.append(result)

        if top1 < 0.50:
            weak_queries.append(result)

    total = len(results)
    top1_success = sum(score >= 0.50 for score in top1_scores)
    average_top1 = sum(top1_scores) / total if total else 0.0

    report = {
        "total_questions": len(
            {item["serial"] for item in questions}
        ),
        "total_queries": total,
        "average_top1_score": average_top1,
        "top1_success": top1_success,
        "top1_percentage": (top1_success / total * 100) if total else 0.0,
        "weak_queries": weak_queries,
        "results": results,
    }

    with open(RESULTS_PATH, "w", encoding="utf-8") as file:
        json.dump(report, file, ensure_ascii=False, indent=2)

    print("\n" + "=" * 70)
    print("FRESH RETRIEVAL EVALUATION")
    print("=" * 70)
    print(f"Total questions : {report['total_questions']}")
    print(f"Total queries   : {report['total_queries']}")
    print(f"Average Top-1   : {report['average_top1_score']:.4f}")
    print(f"Top-1 success   : {report['top1_success']}/{total}")
    print(f"Top-1 accuracy  : {report['top1_percentage']:.2f}%")
    print(f"Weak queries    : {len(weak_queries)}")
    print("=" * 70)
    print(f"\nSaved: {RESULTS_PATH}")


if __name__ == "__main__":
    main()
