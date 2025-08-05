---
slug: /functional-modules/measurement
title: Anatomical Measurement Module
---

## 📏 Anatomical Measurement

The **Measurement** module automatically calculates dimensions of anatomical structures from medical images.

---

### 🎯 Purpose

Provide precise, reproducible measurements to assist clinical assessment and monitoring.

---

### 🧠 How It Works

- Utilizes image segmentation and edge detection algorithms.
- Identifies key anatomical landmarks.
- Calculates distances, volumes, and angles depending on the structure.

---

### ⚙️ Key Parameters

| Parameter          | Type    | Description                                   | Default   |
|--------------------|---------|-----------------------------------------------|-----------|
| `structure`        | string  | Target anatomical structure (e.g., `aorta`)   | Required  |
| `measurement_type` | string  | Type of measurement: `length`, `area`, `angle`| `length`  |
| `unit`             | string  | Unit of measurement: `mm`, `cm`               | `mm`      |

:::tip  
Ensure images have sufficient resolution for accurate measurement.  
Adjust `structure` parameter carefully to match clinical needs.  
:::

---

### 📦 Output Format

Example output:

```json
{
  "measurements": {
    "aorta_diameter": 32.5,
    "unit": "mm"
  }
}
```

---

### 🛠️ Usage Example

```bash
curl -X POST "https://api.neolens.ai/v1/measurement" \
  -H "Authorization: Bearer <API_KEY>" \
  -F "image=@ct_scan.png" \
  -F "structure=aorta" \
  -F "measurement_type=length" \
  -F "unit=mm"
```

---

### ⚠️ Limitations

- Accuracy depends on image quality and modality.
- Complex shapes may require manual review.
- Some structures may not be supported yet.
