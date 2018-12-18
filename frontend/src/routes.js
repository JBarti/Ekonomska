import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch, Router } from 'react-router'
import App from './App'
import Login from './pages/login'
import Ucenik from './pages/ucenik/ucenik'
import Profesor from './pages/profesor/profesor'



export default (
    <BrowserRouter>
        <div>
            <Route path='/ucenik' component={Ucenik} />
            <Route path='/profesor' component={Profesor} />
        </div>
    </BrowserRouter>
)