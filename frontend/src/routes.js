import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch, Router } from 'react-router'
import App from './App'
import Login from './pages/login'
import Ucenik from './pages/ucenik/ucenik'



export default (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Login} />
            <Route path='/ucenik' component={Ucenik} />
        </div>
    </BrowserRouter>
)