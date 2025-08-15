import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

/**
 * InteractiveApiTester
 * - Renders a simple "Try it" UI: file upload + params
 * - Buttons: Send Request | Clear | Copy as cURL
 * - simulate={true} -> don't call network, show mock JSON
 * - To use real calls, set simulate={false} and ensure CORS on your API
 */
export default function InteractiveApiTester({
  endpoint = 'https://api.neolens.ai/v1/analyze',
  simulate = true,
  defaultApiKey = 'YOUR_API_KEY',
}) {
  const { colorMode } = useColorMode();
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [imageFile, setImageFile] = useState(null);
  const [confidence, setConfidence] = useState(0.75);
  const [modality, setModality] = useState('auto-detect');
  const [modelVersion, setModelVersion] = useState('v3.2.1');
  const [verbosity, setVerbosity] = useState('standard');
  const [roi, setRoi] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Prism.highlightAll();
  }, [response, colorMode]);

  function buildCurl() {
    const filename = imageFile?.name || 'chest_xray.jpg';
    const parts = [
      `curl -X POST "${endpoint}"`,
      `-H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}"`,
      `-F "image=@${filename}"`,
      `-F "confidence_threshold=${confidence}"`,
      `-F "modality=${modality}"`,
      `-F "model_version=${modelVersion}"`,
      `-F "verbosity=${verbosity}"`,
      `-F "region_of_interest=${roi}"`,
    ];
    return parts.join(' \\\n  ');
  }

  async function onSend() {
    setError('');
    setResponse('');
    setLoading(true);
    try {
      if (simulate) {
        // Simulate API latency
        await new Promise(r => setTimeout(r, 700));
        const mock = {
          status: "success",
          timestamp: new Date().toISOString(),
          processing_time: "8.3s",
          data: {
            patient_id: "demo_patient_001",
            findings: [
              {
                label: "pulmonary_nodule",
                confidence: 0.87,
                location: { x: 245, y: 156, width: 32, height: 28 },
                clinical_significance: "moderate"
              }
            ],
            recommendation: "Consider follow-up CT in 3 months"
          }
        };
        setResponse(JSON.stringify(mock, null, 2));
      } else {
        if (!imageFile) {
          throw new Error('Please choose an image file.');
        }
        const form = new FormData();
        form.append('image', imageFile);
        form.append('confidence_threshold', String(confidence));
        form.append('modality', modality);
        form.append('model_version', modelVersion);
        form.append('verbosity', verbosity);
        form.append('region_of_interest', roi);

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}` },
          body: form,
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const json = await res.json();
        setResponse(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setImageFile(null);
    setConfidence(0.75);
    setModality('auto-detect');
    setModelVersion('v3.2.1');
    setVerbosity('standard');
    setRoi('auto');
    setResponse('');
    setError('');
  }

  async function onCopyCurl() {
    try {
      await navigator.clipboard.writeText(buildCurl());
      alert('cURL command copied to clipboard!');
    } catch {
      alert('Failed to copy cURL to clipboard.');
    }
  }

  return (
    <div
      style={{
        border: '1px solid',
        borderColor: colorMode === 'dark' ? '#333' : '#ddd',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
      }}
    >
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', alignItems: 'end' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="apiKey"><strong>API Key</strong></label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="neolens_live_..."
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #888' }}
          />
        </div>

        <div>
          <label htmlFor="image"><strong>Image file</strong></label><br/>
          <input
            id="image"
            type="file"
            accept=".dcm,.jpg,.jpeg,.png,image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label htmlFor="confidence"><strong>Confidence threshold</strong> ({confidence})</label><br/>
          <input
            id="confidence"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={confidence}
            onChange={e => setConfidence(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="modality"><strong>Modality</strong></label><br/>
          <select id="modality" value={modality} onChange={e => setModality(e.target.value)}>
            <option value="auto-detect">auto-detect</option>
            <option value="CT">CT</option>
            <option value="MRI">MRI</option>
            <option value="X-ray">X-ray</option>
          </select>
        </div>

        <div>
          <label htmlFor="model_version"><strong>Model version</strong></label><br/>
          <select id="model_version" value={modelVersion} onChange={e => setModelVersion(e.target.value)}>
            <option>v3.2.1</option>
            <option>v3.2.0</option>
            <option>v3.1.5</option>
          </select>
        </div>

        <div>
          <label htmlFor="verbosity"><strong>Verbosity</strong></label><br/>
          <select id="verbosity" value={verbosity} onChange={e => setVerbosity(e.target.value)}>
            <option>minimal</option>
            <option>standard</option>
            <option>verbose</option>
          </select>
        </div>

        <div>
          <label htmlFor="roi"><strong>Region of interest</strong></label><br/>
          <select id="roi" value={roi} onChange={e => setRoi(e.target.value)}>
            <option>auto</option>
            <option>thorax</option>
            <option>abdomen</option>
            <option>brain</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={onSend} disabled={loading}
          style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
          {loading ? 'Sending…' : 'Send Request'}
        </button>
        <button onClick={onClear}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #999', background: 'transparent', cursor: 'pointer' }}>
          Clear
        </button>
        <button onClick={onCopyCurl}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #999', background: 'transparent', cursor: 'pointer' }}>
          Copy as cURL
        </button>
        <span style={{ alignSelf: 'center', fontSize: 12, opacity: 0.8 }}>
          Mode: {simulate ? 'Simulation (no network)' : 'Live request'}
        </span>
      </div>

      {error && (
        <div style={{ marginTop: 12, color: '#dc2626' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: 16 }}>
          <label><strong>Response</strong></label>
          <pre className="language-json" style={{
            border: '1px solid', borderColor: colorMode === 'dark' ? '#333' : '#ddd',
            borderRadius: 8, padding: 12, overflowX: 'auto'
          }}>
            <code className="language-json">{response}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
