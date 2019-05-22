import React, { Component } from 'react';
import Page from '../../components/page';
// import axios from 'axios'


export default class Homepage extends Component {

  // componentDidMount() {
  //   axios.get("https://server.dotaznik.hardart.cz/admin/test").then(res => {
  //     window.localStorage
  //   });
  // }

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
