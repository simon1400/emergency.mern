import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";
import Cookies from "js-cookie";

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
      selectTest: []
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
      let currentUser = Cookies.getJSON("user");
      this.setState(
        {
          parrentDoctor: currentUser._id
        },
        () => console.log(this.state)
      );
    }
  }

  loadData = id => {
    axios.get("http://server.dotaznik.hardart.cz/admin/user/" + id).then(res =>
      this.setState({
        name: res.data.name,
        surname: res.data.surname,
        rodneCislo: res.data.rodneCislo,
        password: res.data.password,
        typeUser: res.data.typeUser,
        selectTest: res.data.selectTest
      })
    );
  };

  handleChange = e => {
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
      axios
        .post(
          "http://server.dotaznik.hardart.cz/admin/user/update/" +
            this.props.match.params.id,
          this.state
        )
        .then(res => {
          window.location.href = "/list/all/" + this.state.typeUser;
        });
    } else {
      axios
        .post("http://server.dotaznik.hardart.cz/admin/user/create", this.state)
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
            <form className="uk-form-stacked">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Jmeno
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.name}
                    id="form-stacked-text"
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Jmeno"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Prijmeni
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.surname}
                    type="text"
                    name="surname"
                    onChange={this.handleChange}
                    placeholder="Prijmeni"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Rodne cislo
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.rodneCislo}
                    type="text"
                    name="rodneCislo"
                    onChange={this.handleChange}
                    placeholder="Rodne cislo"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Heslo
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input "
                    value={this.state.password}
                    type="text"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Heslo"
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

              <button
                className="uk-button uk-button-primary"
                onClick={this.onSubmit}
              >
                Ulozit
              </button>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}
