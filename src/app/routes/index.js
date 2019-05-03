import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminRoute from "../components/authenticated-route";
import UnauthenticatedRoute from "../components/unauthenticated-route";
import Loadable from "react-loadable";

import NotFound from "./not-found";

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ "./homepage"),
  loading: () => null,
  modules: ["homepage"]
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "./login"),
  loading: () => null,
  modules: ["login"]
});

// SElf ROUTES --------------------------------------------------------
// SElf ROUTES --------------------------------------------------------

const Tests = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./tests"),
  loading: () => null,
  modules: ["tests"]
});

const Results = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./results"),
  loading: () => null,
  modules: ["results"]
});

const List = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./list"),
  loading: () => null,
  modules: ["list"]
});

const Add = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./add-user"),
  loading: () => null,
  modules: ["add-user"]
});

const Test = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./test-full"),
  loading: () => null,
  modules: ["test-full"]
});

const Create = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ "./create"),
  loading: () => null,
  modules: ["create"]
});

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <AdminRoute exact path="/" component={Homepage} />
        <AdminRoute exact path="/tests/:user" component={Tests} />
        <AdminRoute exact path="/results/:user" component={Results} />
        <AdminRoute exact path="/list/all/:user" component={List} />
        <AdminRoute exact path="/add/:typeUser" component={Add} />
        <AdminRoute exact path="/user/edit/:id" component={Add} />
        <AdminRoute exact path="/tests/:user/:id" component={Test} />
        <AdminRoute exact path="/create/:id" component={Create} />
        <AdminRoute exact path="/create" component={Create} />

        <UnauthenticatedRoute exact path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
