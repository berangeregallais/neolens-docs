---
slug: /integration/export-formats
title: Export Formats
---

## 💾 Export Formats

Neolens supports multiple export formats to facilitate integration and reporting across clinical systems.

---

### 📁 Supported Formats

| Format      | Description                                   | Use Case                   |
|-------------|-----------------------------------------------|----------------------------|
| PDF         | Printable, shareable diagnostic reports       | Clinical documentation     |
| JSON        | Structured data for programmatic processing   | Integration and analytics  |
| DICOM SR    | Standard format for imaging reports           | Radiology workflows        |
| HL7 CDA     | Clinical Document Architecture for EHR systems| Health records management  |

---

### ⚙️ Export Options

- Choose output format via `format` parameter.
- Include annotated images with `include_images` flag.
- Customize report templates as needed.

---

### 🛠️ Usage Example

```bash
curl -X GET "https://api.neolens.ai/v1/export?analysis_id=ANL123456&format=pdf&include_images=true" \
  -H "Authorization: Bearer <API_KEY>"
```

---

### ⚠️ Limitations

- Large image embeddings may increase file size significantly.
- Some formats require additional processing on the client side.
