import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.user === "admin") {
      axios.get("https://server.dotaznik.hardart.cz/admin/test").then(res => {
        this.setState({
          tests: res.data
        });
      });
    } else if (this.props.match.params.user === "pacient") {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      var currentTests = [];
      axios.get("https://server.dotaznik.hardart.cz/admin/test").then(res => {
        currentUser.selectTest.map(selectItem =>
          res.data.map(
            testItem =>
              selectItem === testItem._id ? currentTests.push(testItem) : false
          )
        );

        this.setState({
          tests: currentTests
        });
      });
    }
  }

  onDelete = e => {
    e.preventDefault();
    let tests = this.state.tests;
    for (var i = 0; i < tests.length; i++) {
      console.log(tests[i]._id);
      if (tests[i]._id === e.currentTarget.name) tests.splice(i, 1);
    }
    this.setState(
      {
        tests: tests
      },
      () => console.log(this.state)
    );
    axios.delete(
      "https://server.dotaznik.hardart.cz/admin/test/delete/" + e.currentTarget.name
    );
  };

  render() {
    var tests = this.state.tests;
    var typeUser = this.props.match.params.user;
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div
            className="uk-grid uk-child-width-1-1 uk-child-width-1-3@s "
            uk-grid=""
          >
            {tests
              ? tests.map((item, index) => (
                  <div key={index} className="uk-margin-bottom">
                    <Link
                      to={`${typeUser === "pacient" ? "pacient/" : "/create/"}${
                        item._id
                      }`}
                      className="uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset"
                    >
                      <h3 className="uk-card-title uk-text-center uk-margin-remove-bottom">
                        {item.nameTest}
                      </h3>
                      {typeUser !== "pacient" ? (
                        <button
                          onClick={this.onDelete}
                          name={item._id}
                          className="uk-modal-close-default uk-button uk-button-text"
                          type="button"
                        >
                          <span uk-icon="icon: trash" />
                        </button>
                      ) : (
                        false
                      )}
                    </Link>
                  </div>
                ))
              : false}
          </div>
        </div>
      </Page>
    );
  }
}
