import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { Abc } from './templates/Abc'
import { Menu } from './components/Menu'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/abc" component={Abc} />
        <Route path="/" component={App} />
        {/*<App />*/}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
)
