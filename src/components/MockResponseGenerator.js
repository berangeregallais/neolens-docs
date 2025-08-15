import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

/**
 * MockResponseGenerator
 * - Génère des réponses API réalistes pour tests/démo.
 * - Actions: Generate Mock | Copy JSON | Use in Tests
 * - Options: scénario, plage de confiance, nb de findings, modalité, temps de traitement.
 *
 * Props optionnelles:
 *  - onUse(json): callback quand on clique "Use in Tests" (sinon dispatch un CustomEvent)
 *  - defaultModality: string (ex: "CT Chest")
 */
export default function MockResponseGenerator({
  onUse,
  defaultModality = 'CT Chest',
}) {
  const { colorMode } = useColorMode();
  const [scenario, setScenario] = useState('high');
  const [confMin, setConfMin] = useState(0.7);
  const [confMax, setConfMax] = useState(0.9);
  const [countMin, setCountMin] = useState(1);
  const [countMax, setCountMax] = useState(3);
  const [modality, setModality] = useState(defaultModality);
  const [procMin, setProcMin] = useState(5);
  const [procMax, setProcMax] = useState(12);
  const [json, setJson] = useState('');

  function randBetween(a, b) {
    return a + Math.random() * (b - a);
  }
  function randInt(a, b) {
    return Math.floor(randBetween(a, b + 1));
  }
  function randConf() {
    const lo = Math.min(confMin, confMax);
    const hi = Math.max(confMin, confMax);
    return Number(randBetween(lo, hi).toFixed(2));
  }
  function randProc() {
    const lo = Math.min(procMin, procMax);
    const hi = Math.max(procMin, procMax);
    return `${Number(randBetween(lo, hi).toFixed(1))}s`;
  }

  function makeFinding() {
    const labels = ['pulmonary_nodule', 'atelectasis', 'infiltrate', 'opacity'];
    const label = labels[randInt(0, labels.length - 1)];
    const x = randInt(50, 400), y = randInt(40, 300), w = randInt(20, 80), h = randInt(18, 70);
    return {
      label,
      confidence: randConf(),
      bounding_box: [x, y, w, h],
      clinical_significance: ['low', 'moderate', 'high'][randInt(0, 2)]
    };
  }

  function generate() {
    let result;
    if (scenario === 'error') {
      result = {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: {
          code: ['RATE_LIMITED', 'INVALID_AUTH', 'MODEL_BUSY', 'BAD_REQUEST'][randInt(0, 3)],
          message: 'Mocked error for testing',
        }
      };
    } else {
      let n = randInt(Math.min(countMin, countMax), Math.max(countMin, countMax));
      if (scenario === 'no') n = 0;
      if (scenario === 'multi') n = Math.max(2, n);
      if (scenario === 'high') {
        // pousse la confiance vers le haut
        const lo = Math.max(0, Math.min(confMin, confMax));
        const hi = Math.min(1, Math.max(confMin, confMax));
        if (hi < 0.85) setConfMax(0.9); // petit ajustement UX; n’empêche pas la génération
      }
      const findings = Array.from({ length: n }, makeFinding);
      result = {
        status: 'success',
        timestamp: new Date().toISOString(),
        processing_time: randProc(),
        meta: { modality },
        data: {
          patient_id: 'demo_patient_001',
          findings,
          recommendation: n === 0 ? 'No immediate action required' : 'Consider follow-up imaging as clinically indicated'
        }
      };
    }
    setJson(JSON.stringify(result, null, 2));
  }

  async function copyJson() {
    if (!json) generate();
    try {
      await navigator.clipboard.writeText(json || '{}');
      alert('JSON copied to clipboard!');
    } catch {
      alert('Failed to copy.');
    }
  }

  function useInTests() {
    if (!json) generate();
    try {
      const obj = json ? JSON.parse(json) : {};
      if (onUse) {
        onUse(obj);
      } else {
        // Bus d’événements simple si pas de prop fournie
        window.dispatchEvent(new CustomEvent('mock-response', { detail: obj }));
        alert('Mock pushed to test bus (event "mock-response").');
      }
    } catch {
      alert('JSON parse error.');
    }
  }

  const box = {
    border: '1px solid',
    borderColor: colorMode === 'dark' ? '#333' : '#ddd',
    borderRadius: 12,
    padding: 12,
  };

  const field = { display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8, alignItems: 'center' };

  return (
    <div style={box}>
      <div style={{ display: 'grid', gap: 10 }}>
        <div style={field}>
          <label><strong>Scenario</strong></label>
          <select value={scenario} onChange={e => setScenario(e.target.value)}>
            <option value="high">High Confidence Finding</option>
            <option value="multi">Multiple Findings</option>
            <option value="no">No Findings</option>
            <option value="error">Error Response</option>
          </select>
        </div>

        <div style={field}>
          <label><strong>Confidence Range</strong></label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" step="0.01" min="0" max="1" value={confMin} onChange={e=>setConfMin(Number(e.target.value))} />
            <span>to</span>
            <input type="number" step="0.01" min="0" max="1" value={confMax} onChange={e=>setConfMax(Number(e.target.value))} />
          </div>
        </div>

        <div style={field}>
          <label><strong>Number of Findings</strong></label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min="0" max="10" value={countMin} onChange={e=>setCountMin(Number(e.target.value))} />
            <span>to</span>
            <input type="number" min="0" max="10" value={countMax} onChange={e=>setCountMax(Number(e.target.value))} />
          </div>
        </div>

        <div style={field}>
          <label><strong>Modality</strong></label>
          <select value={modality} onChange={e=>setModality(e.target.value)}>
            <option>CT Chest</option>
            <option>X-ray</option>
            <option>MRI</option>
            <option>Ultrasound</option>
            <option>PET</option>
          </select>
        </div>

        <div style={field}>
          <label><strong>Processing Time (s)</strong></label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min="0" value={procMin} onChange={e=>setProcMin(Number(e.target.value))} />
            <span>to</span>
            <input type="number" min="0" value={procMax} onChange={e=>setProcMax(Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={generate} style={btn()}>Generate Mock</button>
        <button onClick={copyJson} style={btn()}>Copy JSON</button>
        <button onClick={useInTests} style={btn()}>Use in Tests</button>
      </div>

      <pre style={{ marginTop: 12, border: '1px solid #ddd', borderRadius: 8, padding: 12, overflowX: 'auto' }}>
{json || '// Click "Generate Mock"'}
      </pre>
    </div>
  );
}

function btn() {
  return {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #999',
    background: 'transparent',
    cursor: 'pointer'
  };
}
