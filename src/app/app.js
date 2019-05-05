// The basics
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { frontloadConnect } from "react-frontload";

// Action creators and helpers
import { establishCurrentUser } from "../modules/auth";
import { getCurrentProfile } from "../modules/profile";
import { isServer } from "../store";

import Header from "./header";
import Routes from "./routes";

import "./app.css";
import "uikit";

const frontload = async props => {
  return await props.getCurrentProfile();
};

class App extends Component {
  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser();
    }
  }

  render() {
    return (
      <div id="app">
        <Header
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.currentProfile}
        />
        <Routes typeUser={this.props.currentProfile.typeUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentProfile: state.profile.currentProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser, getCurrentProfile }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    frontloadConnect(frontload, {
      onMount: true,
      onUpdate: false
    })(App)
  )
);
