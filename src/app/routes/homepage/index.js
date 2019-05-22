import React, { Component } from 'react';
import Page from '../../components/page';
import axios from 'axios'


export default class Homepage extends Component {

  componentDidMount() {
    axios.get("https://server.dotaznik.hardart.cz/admin/test").then(res => {
      localStorage.setItem('tests', JSON.stringify(res.data))
    });
    axios.get('https://server.dotaznik.hardart.cz/result').then(res => {
      localStorage.setItem('results', JSON.stringify(res.data))
    })
    axios.get('https://server.dotaznik.hardart.cz/admin/user/all').then(res => {
      localStorage.setItem('users', JSON.stringify(res.data))
    })
  }

  render() {
    return (
      <Page id="homepage">
        <article className="uk-article">
          <div className="uk-container">
            <div className="uk-child-width-1-1 uk-grid" uk-grid="">
              <div className="uk-text-center">
                <h1 className="uk-article-title">Questionnaire for neurological diseases</h1>
              </div>
            </div>
          </div>
        </article>
      </Page>
    )
  }
}
