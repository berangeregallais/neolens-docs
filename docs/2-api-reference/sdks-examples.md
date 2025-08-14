---
slug: sdks-examples
title: SDK Examples
description: "Simple SDK examples for quick API access with Python, JavaScript, and curl — get started fast with Neolens."
---

<!-- markdownlint-disable MD033 -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Neolens provides simple and secure access to its REST API through standard HTTP requests. You can use any language or platform capable of making HTTPS requests. Below are a few quick examples using Python, JavaScript, and curl.

<Tabs>

  <TabItem value="python" label="Python">

  ```python
  import requests

  url = "https://api.neolens.ai/v1/scans"
  headers = {
      "Authorization": "Bearer YOUR_API_TOKEN"
  }
  response = requests.get(url, headers=headers)
  print(response.json())
  ```

  </TabItem> <TabItem value="javascript" label="JavaScript">

  ```js
  fetch("https://api.neolens.ai/v1/scans", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_TOKEN"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```

  </TabItem> <TabItem value="curl" label="curl">

  ```bash
  curl -X GET https://api.neolens.ai/v1/scans \
  -H "Authorization: Bearer YOUR_API_TOKEN"
  ```

  </TabItem> </Tabs>

These examples cover only the basics. For more advanced usage — including file uploads, scan configurations, and streaming — explore the full API reference.
