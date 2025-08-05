---
slug: /ai-insights/configuring-ai
title: Configuring the AI Engine
---

<!--
Public visé : devs, ops, data scientists, cliniciens techniques
But : savoir comment ajuster l’IA selon le contexte, en comprenant les effets des principaux paramètres.
-->

> ⚙️ The Neolens AI engine is highly configurable, allowing you to tailor detection sensitivity, analysis depth, and output verbosity to your clinical or research needs.

## Understanding Key Configuration Parameters

Neolens AI models provide several configuration parameters to let you tailor how the system interprets, analyzes, and outputs results. The most frequently adjusted parameters include:

### 1. Detection Sensitivity (`sensitivity`)

Defines how aggressively the model should flag findings.

- `low`: reduces false positives but may miss subtle anomalies
- `medium` (default): balanced behavior
- `high`: detects even minor anomalies, with a higher risk of noise

### 2. Analysis Depth (`depth`)

Controls how deeply the AI should analyze each image.

- `shallow`: faster analysis, surface-level insights
- `standard` (default): good tradeoff for most use cases
- `deep`: slower but richer and more exhaustive evaluation

### 3. Output Verbosity (`verbosity`)

Specifies the amount of detail included in the response.

- `minimal`: essential data only
- `verbose`: detailed results including intermediate steps
- `debug`: full raw output (for development/testing only)

:::tip[When to Configure Parameters?]
For most production use cases, the default settings are optimal.
Customize only when:

You need higher precision or sensitivity for rare pathologies

Your workflow requires quicker results (set depth: shallow)

You're debugging or building tools on top of the API
Avoid over-customizing unless necessary — simpler configs often yield better maintainability and fewer surprises.
:::

### 🔍 Summary Table – Configuration by Use Case

| Use Case                           | Sensitivity | Depth      | Verbosity | Notes                                           |
| ---------------------------------- | ----------- | ---------- | --------- | ----------------------------------------------- |
| 🩻 Routine chest X-ray review      | `medium`    | `standard` | `minimal` | Balanced, default setup                         |
| 🧠 Rare lesion detection           | `high`      | `deep`     | `verbose` | Maximum accuracy, full traceability             |
| ⚙️ High-throughput ops             | `low`       | `shallow`  | `minimal` | Fast, low compute, acceptable for pre-screening |
| 🧪 Debugging outputs (AI Engineer) | `medium`    | `standard` | `debug`   | Full logs and diagnostic data for tuning        |
