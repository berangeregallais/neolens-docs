---
slug: /functional-modules/classification
title: Pathology Classification Module
description: "The Classification module identifies and prioritizes medical pathologies from images, delivering confidence-scored diagnostic labels to support clinical decisions."
---

## 🏷️ Pathology Classification

The **Classification** module assigns detected anomalies to diagnostic categories, prioritizing findings by clinical urgency.

---

### 🎯 Purpose

Provide structured diagnostic labels to assist clinicians in triage and treatment planning.

---

### 🧠 How It Works

- Leverages deep learning models trained on large annotated datasets.
- Supports multi-class and multi-label classification.
- Outputs probability scores per pathology and severity level.

---

### ⚙️ Key Parameters

| Parameter      | Type    | Description                                            | Default  |
|----------------|---------|--------------------------------------------------------|----------|
| `threshold`    | float   | Minimum confidence score to report a pathology         | 0.5      |
| `max_labels`   | int     | Maximum number of classifications returned per image   | 3        |
| `priority_mode`| string  | Sorting method: `severity` or `confidence`              | `severity`|

:::tip
Adjust `threshold` to filter out low-confidence labels and reduce noise.
:::

---

### 📦 Output Format

The response includes:

- `labels`: List of pathology names.
- `scores`: Confidence scores (0 to 1) for each label.
- `priority`: Clinical urgency level (e.g., `low`, `medium`, `high`).

```json
{
  "classifications": [
    {
      "label": "pneumothorax",
      "score": 0.93,
      "priority": "high"
    },
    {
      "label": "atelectasis",
      "score": 0.65,
      "priority": "medium"
    }
  ]
}
```

---

### 🛠️ Usage Example

```bash
curl -X POST "https://api.neolens.ai/v1/classification" \
  -H "Authorization: Bearer <API_KEY>" \
  -F "image=@scan_ct.png" \
  -F "threshold=0.7"
```

---

### ⚠️ Limitations

- May confuse visually similar pathologies.
- Limited by the quality and representativeness of training data.
- Priority levels are indicative; final clinical judgment required.
