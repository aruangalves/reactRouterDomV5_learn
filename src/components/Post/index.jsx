import props from 'prop-types';

export const Post = ({post, handleClick}) => {
  return (
    <div key={post.id} className='post'>
      <h3 onClick={() => handleClick(post.title)}>{post.title}</h3>
      <hr />
      <p>{post.body}</p>
    </div>
  );
}

Post.propTypes = {
  post: props.shape({
    id: props.number,
    title: props.string,
    body: props.string,
  }),
  handleClick: props.func,
}
