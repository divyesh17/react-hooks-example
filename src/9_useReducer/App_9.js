import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import loadingGif from './loader.gif';

const articleApiReducer = (state = {}, action) => {
  const { url, summary, errMsg } = action.payload || {};

  switch(action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        errMsg: '',
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary,
        isLoading: false,
      }
    case 'FETCH_FAIL':
      return {
        ...state,
        isLoading: false,
        errMsg,
      }
    case 'SET_URL':
      return {
        ...state,
        url,
      }
    default:
      return state;
  }
};

const useArticleAPI = initState => {
  const [state, dispatch] = useReducer(articleApiReducer, initState);
  const { url } = state;

  useEffect(() => {
    const fetchSummary = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await fetch(url);
        const { extract: summary } = await result.json();

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            summary,
          }
        });
      } catch (e) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: {
            errMsg: e.message,
          }
        });
      }
    };

    fetchSummary();
  }, [url]);

  return [state, dispatch];
};

const App = () => {
  const [query, setQuery] = useState('india');
  const [articleDetails, dispatch] = useArticleAPI({
    isLoading: false,
    errMsg: '',
    summary: '',
    url: 'https://en.wikipedia.org/api/rest_v1/page/summary/india',
  });
  const { isLoading, errMsg, summary } = articleDetails;

  const handleQueryChange = e => setQuery(e.target.value);
  const handleSearch = () => dispatch({
    type: 'SET_URL',
    payload: {
      url: `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`,
    }
  });

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
