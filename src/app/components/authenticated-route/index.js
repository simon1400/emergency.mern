import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { frontloadConnect } from "react-frontload";

const AuthentticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
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
