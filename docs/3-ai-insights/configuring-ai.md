---
slug: /ai-insights/configuring-ai
title: Configuring the AI Engine
description: "Explore how to customize Neolens AI to your specific clinical and research needs. This guide details key parameters like sensitivity, analysis depth, verbosity, and model selection, balancing performance and accuracy. Learn to configure profiles, apply advanced options, and monitor impacts—empowering you to harness AI insights responsibly and effectively."
---

## ⚙️ Configuring the AI Engine

> The Neolens AI engine is highly configurable, allowing you to tailor detection sensitivity, analysis depth, and output verbosity to your clinical or research needs.

---

## Understanding Key Configuration Parameters

Neolens AI models provide several configuration parameters to let you tailor how the system interprets, analyzes, and outputs results. The most frequently adjusted parameters include:

### 1. Detection Sensitivity (`sensitivity`)

Defines how aggressively the model should flag findings.

- `low` (0.3): Reduces false positives but may miss subtle anomalies
- `medium` (0.5): Balanced behavior (default)
- `high` (0.8): Detects even minor anomalies, with higher risk of noise

```json
{
  "sensitivity": "medium",
  "confidence_threshold": 0.5
}
```

### 2. Analysis Depth (`depth`)

Controls how deeply the AI should analyze each image.

- `shallow`: Faster analysis, surface-level insights (~2-5 seconds)
- `standard`: Good tradeoff for most use cases (~5-15 seconds, default)
- `deep`: Slower but richer and more exhaustive evaluation (~15-45 seconds)

### 3. Output Verbosity (`verbosity`)

Specifies the amount of detail included in the response.

- `minimal`: Essential data only (findings, confidence scores)
- `standard`: Includes explanations and context (default)
- `verbose`: Detailed results including intermediate steps
- `debug`: Full raw output with model internals (development only)

### 4. Model Selection (`model_version`)

Choose specific AI model versions for different use cases:

| Model Version  | Specialization    | Best For                   |
|----------------|-------------------|----------------------------|
| `v3.2.1`       | General radiology | X-rays, CT scans (default) |
| `v3.1.5`       | Neuroimaging      | MRI brain scans            |
| `v2.8.3`       | Cardiology        | Cardiac imaging, ECG       |
| `experimental` | Latest features   | R&D, testing only          |

### 5. Region of Interest (`roi`)

Focus analysis on specific anatomical regions:

```json
{
  "roi": {
    "region": "thorax",
    "coordinates": [100, 50, 400, 300],
    "auto_detect": true
  }
}
```

---

## ⚡ Performance vs Quality Trade-offs

| Configuration | Speed | Accuracy | Resource Usage | Best For |
|---------------|-------|----------|----------------|----------|
| `shallow` + `low` | ⚡⚡⚡ | ⭐⭐ | Low | Screening, high-volume |
| `standard` + `medium` | ⚡⚡ | ⭐⭐⭐ | Medium | General clinical use |
| `deep` + `high` | ⚡ | ⭐⭐⭐⭐ | High | Critical cases, research |

---

## 🎯 Configuration by Use Case

### Emergency Department Triage

```json
{
  "sensitivity": "high",
  "depth": "shallow",
  "verbosity": "minimal",
  "priority_filter": "critical_only",
  "response_time_target": "< 5s"
}
```

### Research & Development

```json
{
  "sensitivity": "high",
  "depth": "deep",
  "verbosity": "debug",
  "model_version": "experimental",
  "uncertainty_estimation": true
}
```

### Routine Screening

```json
{
  "sensitivity": "medium",
  "depth": "standard",
  "verbosity": "standard",
  "batch_processing": true,
  "false_positive_tolerance": "low"
}
```

---

## 🛠️ Advanced Configuration Options

### Custom Thresholds

```json
{
  "thresholds": {
    "anomaly_detection": 0.7,
    "classification": 0.8,
    "measurement_precision": 0.95
  }
}
```

### Multi-Modal Analysis

```json
{
  "multi_modal": {
    "enabled": true,
    "primary_modality": "ct",
    "secondary_data": ["clinical_notes", "lab_results"],
    "fusion_strategy": "weighted_ensemble"
  }
}
```

### Quality Assurance

```json
{
  "qa_settings": {
    "image_quality_check": true,
    "minimum_resolution": "512x512",
    "artifact_detection": true,
    "preprocessing": "auto"
  }
}
```

---

## 📊 Configuration API

### Set Configuration

```bash
curl -X PUT "https://api.neolens.ai/v1/config" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sensitivity": "high",
    "depth": "standard",
    "verbosity": "verbose",
    "model_version": "v3.2.1"
  }'
```

### Get Current Configuration

```bash
curl -X GET "https://api.neolens.ai/v1/config" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Validate Configuration

```bash
curl -X POST "https://api.neolens.ai/v1/config/validate" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sensitivity": "ultra_high",
    "depth": "experimental"
  }'
```

---

## ⚠️ Configuration Warnings

:::warning[Performance Impact]

- `deep` analysis can increase processing time by 3-5x
- `debug` verbosity generates large response payloads (>10MB possible)
- `experimental` models may have unstable behavior

:::

:::caution[Clinical Considerations]

- Higher sensitivity increases false positive rates
- Lower sensitivity may miss subtle but critical findings
- Always validate configuration changes with clinical workflows

:::

---

## 🧪 Testing Your Configuration

### A/B Testing Framework

```json
{
  "test_config": {
    "baseline": {"sensitivity": "medium", "depth": "standard"},
    "variant": {"sensitivity": "high", "depth": "deep"},
    "sample_size": 100,
    "metrics": ["accuracy", "false_positive_rate", "processing_time"]
  }
}
```

### Configuration Profiles

Save commonly used configurations:

```json
{
  "profiles": {
    "emergency": {...},
    "research": {...},
    "screening": {...}
  }
}
```

---

## 📈 Monitoring Configuration Impact

Track how configuration changes affect:

- **Accuracy metrics**: Sensitivity, specificity, AUC
- **Performance**: Response time, throughput
- **Clinical outcomes**: False positive/negative rates
- **User satisfaction**: Radiologist feedback, workflow efficiency

---

:::tip[Best Practices]

- Start with default settings and adjust incrementally
- Test configuration changes on validation datasets before production
- Document configuration rationale for regulatory compliance
- Monitor performance metrics after configuration updates
- Use profiles to quickly switch between use cases

:::

---

## 🔗 Related Documentation

- [Interpreting AI Results](./interpreting-results)
- [AI Limitations](./ai-limitations)
- [Best Practices](./best-practices)
- [API Troubleshooting](../api-reference/api-troubleshooting)
