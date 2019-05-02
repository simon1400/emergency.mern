import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import UnauthenticatedRoute from '../components/unauthenticated-route';
import Loadable from 'react-loadable';

import NotFound from './not-found';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
  loading: () => null,
  modules: ['homepage']
});

// const About = Loadable({
//   loader: () => import(/* webpackChunkName: "about" */ './about'),
//   loading: () => null,
//   modules: ['about']
// });
//
// const Dashboard = Loadable({
//   loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
//   loading: () => null,
//   modules: ['dashboard']
// });

// const Login = Loadable({
//   loader: () => import(/* webpackChunkName: "login" */ './login'),
//   loading: () => null,
//   modules: ['login']
// });
//
// const Logout = Loadable({
//   loader: () => import(/* webpackChunkName: "logout" */ './logout'),
//   loading: () => null,
//   modules: ['logout']
// });

// const Profile = Loadable({
//   loader: () => import(/* webpackChunkName: "profile" */ './profile'),
//   loading: () => null,
//   modules: ['profile']
// });


// SElf ROUTES --------------------------------------------------------
// SElf ROUTES --------------------------------------------------------

const Tests = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './tests'),
  loading: () => null,
  modules: ['tests']
});

const Results = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './results'),
  loading: () => null,
  modules: ['results']
});

const List = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './list'),
  loading: () => null,
  modules: ['list']
});

const Add = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './add-user'),
  loading: () => null,
  modules: ['add-user']
});

const Test = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './test-full'),
  loading: () => null,
  modules: ['test-full']
});

const Create = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './create'),
  loading: () => null,
  modules: ['create']
});

export default class Routes extends Component {
  render() {
    return(
      <Switch>

        <Route exact path="/" component={Homepage} />
        <Route exact path="/tests/:user" component={Tests} />
        <Route exact path="/results/:user" component={Results} />
        <Route exact path="/list/:user" component={List} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/tests/:user/:id" component={Test} />
        <Route exact path="/create" component={Create} />

        <Route exact path="/login" component={Create} />


        {/* <Route exact path="/about" component={About} /> */}
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        {/* <AuthenticatedRoute exact path="/dashboard" component={Dashboard} /> */}

        {/* <UnauthenticatedRoute exact path="/login" component={Login} />
        <AuthenticatedRoute exact path="/logout" component={Logout} /> */}

        <Route component={NotFound} />
      </Switch>
    )
  }
};
