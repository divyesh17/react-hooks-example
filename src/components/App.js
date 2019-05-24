import React, { useState } from 'react';
import useArticleAPI from './useArticleApi';
import '../assets/App.css';
import loadingGif from '../assets/loader.gif';
import ArticleSearch from './ArticleSearch';

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
        <ArticleSearch
          query={query}
          onQueryChange={handleQueryChange}
          onSearch={handleSearch}
        />
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
