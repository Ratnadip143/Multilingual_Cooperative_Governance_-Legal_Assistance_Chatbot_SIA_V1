import json

RESULTS_FILE = "tests/retrieval_results.json"

with open(RESULTS_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

weak_queries = data["weak_queries"]

print("=" * 80)
print("WEAK RETRIEVAL QUERIES + RETRIEVED TEXT")
print("=" * 80)

for q in weak_queries:
    print(
        f"Q{q['serial']} | "
        f"{q['language']} | "
        f"Score: {q['top1']:.4f} | "
        f"Source: {q['source']} | "
        f"Page: {q['page']}"
    )

    print(f"Query: {q['question']}")

    print("\nRetrieved Text:")
    print(q.get("retrieved_text", "NOT SAVED IN RESULTS"))

    print("-" * 80)

print(f"\nTotal weak queries: {len(weak_queries)}")