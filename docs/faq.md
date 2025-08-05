---
slug: faq
title: FAQ
---

## Frequently Asked Questions

### What types of medical images does Neolens support?

Neolens currently supports **DICOM** images from CT, MRI, and X-ray modalities. We also support standard image formats (e.g., `.jpg`, `.png`) for non-diagnostic workflows or prototypes. Support for ultrasound and PET is in beta.

---

### Can I use Neolens without clinical approval or CE/FDA certification?

Neolens is intended for **research and development purposes only**. It is **not certified as a medical device** and should not be used for clinical decision-making or patient diagnostics.

---

### Is Neolens compliant with the European AI Act or other regulations?

Neolens was designed with key AI Act principles in mind, including transparency, traceability, and human oversight. However, full regulatory certification is not claimed, as this is a fictional portfolio project.

---

### How do I troubleshoot inconsistent AI results?

If your AI outputs vary between similar inputs, check the following:

- Ensure image quality (resolution, artifacts, cropping) is consistent  
- Check the model version and parameters used in each request  
- Avoid using images outside of the model's training distribution (e.g., pediatric scans on an adult model)  

For advanced control, review the [AI Configuration](./ai-insights/configuring-ai) section and use the `seed` field to make inference deterministic.

---

### What happens if I exceed the rate limit?

If your requests exceed the allowed rate per minute or hour, you will receive a `429 Too Many Requests` error. You can:

- Retry after the `Retry-After` header delay  
- Contact support to discuss custom rate limits for your account  

Rate limit details are available in the [Rate Limiting](./getting-started/rate-limiting) section.

---

### Can I fine-tune or customize the AI model?

Not at this time. Neolens offers model configuration via parameters (e.g., threshold, heatmap intensity), but **fine-tuning** or retraining is not available in the public API. Contact us for enterprise licensing or custom partnerships.

---

### How does Neolens handle data privacy and patient information

Uploaded images must be anonymized by the client before being sent to the API. Neolens does not store any personally identifiable information (PII). All requests are processed in a stateless, ephemeral way.

---

### What should I do if I get a 403 Forbidden error while calling the API?

This usually means your API token does not have the required role or scope for the requested endpoint. Check your authentication settings and ensure your role (e.g., `clinician`, `researcher`) is correctly configured.
