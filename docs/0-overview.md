---
slug: overview
title: Neolens — Intelligent Medical Imaging API Overview
description: "High-performance AI-powered medical imaging API for anomaly detection, classification, measurement, and clinical reporting."
---

## Neolens — Intelligent Medical Imaging API Overview

Neolens is a high-performance medical imaging analysis API leveraging advanced AI models to support clinical decision-making and healthcare workflows.

### Target audience

- **Radiologists & Clinical Experts:** Access precise anomaly detection, pathology classification, and anatomical measurements powered by deep learning models trained on large-scale medical datasets.  
- **Healthcare IT & System Integrators:** Integrate seamlessly with PACS, RIS, and EHR systems via secure RESTful APIs, compliant with HIPAA and GDPR regulations.  
- **Developers & Data Scientists:** Utilize a fully documented OpenAPI specification supporting multipart image uploads, customizable inference parameters, and real-time results streaming.  
- **Researchers & AI Engineers:** Explore model architecture details, uncertainty quantification methods, and algorithmic limitations documented transparently for reproducibility and ethical deployment.

### Neolens Processing Pipeline

The image below summarizes how Neolens processes input medical images through each functional module.

![Neolens AI Pipeline](/img/neolens-pipeline.png "Diagram showing Neolens AI pipeline from image input to detection, classification, measurement, and reporting.")

<small style={{ display: "block", color: "#888", marginTop: "0.5rem" }}>
This illustration is for demonstrative purposes and may not reflect real medical workflows.
</small>

### Core functionalities

Neolens provides modular capabilities that can be used independently or in combination:

- 📍 **Detection**: Identify regions of interest or abnormalities in medical images  
- 🧠 **Classification**: Categorize detected findings using clinically relevant labels  
- 📏 **Measurement**: Compute anatomical distances, volumes, or angles with precision  
- 📝 **Report Generation**: Automatically generate structured reports from results  
- 🔒 **Traceability**: Store, audit, and retrieve prediction history for legal safety  

Each module includes clear endpoints, parameter configuration options, and interpretation guidance.

### Compliance and integration

Neolens is engineered for the regulated healthcare environment:

- Full compliance with GDPR and medical device regulations (MDR)  
- Secure authentication and authorization with OAuth 2.0 and API key management  
- Extensive audit logging and traceability to support clinical governance  
- Modular design for easy integration with hospital IT ecosystems (HL7, FHIR compatible)

---

Dive into the documentation to explore API endpoints, configuration parameters, data formats, and best practices for deploying Neolens in production environments.

:::tip[⚖️ AI Act Compliance (Annex IV)]
This documentation **partially complies with Annex IV of the European Union’s AI Act**, which outlines the mandatory technical documentation for high-risk AI systems.  
It has been structured to **demonstrate best practices** in transparency, interpretability, and risk management, within the scope of a **fictional portfolio project**.

This is not a legally binding document, but an **illustration of how technical writers and documentation engineers can contribute** to trustworthy AI by aligning with regulatory expectations.
:::
