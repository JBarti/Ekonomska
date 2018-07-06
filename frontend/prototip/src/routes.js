import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import Profesor from './components/profesor/Profesor.jsx'
import ProfesorMain from './components/profesor/main/Main.jsx'
import Ucenik from './components/ucenik/Ucenik.jsx'
import UcenikMain from './components/ucenik/main/Main.jsx'
import PostCreator from './components/PostCreator/post-creator.jsx'

import App from './App'

export default (
    <BrowserRouter>
        <div>
            <Route path="/profesor" component={Profesor}></Route>
            <Route path="/profesor-main" component={ProfesorMain}></Route>
            <Route path="/ucenik" component={Ucenik}></Route>
            <Route path="/ucenik-main" component={UcenikMain}></Route>
            <Route path="/create-post" component={PostCreator}></Route>
        </div>
    </BrowserRouter>
);

//<IndexRoute component={Index} />