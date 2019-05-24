import React, { useState, useEffect } from 'react';
import '../assets/App.css';

const App = () => {
  const [summary, setSummary] = useState('');
  const [query, setQuery] = useState('india');

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);
      const { extract: summary } = await result.json();

      setSummary(summary);
    };
    
    fetchSummary();
  }, [query]);

  const handleQueryChange = e => setQuery(e.target.value);

  return (
    <div className="article-container">
      <input
        className="queryInputBox"
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <span className="summaryClass">{summary}</span>
    </div>
  );
};

export default App;
