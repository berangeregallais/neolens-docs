---
slug: /ai-insights/ai-troubleshooting
title: AI Troubleshooting
description: "Troubleshooting guide for common AI issues in Neolens — from inconsistent results and model refusals to API errors. Learn how to diagnose problems, interpret error messages, and when to escalate to support for a smooth, reliable experience."
---

> _When working with intelligent systems, unexpected behaviors may occur — from irrelevant results to model refusals or latency issues. This section helps you identify, understand, and resolve common AI-related problems in Neolens._

## ⚠️ Common Issues

### 🔄 Inconsistent Outputs

- **Symptoms:** Same input yields different results.
- **Causes:** Model stochasticity, non-fixed temperature value.
- **Fixes:**  
  - Set `temperature` to `0.0` for deterministic output.  
  - Use a fixed `seed` (if available).

### 🙈 Irrelevant or Incomplete Analysis

- **Symptoms:** Output is vague, unrelated, or missing key anatomical data.
- **Causes:** Ambiguous input, unrecognized data format, lack of signal in image.
- **Fixes:**  
  - Double-check input file format and quality.  
  - Validate that anatomical region is supported.  
  - Try adjusting the prompt or re-uploading the image.

### 🛑 AI Refuses to Generate Output

- **Symptoms:** Model refuses, citing uncertainty or safety concern.
- **Causes:** Image too ambiguous or sensitive content detection triggered.
- **Fixes:**  
  - Provide clearer inputs.  
  - Lower the `safety` threshold (if adjustable).  
  - Check logs for flagged content.

---

## 💡 Model Bias & Interpretation Gaps

:::warning[Bias Risk]
AI models may underperform on underrepresented patient populations. Always cross-check critical outputs with clinical expertise.
:::

---

## 🧾 API Error Messages

Here are some typical API errors you may encounter:

| Status Code | Meaning                        | Example Message                              | Action                                                                                  |
|-------------|--------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------|
| 400         | Bad Request                    | `{"error":"Missing required field: image"}`  | Check input format and required fields.                                                 |
| 401         | Unauthorized                   | `{"error":"Invalid API key"}`                | Verify your API credentials.                                                            |
| 429         | Too Many Requests              | `{"error":"Rate limit exceeded"}`            | Wait or adjust frequency. See [Rate Limiting](../getting-started/rate-limiting).    |
| 500         | Internal Server Error          | `{"error":"Unexpected server failure"}`      | Retry later. Contact support if persistent.                                             |

> 💡 **Where to find the request ID?**  
> Each API response includes a `request_id` in the headers or JSON body. Include this when contacting support for troubleshooting.

---

## 🕵️ Debugging Tips

- **Log Every Request:** Include `input`, `parameters`, and `timestamp` for traceability.
- **Compare Runs:** Use side-by-side comparisons with slight param changes.
- **Leverage `debug=true`:** Enables verbose mode to inspect model decisions and intermediate steps.

---

## ✅ When to Escalate

Contact Neolens support if:

- Output is empty despite valid input.
- API returns repeated 500 errors.
- Model response is offensive or violates ethical guidelines.

Provide the following when reaching out:

- `request_id` (from the API response)
- Sample input or image metadata
- Timestamp of the failed request
