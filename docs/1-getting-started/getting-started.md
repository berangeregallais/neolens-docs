---
id: getting-started
title: Getting Started
description: Learn how to start using Neolens with your preferred workflow: API, SDK, or web interface.
---

## Getting Started

Welcome to **Neolens** – your intelligent medical imaging assistant.  
This guide walks you through the first steps to get up and running with the API, SDKs, or Web Interface depending on your use case.

---

### Who is this for?

Neolens is designed for:

- 🧑‍💻 **Developers** who want to integrate image analysis into clinical platforms.
- 🧠 **Data scientists** working on AI pipelines with medical images (DICOM, PNG, JPEG).
- 🩺 **Clinicians and radiologists** exploring diagnostic assistance or automated reporting.
- 🧪 **Researchers** testing models on custom datasets for detection, segmentation, and classification.

---

### Step-by-step onboarding

#### 1. Create your account

Sign up for free on [neolens.ai](https://neolens.ai) to access the dashboard and generate your API keys.

> 🚧 **Note:** This is a fictional project. Do not enter personal data.

---

#### 2. Generate an API key

Once logged in, navigate to **Settings > API Keys** and create a key with appropriate scopes.

- `read:images` → retrieve metadata and reports  
- `write:images` → upload and analyze images  
- `read:models` → fetch model capabilities and parameters  

ℹ️ [Learn more about Authentication](./authentication)

---

#### 3. Choose your integration path

| Use Case                    | Recommended Tool              | Documentation                               |
|-----------------------------|-------------------------------|---------------------------------------------|
| Backend devs (Node, Python) | REST API / SDK                | [API Reference](../api-reference/endpoints) |
| No-code / Quick tests       | Web UI                        | [Try Interactive API](../api-interactive)   |
| Research / Jupyter users    | Python SDK (in progress)      | Coming soon                                 |
| Bulk upload / automation    | REST API + CLI (soon)         | [Quickstart](./quickstart)                  |

---

#### 4. Upload an image

Example API request:

```bash
curl -X POST https://api.neolens.ai/v1/images \
  -H "Authorization: Bearer <your_api_key>" \
  -F "image=@brain_ct_scan.jpg"
```

Or upload via the dashboard:
→ Click “Upload Image” > Select modality > Confirm metadata > Launch analysis.

---

#### 5. Choose a model

Each analysis uses a specific model (e.g. anomaly-detection, segmentation, biometry).
Default models are preselected, but you can override via API parameter:
"model_id": "segmentation-v3"

See [AI Configuration](../ai-insights/configuring-ai) for tuning options. for tuning options.

---

#### 6. Interpret the results

Results are returned as:

- JSON (API): includes tags, scores, bounding boxes, measurements.
- Overlay visualization: see results on DICOM viewer or dashboard.
- Report preview (HTML/PDF): auto-generated clinical summary.

➡️ [Learn to interpret results](../ai-insights/interpreting-results)

---

#### Best practices

- 🧪 Test with various modalities and resolutions.
- ✅ Always validate results with medical professionals.
- 🔁 Automate batch uploads via the CLI (coming soon).
- 🛡️ Secure sensitive data with encrypted uploads and scopes.

---

## Next steps

- 📄 [Quickstart](./quickstart)
- 🔐 [Authentication](./authentication)
- 📚 [Full API Reference](../api-reference/endpoints)
- 🤖 [AI Concepts](../ai-insights/ai-concepts)
- 🔧 [AI Configuration](../ai-insights/configuring-ai)
- 🔍 [Interpreting Results](../ai-insights/interpreting-results)
- 💬 [API Troubleshooting](../api-reference/api-troubleshooting)
- ❓ [FAQ](../faq)

---

> ℹ️ Reminder: Neolens is a fictional project for portfolio purposes only.
