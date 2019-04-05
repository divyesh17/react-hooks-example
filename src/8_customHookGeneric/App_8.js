import React, { useState, useEffect } from 'react';
import '../App.css';
import loadingGif from '../loader.gif';

const useArticleAPI = initState => {
  const [state, setState] = useState(initState);
  const { url } = state;

  useEffect(() => {
    const fetchSummary = async () => {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        errMsg: '',
      }));

      try {
        const result = await fetch(url);
        const { extract: summary } = await result.json();

        setState(prevState => ({
          ...prevState,
          summary,
          isLoading: false,
        }));
      } catch (e) {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          errMsg: e.message,
        }));
      }
    };

    fetchSummary();
  }, [url]);

  return [state, setState];
};

const App = () => {
  const [query, setQuery] = useState('india');
  const [articleDetails, setArticleDetails] = useArticleAPI({
    isLoading: false,
    errMsg: '',
    summary: '',
    url: 'https://en.wikipedia.org/api/rest_v1/page/summary/india',
  });
  const { isLoading, errMsg, summary } = articleDetails;

  const handleQueryChange = e => setQuery(e.target.value);
  const handleSearch = () => setArticleDetails(prevState => ({ 
    ...prevState,
    url: `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`,
  }));

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
