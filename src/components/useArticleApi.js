import { useEffect, useReducer } from 'react';
import articleApiReducer from './articleApiReducer';

const useArticleAPI = initState => {
  const [state, dispatch] = useReducer(articleApiReducer, initState);
  const { url } = state;

  useEffect(() => {
    const fetchSummary = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await fetch(url);
        if (result.ok) {
          const { extract: summary } = await result.json();
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              summary,
            }
          });
        } else throw new Error();
      } catch (e) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: {
            errMsg: e.message || 'Something went wrong. Please try again.',
          }
        });
      }
    };

    fetchSummary();
  }, [url]);

  return [state, dispatch];
};

export default useArticleAPI;