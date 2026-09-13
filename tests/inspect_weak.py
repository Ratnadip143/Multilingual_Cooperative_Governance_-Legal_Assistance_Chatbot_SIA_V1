import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
RESULTS_PATH = BASE_DIR / "tests" / "retrieval_results.json"


def main():
    print("\nLoading retrieval results...\n")

    with open(RESULTS_PATH, "r", encoding="utf-8") as file:
        data = json.load(file)

    weak_queries = data.get("weak_queries", [])

    print(f"Total questions : {data.get('total_questions')}")
    print(f"Total queries   : {data.get('total_queries')}")
    print(f"Average Top-1   : {data.get('average_top1_score'):.4f}")
    print(f"Top-1 success   : {data.get('top1_success')}/{data.get('total_queries')}")
    print(f"Top-1 accuracy  : {data.get('top1_percentage'):.2f}%")
    print(f"\nWeak queries    : {len(weak_queries)}")
    print("=" * 90)

    for i, item in enumerate(weak_queries, start=1):

        print(f"\nWEAK QUERY {i}")
        print("-" * 90)

        print(f"Serial   : {item.get('serial')}")
        print(f"Language : {item.get('language')}")
        print(f"Question : {item.get('question')}")
        print(f"Top-1    : {item.get('top1'):.4f}")
        print(f"Source   : {item.get('source')}")
        print(f"Page     : {item.get('page')}")

        print("\nRetrieved text:")
        print(item.get("retrieved_text", ""))

    print("\n" + "=" * 90)
    print("WEAK QUERY SUMMARY")
    print("=" * 90)

    language_counts = {}

    for item in weak_queries:
        language = item.get("language", "Unknown")
        language_counts[language] = language_counts.get(language, 0) + 1

    for language, count in language_counts.items():
        print(f"{language}: {count}")

    print("\nDone.")


if __name__ == "__main__":
    main()