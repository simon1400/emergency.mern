import React, { Component } from 'react';
import Page from '../../components/page';
import axios from 'axios'

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      head: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('https://server.dotaznik.hardart.cz/homepage').then(res => {
      console.log(res);
      this.setState({
        head: res.data[0].head,
        description: res.data[0].description
      })
    })
  }

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
      </Page>
    )
  }
}
