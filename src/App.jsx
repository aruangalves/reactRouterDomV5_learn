import props from 'prop-types';
import { useState, useEffect, memo, useCallback, useMemo, useRef, useContext, createContext } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { AppContext } from './contexts/AppContext';
import { Div } from './components/Div';
import { Header1 } from './components/Header1';
import { Paragraph } from './components/Paragraph';
import { ChangeButton, InvertButton } from './components/SomeButton';



/**RULES OF HOOKS
 * 1. Only call Hooks at the top level
 * 1.1. Call them at the top level in the body of a function component.
 * 1.2. Call them at the top level in the body of a custom Hook.
 * 1.3. DO NOT: call Hooks inside conditions or loops, after a conditional return statement, in event handlers, in class components, inside functions passed to useMemo, useReducer or useEffect, inside try/catch/finally blocks
 * 2. Only call Hooks from React functions (React function components or from custom Hooks)
 */

const Button = ({incrementFn}) => {
  //console.log('Btn render');
  //After removing the count2 dependency, this function must render only once, meaning the console message is also displayed only once after initial render
  return <button type='button' onClick={() => incrementFn(5)}>+</button>
}

Button.propTypes = {
  incrementFn: props.func,
}

const Post = ({post, handleClick}) => {
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

const eventFn = () => {
  console.log('Element H1 was clicked.');
};

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [reverse, setReverse] = useState(false);

  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const searchInput = useRef(null);
  const renderCounter = useRef(0);
  //note that changing the value associated with useRef doesn't trigger another component rendering pass

  const rev = reverse ? 'reverse' : '';

  //UseCallback is useful for 'caching' functions that do not change
  const incrementCounter = useCallback((incAmount = 1) => {
    //Used to be: setCount2((count2) => count2 + incAmount);
    //But this adds count2 as a dependency, meaning this function is changing on every count2 value update. Changing to a generic 'c' variable eliminates this dependency and the function no longer is refreshed
    setCount2((c) => c + incAmount);
  },[]);

  //This signify an App update:
  //console.log('App render');

  //Mimicking the behavior of componentDidUpdate
  useEffect(() =>{
    console.log('componentDidUpdate');
  });

  //Mimicking the behavior of componentDidMount; runs only once
  useEffect(()=>{
    console.log('componentDidMount');

    //? ---> Optional chaining operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
    //Note that you have to clean your listeners so you can have this event run only once as intended. This is especially important during routing
    document.querySelector('h1')?.addEventListener('click', eventFn);

    //This cleaning process is done through:
    //Mimicking the behavior of componentWillUnmount
    return () =>{
      document.querySelector('h1')?.removeEventListener('click', eventFn);
    }
  }, []);

  //Run every time the dependency changes
  //Array can have multiple dependencies, but you are not required to use it in function, it will only monitor state changes and execute useEffect
  //The reverse is NOT TRUE, if you use a dependency on the body of the function, you are required to include it on your dependency list. Set functions aren't considered dependencies and aren't required
  useEffect(() =>{
    console.log('Counter: ', count);
    //!!!! WARNING !!!! AVOID INFINITE LOOPS SUCH AS:
    //setCount(count + 1);

    //This is safe and will not cause an infinite loop:
    //setCount(10);
  }, [count]);

  const handleClick = () =>{
    //setReverse(!reverse);
    //setCount(count + 1);
    //It could be advantageous to use setReverse and setCount through a callback function as
    setReverse((reverse) => !reverse);
    setCount((prevCount) => prevCount + 1);
  }

  const incBtn = useMemo(() =>{
    return <Button incrementFn={incrementCounter} />
  },[incrementCounter]);

  //Another useMemo example:
  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => setPosts(posts));
  }, []);

  useEffect(() =>{
    searchInput.current.focus();
  },[searchValue]);

  useEffect(() =>{
    renderCounter.current++;
  });

  //After you type on the search bar, without useMemo, the entire page would be re-rendered. With useMemo, React will check if the component state was updated. If not, then they're not rendered again
  //useMemo saves the Component state, useCallback saves the function state to avoid rendering the page again
  const handlePostClick = (value) =>{
    setSearchValue(value);
  };

  const renderedPosts = useMemo(() =>{
    return posts.length > 0 && posts.map(post => (<Post key={post.id} post={post} handleClick={handlePostClick} />));
  },[posts]);





  return (
    <AppContext>
      <Div>
        <div>
          <Header1 />
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className={`logo react ${rev}`} alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <h1>App was rendered {renderCounter.current} times.</h1>
          <button type="button" onClick={handleClick}>Logo was reversed {count} time{count === 1 ? '' : 's'}</button>
          <Paragraph />
          {incBtn}
          <ChangeButton />
          <InvertButton />
          <p>Counter #2 value is: {count2}</p>
          <h2>Another useMemo example:</h2>
          <p>
            <input ref={searchInput} type="search" value={searchValue} onChange={(ev) => setSearchValue(ev.target.value)}></input>
          </p>
          <div className='post-container'>
            {renderedPosts}
          </div>
          {posts.length === 0 &&
            <div className='post'>
              <p>Ainda não existem posts</p>
            </div>
            }
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </Div>
    </AppContext>
  )
}

export default App
