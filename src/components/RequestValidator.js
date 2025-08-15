import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

/**
 * RequestValidator
 * - Valide un JSON de requête contre un mini-schéma côté client (sans dépendance).
 * - Actions: Validate | Fix Issues | View Schema
 * - Props optionnelles:
 *   - initialJson: objet OU string JSON
 *   - onValid(json): callback quand la validation est OK (ex: brancher vers un tester)
 */
export default function RequestValidator({
  initialJson = {
    image_data: "base64_encoded_string...",
    confidence_threshold: 0.75,
    modality: "CT",
  },
  onValid,
}) {
  const { colorMode } = useColorMode();
  const [raw, setRaw] = useState(JSON.stringify(initialJson, null, 2));
  const [logs, setLogs] = useState([]);
  const [viewSchema, setViewSchema] = useState(false);

  const schema = {
    type: "object",
    required: ["image_data", "confidence_threshold", "modality"],
    properties: {
      image_data: { type: "string", minLength: 10, description: "Base64 string or data URI" },
      confidence_threshold: { type: "number", minimum: 0, maximum: 1, description: "0..1" },
      modality: { type: "string", enum: ["CT", "MRI", "X-ray", "Ultrasound", "PET", "auto-detect"] },
    }
  };

  function log(msg, type="info"){
    setLogs(prev => [...prev, {msg, type, ts: new Date().toISOString()}]);
  }
  function resetLogs(){ setLogs([]); }

  function safeParse(text){
    try { return [JSON.parse(text), null]; }
    catch(e){ return [null, e.message]; }
  }

  // Validation “maison” simple
  function validateObject(obj){
    const issues = [];

    // required
    for (const key of schema.required) {
      if (!(key in obj)) issues.push({path:key, message:`Missing required field "${key}"`});
    }

    // image_data
    if (typeof obj.image_data !== "string") {
      issues.push({path:"image_data", message:"image_data must be a string"});
    } else if (obj.image_data.length < 10) {
      issues.push({path:"image_data", message:"image_data is too short to be valid"});
    }

    // confidence_threshold
    if (typeof obj.confidence_threshold !== "number") {
      issues.push({path:"confidence_threshold", message:"confidence_threshold must be a number (0..1)"});
    } else if (obj.confidence_threshold < 0 || obj.confidence_threshold > 1) {
      issues.push({path:"confidence_threshold", message:"confidence_threshold must be between 0 and 1"});
    }

    // modality
    const allowed = schema.properties.modality.enum;
    if (typeof obj.modality !== "string" || !allowed.includes(obj.modality)) {
      issues.push({path:"modality", message:`modality must be one of: ${allowed.join(", ")}`});
    }

    return issues;
  }

  function onValidate(){
    resetLogs();
    const [obj, err] = safeParse(raw);
    if (err) { log(`Invalid JSON: ${err}`, "error"); return; }
    const issues = validateObject(obj);
    if (issues.length === 0) {
      log("✅ Schema valid");
      if (onValid) onValid(obj);
    } else {
      log(`⚠️ Found ${issues.length} issue(s):`, "warn");
      issues.forEach(i => log(`• ${i.path}: ${i.message}`, "warn"));
    }
  }

  function onFixIssues(){
    resetLogs();
    const [obj, err] = safeParse(raw);
    if (err) { log(`Invalid JSON: ${err}`, "error"); return; }
    let fixed = {...obj};
    let changed = 0;

    // image_data: fallback
    if (typeof fixed.image_data !== "string" || fixed.image_data.length < 10) {
      fixed.image_data = "base64_encoded_string...";
      changed++;
    }

    // confidence_threshold: parse number / clamp 0..1
    if (typeof fixed.confidence_threshold !== "number") {
      const n = Number(fixed.confidence_threshold);
      if (!Number.isNaN(n)) { fixed.confidence_threshold = n; changed++; }
    }
    if (typeof fixed.confidence_threshold === "number") {
      const clamped = Math.min(1, Math.max(0, fixed.confidence_threshold));
      if (clamped !== fixed.confidence_threshold) { fixed.confidence_threshold = clamped; changed++; }
    } else {
      fixed.confidence_threshold = 0.75; changed++;
    }

    // modality: normalize to allowed
    const allowed = schema.properties.modality.enum;
    if (typeof fixed.modality !== "string" || !allowed.includes(fixed.modality)) {
      fixed.modality = "CT"; changed++;
    }

    setRaw(JSON.stringify(fixed, null, 2));
    log(changed ? `🔧 Applied ${changed} auto-fix(es). Click "Validate" again.` : "No changes required.");
  }

  function onToggleSchema(){
    setViewSchema(v => !v);
  }

  const boxStyle = {
    border: '1px solid',
    borderColor: colorMode === 'dark' ? '#333' : '#ddd',
    borderRadius: 12,
    padding: 12,
  };

  return (
    <div style={boxStyle}>
      <label><strong>Request JSON</strong></label>
      <textarea
        value={raw}
        onChange={e => setRaw(e.target.value)}
        rows={12}
        style={{width:'100%', fontFamily:'monospace', fontSize:14, marginTop:6}}
      />

      <div style={{display:'flex', gap:8, marginTop:10, flexWrap:'wrap'}}>
        <button onClick={onValidate} style={btn()}>Validate</button>
        <button onClick={onFixIssues} style={btn()}>Fix Issues</button>
        <button onClick={onToggleSchema} style={btn()}>{viewSchema ? 'Hide Schema' : 'View Schema'}</button>
      </div>

      {logs.length > 0 && (
        <div style={{marginTop:10}}>
          <strong>Results</strong>
          <ul style={{marginTop:6}}>
            {logs.map((l,i)=>(
              <li key={i} style={{color: l.type==='error' ? '#dc2626' : l.type==='warn' ? '#b45309' : 'inherit'}}>
                {l.msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {viewSchema && (
        <pre style={{marginTop:10, padding:12, border:'1px solid #ddd', borderRadius:8, overflowX:'auto'}}>
{JSON.stringify(schema, null, 2)}
        </pre>
      )}
    </div>
  );
}

function btn(){
  return {
    padding:'8px 12px',
    borderRadius:8,
    border:'1px solid #999',
    background:'transparent',
    cursor:'pointer'
  };
}
