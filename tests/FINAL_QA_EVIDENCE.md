# SIA Final Testing & Validation Evidence

## 1. RAG Retrieval Performance

The multilingual RAG system was evaluated using the project retrieval benchmark.

- **Total questions:** 27
- **Total multilingual queries:** 167
- **Top-1 successful retrievals:** 164 / 167
- **Top-1 retrieval accuracy:** **98.20%**
- **Average Top-1 similarity:** 0.6604
- **Weak queries:** 3

### Evaluation Result

The system successfully retrieved the most relevant knowledge-base chunk for **164 out of 167 multilingual queries**, achieving **98.20% Top-1 retrieval accuracy**.

---

## 2. Multilingual QA Validation

SIA was tested with questions across six supported languages:

- English
- Hindi
- Punjabi
- Bengali
- Tamil
- Marathi

The QA testing checked:

- Answer correctness
- Relevance to the user query
- Consistency with the knowledge base
- Appropriate use of retrieved information
- Multilingual response behavior

### QA Result

The tested multilingual questions produced relevant and correct responses based on the available knowledge base.

---

## 3. Source Grounding Validation

SIA responses were checked against the retrieved knowledge-base sources.

The validation focused on:

- Whether the retrieved source was relevant to the question
- Whether the answer was supported by the retrieved information
- Whether unsupported claims were avoided
- Whether state-specific or dynamic information was treated cautiously

The knowledge base contains official and verified government/cooperative information used for retrieval and answer grounding.

---

## 4. Known Limitations

Three queries were identified as weak during retrieval evaluation.

These queries were not forcefully tuned because they involve:

- Ambiguous references such as "this scheme" without specifying the scheme
- Dynamic information such as current crop market prices

These cases are treated as limitations of a static knowledge base rather than artificially modifying retrieval to produce an unsupported answer.

---

## 5. Final Validation Summary

| Metric | Result |
|---|---:|
| Multilingual queries tested | **167** |
| Top-1 successful retrievals | **164 / 167** |
| Top-1 retrieval accuracy | **98.20%** |
| Average Top-1 similarity | **0.6604** |
| Languages tested | **6** |
| Weak queries | **3** |

### Final Result

**SIA achieved 98.20% Top-1 retrieval accuracy across 167 multilingual test queries, with QA validation confirming relevant and grounded responses across six languages.**