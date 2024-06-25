import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**RULES OF HOOKS
 * 1. Only call Hooks at the top level
 * 1.1. Call them at the top level in the body of a function component.
 * 1.2. Call them at the top level in the body of a custom Hook.
 * 1.3. DO NOT: call Hooks inside conditions or loops, after a conditional return statement, in event handlers, in class components, inside functions passed to useMemo, useReducer or useEffect, inside try/catch/finally blocks
 * 2. Only call Hooks from React functions (React function components or from custom Hooks)
 */

const eventFn = () => {
  console.log('Element H1 was clicked.');
};

function App() {
  const [count, setCount] = useState(0);
  const [reverse, setReverse] = useState(false);
  const rev = reverse ? 'reverse' : '';

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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`logo react ${rev}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={handleClick}>Logo was reversed {count} time{count === 1 ? '' : 's'}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
