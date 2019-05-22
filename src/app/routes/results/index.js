import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";
// import XlsExport from 'xlsexport'
// import UIkit from 'uikit'


export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      typeUser: ''
    };
  }

  componentDidMount() {
    console.log(window);
    if(this.props.match.params.id){
      axios.get("https://server.dotaznik.hardart.cz/result/").then(res => {
        this.setState({
          tests: res.data.filter(item => item.userId.includes(this.props.match.params.id))
        });
      });
    }else{
      var currentUser = JSON.parse(localStorage.getItem("user"));
      axios.get("https://server.dotaznik.hardart.cz/result/").then(res => {
        this.setState({
          tests: res.data.filter(item => item.userId.includes(currentUser._id))
        });
      });
    }
  }

  onExport = (e) => {
    e.preventDefault();
    axios
      .get("https://server.dotaznik.hardart.cz/result/" + e.currentTarget.id)
      .then(res => {


        axios
          .get("https://server.dotaznik.hardart.cz/admin/user/" + res.data.userId)
          .then((newRes) => {
            let xmlData = {
              "Name pacient": newRes.data.name,
              "Surname pacient": newRes.data.surname,
              "ID number": newRes.data.rodneCislo,
              "Name test": res.data.nameTest,
              "Date": res.data.date
            }
            res.data.answers.map(item => (
              xmlData[item.nameAsk] = item.checkedValue
            ))
            console.log(xmlData);
            // var xls = new XlsExport([xmlData]);
            // xls.exportToXLS('dotaznik.xls')
          })

      });
  }

  onDelete = e => {
    e.preventDefault();
    var saveTarget = e.currentTarget;
     e.currentTarget.blur();
    let tests = this.state.tests;
    window.UIkit.modal.confirm('Do you really want to delete this result of test?').then(function () {

      for (var i = 0; i < tests.length; i++) {
        if (tests[i]._id === saveTarget.dataset.name) tests.splice(i, 1);
      }

      axios.delete("https://server.dotaznik.hardart.cz/result/delete/" + saveTarget.dataset.name);
    }, function () {
        console.log('Rejected.')
    }).then(() => {
      this.setState({
        tests: tests
      });
    })
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
                        {this.props.match.params.id ? (
                          <ul className="uk-iconnav uk-modal-close-default">
                            <li><span onClick={this.onExport} id={item._id} uk-icon="icon: cloud-download"></span></li>
                            <li><span onClick={this.onDelete} data-name={item._id} uk-icon="icon: trash"></span></li>
                          </ul>
                        ) : (
                          false
                        )}
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
