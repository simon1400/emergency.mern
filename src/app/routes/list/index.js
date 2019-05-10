import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import UIkit from 'uikit';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ""
    };
  }

  componentDidMount() {
    let currentUser = Cookies.getJSON("user");
    axios
      .get(
        "https://server.dotaznik.hardart.cz/admin/user/all/" + this.props.match.params.user
      )
      .then(res => {
        if (this.props.match.params.user === "pacient") {
          this.setState({
            users: res.data.filter(
              item => item.parrentDoctor === currentUser._id
            )
          });
        } else {
          this.setState({
            users: res.data
          });
        }
      });
  }



  onDelete = e => {
    e.preventDefault();
    var saveTarget = e.currentTarget;
     e.currentTarget.blur();
     let users = this.state.users;
     UIkit.modal.confirm('Opravdu smazat uzivatele?').then(function () {

       for (var i = 0; i < users.length; i++) {
         if (users[i]._id === saveTarget.name) users.splice(i, 1);
       }

       axios.delete("https://server.dotaznik.hardart.cz/admin/user/delete/" + saveTarget.name);
     }, function () {
         console.log('Rejected.')
     }).then(() => {
       this.setState({
         users: users
       });
     });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    var data = this.state.users,
      search = this.state.search;

    if (data && search) {
      data = data.filter(
        item =>
          item.name.includes(search) ||
          item.surname.includes(search) ||
          item.rodneCislo.includes(search)
            ? true
            : false
      );
    }

    return (
      <Page id="homepage">
        <div className="uk-container">
          <div
            className="uk-grid uk-grid-small uk-margin-medium-bottom"
            uk-grid=""
            uk-height-match=".tm-equal-height"
          >
            <div className="uk-width-4-5@s uk-width-1-1">
              <div className="uk-margin">
                <form className="uk-search uk-search-default uk-width-1-1">
                  <span uk-search-icon="" />
                  <input
                    className="uk-search-input"
                    name="search"
                    value={this.state.search}
                    type="search"
                    onChange={this.handleChange}
                    placeholder="Search..."
                  />
                </form>
              </div>
            </div>
            <div className="uk-width-1-5@s uk-width-1-1">
              <Link
                className="uk-button uk-button-primary uk-width-1-1 tm-equal-height"
                to={`/add/${this.props.match.params.user}`}
              >
                Pridat {this.props.match.params.user}a
              </Link>
            </div>
          </div>
        </div>
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div classNmae="uk-overflow-auto">
              <table className="uk-table uk-table-striped uk-table-hover uk-table-small uk-table-divider uk-margin-bottom">
                <thead>
                  <tr>
                    <th className="uk-visible@s">Jmeno</th>
                    <th>Prijmeni</th>
                    <th>Rodne cislo</th>
                    <th className="uk-text-right">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td className="uk-visible@s">{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.rodneCislo}</td>
                        <td>
                          <ul className="uk-iconnav uk-flex-right">
                            {this.props.match.params.user === "pacient" ? (
                              <li>
                                <button
                                  name={item._id}
                                  onClick={this.onDelete}
                                />
                                <span nohref="true" uk-icon="icon: info" />
                              </li>
                            ) : (
                              false
                            )}
                            <li>
                              <Link to={`/user/edit/${item._id}`}>
                                <span uk-icon="icon: file-edit" />
                              </Link>
                            </li>
                            <li>
                              <a nohref="" name={item._id} onClick={this.onDelete}>
                                <span uk-icon="icon: trash" />
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <h3 className="uk-text-center">Nic nenalezeno</h3>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
