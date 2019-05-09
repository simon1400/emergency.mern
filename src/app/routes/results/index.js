import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    var currentUser = Cookies.getJSON("user");
    axios.get("http://server.dotaznik.hardart.cz/result/").then(res => {
      this.setState({
        tests: res.data.filter(item => item.userId.includes(currentUser._id))
      });
    });
  }

  onSum = array => array.reduce((prev, cur) => +prev + +cur.checkedBody, 0);

  render() {
    var tests = this.state.tests;
    return (
      <Page id="homepage">
        <article className="uk-article">
          <div className="uk-container">
            <div
              className="uk-grid uk-child-width-1-1 uk-child-width-1-3@s "
              uk-grid=""
            >
              {tests.length
                ? tests.map((item, index) => (
                    <div key={index} className="uk-margin-small-bottom">
                      <Link
                        to={
                          item.done
                            ? `/view/results/${item._id}`
                            : `/tests/pacient/${item.idTest}`
                        }
                        className="uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small uk-display-block uk-link-reset"
                      >
                        <h3 className="uk-card-title">{item.nameTest}</h3>
                        <div className="uk-child-width-1-2 uk-grid" uk-grid="">
                          <div>
                            <p className="uk-article-meta uk-text-left">
                              {item.date}
                            </p>
                          </div>
                          <div className="uk-text-right">
                            {item.done ? (
                              <p className="uk-article-meta">
                                Results:{" "}
                                <span className="uk-badge">
                                  {this.onSum(item.answers)}
                                </span>
                              </p>
                            ) : (
                              <div className="uk-text-right">
                                <p className="uk-article-meta uk-text-warning uk-margin-remove-bottom">
                                  Pokracovat
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                : false}
            </div>
          </div>
        </article>
      </Page>
    );
  }
}

//
// <div className="uk-margin-bottom">
//   <a href="/" className="uk-card uk-card-default uk-card-hover uk-padding-small uk-card-body uk-display-block uk-link-reset">
//     <h3 className="uk-card-title">Test 1</h3>
//     <div className="uk-child-width-1-2 uk-grid" uk-grid>
//       <div><p className="uk-article-meta uk-text-left">Date: 04.04.2004 15:00</p></div>
//
//     </div>
//   </a>
// </div>
