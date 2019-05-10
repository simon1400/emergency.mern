import React, { Component } from 'react';
import Page from '../../components/page';
import axios from 'axios'
import Cookies from "js-cookie";

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      head: '',
      description: '',
      typeUser: ''
    }
  }

  componentDidMount() {
    let currentUser = Cookies.getJSON("user");
    this.setState({typeUser: currentUser.typeUser})

    axios.get('https://server.dotaznik.hardart.cz/homepage').then(res => {
      this.setState({
        head: res.data[0].head,
        description: res.data[0].description
      })
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios.post("https://server.dotaznik.hardart.cz/homepage/update/5cd43282836c305a14770983", this.state)
      .then(res => {
        window.location.href = "/";
      });
  };

  render() {
    return (
      <Page id="homepage">
        <article className="uk-article">
          <div className="uk-container">
            <div className="uk-child-width-1-1 uk-grid" uk-grid="">
              <div className="uk-text-left">
                <h1 className="uk-article-title">{this.state.head}</h1>
                <p>{this.state.description}</p>
              </div>
            </div>
          </div>
        </article>

        {this.state.typeUser === 'admin' ? <div className="uk-container uk-container-xsmall">
          <div className="uk-margin-top uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h2>Edit informace</h2>
            </div>
            <form className="uk-form-stacked">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Zahlavi
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    value={this.state.head}
                    id="form-stacked-text"
                    name="head"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Zahlavi"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Popis
                </label>
                <textarea
                  className="uk-textarea"
                  rows="5"
                  onChange={this.handleChange}
                  name="description"
                  placeholder="Popis"
                  value={this.state.description}
                />
              </div>

              <button
                className="uk-button uk-button-primary"
                onClick={this.onSubmit}
              >
                Ulozit
              </button>
            </form>
          </div>
        </div> : ''}

      </Page>
    )
  }
}
