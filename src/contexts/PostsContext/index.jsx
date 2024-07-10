import props from 'prop-types';
import { useReducer } from 'react';
import { PostsContext } from './context';
import { data } from './data';
import { reducer } from './reducer';
import * as types from './types';

export const PostsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, data);

  const actions = {
    loadPosts: () => {
      dispatch({ type: types.POSTS_LOADING});
    },
    displayPosts: (posts) =>{
      dispatch({type: types.POSTS_SUCCESS, payload: posts})
    }
  };

  return(
    <PostsContext.Provider value={{ state, actions}}>
      {children}
    </PostsContext.Provider>
  );


};

PostsContext.propTypes = {
  children: props.oneOfType([props.string, props.element, props.node]).isRequired,
}
