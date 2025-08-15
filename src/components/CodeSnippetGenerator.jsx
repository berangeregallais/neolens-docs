import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';

/**
 * Neolens Language Code Snippet Generator
 * - Replaces "frameworks" with API-oriented languages
 * - Safe for MDX usage: no large props required
 * - Copy-to-clipboard + Prism highlight
 */

const baseSnippets = {
  Python: `import requests

url = "https://api.neolens.ai/v1/analyze"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"image": open("chest_xray.jpg", "rb")}
data = {"confidence_threshold": 0.75, "modality": "auto-detect"}

resp = requests.post(url, headers=headers, files=files, data=data)
resp.raise_for_status()
print(resp.json())`,
  "Node.js": `import fs from "node:fs";
import fetch from "node-fetch";
import FormData from "form-data";

const form = new FormData();
form.append("image", fs.createReadStream("chest_xray.jpg"));
form.append("confidence_threshold", "0.75");a
form.append("modality", "auto-detect");

const resp = await fetch("https://api.neolens.ai/v1/analyze", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
  body: form,
});
if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`);
console.log(await resp.json());`,
  "cURL": `curl -X POST "https://api.neolens.ai/v1/analyze" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@chest_xray.jpg" \
  -F "confidence_threshold=0.75" \
  -F "modality=auto-detect"`,
  "PHP": `<?php
$ch = curl_init("https://api.neolens.ai/v1/analyze");
$post = [
  "image" => new CURLFile("chest_xray.jpg"),
  "confidence_threshold" => "0.75",
  "modality" => "auto-detect"
];
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $post,
  CURLOPT_HTTPHEADER => ["Authorization: Bearer YOUR_API_KEY"],
  CURLOPT_RETURNTRANSFER => true
]);
$resp = curl_exec($ch);
if ($resp === false) { throw new Exception(curl_error($ch)); }
curl_close($ch);
echo $resp;`,
  "Ruby": `require "net/http"
require "uri"
require "json"

uri = URI.parse("https://api.neolens.ai/v1/analyze")
request = Net::HTTP::Post.new(uri)
request["Authorization"] = "Bearer YOUR_API_KEY"

form_data = [
  ["image", File.open("chest_xray.jpg")],
  ["confidence_threshold", "0.75"],
  ["modality", "auto-detect"]
]
request.set_form form_data, "multipart/form-data"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end
puts res.body`,
};

// Optional feature snippets; richest for Node.js & Python, placeholders otherwise.
const featureSnippets = {
  "Error handling": {
    "Node.js": `try {
  // risky operation
} catch (e) {
  console.error(e);
}`,
    "Python": `try:
    # risky operation
    pass
except Exception as e:
    print(e)`,
  },
  "Response parsing": {
    "Node.js": `const data = await resp.json();`,
    "Python": `data = resp.json()`,
  },
  "Retry logic": {
    "Node.js": `async function retry(fn, retries = 3) {
  try { return await fn(); }
  catch (e) { return retries > 1 ? retry(fn, retries - 1) : Promise.reject(e); }
}`,
    "Python": `import time
def retry(fn, retries=3):
    try:
        return fn()
    except Exception as e:
        if retries > 1:
            time.sleep(0.5)
            return retry(fn, retries-1)
        raise`,
  },
  "Caching": {
    "Node.js": `const cache = new Map();`,
    "Python": `cache = {}`,
  },
  "Progress indicators": {
    "Node.js": `process.stdout.write("Loading...\\n");`,
    "Python": `print("Loading...")`,
  },
  "File upload validation": {
    "Node.js": `// Ensure JPEG/DICOM only (basic example)
const allowed = ["jpg","jpeg","dcm","png"];
const ext = "jpg"; // derive from filename
if (!allowed.includes(ext)) throw new Error("Invalid file type");`,
    "Python": `# Ensure JPEG/DICOM only (basic example)
allowed = {"jpg","jpeg","dcm","png"}
ext = "jpg"  # derive from filename
if ext not in allowed:
    raise ValueError("Invalid file type")`,
  },
};

function featureForLanguage(name, language) {
  const map = featureSnippets[name];
  if (!map) return null;
  if (map[language]) return map[language];
  // Fallback comment for unsupported languages
  const comment = language === "PHP" ? "//" : language === "cURL" ? "#" : "#";
  return `${comment} ${name}: (not available for ${language}, use Node.js or Python example)`;
}

export default function CodeSnippetGenerator() {
  const { colorMode } = useColorMode();
  const [language, setLanguage] = useState('Python');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    Prism.highlightAll();
  }, [language, features, colorMode]);

  const generateCode = () => {
    let code = baseSnippets[language] || '// No base snippet available\\n';
    features.forEach(f => {
      const extra = featureForLanguage(f, language);
      if (extra) {
        code += `\\n\\n` + extra;
      }
    });
    return code;
  };

  const onFeatureToggle = (feature) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Code copied to clipboard!');
  };

  const languages = Object.keys(baseSnippets);
  const featureNames = Object.keys(featureSnippets);

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h2>Language Code Snippet Generator</h2>

      <label>
        Choose language:{' '}
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {languages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </label>

      <fieldset style={{ marginTop: 20 }}>
        <legend>Features to include:</legend>
        {featureNames.map(f => (
          <label key={f} style={{ display: 'block', marginBottom: 4 }}>
            <input
              type="checkbox"
              checked={features.includes(f)}
              onChange={() => onFeatureToggle(f)}
            />{' '}
            {f}
          </label>
        ))}
      </fieldset>

      <pre
        className={clsx('language-' + (language === 'cURL' ? 'bash' : language.toLowerCase()))}
        style={{
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
          whiteSpace: 'pre-wrap',
          fontSize: 14,
          fontFamily: 'source-code-pro, monospace',
          minHeight: 250,
          overflowX: 'auto',
          border: '1px solid',
          borderColor: colorMode === 'dark' ? '#444' : '#ddd',
        }}
      >
        <code className={'language-' + (language === 'cURL' ? 'bash' : language.toLowerCase())}>{generateCode()}</code>
      </pre>

      <button
        onClick={copyToClipboard}
        style={{
          marginTop: 10,
          padding: '8px 16px',
          backgroundColor: colorMode === 'dark' ? '#444' : '#eee',
          color: colorMode === 'dark' ? '#fff' : '#333',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Copy Code
      </button>
    </div>
  );
}
