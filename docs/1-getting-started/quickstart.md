---
slug: quickstart
title: Quickstart Guide
description: "Quickstart guide to rapidly integrate Neolens API for secure, efficient medical image analysis using authentication and the /analyze endpoint."
---

This guide will help you get started with the **Neolens API** in just a few steps.

## Prerequisites

- Valid API key (see [Authentication](authentication.md) section)  
- Supported medical image formats: DICOM, PNG, JPG  
- Basic knowledge of REST API concepts and HTTP methods

## Base URL

```bash
https://api.neolens.health/v1
```

## Authentication

All requests require an `Authorization` header with your API key:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Example: Analyze a medical image

Use the `/analyze` endpoint to submit a medical image for AI analysis.

#### Request (cURL example)

```bash
curl -X POST "https://api.neolens.health/v1/analyze" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@/path/to/image.dcm" \
  -F "confidenceThreshold=0.85"
```

#### Successful Response

```json
{
  "timestamp": "2025-07-22T14:30:00Z",
  "patientId": "P-123456",
  "findings": [
    {
      "label": "Pulmonary Nodule",
      "confidence": 0.92,
      "location": "left upper lobe",
      "priority": "high"
    }
  ],
  "recommendation": "Suggest CT follow-up within 7 days.",
  "modelVersion": "v3.2.1"
}
```

##### Response Fields

| Field                   | Type   | Description                                              |
| ----------------------- | ------ | -------------------------------------------------------- |
| `timestamp`             | string | ISO 8601 date and time when the analysis was performed   |
| `patientId`             | string | Identifier provided by the client for tracking purposes  |
| `findings`              | array  | List of AI-detected medical findings                     |
| `findings[].label`      | string | Detected anomaly or structure (e.g., "Pulmonary Nodule") |
| `findings[].confidence` | float  | Confidence score of the detection, between 0 and 1       |
| `findings[].location`   | string | Anatomical location of the finding                       |
| `findings[].priority`   | string | Severity level (`low`, `medium`, `high`)                 |
| `recommendation`        | string | Suggested clinical action or follow-up                   |
| `modelVersion`          | string | AI model version used for the analysis                   |

This quickstart provides the essential workflow to integrate Neolens into your clinical or development environment rapidly.

For detailed API reference and configuration options, see the following sections.
