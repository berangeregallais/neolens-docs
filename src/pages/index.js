import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    history.replace('/neolens-docs/intro');
  }, [history]);

  return <div style={{textAlign: 'center', marginTop: '20vh'}}>Redirecting…</div>;
}

