---
slug: /ai-insights/interpreting-results
title: Interpreting AI Results
description: "Quickly understand Neolens AI results—confidence levels, labels, and priorities—to use them safely and effectively in your clinical workflow. Stay aware of limitations and best practices to keep human judgment central."
---

> Understanding Neolens AI outputs is crucial for safe and effective clinical integration. This guide helps you interpret confidence scores, classifications, and recommendations appropriately.

---

## 📊 Understanding Confidence Scores

### Confidence Levels Explained

| Score Range | Interpretation       | Clinical Action             | Visual Indicator     |
|-------------|----------------------|-----------------------------|----------------------|
| 0.90 - 1.00 | Very High Confidence | Priority review recommended | 🔴 Red highlight    |
| 0.75 - 0.89 | High Confidence      | Standard workflow           | 🟡 Orange highlight |
| 0.60 - 0.74 | Moderate Confidence  | Consider additional imaging | 🟡 Yellow highlight |
| 0.40 - 0.59 | Low Confidence       | Human review essential      | ⚪ Gray highlight   |
| 0.00 - 0.39 | Very Low Confidence  | Likely false positive       | No highlight        |

### Example Response Structure

```json
{
  "findings": [
    {
      "label": "pulmonary_nodule",
      "confidence": 0.87,
      "location": {
        "x": 245, "y": 156,
        "width": 32, "height": 28
      },
      "clinical_significance": "moderate",
      "follow_up_recommended": true
    }
  ],
  "overall_assessment": {
    "normal_probability": 0.23,
    "abnormal_probability": 0.77,
    "urgency": "routine"
  }
}
```

---

## 🏷️ Classification Categories

### Pathology Labels

Neolens uses standardized medical terminology aligned with:

- **ICD-11** diagnostic codes
- **RadLex** radiology lexicon
- **SNOMED CT** clinical terminology

#### Common Classifications

**Thoracic Imaging:**

- `pneumothorax` - Collapsed lung
- `pleural_effusion` - Fluid in pleural space
- `pulmonary_nodule` - Lung nodule
- `cardiomegaly` - Enlarged heart
- `atelectasis` - Lung collapse

**Neuroimaging:**

- `hemorrhage` - Brain bleeding
- `ischemic_stroke` - Blood clot-related stroke
- `mass_effect` - Space-occupying lesion
- `hydrocephalus` - Fluid accumulation
- `midline_shift` - Brain structure displacement

**Abdominal Imaging:**

- `bowel_obstruction` - Intestinal blockage
- `appendicitis` - Appendix inflammation
- `free_air` - Pneumoperitoneum
- `hepatomegaly` - Enlarged liver

---

## 📐 Measurement Interpretation

### Anatomical Measurements

```json
{
  "measurements": {
    "aortic_diameter": {
      "value": 4.2,
      "unit": "cm",
      "reference_range": "2.0-3.5 cm",
      "status": "enlarged",
      "clinical_significance": "moderate_aneurysm"
    },
    "left_ventricle": {
      "ejection_fraction": 45,
      "unit": "percent",
      "reference_range": "50-70%",
      "status": "reduced",
      "clinical_significance": "mild_dysfunction"
    }
  }
}
```

### Measurement Accuracy

- **Linear measurements**: ±2-3mm accuracy
- **Area calculations**: ±5-8% variability  
- **Volume estimates**: ±10-15% uncertainty
- **Angles**: ±2-5 degrees precision

---

## 🚨 Priority and Urgency Indicators

### Urgency Classifications

| Level        | Description               | Response Time | Examples                    |
|--------------|---------------------------|---------------|-----------------------------|
| `critical`   | Life-threatening findings | < 1 hour      | Hemorrhage, pneumothorax    |
| `urgent`     | Requires prompt attention | < 4 hours     | Large masses, fractures     |
| `routine`    | Standard follow-up        | < 24 hours    | Small nodules, mild changes |
| `incidental` | Unexpected findings       | Variable      | Benign cysts, artifacts     |

### Priority Scoring Algorithm

```bash
Priority Score = (Confidence × 0.4) + (Clinical Significance × 0.3) + (Size/Extent × 0.3)

Where:
- Confidence: 0.0-1.0
- Clinical Significance: 0.0-1.0 (based on pathology severity)
- Size/Extent: 0.0-1.0 (normalized to anatomy)
```

---

## 🔄 Contextualizing Results

### Patient History Integration

Consider AI results alongside:

- **Demographics**: Age, gender, medical history
- **Clinical presentation**: Symptoms, vital signs
- **Prior imaging**: Comparison studies, disease progression
- **Laboratory data**: Biomarkers, blood work

### Imaging Context

- **Modality limitations**: CT vs MRI vs X-ray capabilities
- **Acquisition parameters**: Slice thickness, contrast timing
- **Image quality**: Motion artifacts, noise levels
- **Technical factors**: Scanner type, reconstruction algorithms

---

## 📈 Longitudinal Analysis

### Tracking Changes Over Time

