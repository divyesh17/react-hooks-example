import React, { useState, useEffect } from 'react';

const App = () => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch('https://en.wikipedia.org/api/rest_v1/page/summary/india')
      .then(response => response.json())
      .then(({ extract }) => setSummary(extract));
  }, []);

  return (
    <span>{summary}</span>
  );
}

export default App;
