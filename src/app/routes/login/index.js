import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";
import axios from "axios";


import { setCurrentUser } from "../../../modules/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rodneCislo: "",
      password: "",
      error: false,
      readPassword: true
    };
  }

  login = (e, rodneCislo, password) => {
    e.preventDefault()
    axios.get("https://server.dotaznik.hardart.cz/admin/user/login/" + rodneCislo + "/" + password)
      .then(res => {
        if(res.data === 'errorpassword' || res.data === 'errorlogin'){
          this.setState({
            error: true
          })
        }else{
          localStorage.setItem("user", JSON.stringify(res.data))
          window.location.href = '/'
        }
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false
    });
  };

  render() {
    return (
      <Page id="login" title="Login" description="We need to log in to stuff.">
        <div id="modal-close-default" className="tm-modal" uk-modal="">
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-text-center">
            <h2 className="uk-modal-title">Sing in</h2>
            <hr />

            <form className="uk-form-stacked">
              {this.state.error ? <div className="uk-alert-danger" uk-alert="">
                  <p>Error login or password</p>
                </div>
              : ''}

              <div className="uk-margin">
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-large"
                    onChange={this.handleChange}
                    name="rodneCislo"
                    type="text"
                    placeholder="ID Number"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-large"
                    onChange={this.handleChange}
                    name="password"
                    readOnly={this.state.readPassword}
                    onFocus={(e) => this.setState({readPassword: false})}
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <hr />
              <button
                className="uk-button uk-button-primary"
                onClick={(e) =>
                  this.login(
                    e,
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
  bindActionCreators({ setCurrentUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
