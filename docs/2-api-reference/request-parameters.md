---
slug: /api-reference/request-parameters
title: Request Parameters
---

## Request Parameters

This section describes the parameters commonly used when making requests to the Neolens API.

### 🔍 Query Parameters

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `search`  | string | Text to search across patient records or image metadata. |
| `limit`   | int    | Number of results to return (default: `20`, max: `100`). |
| `offset`  | int    | Number of results to skip (for pagination). |
| `sort`    | string | Sorting order (e.g., `date:asc`, `confidence:desc`). |

:::tip

Use `offset` and `limit` together to paginate through large result sets.

:::

### 📦 Request Body Parameters (POST/PUT)

| Parameter      | Type       | Description |
|----------------|------------|-------------|
| `image_data`   | base64     | Base64-encoded image file (max 10 MB). |
| `patient_id`   | string     | ID of the patient the image belongs to. |
| `modality`     | string     | Imaging modality (e.g., `X-ray`, `MRI`, `CT`). |
| `notes`        | string     | Optional free-text note. |

### 🧾 Headers

| Header            | Required | Description |
|-------------------|----------|-------------|
| `Authorization`   | ✅       | Bearer token obtained via authentication. |
| `X-Neolens-Client`| ✅       | Your registered client ID. |
| `Content-Type`    | ✅       | Always `application/json`. |

### 🎛️ Optional Parameters

| Parameter      | Type    | Description |
|----------------|---------|-------------|
| `confidence_min` | float | Only return results above this confidence threshold. |
| `tags`           | array | Filter results by image tags. |

---

### ✅ Best Practices

:::tip[Best Practices]

- Always validate user input before sending it to the API.
- When handling large datasets, implement pagination with `limit` and `offset`.
- Avoid sending unnecessary fields in the request body.

:::

---

### 📌 Special Cases

:::note[Partner Use Case]

If you’re a hospital partner using a custom deployment, you may have specific required parameters or limits (e.g., restricted `modality` types or `patient_id` patterns). Refer to your deployment guide or contact support.

:::

---

### 🧠 Ethical & Regulatory Considerations

Rate limiting and strict parameter validation help ensure **traceability**, prevent **accidental misuse of data**, and support compliance with **healthcare data regulations** (e.g., GDPR, HIPAA).

---

Need help? [Contact our support team](mailto:support@neolens.ai).
