import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { bindActionCreators } from "redux";
// import { frontloadConnect } from "react-frontload";


const AuthentticatedRoute = ({ component: Component, ...rest }) => {
  let currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
        currentUser.typeUser === "admin" || currentUser.typeUser === "pacient" || currentUser.typeUser === "doctor" ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
      ) : (<Redirect to={`/login`} />)
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(AuthentticatedRoute);
