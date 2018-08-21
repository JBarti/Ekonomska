import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import App from './App.jsx'
import Login from './pages/login'
import Ucenik from './pages/ucenik/ucenik'

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/test' component={App} />
            <Route exact path='/ucenik' component={Ucenik} />
        </Switch>
    </BrowserRouter>
)