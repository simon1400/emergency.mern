import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { frontloadConnect } from "react-frontload";
import Cookies from "js-cookie";

import { getCurrentProfile } from "../../../modules/profile";

const frontload = async props => await props.getCurrentProfile();

const AdminRoute = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.getJSON("user");

  return (
    <Route
      {...rest}
      render={props =>
        currentUser.typeUser === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/`} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentProfile: state.profile.currentProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCurrentProfile }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    frontloadConnect(frontload, {
      onMount: true,
      onUpdate: false
    })(AdminRoute)
  )
);
