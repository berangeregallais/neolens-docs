import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

/**
 * ResponseExplorer
 * - Interactive JSON viewer with actions:
 *   Expand All | Collapse | Download JSON | Copy JSON
 * - Renders a collapsible tree using <details>/<summary> for zero-deps UX.
 *
 * Props:
 *  - json: object|string (defaults to a demo response)
 *  - initiallyCollapsed: boolean (default: false)
 */
export default function ResponseExplorer({
  json,
  initiallyCollapsed = false,
}) {
  const { colorMode } = useColorMode();
  const containerRef = useRef(null);
  const [data, setData] = useState(() => {
    try {
      if (!json) {
        return {
          status: "success",
          processing_time: "8.3s",
          data: {
            findings: [
              { label: "pulmonary_nodule", confidence: 0.87, bounding_box: [245,156,32,28] }
            ]
          }
        };
      }
      return typeof json === 'string' ? JSON.parse(json) : json;
    } catch {
      return { error: "Invalid JSON passed to ResponseExplorer" };
    }
  });
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'raw'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const details = containerRef.current.querySelectorAll('details');
    details.forEach(d => { d.open = !initiallyCollapsed; });
  }, [initiallyCollapsed, data, viewMode]);

  function expandAll() {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('details').forEach(d => d.open = true);
  }
  function collapseAll() {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('details').forEach(d => d.open = false);
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neolens-response.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function renderNode(value, key) {
    const type = Object.prototype.toString.call(value);
    if (type === '[object Object]') {
      const entries = Object.entries(value);
      return (
        <details>
          <summary><strong>{key ?? '{ }'}</strong> <em style={{opacity:.7}}>object · {entries.length} keys</em></summary>
          <div style={{ paddingLeft: 16 }}>
            {entries.map(([k, v]) => (
              <div key={k} style={{ margin: '4px 0' }}>
                {renderNode(v, k)}
              </div>
            ))}
          </div>
        </details>
      );
    }
    if (type === '[object Array]') {
      return (
        <details>
          <summary><strong>{key ?? '[ ]'}</strong> <em style={{opacity:.7}}>array · {value.length} items</em></summary>
          <div style={{ paddingLeft: 16 }}>
            {value.map((v, i) => (
              <div key={i} style={{ margin: '4px 0' }}>
                {renderNode(v, `${key}[${i}]`)}
              </div>
            ))}
          </div>
        </details>
      );
    }
    // primitives
    return (
      <div>
        {key != null && <span style={{ color: 'var(--ifm-color-primary)' }}>{key}</span>}
        {key != null && ': '}
        <code>{formatPrimitive(value)}</code>
      </div>
    );
  }

  function formatPrimitive(v) {
    if (typeof v === 'string') return `"${v}"`;
    if (v === null) return 'null';
    return String(v);
  }

  return (
    <div
      style={{
        border: '1px solid',
        borderColor: colorMode === 'dark' ? '#333' : '#ddd',
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
      }}
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={expandAll} style={btnStyle()}>Expand All</button>
        <button onClick={collapseAll} style={btnStyle()}>Collapse</button>
        <button onClick={downloadJson} style={btnStyle()}>Download JSON</button>
        <button onClick={copyJson} style={btnStyle()}>{copied ? 'Copied!' : 'Copy JSON'}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <ViewToggle label="Tree" active={viewMode==='tree'} onClick={()=>setViewMode('tree')} />
          <ViewToggle label="Raw" active={viewMode==='raw'} onClick={()=>setViewMode('raw')} />
        </div>
      </div>

      {viewMode === 'tree' ? (
        <div ref={containerRef} style={{ marginTop: 10 }}>
          {renderNode(data, null)}
        </div>
      ) : (
        <pre style={{
          border: '1px solid', borderColor: colorMode === 'dark' ? '#333' : '#ddd',
          borderRadius: 8, padding: 12, overflowX: 'auto', marginTop: 10
        }}>
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

function btnStyle() {
  return {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #999',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 13
  };
}

function ViewToggle({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 10px',
      borderRadius: 8,
      border: active ? '1px solid var(--ifm-color-primary)' : '1px solid #999',
      background: active ? 'var(--ifm-color-primary)' : 'transparent',
      color: active ? '#fff' : 'inherit',
      cursor: 'pointer',
      fontSize: 13
    }}>
      {label}
    </button>
  );
}