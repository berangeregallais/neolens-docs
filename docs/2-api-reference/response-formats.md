---
slug: /api-reference/response-formats
title: Response Formats
description: "Structured response formats for seamless integration, clear error reporting, and AI-powered insights with Neolens API."
---

Neolens API returns structured responses in various formats depending on the request type and client preference.

The default format is `application/json`, but some endpoints also support `csv` and `xml` for compatibility and export purposes.

---

## 📄 Default JSON Structure

All JSON responses follow a consistent structure:

```json
{
  "status": "success",
  "timestamp": "2025-07-24T10:03:12Z",
  "data": {
    // your results here
  },
  "meta": {
    "request_id": "b49d7a1f-1aa7-4be2-a8bd-31faabce829e",
    "version": "v1"
  }
}
```

| Field       | Type   | Description                                 |
| ----------- | ------ | ------------------------------------------- |
| `status`    | string | `"success"` or `"error"`                      |
| `timestamp` | string | UTC time of the response                      |
| `data`      | object | Payload of the response                       |
| `meta`      | object | Technical metadata (e.g. request ID, version) |

### 🔍 `meta` Object Properties

| Property     | Type   | Description                                                                                                    |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| `request_id` | string | A unique UUID generated for each API call. Use it for debugging, tracing logs, or reporting issues to support. |
| `version`    | string | API version used for the request, typically `"v1"` or `"v1.1"`. Helps ensure response schema consistency.      |

---

## 🧪 Sample Response: Image Analysis

```json
{
  "status": "success",
  "timestamp": "2025-07-24T10:05:44Z",
  "data": {
    "patient_id": "123456",
    "scan_id": "img_92827",
    "modality": "MRI",
    "findings": [
      {
        "label": "tumor_detected",
        "confidence": 0.93,
        "location": {
          "x": 312,
          "y": 140,
          "width": 87,
          "height": 74
        }
      }
    ],
    "recommendation": "Follow-up with contrast-enhanced scan within 2 weeks"
  },
  "meta": {
    "request_id": "68fe1094-4cda-439d-b3f4-832f365d28a1",
    "version": "v1"
  }
}
```

---

## 🔁 Alternate Formats

Some endpoints support alternative formats, which you can request using the Accept header or a query parameter (`?format=`).

| Format | MIME Type          | Notes                                     |
| ------ | ------------------ | ----------------------------------------- |
| JSON   | application/json   | Default, structured and readable          |
| CSV    | text/csv           | Suitable for bulk export and spreadsheets |
| XML    | application/xml    | For legacy system compatibility           |

Example:

```vbnet
GET /reports?format=csv
Accept: text/csv
```

---

## ⚠️ Error Responses

In case of failure, the API returns a standardized error structure:

```json
{
  "status": "error",
  "timestamp": "2025-07-24T10:06:20Z",
  "error": {
    "code": 403,
    "message": "You do not have permission to access this resource.",
    "details": "Required scope: read:scans"
  }
}
```

| Field     | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `code`    | number | HTTP status code                              |
| `message` | string | Human-readable error message                  |
| `details` | string | (Optional) Technical detail or fix suggestion |

---

:::tip[Best Practices]

Always check the status field before processing the data.

- Use the `request_id` in logs or support tickets for traceability.
- Prefer json format when integrating with front-end or mobile apps.
- For CSV, ensure column order and encoding (UTF-8) are respected.

:::

---

## 🧠 AI-Specific Notes

For endpoints returning AI predictions:

- `confidence` scores are floats between `0.0` and `1.0`.
- `labels` follow a controlled vocabulary (see glossary).
- Prediction outputs may include bounding boxes (`x`, `y`, `width`, `height`) for localization.

Always refer to the [Interpreting AI Output](/ai-insights/interpreting-results) section for guidance on clinical relevance.

---

Need help ? [Contact our support team](mailto:support@neolens.ai).
