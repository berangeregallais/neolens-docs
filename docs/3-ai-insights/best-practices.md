---
slug: /ai-insights/best-practices
title: Best Practices for Using Neolens AI
description: "Discover essential best practices to use Neolens AI safely and effectively. This guide covers model understanding, validation, responsible configuration, continuous monitoring, purposeful integration, clear communication, and regulatory compliance—empowering you to maximize AI benefits while managing risks."
---

## ✅ Best Practices for Using Neolens AI

> _Use Neolens safely, effectively, and meaningfully by following these best practices._

---

### 🧠 1. Understand Your Model

- Know which version of the model is deployed (check `model_id` in metadata).
- Be aware of its training scope (e.g., adult vs pediatric data).
- Understand its known strengths and blind spots (see [AI Limitations](./ai-limitations)).

:::tip
Use the `/model/info` endpoint to retrieve current version details and changelogs.
:::

---

### 🔬 2. Validate in Context

- Always validate AI outputs with domain experts.
- Compare with prior studies and clinical records.
- Evaluate performance across different devices and populations.

:::warning
Never use Neolens in clinical decision-making **without human oversight.**
:::

---

### ⚙️ 3. Configure Responsibly

- Tune thresholds and filters to reduce false positives in your workflow.
- Document all configuration changes (e.g., `min_confidence: 0.85`).
- Use test datasets for performance evaluation after changes.

---

### 🔄 4. Monitor Continuously

- Set up logging and feedback collection loops.
- Track user edits vs. AI suggestions to detect drift or mismatch.
- Re-evaluate regularly as the model or data changes.

---

### 🛠️ 5. Integrate with Purpose

- Only automate where AI confidence is consistently high.
- Avoid “black box” integrations — always allow result inspection.
- Include fallback mechanisms and clinician override options.

---

### 🤝 6. Communicate Clearly

- Label AI-generated insights in UIs and reports.
- Inform patients and staff when AI is used in diagnosis or triage.
- Provide links to documentation and audit logs.

---

### 📊 7. Stay Compliant

- Align usage with your local data protection laws (e.g., GDPR, HIPAA).
- Apply RBAC for sensitive endpoints.
- Keep audit logs for all API calls involving patient data.
