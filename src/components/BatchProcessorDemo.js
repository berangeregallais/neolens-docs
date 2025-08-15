import React, { useState, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
function isValid(name){ return /\.(dcm|dicom|jpg|jpeg|png)$/i.test(name); }

export default function BatchProcessorDemo({ maxConcurrent = 3, simulateMs = [400,1200] }) {
  const { colorMode } = useColorMode();
  const [files, setFiles] = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const total = files.filter(f => f.valid).length;
  const inputRef = useRef(null);

  function onChoose(e){
    const list = Array.from(e.target.files || []).map(f => ({
      name: f.name,
      size: f.size,
      valid: isValid(f.name),
      status: 'queued'
    }));
    setFiles(list);
    setDone(0);
    setResults([]);
    setErrors([]);
  }

  async function runOne(file){
    const ms = Math.floor(Math.random()*(simulateMs[1]-simulateMs[0])) + simulateMs[0];
    file.status = 'processing';
    await sleep(ms);
    // 10% d’erreur simulée
    if (Math.random() < 0.1){
      file.status = 'error';
      setErrors(prev => [...prev, {file: file.name, error:'Simulated processing error'}]);
    } else {
      file.status = 'done';
      const mock = {
        file: file.name,
        status: 'success',
        findings: Math.random()<0.3 ? [] : [
          { label:'pulmonary_nodule', confidence: +(0.75+Math.random()*0.2).toFixed(2) }
        ]
      };
      setResults(prev => [...prev, mock]);
    }
    setDone(d => d+1);
  }

  async function onProcess(){
    setRunning(true);
    setDone(0); setResults([]); setErrors([]);

    const queue = files.filter(f => f.valid);
    const workers = new Array(Math.min(maxConcurrent, queue.length)).fill(0).map(async (_, i) => {
      for (let idx=i; idx<queue.length; idx+=Math.min(maxConcurrent, queue.length)){
        // eslint-disable-next-line no-await-in-loop
        await runOne(queue[idx]);
      }
    });
    await Promise.all(workers);
    setRunning(false);
  }

  function onCancel(){
    setRunning(false);
    setFiles([]); setDone(0); setResults([]); setErrors([]);
    if (inputRef.current) inputRef.current.value = '';
  }

  function onDownload(){
    const blob = new Blob([JSON.stringify({results, errors}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'batch-results.json'; a.click();
    URL.revokeObjectURL(url);
  }

  const complete = total === 0 ? 0 : Math.round((done/total)*100);

  return (
    <div style={{border:'1px solid', borderColor:colorMode==='dark'?'#333':'#ddd', borderRadius:12, padding:16}}>
      <input ref={inputRef} type="file" multiple accept=".dcm,.dicom,.jpg,.jpeg,.png,image/*" onChange={onChoose} />
      <div style={{marginTop:8, fontSize:14}}>
        {files.map((f,i)=>(
          <div key={i} style={{opacity: f.valid?1:0.6}}>
            {f.name} {f.valid ? '✅' : '❌ Unsupported'}
            {f.status !== 'queued' && ` — ${f.status}`}
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
        <button disabled={running || total===0} onClick={onProcess}
          style={{padding:'8px 12px', borderRadius:8, border:'none', background:'#2563eb', color:'#fff', cursor:'pointer'}}>
          {running ? 'Processing…' : `Process Batch (max ${maxConcurrent})`}
        </button>
        <button onClick={onCancel} style={{padding:'8px 12px', borderRadius:8, border:'1px solid #999', background:'transparent'}}>
          Cancel / Clear
        </button>
        <button onClick={onDownload} disabled={!results.length && !errors.length}
          style={{padding:'8px 12px', borderRadius:8, border:'1px solid #999', background:'transparent'}}>
          Download Results
        </button>
      </div>

      <div style={{marginTop:12}}>
        <div style={{fontSize:13, opacity:0.8}}>Progress: {done}/{total} — {complete}%</div>
        <div style={{height:10, background:'#e5e7eb', borderRadius:6, overflow:'hidden', marginTop:6}}>
          <div style={{width:`${complete}%`, height:'100%', background:'#10b981'}} />
        </div>
      </div>

      {(results.length>0 || errors.length>0) && (
        <pre style={{marginTop:12, border:'1px solid #ddd', borderRadius:8, padding:12, overflowX:'auto'}}>
{JSON.stringify({results, errors}, null, 2)}
        </pre>
      )}
    </div>
  );
}
