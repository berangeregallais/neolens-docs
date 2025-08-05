---
slug: ai-act-conformity
title: Conformity with AI Act – Annex IV
---

## Conformity with the AI Act (Annex IV)

This page outlines how the Neolens documentation fulfills the requirements set forth in **Annex IV** of the **EU Artificial Intelligence Act (AI Act)** regarding the technical documentation for high-risk AI systems.

Each section of Annex IV is mapped below to its corresponding documentation area.

---

### 1. General Description of the AI System

**Requirement:**  
A general description of the AI system, its intended purpose, and the system's overall logic.

**Documentation Mapping:**  

- [`overview.md`](overview.md) – Provides a high-level description of Neolens' purpose (medical image analysis), technical logic, and user base.  
- [`use-cases-by-industry.md`](../ai-insights/use-cases-by-industry.md) – Lists specific real-world scenarios across clinical sectors.  

---

### 2. System Development and Training

**Requirement:**  
Information about the development process, training data sources, and data governance.

**Documentation Mapping:**  

- [`ai-concepts.md`](../ai-insights/ai-concepts.md) – Clarifies key terms related to model training and data handling.  
- [`configuring-ai.md`](../ai-insights/configuring-ai.md) – Explains parameterization and configuration logic.  
- [`ai-limitations.md`](../ai-insights/ai-limitations.md) – States known limitations, biases, and performance considerations.

---

### 3. Technical Parameters and Configurability

**Requirement:**  
A detailed description of the system’s configuration, settings, and limits.

**Documentation Mapping:**

- [`configuring-ai.md`](../ai-insights/configuring-ai.md) – Presents the types of configurable parameters and use cases.  
- [`interpreting-results.md`](../ai-insights/interpreting-results.md) – Explains how parameter changes affect outputs.

---

### 4. Human Oversight Measures

**Requirement:**  
Details of how human oversight is ensured during AI usage.

**Documentation Mapping:**  

- [`best-practices.md`](../ai-insights/best-practices.md) – Lists recommended human interventions and verification workflows.  
- [`ai-troubleshooting.md`](../ai-insights/ai-troubleshooting.md) – Supports diagnostic guidance for human operators.

---

### 5. System Performance and Accuracy

**Requirement:**  
Information on accuracy, robustness, and cybersecurity resilience.

**Documentation Mapping:**  

- [`detection.md`](../functional-modules/detection.md)  
- [`classification.md`](../functional-modules/classification.md)  
- [`ai-limitations.md`](../ai-insights/ai-limitations.md) – Describes performance thresholds and known limitations.  

---

### 6. Risk Management and Compliance

**Requirement:**  
Details of the measures taken to comply with obligations under the AI Act.

**Documentation Mapping:**

- [`gdpr.md`](../compliance/gdpr.md) – Describes GDPR alignment, data minimization, and security-by-design.  
- [`ai-limitations.md`](../ai-insights/ai-limitations.md) – Covers identified ethical and legal constraints.

---

### 7. Record-Keeping and Traceability

**Requirement:**  
Mechanisms for logging, traceability, and version control.

**Documentation Mapping:**  

- [`authentification.md`](../getting-started/authentification.md) – Details how API calls are authenticated and logged.  
- [`api-troubleshooting.md`](../api-reference/api-troubleshooting.md) – Explains how logs are used for error diagnosis.

---

### 8. Post-Market Monitoring

**Requirement:**  
Plans and mechanisms to monitor the system after deployment.

**Documentation Mapping:**

- _(Simulated)_ This demo documentation assumes a monitoring plan exists but is not implemented in this fictional example. Placeholder section may be added later.

---

## Disclaimer

> 🧪 This documentation is part of a fictional portfolio project. It does **not** represent a real medical device or AI system, and is **not legally certified** under the AI Act. However, it is intentionally structured to simulate conformity with **Annex IV** of the EU AI Act to demonstrate good documentation practices.
