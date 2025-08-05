---
slug: /ai-insights/ai-limitations
title: Limitations of Neolens AI
---

## ⚠️ Limitations of Neolens AI

> _While Neolens is a powerful medical imaging assistant, it has technical and practical limitations you must be aware of._

---

### 🧪 1. Model Biases

- Trained on a curated dataset, Neolens may not generalize well to:
  - Pediatric patients
  - Rare conditions
  - Non-hospital-grade images
- Performance may vary across imaging devices and regions.

:::warning
Always verify AI output on underrepresented populations.
:::

---

### 🕶️ 2. Lack of Context

- Neolens processes images in isolation — it does **not** have access to:
  - Clinical history
  - Lab results
  - Symptoms or prior imaging
- This can limit its diagnostic precision.

---

### 🧩 3. Ambiguity in Findings

- The model may highlight abnormalities without naming a diagnosis.
- Some visual anomalies are flagged with low confidence.
- False positives and negatives may occur in borderline cases.

---

### 🧠 4. No Clinical Reasoning

- Neolens is **not a medical decision-maker.**
- It does not reason, compare options, or make judgments.
- It cannot assess urgency or suggest treatment.

---

### 🏥 5. Not a Standalone Tool

- Neolens is designed for **assistance**, not automation.
- It should never replace human review by a qualified specialist.
- All findings should be reviewed and confirmed before clinical use.

:::tip
Use Neolens to support, not shortcut, your diagnostic workflow.
:::

---

### 🚧 6. Evolving System

- The AI is continuously updated.
- Past behavior may differ from current behavior due to:
  - New training data
  - Model architecture changes
  - Configuration tweaks

Keep your documentation and validations up to date with every major release.

---

## ❌ Known Failure Examples

> _These examples illustrate typical scenarios where Neolens may produce suboptimal or incorrect results. They are not exhaustive, but aim to help you recognize edge cases._

### 1. Misclassification of Rare Diseases

- **Input**: Chest X-ray with signs of Langerhans cell histiocytosis  
- **Output**: Marked as "likely pulmonary fibrosis"  
- **Issue**: Rare disease not represented in training data  
- **Impact**: Incorrect diagnosis suggestion

---

### 2. Overconfidence on Noisy Images

- **Input**: MRI scan with strong motion artifacts  
- **Output**: High-confidence detection of "cystic lesion"  
- **Issue**: Artifact interpreted as a real anomaly  
- **Impact**: Risk of unnecessary follow-up

---

### 3. Underperformance on Pediatric Cases

- **Input**: Abdominal ultrasound of a 5-year-old  
- **Output**: "No findings"  
- **Issue**: Pediatric anatomy poorly supported  
- **Impact**: Missed identification of appendicitis

---

### 4. Ambiguous Highlighting Without Conclusion

- **Input**: Brain MRI with subtle hyperintensities  
- **Output**: "Area of interest detected"  
- **Issue**: No clinical suggestion provided  
- **Impact**: Unclear next step for practitioner

---

:::warning
These examples are synthetic and meant for demonstration only.  
Always test Neolens against your own clinical datasets before deployment.
:::
