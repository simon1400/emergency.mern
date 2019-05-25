import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";

import Tests from "./tests";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      rodneCislo: "",
      password: "",
      typeUser: "",
      parrentDoctor: "",
      selectTest: [],
      readPassword: true
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.loadData(this.props.match.params.id);
    } else {
      this.setState({
        typeUser: this.props.match.params.typeUser
      });
    }

    if (this.props.match.params.typeUser === "pacient") {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      this.setState({ parrentDoctor: currentUser._id });
    }
  }

  loadData = id => {
    axios.get("https://server.dotaznik.hardart.cz/admin/user/" + id).then(res =>
      this.setState({
        name: res.data.name,
        surname: res.data.surname,
        rodneCislo: res.data.rodneCislo,
        typeUser: res.data.typeUser,
        selectTest: res.data.selectTest
      })
    );
  };

  handleChange = e => {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeArray = e => {
    let tests = this.state.selectTest;
    if (tests.indexOf(e.target.name) !== -1) {
      tests.splice(tests.indexOf(e.target.name), 1);
    } else {
      tests.push(e.target.name);
    }
    this.setState({
      selectTest: tests
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.props.match.params.id) {
      axios.post("https://server.dotaznik.hardart.cz/admin/user/update/" + this.props.match.params.id, this.state)
        .then(res => {
          window.location.href = "/list/all/" + this.state.typeUser;
        });
    } else {
      axios
        .post("https://server.dotaznik.hardart.cz/admin/user/create", this.state)
        .then(res => {
          window.location.href = "/list/all/" + this.state.typeUser;
        });
    }
  };

  render() {
    return (
      <Page id="homepage">
        <div className="uk-container uk-container-xsmall">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <form className="uk-form-stacked" autoComplete="off">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Name
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.name}
                    id="form-stacked-text"
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Surname
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.surname}
                    type="text"
                    name="surname"
                    onChange={this.handleChange}
                    placeholder="Surname"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  ID Number
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.rodneCislo}
                    type="text"
                    name="rodneCislo"
                    autoComplete="off"
                    onChange={this.handleChange}
                    placeholder="ID Number"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Password
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.password}
                    type="password"
                    readOnly={this.state.readPassword}
                    onFocus={(e) => this.setState({readPassword: false})}
                    autoComplete="off"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>

              {this.state.typeUser === "pacient" ? (
                <Tests
                  tests={this.state.selectTest}
                  changeCheckbox={this.handleChangeArray}
                />
              ) : (
                ""
              )}

              <button className="uk-button uk-button-primary" onClick={this.onSubmit}>
                Save
              </button>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}
