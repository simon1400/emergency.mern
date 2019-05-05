import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import Cookies from "js-cookie";

const frontload = async props => await props.getCurrentProfile();

const DoctorRoute = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.getJSON("user");

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) {
          return currentUser.typeUser === "admin" ||
            currentUser.typeUser === "doctor" ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/`} />
          );
        } else {
          return <Redirect to={`/`} />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(DoctorRoute);
