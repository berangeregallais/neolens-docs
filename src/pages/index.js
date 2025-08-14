import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const history = useHistory();
  const introUrl = useBaseUrl('/intro');

  useEffect(() => {
    history.replace(introUrl);
  }, [history, introUrl]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      Redirecting…
    </div>
  );
}
