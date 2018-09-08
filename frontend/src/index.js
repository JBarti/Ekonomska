import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Ucenik from './Modules/ucenik';
import Info from './Modules/info';
import Login from './Modules/login'
import registerServiceWorker from './registerServiceWorker';
import User from './Modules/user';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' component={App}/>
      <Route path='/ucenik' component={Ucenik}/>
      <Route path='/info' component={Info}/>
      <Route path='/login' component={Login}/>
      <Route path='/user' component={User}/>
    </div>
  </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