```json
{
  "longitudinal_analysis": {
    "baseline_study": "2024-01-15",
    "current_study": "2024-08-05",
    "changes_detected": [
      {
        "finding": "pulmonary_nodule",
        "baseline_size": "8mm",
        "current_size": "12mm",
        "growth_rate": "4mm over 6 months",
        "doubling_time": "18 months",
        "recommendation": "short_term_follow_up"
      }
    ]
  }
}
```

### Growth Pattern Analysis

- **Doubling time calculations**
- **Volume change percentages**
- **Shape evolution tracking**
- **New findings identification**

---

## ⚖️ Uncertainty and Limitations

### Understanding AI Uncertainty

```json
{
  "uncertainty_metrics": {
    "epistemic_uncertainty": 0.12,    // Model uncertainty
    "aleatoric_uncertainty": 0.08,    // Data uncertainty
    "total_uncertainty": 0.20,
    "confidence_interval": [0.73, 0.91],
    "prediction_explanation": "High contrast lesion with clear borders"
  }
}
```

### When to Be Cautious

- **Edge cases**: Rare pathologies, unusual presentations
- **Poor image quality**: Motion artifacts, low resolution
- **Pediatric patients**: Limited training data
- **Implants/hardware**: Potential interference
- **Multi-pathology cases**: Complex interactions

---

## 🎯 Clinical Decision Support

### Recommendation Types

```json
{
  "recommendations": {
    "imaging": [
      {
        "type": "follow_up_ct",
        "timeframe": "3_months",
        "reason": "monitor_nodule_growth",
        "contrast": "without"
      }
    ],
    "clinical": [
      {
        "action": "pulmonology_referral",
        "urgency": "routine",
        "reason": "nodule_evaluation"
      }
    ],
    "additional_testing": [
      {
        "test": "pet_scan",
        "indication": "characterize_lesion",
        "priority": "consider"
      }
    ]
  }
}
```

### Treatment Pathway Integration

- **Guidelines compliance**: NCCN, ACR, ESR protocols
- **Risk stratification**: Low, intermediate, high risk
- **Cost-effectiveness**: Optimize imaging utilization
- **Patient preferences**: Shared decision-making support

---

## 🔍 Visual Interpretation Aids

### Heatmaps and Overlays

- **Attention maps**: Areas of AI focus
- **Confidence overlays**: Visual confidence representation  
- **Segmentation masks**: Anatomical structure outlines
- **Comparison views**: Side-by-side analysis

### Annotation Features

```json
{
  "annotations": {
    "bounding_boxes": [
      {
        "coordinates": [120, 80, 240, 160],
        "label": "suspicious_area",
        "confidence": 0.85
      }
    ],
    "segmentation_masks": {
      "lung_fields": "base64_encoded_mask",
      "heart_contour": "base64_encoded_mask"
    },
    "arrows_and_callouts": [
      {
        "type": "arrow",
        "start": [150, 120],
        "end": [180, 140],
        "label": "area_of_concern"
      }
    ]
  }
}
```

---

## ⚠️ Common Interpretation Pitfalls

### False Positives

- Artifacts mistaken for pathology
- Normal variants flagged as abnormal
- Overlapping structures misidentified

### False Negatives  

- Subtle findings missed
- Atypical presentations
- Poor image quality masking pathology

### Overreliance on AI

- **Confirmation bias** - Accepting AI results without scrutiny
- **Automation bias** - Reduced human vigilance
- **Context neglect** - Ignoring clinical picture

---

## 📚 Best Practices for Result Interpretation

### ✅ Do

- **Always correlate with clinical context**
- **Review original images, not just AI overlays**
- **Consider differential diagnoses**
- **Document AI assistance in reports**
- **Maintain clinical reasoning skills**

### ❌ Don't

- **Accept results without clinical correlation**
- **Ignore low-confidence findings completely**
- **Skip verification of critical findings**
- **Rely solely on AI for urgent cases**
- **Forget to consider image quality issues**

---

## 🔗 Integration with Clinical Workflow

### PACS Integration

```xml
<!-- DICOM Structured Report Example -->
<DicomSR>
  <Finding>
    <Text>AI-detected pulmonary nodule</Text>
    <Confidence>0.87</Confidence>
    <Location>RUL posterior segment</Location>
    <Measurements>8mm diameter</Measurements>
  </Finding>
</DicomSR>
```

### Report Generation

Structured reporting templates integrate AI findings:

- **Impression section**: AI-highlighted abnormalities
- **Recommendations**: Evidence-based follow-up
- **Comparison**: Prior study analysis
- **Limitations**: AI uncertainty documentation

---

:::tip[Key Takeaways]

- Confidence scores guide clinical attention but don't replace judgment
- Always consider clinical context and image quality
- Use AI as a diagnostic aid, not replacement for expertise  
- Document AI assistance for regulatory compliance
- Maintain skeptical evaluation of all AI outputs

:::

---

## 🔗 Related Documentation

- [Configuring AI](/ai-insights/configuring-ai)
- [AI Limitations](/ai-insights/ai-limitations/)
- [Best Practices](/ai-insights/best-practices/)
- [Uncertainty Estimation](/functional-modules/uncertainty-estimation/)
