import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ""
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.user);
    axios
      .get(
        "http://localhost:4000/admin/user/all/" + this.props.match.params.user
      )
      .then(res => {
        this.setState({
          users: res.data
        });
      });
  }

  onDelete = e => {
    e.preventDefault();
    let users = this.state.users;
    for (var i = 0; i < users.length; i++) {
      console.log(users[i]._id);
      if (users[i]._id === e.target.name) users.splice(i, 1);
    }
    this.setState(
      {
        users: users
      },
      () => console.log(this.state)
    );
    axios.delete("http://localhost:4000/admin/user/delete/" + e.target.name);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    var data = this.state.users,
      search = this.state.search;

    if (data && search) {
      data = data.filter(function(item) {
        if (
          item.name.includes(search) ||
          item.surname.includes(search) ||
          item.rodneCislo.includes(search)
        )
          return true;
      });
    }

    return (
      <Page id="homepage">
        <div className="uk-container">
          <div
            className="uk-grid uk-grid-small uk-margin-medium-bottom"
            uk-grid=""
            uk-height-match=".tm-equal-height"
          >
            <div className="uk-width-4-5">
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
            <div className="uk-width-1-5">
              <button
                className="uk-button uk-button-primary uk-width-1-1 tm-equal-height"
                onClick={() => (window.location.href = "/add/doctor")}
              >
                Pridat {this.props.match.params.user}a
              </button>
            </div>
          </div>
        </div>
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <table className="uk-table uk-table-striped uk-table-hover uk-table-middle uk-margin-bottom">
                <thead>
                  <tr>
                    <th>Jmeno</th>
                    <th>Prijmeni</th>
                    <th>Rodne cislo</th>
                    <th className="uk-text-right">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.rodneCislo}</td>
                        <td>
                          <ul className="uk-iconnav uk-flex-right">
                            <li>
                              <button name={item._id} onClick={this.onDelete} />
                              <span nohref="true" uk-icon="icon: info" />
                            </li>
                            <li>
                              <Link to={`/user/edit/${item._id}`}>
                                <span uk-icon="icon: file-edit" />
                              </Link>
                            </li>
                            <li>
                              <button name={item._id} onClick={this.onDelete} />
                              <span uk-icon="icon: trash" />
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
