import React, { useState, useEffect } from 'react';
import '../assets/App.css';
import loadingGif from '../assets/loader.gif';

const useWikipedia = (initUrl) => {
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState(initUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setErrMsg('');

      try {
        const result = await fetch(url);
        const { extract: summary } = await result.json();

        setSummary(summary);
      } catch (e) {
        setErrMsg(e.message);
      }

      setIsLoading(false);
    };

    fetchSummary();
  }, [url]);

  return { summary, isLoading, errMsg, setUrl };
};

const App = () => {
  const [query, setQuery] = useState('india');
  const { summary, isLoading, errMsg, setUrl } = useWikipedia('https://en.wikipedia.org/api/rest_v1/page/summary/india');

  const handleQueryChange = e => setQuery(e.target.value);
  const handleSearch = () => setUrl(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);

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
      {errMsg
        ? <div>{errMsg}</div>
        : (isLoading ?
            <div className="loader">
              <img
                className="loadingGif"
                src={loadingGif}
                alt="Loading..."
              />
            </div> :
            <span className="summaryClass">{summary}</span>
          )
      }
    </div>
  );
};

export default App;
