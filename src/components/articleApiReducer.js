const articleApiReducer = (state = {}, action) => {
  const { url, summary, errMsg } = action.payload || {};

  switch(action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        errMsg: '',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary,
        isLoading: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errMsg,
      };
    case 'SET_URL':
      return {
        ...state,
        url,
      };
    default:
      return state;
  }
};

export default articleApiReducer;