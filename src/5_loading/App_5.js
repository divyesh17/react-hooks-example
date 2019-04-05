import React, { useState, useEffect } from 'react';
import './App.css';
import loadingGif from './loader.gif';

const App = () => {
  const [summary, setSummary] = useState('');
  const [query, setQuery] = useState('india');
  const [search, setSearch] = useState('india');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);

      const result = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`);
      const { extract: summary } = await result.json();

      setIsLoading(false);
      setSummary(summary);
    };

    fetchSummary();
  }, [search]);

  const handleQueryChange = e => setQuery(e.target.value);
  const handleSearch = () => setSearch(query)

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
      {isLoading
        ? <div className="loader">
            <img
              className="loadingGif"
              src={loadingGif}
              alt="Loading..."
            />  
          </div>
        : <span className="summaryClass">{summary}</span>
      }
    </div>
  );
}

export default App;
