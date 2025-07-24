---
slug: /api-reference/api-troubleshooting
title: API Troubleshooting
---

## API Troubleshooting

This guide helps you diagnose and fix common issues when interacting with the Neolens API.

---

### Common Error Responses

| HTTP Status        | Description                          | Typical Causes                         | Recommended Actions                        |
|--------------------|------------------------------------|--------------------------------------|--------------------------------------------|
| 400 Bad Request    | Invalid request syntax or parameters | Malformed JSON, missing required fields | Validate request payload and schema        |
| 401 Unauthorized   | Authentication failure             | Missing/invalid API key or token      | Check authentication headers and token     |
| 403 Forbidden      | Permission denied                  | Insufficient scopes or roles          | Verify API key permissions and scopes      |
| 404 Not Found      | Resource does not exist            | Wrong endpoint or resource ID         | Confirm URL and resource identifiers       |
| 409 Conflict       | Conflict with current state        | Duplicate resource or conflicting data | Check request data and retry if needed     |
| 429 Too Many Requests | Rate limit exceeded             | Too many requests in a given timeframe | Implement retry logic with exponential backoff |
| 500 Internal Server Error | Server failure              | Temporary server issues                | Retry later; contact support if persistent |

---

### Example Error Payloads

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

---

### Helpful Links

- [Authentication & API Keys](../1-getting-started/authentication)
- [Rate Limiting](../1-getting-started/rate-limiting)
- [Error Handling](../2-api-reference/error-handling)

---

### Understanding Custom Error Codes

Neolens API may include additional error metadata to help diagnose issues:

| Field         | Type      | Description                                          |                                              |
| ------------- | --------- | ---------------------------------------------------- | -------------------------------------------- |
| `code`        | integer | HTTP status code of the error                        |                                              |
| `message`     | string  | Human-readable description of the error              |                                              |
| `details`     | object  | `null`                                               | Optional object providing additional context |
| `retry_after` | integer | (for 429 errors) Seconds before next allowed request |                                              |

:::tip 💡
Use these fields to implement robust error handling and provide clear feedback to users.
:::

---

### Troubleshooting Tips

:::warning ⚠️

#### Why do I get `429 Too Many Requests` when I’m sending few requests?

- Rate limits are enforced per API key and per IP.
- Bursts of requests or parallel calls can trigger limits.
- Use exponential backoff and monitor usage.

:::

:::note 📝

#### How to handle `401 Unauthorized` errors?

- Verify your API key is valid and included correctly.
- Check if the token expired or was revoked.
- Confirm you have the necessary scopes.

:::

:::tip ✅

#### What to do if `400 Bad Request` errors occur?

- Double-check JSON syntax and required fields.
- Validate parameter types and values.
- Review API reference for correct usage.

:::

---

### Need help?

If you can’t resolve an issue, [contact our support team](mailto:support@neolens.ai).
