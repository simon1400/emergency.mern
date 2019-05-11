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
      axios
        .get("https://server.dotaznik.hardart.cz/admin/test/" + this.props.match.params.id)
        .then(res => {
          console.log(res.data);
          this.setState({
            test: res.data
          });
        });
    }else{
      axios
        .get("https://server.dotaznik.hardart.cz/result/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            test: res.data
          });
        });
    }

  }

  render() {
    var test = this.state.test;
    var typeuser = this.props.match.params.type
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h1 className="uk-heading-divider uk-text-center">
                {test.nameTest}
              </h1>
              {typeuser ? (test.questions ? test.questions.map((itemTest, index) => (
                <dl
                  key={index}
                  className="uk-description-list uk-description-list-divider"
                >
                  <dt>
                    <h3 className="uk-margin-remove-bottom">
                      {itemTest.nameQuestion}
                    </h3>
                  </dt>
                  {itemTest.asks.map((ask, indexAsk) => (
                    <dd key={indexAsk} className="uk-grid-small" uk-grid="">
                      <div className="uk-width-expand" uk-leader="fill: .">
                        {ask.nameAsk}
                      </div>
                      <div className="uk-text-primary uk-flex uk-flex-bottom">
                        <p>{ask.valueAsk} points</p>
                      </div>
                    </dd>
                  ))}
                </dl>))
                : '') : (test.answers ? test.answers.map((item, index) => (
                    <dl
                      key={index}
                      className="uk-description-list uk-description-list-divider"
                    >
                      <dt>
                        <h3 className="uk-margin-remove-bottom">
                          {item.nameAsk}
                        </h3>
                      </dt>
                      <dd className="uk-grid-small" uk-grid="">
                        <div className="uk-width-expand" uk-leader="fill: .">
                          {item.checkedValue}
                        </div>
                        <div className="uk-text-primary uk-flex uk-flex-bottom">
                          <p>{item.checkedBody} points</p>
                        </div>
                      </dd>
                    </dl>
                  )) : '')}
              <hr />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
