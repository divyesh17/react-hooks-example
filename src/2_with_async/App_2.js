import React, { useState, useEffect } from 'react';

const App = () => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/india');
      const { extract: summary } = await result.json();

      setSummary(summary);
    };

    fetchSummary();
  }, []);

  return (
    <span>{summary}</span>
  );
}

export default App;
