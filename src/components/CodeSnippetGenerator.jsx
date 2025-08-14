import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

// Frameworks disponibles et leur code de base
const baseSnippets = {
  React: `import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  
  // Your code here
  
  return <div>Example React snippet</div>;
}

export default App;`,
  Vue: `export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}`,
  Angular: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular</h1>',
})
export class AppComponent {}`,
  Python: `import requests

response = requests.get('https://api.example.com')
print(response.json())`,
  'Node.js': `const fetch = require('node-fetch');

fetch('https://api.example.com')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);`,
};

// Features à ajouter
const featureSnippets = {
  'Error handling': `// Error handling example
try {
  // risky operation
} catch (error) {
  console.error(error);
}`,
  'Progress indicators': `// Progress indicator example
console.log('Loading...');`,
  'File upload validation': `// File upload validation example
if (!file.type.startsWith('image/')) {
  alert('Invalid file type');
}`,
  'Response parsing': `// Response parsing example
const data = await response.json();`,
  'Retry logic': `// Retry logic example
function retry(fn, retries = 3) {
  return fn().catch(err => retries > 1 ? retry(fn, retries - 1) : Promise.reject(err));
}`,
  'Caching': `// Simple caching example
const cache = new Map();`,
};

export default function CodeSnippetGenerator() {
  const { colorMode } = useColorMode();
  const [framework, setFramework] = useState('React');
  const [features, setFeatures] = useState([]);

  // Highlight Prism à chaque changement
  useEffect(() => {
    Prism.highlightAll();
  }, [framework, features, colorMode]);

  // Génère le code complet
  const generateCode = () => {
    let code = baseSnippets[framework] || '// No base snippet available\n';
    features.forEach(f => {
      code += '\n\n' + (featureSnippets[f] || `// Feature snippet for ${f} not found`);
    });
    return code;
  };

  // Gestion des features
  const onFeatureToggle = (feature) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Copier le code
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Code copied to clipboard!');
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h2>Framework Code Snippet Generator</h2>

      <label>
        Choose framework:{' '}
        <select value={framework} onChange={e => setFramework(e.target.value)}>
          {Object.keys(baseSnippets).map(fw => (
            <option key={fw} value={fw}>{fw}</option>
          ))}
        </select>
      </label>

      <fieldset style={{ marginTop: 20 }}>
        <legend>Features to include:</legend>
        {Object.keys(featureSnippets).map(f => (
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
        className={clsx('language-javascript')}
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
        <code className="language-javascript">{generateCode()}</code>
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
