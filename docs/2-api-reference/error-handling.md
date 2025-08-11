---
slug: /api-reference/error-handling
title: Error Handling
description: "Comprehensive guide to handling errors in Neolens API, including HTTP status codes, error formats, AI-specific issues, rate limiting, and best practices for robust client-side error management."
---

## Error Handling

Neolens API uses standard HTTP status codes to indicate the success or failure of an API request. In case of errors, the response body contains detailed information to help you diagnose and fix issues efficiently.

---

### Common HTTP Status Codes

| Status Code | Meaning                 | Description                                    |
|-------------|-------------------------|------------------------------------------------|
| 200         | OK                      | Request succeeded                              |
| 400         | Bad Request             | Invalid parameters or malformed request        |
| 401         | Unauthorized            | Missing or invalid authentication token        |
| 403         | Forbidden               | Insufficient permissions or scope              |
| 404         | Not Found               | Resource does not exist                        |
| 409         | Conflict                | Conflict with current state (e.g., duplicate)  |
| 429         | Too Many Requests       | Rate limit exceeded                            |
| 500         | Internal Server Error   | Unexpected error on the server                 |

---

### Error Response Format

Error responses follow a standard JSON structure:

```json
{
  "status": "error",
  "timestamp": "2025-07-24T11:30:12Z",
  "error": {
    "code": 403,
    "message": "Access denied: missing scope 'scans:write'.",
    "details": "Your token does not grant write permissions for scans."
  }
}
```

| Field     | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| `code`    | integer | HTTP status code                    |
| `message` | string  | Human-readable error message        |
| `details` | string  | Optional technical details or hints |

---

### Handling AI-Specific Errors

Certain errors are specific to AI model processing:

- **ModelUnavailable (503)**: The AI model is temporarily offline or updating.
- **LowConfidence (422)**: The model’s confidence score is below the acceptable threshold.
- **InputFormatError (400)**: The input image format is not supported or corrupted.

When receiving AI-specific errors, try re-submitting the request with corrected data or contact support if the problem persists.

---

### Rate Limiting and 429 Errors

The API enforces rate limits to protect system stability.

If you receive a `429 Too Many Requests` response:

- Check your current request frequency.
- Implement exponential backoff or retry strategies.
- Refer to the [Rate Limiting](../getting-started/rate-limiting) section for thresholds.

---

:::tip[Best Practices]

- Always check the `status` field before processing API responses.
- Log error `code` and `request_id` for debugging and support requests.
- Provide clear feedback to end users when errors occur.
- Validate all inputs client-side before sending requests.

:::

---

Need help? [Contact our support team](mailto:support@neolens.ai).
