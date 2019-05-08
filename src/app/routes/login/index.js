import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";
import axios from "axios";

import { loginUser } from "../../../modules/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rodneCislo: "",
      password: ""
    };
  }

  componentDidMount() {
    var data = {
      name: "admin",
      surname: "admin",
      rodneCislo: "admin",
      password: "admin",
      typeUser: "admin",
      selectTest: []
    };
    axios.post("http://localhost:4000/admin/user/create", data).then(res => {
      console.log(res);
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Page id="login" title="Login" description="We need to log in to stuff.">
        <div id="modal-close-default" className="tm-modal" uk-modal="">
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-text-center">
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close=""
            />
            <h2 className="uk-modal-title">Prihalseni</h2>
            <hr />
            <form className="uk-form-stacked">
              <div className="uk-margin">
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-large"
                    onChange={this.handleChange}
                    name="rodneCislo"
                    type="text"
                    placeholder="Rodne cislo"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-large"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    placeholder="Heslo"
                  />
                </div>
              </div>
              <hr />
              <button
                className="uk-button uk-button-primary"
                onClick={() =>
                  this.props.loginUser(
                    this.state.rodneCislo,
                    this.state.password
                  )
                }
              >
                Prihlasit se
              </button>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
