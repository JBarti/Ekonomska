import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Router } from "react-router";
import App from "./App";
import Login from "./pages/login";
import Ucenik from "./pages/ucenik/ucenik";
import Profesor from "./pages/profesor/profesor";

import { Provider } from "react-redux";
import { store } from "./store";

export default (
  <BrowserRouter>
    <div>
      <Provider store={store}>
        <Route exact path="/" component={Login} />
      </Provider>
      <Provider store={store}>
        <Route path="/ucenik" component={Ucenik} />
      </Provider>
      <Route path="/profesor" component={Profesor} />
    </div>
  </BrowserRouter>
);
