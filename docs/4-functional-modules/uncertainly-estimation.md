---
slug: /functional-modules/uncertainty-estimation
title: Uncertainty Estimation Module
description: "Quantifies prediction confidence to help clinicians assess the reliability of AI-generated results and prioritize expert review."
---

The **Uncertainty Estimation** module quantifies the confidence level of AI-generated predictions to inform clinical decision-making.

---

## 🎯 Purpose

Help clinicians gauge reliability of detected anomalies and classifications, reducing risk of misinterpretation.

---

## 🔍 How It Works

- Uses probabilistic modeling and Bayesian inference techniques.
- Provides confidence intervals, predictive distributions, or entropy measures.
- Flags results with low certainty for further review.

---

## ⚙️ Key Parameters

| Parameter          | Type    | Description                                             | Default    |
|--------------------|---------|---------------------------------------------------------|------------|
| `confidence_level` | float   | Desired confidence threshold (0.0 - 1.0)                | 0.95       |
| `method`           | string  | Estimation technique: `bayesian`, `ensemble`, `dropout` | `bayesian` |

:::tip  

- Choosing a higher confidence level increases caution but may reduce coverage.  
- Experiment with different methods for best fit in your clinical setting.  

:::

---

## 📦 Output Format

Example:

```json
{
  "uncertainty": 0.12,
  "confidence_interval": [0.75, 0.89],
  "method": "bayesian"
}
```

---

## 🛠️ Usage Example

```bash
curl -X POST "https://api.neolens.ai/v1/uncertainty-estimation" \
  -H "Authorization: Bearer <API_KEY>" \
  -F "image=@scan_mri.png" \
  -F "confidence_level=0.99"
```

---

## ⚠️ Limitations

- Uncertainty estimates depend on model calibration.
- Interpretation requires clinical context.
- Not a substitute for expert review.
