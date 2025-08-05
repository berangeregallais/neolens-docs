---
slug: /ai-insights/interpreting-results
title: Interpreting AI Results
---

## 🧠 Interpreting AI Results

> _Understand how to read, trust, and act on the AI's outputs in a clinical or operational setting._

---

### 🎯 Goal of this Section

This section helps **clinicians**, **researchers**, and **data teams**:

- Understand key output fields (scores, classifications, flags)
- Know when results are reliable — and when they aren't
- Communicate findings responsibly

---

### 📦 Output Types

| Type                    | Description                                                  | Example                       |
|-------------------------|--------------------------------------------------------------|-------------------------------|
| Binary classification   | Predicts a yes/no outcome                                    | “Normal” vs “Abnormal”        |
| Multilabel classification | Identifies multiple conditions in one image                | Pneumothorax + Edema          |
| Numerical score         | Expresses model confidence from 0 to 1                       | 0.87                          |
| Quantitative measurement | Outputs anatomical data like length or volume               | Aortic diameter: 36.2 mm      |
| Visual overlay          | Highlights detected areas using bounding boxes or masks      | Segmentation in PNG/DICOM     |

:::note
All outputs are returned in structured JSON. Visual overlays are available in **PNG**, **DICOM**, or **SVG** formats.
:::

---

### 📊 Confidence Scores

| Label            | Confidence | Interpretation |
|------------------|------------|----------------|
| Pneumothorax     | 0.92       | Very likely    |
| Nodule           | 0.58       | Possible       |
| Pleural effusion | 0.21       | Unlikely       |

- Confidence scores range from **0.00** (low) to **1.00** (high)
- **High confidence ≠ clinical certainty**
- **Low confidence ≠ absence of condition**

---

### 🚩 How to Read Flags

| Flag             | Meaning                                   | Action Required        |
|------------------|-------------------------------------------|------------------------|
| `low_confidence` | The model is unsure about this result     | Human review advised   |
| `inconclusive`   | Image quality or content was insufficient | Consider a new scan    |
| `alert`          | Urgent finding detected                   | Escalate immediately   |

---

### 🧭 Making Decisions with AI Results

AI output is **decision support**, not a substitute for human interpretation.

Consider the AI result **in context**, alongside:

- Imaging protocol
- Patient history
- Other diagnostic data

:::tip[When to trust the AI?]
When results are high-confidence **and** aligned with clinical expectation, AI can accelerate your workflow.  
But when in doubt — _trust your eyes and your judgment._
:::

---

### ⚠️ Known Limitations

- **Bias** may affect results for rare or underrepresented subgroups
- Poor image quality can **lower confidence**
- Unexpected pathologies may be **missed or misclassified**

---

### ✅ Best Practices

- Always **review the visual output**
- Log **model version** used in patient records
- Document any **manual override** or disagreement with AI

---
