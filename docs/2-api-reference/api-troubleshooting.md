---
slug: /api-reference/api-troubleshooting
title: API Troubleshooting
description: "Comprehensive guide to diagnosing and handling common API errors in Neolens, including status codes, example payloads, client-side handling, and troubleshooting tips."
---

## API Troubleshooting

This guide helps you diagnose and fix common issues when interacting with the Neolens API.

---

### 🧾 Common Error Responses

> Below is a summary table of the most frequent HTTP errors and how to resolve them.

| HTTP Status               | Description                          | Typical Causes                          | Recommended Actions                                          |
|---------------------------|--------------------------------------|-----------------------------------------|--------------------------------------------------------------|
| 400 Bad Request           | Invalid request syntax or parameters | Malformed JSON, missing required fields | Validate request payload and schema                          |
| 401 Unauthorized          | Authentication failure               | Missing/invalid API key or token        | Check authentication headers and token                       |
| 403 Forbidden             | Permission denied                    | Insufficient scopes or roles            | Verify API key permissions and scopes                        |
| 404 Not Found             | Resource does not exist              | Wrong endpoint or resource ID           | Confirm URL and resource identifiers                         |
| 409 Conflict              | Conflict with current state          | Duplicate resource or conflicting data  | Check request data and retry if needed                       |
| 429 Too Many Requests     | Rate limit exceeded                  | Too many requests in a given timeframe  | Implement retry logic with exponential backoff               |
| 500 Internal Server Error | Server failure                       | Temporary server issues, edge-case bugs | Retry later; contact support with `request_id` if persistent |

---

### 🧪 Example Error Payloads

```json
{
  "error": {
    "code": 401,
    "message": "Unauthorized: Invalid API key",
    "details": null
  }
}
```

```json
{
  "error": {
    "code": 429,
    "message": "Too Many Requests: Rate limit exceeded",
    "retry_after": 60
  }
}
```

```json
{
  "error": {
    "code": 400,
    "message": "Bad Request: Missing required field 'image_data'",
    "details": {
      "field": "image_data",
      "issue": "This field is required."
    }
  }
}
```

```json
{
  "error": {
    "code": 500,
    "message": "Internal Server Error: An unexpected condition occurred.",
    "request_id": "abc123-xyz789"
  }
}
```

> 💡 If available, always include the request_id when reporting issues — this helps the support team trace and diagnose faster.

---

### 🧑‍💻 Handling Errors on the Client Side

Here are examples of robust error handling in both Python and JavaScript:

Python (requests)

```py
import requests

response = requests.post("https://api.neolens.ai/v1/analyze", json=payload)
if response.status_code != 200:
    error = response.json().get("error", {})
    print(f"[{response.status_code}] {error.get('message')}")
    print("Request ID:", error.get("request_id", "N/A"))
```

JavaScript (fetch)

```js
fetch("https://api.neolens.ai/v1/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(res => res.json().then(data => {
  if (!res.ok) {
    console.error(`[${res.status}] ${data.error?.message}`);
    console.warn("Request ID:", data.error?.request_id || "N/A");
  }
}))
.catch(err => console.error("Network error:", err));
```

---

### 🔗 Helpful Links

- [Authentication & API Keys](../getting-started/authentication)
- [Rate Limiting](../getting-started/rate-limiting)
- [Error Handling](./error-handling)

---

### 📋 Understanding Custom Error Codes

> The following table explains optional fields you may find in error responses.

| Field         | Type    | Description                                         |
| ------------- | ------- | --------------------------------------------------- |
| `code`        | integer | HTTP status code of the error                       |
| `message`     | string  | Human-readable description of the error             |
| `details`     | object  | Optional context on which field or parameter failed |
| `retry_after` | integer | (for 429 errors) Seconds to wait before retry       |
| `request_id`  | string  | Unique identifier for debugging with support        |

---

### 🛠️ Troubleshooting Tips

:::warning ⚠️

Why do I get `429 Too Many Requests` when I’m sending few requests?
Rate limits are enforced per API key and per IP.

Bursts of requests or parallel calls can trigger limits.

Use exponential backoff and monitor usage.

:::

::note 📝

How to handle `401 Unauthorized` errors?
Verify your API key is valid and included correctly.

Check if the token expired or was revoked.

Confirm you have the necessary scopes.

:::

:::tip ✅

What to do if `400 Bad Request` errors occur?
Double-check JSON syntax and required fields.

Validate parameter types and values.

Review API reference for correct usage.

:::

---

### 🧑‍💼 Need Help?

If you can’t resolve an issue:

📧 Contact [Neolens support](mailto:support@neolens.ai)
🕐 Typical response time: within 24 business hours

When reaching out, please include:

- The full error message and status code
- The request_id (if available)
- Timestamp of the request
- The request payload (or a sample, if sensitive)
