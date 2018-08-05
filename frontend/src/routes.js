import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import App from './App.jsx'
import User from './pages/user'

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path='/user' component={User} />
            <Route exact path='/test' component={App} />
        </Switch>
    </BrowserRouter>
)