import props from 'prop-types';



import { useContext, useEffect, useMemo, useRef, useState} from 'react';
import { PostsContext } from '../../contexts/PostsContext/context';
import { Post } from '../Post';

export const Posts = ({handlePostClick}) => {
  const [mount, setMount] = useState(false);

  const context = useContext(PostsContext);
  const { state, actions: {loadPosts, displayPosts} } = context;

  useEffect(()=>{
    loadPosts();
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      if(!mount){
        displayPosts(posts);
      }
    });

    return () => {
      setMount(true);
    };


  }, [mount]);

  //After you type on the search bar, without useMemo, the entire page would be re-rendered. With useMemo, React will check if the component state was updated. If not, then they're not rendered again
  //useMemo saves the Component state, useCallback saves the function state to avoid rendering the page again
  const renderedPosts = useMemo(()=>{
    return state.posts.map(post => (
      <Post key={post.id} post={post} handleClick={handlePostClick} />
    ));
  });

  return (
  <div>
    {state.loading && (
      <div className='post'>
        <p>Loading posts...</p>
      </div>
    )}
    <div className='post-container'>
      {renderedPosts}
    </div>
  </div>
  );
}

Posts.propTypes = {
  handlePostClick: props.func,
};
