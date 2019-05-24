import React, { Component } from 'react';
import Page from '../../components/page';
import axios from 'axios'


export default class Homepage extends Component {

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if(navigator.onLine){
      axios.get("http://localhost:4000/admin/test").then(res => {
        localStorage.setItem('tests', JSON.stringify(res.data))
      });
      axios.get('http://localhost:4000/result').then(res => {
        let localResults = JSON.parse(localStorage.getItem('results'))
        let qual;
        localResults.map(itemLocal => {
          qual = res.data.filter(item => item._id.includes(itemLocal._id))
          if(!qual.length){
            axios.post('http://localhost:4000/result/create', itemLocal)
          }
        })
        localStorage.setItem('results', JSON.stringify(res.data))
      })
      axios.get('http://localhost:4000/admin/user/all').then(res => {
        localStorage.setItem('users', JSON.stringify(res.data))
      })
    }
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
