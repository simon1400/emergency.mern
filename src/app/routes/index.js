import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AuthentticatedRoute from "../components/authenticated-route";
import AdminRoute from "../components/admin-route";
import DoctorRoute from "../components/doctor-route";
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
        <AuthentticatedRoute
          exact
          path="/"
          component={Homepage}
          typeUser={this.props.typeUser}
        />
        <AuthentticatedRoute exact path="/tests/:user" component={Tests} />
        <AuthentticatedRoute
          exact
          path="/tests/pacient/:id"
          component={Test}
          typeUser={this.props.typeUser}
        />
        <AuthentticatedRoute
          exact
          path="/results/pacient"
          component={Results}
          typeUser={this.props.typeUser}
        />

        <DoctorRoute
          exact
          path="/list/all/:user"
          component={List}
          typeUser={this.props.typeUser}
        />
        <DoctorRoute
          exact
          path="/add/:typeUser"
          component={Add}
          typeUser={this.props.typeUser}
        />
        <DoctorRoute
          exact
          path="/user/edit/:id"
          component={Add}
          typeUser={this.props.typeUser}
        />

        <AdminRoute
          exact
          path="/create/:id"
          component={Create}
          typeUser={this.props.typeUser}
        />
        <AdminRoute
          exact
          path="/create"
          component={Create}
          typeUser={this.props.typeUser}
        />

        <UnauthenticatedRoute exact path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
