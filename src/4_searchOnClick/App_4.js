import React, { useState, useEffect } from 'react';
import '../assets/App.css';

const App = () => {
  const [summary, setSummary] = useState('');
  const [query, setQuery] = useState('india');
  const [search, setSearch] = useState('india');

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`);
      const { extract: summary } = await result.json();

      setSummary(summary);
    };
    
    fetchSummary();
  }, [search]);

  const handleQueryChange = e => setQuery(e.target.value);
  const handleSearch = () => setSearch(query);

  return (
    <div className="articleContainer">
      <div className="articleSearch">
        <input
          className="queryInputBox"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
        <button
          className="searchButton"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <span className="summaryClass">{summary}</span>
    </div>
  );
};

export default App;
