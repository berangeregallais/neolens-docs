import React, { useState } from 'react';

export default function MermaidZoomWrapper({ children }) {
  const [scale, setScale] = useState(1);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setScale(s => Math.min(s + 0.1, 3))}>+</button>
        <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}>-</button>
      </div>
      <div style={{ overflow: 'auto', border: '1px solid #ccc', padding: 10 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
