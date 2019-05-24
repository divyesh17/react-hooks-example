import React from 'react';

const ArticleSearch = props => (
  <>
    <input
      className="queryInputBox"
      type="text"
      value={props.query}
      onChange={props.onQueryChange}
    />
    <button
      className="searchButton"
      onClick={props.onSearch}
    >
      Search
    </button>
  </>
);

export default ArticleSearch;
