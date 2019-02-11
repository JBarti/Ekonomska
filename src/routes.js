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
    <Provider store={store}>
      <Route exact path="/" component={Login} />
      <Route path="/ucenik" component={Ucenik} />
      <Route path="/profesor" component={Profesor} />
    </Provider>
  </BrowserRouter>
);
