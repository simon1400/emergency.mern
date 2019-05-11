import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";
import UIkit from 'uikit';


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.user === "admin" || this.props.match.params.user === "doctor") {
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
    var saveTarget = e.currentTarget;
     e.currentTarget.blur();
    let tests = this.state.tests;
    UIkit.modal.confirm('Do you really want to delete this test?').then(function () {

      for (var i = 0; i < tests.length; i++) {
        if (tests[i]._id === saveTarget.dataset.name) tests.splice(i, 1);
      }

      axios.delete("https://server.dotaznik.hardart.cz/admin/test/delete/" + saveTarget.dataset.name);
    }, function () {
        console.log('Rejected.')
    }).then(() => {
      this.setState({
        tests: tests
      });
    })
  };

  onEdit = (e) => {
    window.location.href = e.currentTarget.dataset.href
  }

  render() {
    var tests = this.state.tests;
    var typeUser = this.props.match.params.user;
    console.log(typeUser);
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
                      to={typeUser === "pacient" ? `/tests/pacient/${item._id}` : `/view/results/${item._id}/${typeUser}`}
                      className="uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset"
                    >
                      <h3 className="uk-card-title uk-text-center uk-margin-remove-bottom">
                        {item.nameTest}
                      </h3>
                      {typeUser !== "pacient" && typeUser !== "doctor" ? (
                        <ul className="uk-iconnav uk-modal-close-default">
                          <li><span onClick={this.onEdit} data-href={`/create/${item._id}`} uk-icon="icon: file-edit"></span></li>
                          <li><span onClick={this.onDelete} data-name={item._id} uk-icon="icon: trash"></span></li>
                        </ul>
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
