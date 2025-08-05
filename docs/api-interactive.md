---
slug: /api-interactive
title: Interactive API Explorer
---

## 🚀 Interactive API Explorer

> Experience the Neolens API hands-on with our interactive documentation. Test endpoints, upload images, and see real AI analysis results without writing code.

---

## 🎯 Quick Start Guide

### 1. Authentication Setup

Before using the interactive explorer, you'll need an API key:

```bash
# Your API key format
neolens_live_abcd1234efgh5678ijkl9012
```

**Getting your API key:**

1. Visit [neolens.ai/dashboard](https://neolens.ai/dashboard) (fictional)
2. Navigate to "API Keys" section
3. Click "Generate New Key"
4. Copy and save your key securely

### 2. First Interactive Request

#### Interactive API Tester

*Note: This is a documentation mockup. In a real implementation, this would be a functional API testing interface.*

```yaml
# Interactive Form Simulation
endpoint: POST /v1/analyze
authentication: Bearer [Your API Key]
content_type: multipart/form-data

# File Upload Section
image_file: [Choose File] # Upload DICOM, PNG, or JPG
confidence_threshold: 0.75 # Slider: 0.1 - 1.0
modality: "auto-detect" # Dropdown: auto, CT, MRI, X-ray

# Advanced Options (Collapsible)
model_version: "v3.2.1" # Dropdown
verbosity: "standard" # minimal, standard, verbose
region_of_interest: "auto" # auto, thorax, abdomen, brain

[Send Request] [Clear] [Copy as cURL]
```

**Expected Response Preview:**

```json
{
  "status": "success",
  "timestamp": "2025-08-05T14:30:22Z",
  "processing_time": "8.3s",
  "data": {
    "patient_id": "demo_patient_001",
    "findings": [
      {
        "label": "pulmonary_nodule",
        "confidence": 0.87,
        "location": {
          "x": 245, "y": 156,
          "width": 32, "height": 28
        },
        "clinical_significance": "moderate"
      }
    ],
    "recommendation": "Consider follow-up CT in 3 months"
  }
}
```

---

## 📚 Interactive Documentation Features

### Live Code Examples

Each endpoint includes runnable examples in multiple languages:

#### Language Code Generator

Select your preferred language and see automatically generated code:

**Language:** `Python` `JavaScript` `cURL` `PHP` `Ruby`

```python
# Auto-generated Python example
import requests

url = "https://api.neolens.ai/v1/analyze"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
files = {
    "image": open("chest_xray.jpg", "rb")
}
data = {
    "confidence_threshold": 0.75,
    "modality": "auto-detect"
}

response = requests.post(url, headers=headers, files=files, data=data)
result = response.json()
print(f"Analysis complete: {result['data']['findings']}")
```

**Actions:** [Copy Code] [Run in Notebook] [Modify Parameters]

### Response Visualization

Interactive response viewer with syntax highlighting and expandable sections:

#### Response Explorer

```json
{
  "status": "success", // ✅ Request successful
  "processing_time": "8.3s", // ℹ️ Within normal range (< 15s)
  "data": {
    "findings": [ // 📍 2 findings detected
      {
        "label": "pulmonary_nodule", // 🔍 Click to learn more
        "confidence": 0.87, // 🎯 High confidence
        "bounding_box": [245, 156, 32, 28] // 📐 Pixel coordinates
      }
    ]
  }
}
```

**Actions:** [Expand All] [Collapse] [Download JSON] [Share Response]

---

## 🧪 Interactive Tutorials

### Tutorial 1: Your First AI Analysis

**Goal:** Upload an image and get AI analysis results

**Estimated time:** 5 minutes

#### Steps to Complete

##### Step 1: Prepare Your Image

- ✅ Download sample image: [`chest_xray_sample.jpg`](https://samples.neolens.ai/chest_xray.jpg)
- ✅ Ensure image is < 10MB
- ✅ Supported formats: DICOM (.dcm), JPEG (.jpg), PNG (.png)

##### Step 2: Authentication

- ✅ Enter your API key in the field above
- ✅ Test connection with "Ping API" button

##### Step 3: Upload and Analyze

- ✅ Select your image file
- ✅ Keep default settings (confidence: 0.75)
- ✅ Click "Send Request"

##### Step 4: Interpret Results

- ✅ Review the findings array
- ✅ Check confidence scores
- ✅ Read clinical recommendations

### Tutorial 2: Batch Processing

**Goal:** Process multiple images efficiently

**Estimated time:** 10 minutes

#### Batch Upload Interface (Mockup)

```yaml
# Multi-file selector
files: 
  - chest_01.dcm ✅ Valid DICOM
  - chest_02.jpg ✅ Valid image  
  - brain_mri.dcm ✅ Valid DICOM
  - invalid.txt ❌ Unsupported format

batch_settings:
  process_parallel: true
  max_concurrent: 3
  notify_on_complete: true
  
progress: [████████░░] 80% complete (12/15 images)

[Process Batch] [Cancel] [Download Results]
```

### Tutorial 3: Advanced Configuration

**Goal:** Customize AI analysis parameters

**Estimated time:** 15 minutes

#### Advanced Configuration Panel

```yaml
ai_configuration:
  sensitivity: 0.8 # Higher = more findings detected
  model_version: "v3.2.1" # Latest stable
  analysis_depth: "deep" # shallow, standard, deep
  
region_of_interest:
  enabled: true
  auto_detect: false
  custom_roi: [100, 50, 400, 300] # x, y, width, height
  
output_options:
  include_heatmap: true
  include_measurements: true
  uncertainty_estimation: true
  generate_report: false
```

**Actions:** [Apply Settings] [Reset to Defaults] [Save as Profile]

---

## 🔧 Developer Tools

### API Schema Validator

#### Request Validator

Paste your JSON request to validate against the API schema:

```json
{
  "image_data": "base64_encoded_string...",
  "confidence_threshold": 0.75,
  "modality": "CT"
}
```

**Validation Results:**

- ✅ Schema valid
- ✅ Required fields present  
- ⚠️ Warning: Large image size may increase processing time
- ✅ Authentication format correct

**Actions:** [Validate] [Fix Issues] [View Schema]

### Response Mock Generator

#### Mock Response Generator

Generate realistic API responses for testing:

**Scenario:** `High Confidence Finding` `Multiple Findings` `No Findings` `Error Response`

**Customization:**

- Confidence Range: `0.7 - 0.9`
- Number of Findings: `1-3`
- Modality: `CT Chest`
- Processing Time: `5-12s`

**Actions:** [Generate Mock] [Copy JSON] [Use in Tests]

### Code Snippet Generator

#### Framework Code Generator

**Framework:** `React` `Vue.js` `Angular` `Python Flask` `Node.js Express`

**Features to include:**

- [x] Error handling
- [x] Progress indicators  
- [x] File upload validation
- [x] Response parsing
- [ ] Retry logic
- [ ] Caching

**Actions:** [Generate Code] [Download Project] [Open in StackBlitz]

---

## 📊 Real-time API Status

### Current System Status

#### All Systems Operational

| Service | Status | Response Time | Uptime |
|---------|--------|---------------|---------|
| Authentication | 🟢 Healthy | 95ms | 99.98% |
| Image Analysis | 🟢 Healthy | 8.2s avg | 99.95% |
| Report Generation | 🟢 Healthy | 2.1s avg | 99.97% |
| Documentation | 🟢 Healthy | 1.2s avg | 99.99% |

**Queue Status:** 3 requests pending, ~15s estimated wait

**Last Updated:** 2 minutes ago | **[View Detailed Status](https://status.neolens.ai)**

### Performance Metrics

#### Live Performance Dashboard

```text
Requests/minute: ████████░░ 240 RPM (80% of capacity)
Success Rate:    ██████████ 97.8% (Last 24h)
Avg Response:    ████████░░ 8.3s (Target: <15s)
```

**Geographic Performance:**

- 🇺🇸 North America: 180ms avg
- 🇪🇺 Europe: 220ms avg  
- 🇯🇵 Asia-Pacific: 280ms avg

---

## 🎓 Interactive Learning Path

### Beginner Track

1. **API Basics** (10 min) - Authentication and first request
2. **Understanding Responses** (15 min) - Interpreting AI results
3. **Error Handling** (10 min) - Common issues and solutions

### Intermediate Track  

1. **Configuration Options** (20 min) - Customizing AI parameters
2. **Batch Processing** (15 min) - Handling multiple images
3. **Integration Patterns** (25 min) - Best practices for production

### Advanced Track

1. **Performance Optimization** (30 min) - Scaling and efficiency
2. **Custom Workflows** (25 min) - Building specialized pipelines
3. **Monitoring & Analytics** (20 min) - Production deployment

**Progress Tracking:**

- ✅ Completed: 3/9 modules
- 🎯 Current: Module 4 - Configuration Options
- ⏱️ Estimated completion: 2.5 hours remaining

---

## 🔍 Search & Discovery

### Interactive API Search

#### Search API Endpoints

**Search:** `[Search box: "image upload"]` **[🔍]**

**Results (3 found):**

1. **POST /v1/analyze** - Upload and analyze medical images
   - `Match: image upload functionality`
   - *[Try Now]* *[View Docs]* *[Copy Example]*

2. **POST /v1/batch** - Bulk image processing
   - `Match: multiple image upload`
   - *[Try Now]* *[View Docs]* *[Copy Example]*

3. **GET /v1/images/{id}** - Retrieve uploaded image metadata
   - `Match: uploaded image information`
   - *[Try Now]* *[View Docs]* *[Copy Example]*

### Smart Suggestions

Based on your recent activity, you might be interested in:

- 🎯 **Classification endpoints** - Categorize detected findings
- 📊 **Report generation** - Create structured medical reports  
- ⚙️ **Batch processing** - Handle multiple images efficiently

---

## 💡 Tips for Success

### Getting the Most from Interactive API

#### Best Practices

- Start with sample images to understand response format
- Test with different confidence thresholds to see impact
- Use the response validator to check your integration
- Save successful configurations as reusable profiles

#### Common Pitfalls

- Don't test with real patient data (use synthetic samples)
- Large images (>5MB) will have longer processing times
- Very low confidence thresholds may produce many false positives

#### Pro Tips

- Use the "Copy as cURL" feature for quick testing
- Bookmark frequently used endpoint configurations
- Try the batch processor for multiple test images
- Use mock responses during development to avoid rate limits

---

:::tip[Interactive API Benefits]

- **Zero setup**: No installation or configuration required
- **Real-time testing**: See actual API responses immediately  
- **Learning by doing**: Hands-on experience with all features
- **Code generation**: Get working examples in your preferred language
- **Performance insights**: Monitor response times and success rates

:::

---

## 🔗 Related Resources

- [Performance Metrics](./api-reference/performance-metrics)
- [Getting Started Guide](./getting-started/getting-started)
- [API Reference](./api-reference/endpoints)
- [Troubleshooting](./api-reference/api-troubleshooting)
