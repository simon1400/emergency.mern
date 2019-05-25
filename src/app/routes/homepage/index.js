import React, { Component } from 'react';
import Page from '../../components/page';
import axios from 'axios'


export default class Homepage extends Component {

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if(navigator.onLine){
      axios.get("https://server.dotaznik.hardart.cz/admin/test").then(res => {
        localStorage.setItem('tests', JSON.stringify(res.data))
      });
      axios.get('https://server.dotaznik.hardart.cz/result').then(res => {
        let localResults = JSON.parse(localStorage.getItem('results'))
        let qual;
        console.log(localResults);
        if(localResults){
          localResults.map(itemLocal => {
            qual = res.data.filter(item => item._id.includes(itemLocal._id))
            console.log(qual);
            if(!qual.length){
              console.log('create');
              axios.post('https://server.dotaznik.hardart.cz/result/create', itemLocal)
            }
          })
        }
        localStorage.setItem('results', JSON.stringify(res.data))
      })
      axios.get('https://server.dotaznik.hardart.cz/admin/user/all').then(res => {
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
