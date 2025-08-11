---
slug: /functional-modules/report-generation
title: Report Generation Module
description: "Generates structured preliminary medical reports from analysis results to streamline diagnosis and documentation."
---

## 📝 Report Generation

The **Report Generation** module automatically creates preliminary diagnostic reports based on analysis results.

---

### 🎯 Purpose

Provide clinicians with structured, readable summaries to accelerate diagnosis and documentation.

---

### 🧠 How It Works

- Aggregates data from detection, classification, and measurement modules.
- Uses natural language generation (NLG) tailored for medical contexts.
- Supports customizable templates and language options.

---

### ⚙️ Key Parameters

| Parameter       | Type    | Description                                  | Default  |
|-----------------|---------|----------------------------------------------|----------|
| `template`      | string  | Report style template ID                     | `default`|
| `language`      | string  | Report language (e.g., `en`, `fr`)           | `en`     |
| `include_images`| boolean | Whether to embed annotated images in report  | false    |

:::tip  
Customize templates to fit your clinical workflow and branding.  
Enable `include_images` for richer, more informative reports.  
:::

---

### 📦 Output Format

Sample JSON output:

```json
{
  "report_id": "RPT123456",
  "text": "Preliminary analysis indicates a 32.5 mm dilation of the aorta, consistent with aneurysm.",
  "language": "en",
  "images_included": false
}
```

---

### 🛠️ Usage Example

```bash
curl -X POST "https://api.neolens.ai/v1/report-generation" \
  -H "Authorization: Bearer <API_KEY>" \
  -F "analysis_id=ANL987654" \
  -F "template=default" \
  -F "language=en" \
  -F "include_images=true"
```

---

### ⚠️ Limitations

- Generated reports are preliminary and should be reviewed by specialists.
- Language nuances may require manual adjustment.
- Image embedding increases report size and transmission time.
