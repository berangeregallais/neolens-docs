---
slug: /integration/hospital-systems
title: Hospital Systems Integration
---

## 🏥 Hospital Systems Integration

Neolens supports seamless integration with existing hospital infrastructure to streamline workflows and data exchange.

---

### 🎯 Goals

- Facilitate interoperability with Electronic Health Records (EHR) and PACS.
- Automate data imports/exports for imaging and reports.
- Ensure compliance with healthcare IT standards (HL7, DICOM, FHIR).

---

### 🔧 Supported Protocols

| Protocol | Description                         |
|----------|-------------------------------------|
| HL7      | Messaging standard for clinical data|
| DICOM    | Standard for medical imaging files  |
| FHIR     | Modern web-based healthcare APIs    |

---

### ⚙️ Integration Methods

- RESTful API endpoints for data exchange.
- Webhooks for real-time event notifications.
- SDKs available for custom integrations.

---

### 🛠️ Usage Example

```bash
curl -X POST "https://api.neolens.ai/v1/integration/pacs" \
  -H "Authorization: Bearer <API_KEY>" \
  -F "patient_id=12345" \
  -F "image=@scan.dcm"
```

---

### ⚠️ Limitations

- Some legacy systems may require middleware.
- Network security and firewall configurations need consideration.
