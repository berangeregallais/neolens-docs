---
title: API Endpoints
slug: /api-reference/endpoints
description: "Detailed reference of Neolens API endpoints with usage, authentication scopes, request examples, and security notes for managing medical scans, AI analysis, and user audits."
---

## API Endpoints

The Neolens API is organized around RESTful principles. All endpoints are versioned under `/v1/` and respond with JSON by default. Secure communication over HTTPS is required for all requests.

### Base URL

`https://api.neolens.ai/v1/`

---

### 🔍 Scan Endpoints

These endpoints let you upload and manage medical image scans for analysis.

#### `POST /scans`

Upload a new medical image for processing.

- **Scope required:** `write:scans`
- **Auth required:** ✅
- **Rate-limited:** ✅

```bash
curl -X POST https://api.neolens.ai/v1/scans \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@brain-mri.dcm"
```

This endpoint accepts DICOM, PNG, and JPEG formats. File size must not exceed 100MB.

---

#### `GET /scans/{scan_id}`

Retrieve the full results of a previously submitted scan.

- **Scope required**: `read:scans`
- **Auth required**: ✅

#### `DELETE /scans/{scan_id}`

Permanently delete a scan and all associated data.

- **Scope required**: admin:scans
- **Auth required**: ✅

Scan deletion is **irreversible** and will affect audit history.

---

### 🧠 AI Analysis Endpoints

These endpoints return insights extracted by Neolens' AI models.

#### `GET /scans/{scan_id}/findings`

Retrieve structured AI findings (anomalies, measurements, confidence scores).

- **Scope required**: `read:findings`
- **Typical response**:

```json
{
  "lesion_detected": true,
  "confidence": 0.92,
  "measurements": {
    "volume_cc": 3.4,
    "diameter_mm": 12.7
  }
}
```

#### `GET /scans/{scan_id}/report`

Generate a PDF clinical report from AI output.

- **Scope required**: `read:report`
- **Formats availables**: `application/pdf`, `application/json`

---

### 👤 User & Audit Endpoints

#### `GET /me`

Get information about the current authenticated user.

- **Scope required**: `read:profile`

#### `GET /logs`

Retrieve access logs and audit trail (admin only).

- **Scope required**: `admin:audit`

:::tip[Best Practices]

Audit logs should be periodically exported to your hospital system for traceability compliance.

:::

---

### 🛡️ Security Notes

All endpoints require OAuth 2.0 bearer tokens. Make sure your token is scoped correctly for the endpoint you're calling.

If you receive a `403 Forbidden` response, it may be due to:

- Insufficient scope
- A restricted endpoint for your user role
- A deactivated API key

Contact [support@neolens.ai](mailto:support@neolens.ai) for custom role configurations.
