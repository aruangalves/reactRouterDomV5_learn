import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [reverse, setReverse] = useState(false);
  const rev = reverse ? 'reverse' : '';

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
