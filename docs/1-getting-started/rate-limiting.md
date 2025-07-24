---
slug: api/rate-limiting
title: Rate Limiting
---

## Rate Limiting

To ensure performance, security, and fair usage, the **Neolens API** enforces strict rate limiting policies. These limits help prevent abuse, guarantee system availability, and align with medical data governance standards, including **traceability**, **compliance**, and **ethical access** to sensitive imaging data.

> Rate limiting is not just a technical safeguard — it's also key to ensuring **traceability**, **auditability**, and **responsible AI** usage in healthcare applications.

---

### Standard Rate Limits

By default, the following limits apply:

| Client Type            | Limit                 | Period      |
|------------------------|-----------------------|-------------|
| Public API consumers   | 100 requests          | per minute  |
| Registered developers  | 1,000 requests        | per minute  |
| Hospital partners      | Custom rate limits    | per SLA     |

If these limits are exceeded, a `429 Too Many Requests` error is returned.

---

### Best Practices

:::tip[Optimize your usage]

- Batch requests whenever possible.
- Use caching on client-side apps for read-only endpoints.
- Schedule heavy workloads during off-peak hours.

:::

:::tip[Monitor your rate usage]

You can monitor your usage via the response headers:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

:::

---

### Custom Limits for Hospital Partners

:::note[Custom Access Policies]

For enterprise and hospital partners, rate limits are configurable based on service-level agreements (SLAs). These may include:

- Higher thresholds for high-volume diagnostic tools
- Specific bandwidth windows for emergency cases
- Time-based throttling for batch jobs

For more information, contact your Neolens account manager.

:::

---

### Error Handling

When the rate limit is exceeded, the API returns:

```json
{
  "error": "Too Many Requests",
  "code": 429,
  "message": "Rate limit exceeded. Try again in 10 seconds."
}
```

Use the `Retry-After` header to implement smart retries and backoff mechanisms.

---

### Troubleshooting

Why am I getting 429 errors even when sending few requests?

:::caution[Possible causes]

You’re using the public token with multiple clients.
You’re making rapid burst calls in under a second.
Background jobs or retries may be unintentionally spamming an endpoint.

:::

Check your logs and make sure requests are spaced properly and distributed efficiently across time.

---

### Regulatory and Ethical Considerations

In the healthcare domain, rate limiting plays a critical role in:

- Protecting infrastructure against overloads that could delay critical diagnoses
- Preventing unauthorized access or scraping of sensitive data
- Complying with GDPR and healthcare data privacy regulations
- Ensuring fair and auditable access across different roles and institutions

Need a higher rate limit? [Get in touch with our support team →](mailto:support@neolens.ai) or refer to your SLA.
