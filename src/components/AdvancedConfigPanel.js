import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const DEFAULTS = {
  sensitivity: 0.8,
  model_version: 'v3.2.1',
  analysis_depth: 'deep',
  roi: { enabled: true, auto_detect: false, custom_roi: [100,50,400,300] },
  output: { include_heatmap: true, include_measurements: true, uncertainty_estimation: true, generate_report: false }
};

export default function AdvancedConfigPanel({ storageKey='neolens-adv-config' }) {
  const { colorMode } = useColorMode();
  const [cfg, setCfg] = useState(()=> {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : DEFAULTS;
    } catch { return DEFAULTS; }
  });
  const [copied, setCopied] = useState(false);

  useEffect(()=> {
    try { localStorage.setItem(storageKey, JSON.stringify(cfg)); } catch {}
  }, [cfg, storageKey]);

  const set = (path, value) => {
    setCfg(prev => {
      const next = structuredClone ? structuredClone(prev) : JSON.parse(JSON.stringify(prev));
      // minimal path setter
      const keys = path.split('.');
      let cur = next;
      for (let i=0;i<keys.length-1;i++) cur = cur[keys[i]];
      cur[keys.at(-1)] = value;
      return next;
    });
  };

  function copyJson(){
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2));
    setCopied(true); setTimeout(()=>setCopied(false), 1200);
  }
  function reset(){
    setCfg(DEFAULTS);
  }

  return (
    <div style={{border:'1px solid', borderColor:colorMode==='dark'?'#333':'#ddd', borderRadius:12, padding:16}}>
      <div style={{display:'grid', gap:12, gridTemplateColumns:'1fr 1fr'}}>
        <div>
          <label><strong>Sensitivity</strong> ({cfg.sensitivity})</label>
          <input type="range" min="0.1" max="1" step="0.05"
                 value={cfg.sensitivity} onChange={e=>set('sensitivity', Number(e.target.value))} style={{width:'100%'}} />
        </div>

        <div>
          <label><strong>Model version</strong></label><br/>
          <select value={cfg.model_version} onChange={e=>set('model_version', e.target.value)}>
            <option>v3.2.1</option><option>v3.2.0</option><option>v3.1.5</option>
          </select>
        </div>

        <div>
          <label><strong>Analysis depth</strong></label><br/>
          <select value={cfg.analysis_depth} onChange={e=>set('analysis_depth', e.target.value)}>
            <option>shallow</option><option>standard</option><option>deep</option>
          </select>
        </div>

        <div>
          <label><strong>Region of interest</strong></label>
          <div style={{display:'flex', gap:8, alignItems:'center', marginTop:6}}>
            <label><input type="checkbox" checked={cfg.roi.enabled} onChange={e=>set('roi.enabled', e.target.checked)} /> enabled</label>
            <label><input type="checkbox" checked={cfg.roi.auto_detect} onChange={e=>set('roi.auto_detect', e.target.checked)} /> auto-detect</label>
          </div>
          {!cfg.roi.auto_detect && (
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6, marginTop:6}}>
              {['x','y','width','height'].map((k, i)=>(
                <input key={k} type="number" placeholder={k}
                  value={cfg.roi.custom_roi[i]}
                  onChange={e=>{
                    const arr = [...cfg.roi.custom_roi];
                    arr[i] = Number(e.target.value);
                    set('roi.custom_roi', arr);
                  }} />
              ))}
            </div>
          )}
        </div>

        <div style={{gridColumn:'1 / -1'}}>
          <label><strong>Output options</strong></label>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:6}}>
            <label><input type="checkbox" checked={cfg.output.include_heatmap}
                          onChange={e=>set('output.include_heatmap', e.target.checked)} /> include_heatmap</label>
            <label><input type="checkbox" checked={cfg.output.include_measurements}
                          onChange={e=>set('output.include_measurements', e.target.checked)} /> include_measurements</label>
            <label><input type="checkbox" checked={cfg.output.uncertainty_estimation}
                          onChange={e=>set('output.uncertainty_estimation', e.target.checked)} /> uncertainty_estimation</label>
            <label><input type="checkbox" checked={cfg.output.generate_report}
                          onChange={e=>set('output.generate_report', e.target.checked)} /> generate_report</label>
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
        <button onClick={copyJson} style={{padding:'8px 12px', borderRadius:8, border:'1px solid #999', background:'transparent'}}>
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
        <button onClick={reset} style={{padding:'8px 12px', borderRadius:8, border:'1px solid #999', background:'transparent'}}>
          Reset to Defaults
        </button>
      </div>

      <pre style={{marginTop:12, border:'1px solid #ddd', borderRadius:8, padding:12, overflowX:'auto'}}>
{JSON.stringify(cfg, null, 2)}
      </pre>
    </div>
  );
}
