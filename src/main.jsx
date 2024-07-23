import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { Abc } from './templates/Abc'
import { Menu } from './components/Menu'
import { Page404 } from './templates/Page404'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/abc/:slug/:id" component={Abc} />
        <Route path="/abc/:slug" component={Abc} />
        <Route path="/abc" component={Abc} />
        <Route path="/" component={App} exact />
        <Route path="*" component={Page404} />
        {/*<App />*/}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
)
