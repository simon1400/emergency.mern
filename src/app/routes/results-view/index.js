import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";

export default class TestFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: []
    };
  }

  componentDidMount() {
    if(this.props.match.params.type){
      if(navigator.onLine){
        axios.get("http://localhost:4000/admin/test/" + this.props.match.params.id)
          .then(res => {
            this.setState({
              test: res.data
            });
          });
      }else{
        this.setState({
          test: JSON.parse(localStorage.getItem("tests")).filter(item => item._id.includes(this.props.match.params.id))
        });
      }
    }else{
      if(navigator.onLine){
        axios.get("http://localhost:4000/result/" + this.props.match.params.id)
          .then(res => {
            this.setState({
              test: res.data
            });
          });
      }else{
        this.setState({
          test: JSON.parse(localStorage.getItem("results")).filter(item => item._id.includes(this.props.match.params.id))
        });
      }
    }
  }

  render() {
    var test = this.state.test;
    if(!navigator.onLine){
      if(test.length){
        test = test[0]
      }
    }

    var typeuser = this.props.match.params.type
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h1 className="uk-heading-divider uk-text-center">{test.nameTest}</h1>
              {typeuser
                ? (test.questions
                  ? test.questions.map((itemTest, index) =>
                      <dl key={index} className="uk-description-list uk-description-list-divider">
                        <dt>
                          <h3 className="uk-margin-remove-bottom uk-margin-medium-top">
                            {itemTest.nameQuestion}
                          </h3>
                          <p className="uk-article-meta uk-margin-remove-top uk-text-lowercase">({itemTest.typeQuestion})</p>
                        </dt>
                        {itemTest.typeQuestion === 'radio' ? itemTest.asks.map((ask, indexAsk) =>
                          <dd key={indexAsk} className="uk-grid-small" uk-grid="">
                            <div className="uk-width-expand" uk-leader="fill: .">{ask.nameAsk}</div>
                            <div className="uk-text-primary uk-flex uk-flex-bottom">
                              <p>{ask.valueAsk} points</p>
                            </div>
                          </dd>) : ''}
                      </dl>)
                  : '')
                : (test.answers
                  ? test.answers.map((item, index) =>
                        <dl key={index} className="uk-description-list uk-description-list-divider">
                          <dt>
                            <h3 className="uk-margin-remove-bottom">{item.nameAsk}</h3>
                          </dt>
                           <dd className="uk-grid-small" uk-grid="">
                            <div className="uk-width-expand" uk-leader="fill: .">{item.checkedValue}</div>
                            <div className="uk-text-primary uk-flex uk-flex-bottom">
                              {item.checkedBody && item.checkedBody !== '0' ? <p>{item.checkedBody} points</p> : 'Text value'}
                            </div>
                          </dd>
                        </dl>)
                  : '')}
              <hr />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
