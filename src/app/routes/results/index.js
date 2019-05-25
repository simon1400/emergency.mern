import React, { Component } from "react";
import Page from "../../components/page";
import { Link } from "react-router-dom";
import axios from "axios";
import XlsExport from 'xlsexport'


export default class Results extends Component {

  state = {
    tests: [],
    typeUser: ''
  };

  componentDidMount() {
    console.log('update results');
    if(this.props.match.params.id){
      if(navigator.onLine){
        axios.get("https://server.dotaznik.hardart.cz/result/").then(res => {
          this.setState({
            tests: res.data.filter(item => item.userId.includes(this.props.match.params.id))
          });
        });
      }else{
        var tests = JSON.parse(localStorage.getItem('results')).filter(item => item.userId.includes(this.props.match.params.id));
        this.setState({ tests });
      }
    }else{
      var currentUser = JSON.parse(localStorage.getItem("user"));
      if(navigator.onLine){
        axios.get("https://server.dotaznik.hardart.cz/result/").then(res => {
          this.setState({
            tests: res.data.filter(item => item.userId.includes(currentUser._id))
          });
        });
      }else{
        var tests = JSON.parse(localStorage.getItem('results')).filter(item => item.userId.includes(currentUser._id));
        this.setState({ tests });
      }
    }
  }

  onExport = (e) => {
    e.preventDefault();
    if(navigator.onLine){
      axios.get("https://server.dotaznik.hardart.cz/result/" + e.currentTarget.id)
          .then(res => axios.get("https://server.dotaznik.hardart.cz/admin/user/" + res.data.userId)
                            .then(newRes => {
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
                              var xls = new XlsExport([xmlData]);
                              xls.exportToXLS('dotaznik.xls')
                            })
        );
    }else{
      var result = JSON.parse(localStorage.getItem('results')).filter(item => item.userId.includes(e.currentTarget.id));
      var user = JSON.parse(localStorage.getItem('users')).filter(item => item._id.includes(result.userId));
      let xmlData = {
        "Name pacient": user.name,
        "Surname pacient": user.surname,
        "ID number": user.rodneCislo,
        "Name test": result.nameTest,
        "Date": result.date
      }
      result.answers.map(item => (
        xmlData[item.nameAsk] = item.checkedValue
      ))
      var xls = new XlsExport([xmlData]);
      xls.exportToXLS('dotaznik.xls')
    }
  }

  onDelete = e => {
    e.preventDefault();
    var saveTarget = e.currentTarget;
    e.currentTarget.blur();
    let tests = this.state.tests;
    window.UIkit.modal.confirm('Do you really want to delete this result of test?').then(() => {

      for (var i = 0; i < tests.length; i++) {
        if (tests[i]._id === saveTarget.dataset.name) tests.splice(i, 1);
      }

      let results = JSON.parse(localStorage.getItem("results"));
      results.map((item, index) => {
        if(item._id === saveTarget.dataset.name){
          results.splice(index, 1);
          localStorage.setItem('results', JSON.stringify(results))
        }
      })

      if(navigator.onLine){
        axios.delete("https://server.dotaznik.hardart.cz/result/delete/" + saveTarget.dataset.name);
      }




    }, () => console.log('Rejected.'))
    .then(() => {
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
            <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@s " uk-grid="">
              {tests.length
                ? tests.map((item, index) => (
                    <div key={index} className="uk-margin-small-bottom">
                      <Link to={item.done ? `/view/results/${item._id}` : `/tests/pacient/${item.idTest}`} className="uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small uk-display-block uk-link-reset">
                        <h3 className="uk-card-title">{item.nameTest}</h3>
                        <div className="uk-child-width-1-2 uk-grid" uk-grid="">
                          <div>
                            <p className="uk-article-meta uk-text-left">
                              {item.date}
                            </p>
                          </div>
                          <div className="uk-text-right">
                            {item.done
                              ? <p className="uk-article-meta">
                                  Results:
                                  <span className="uk-badge">
                                    {this.onSum(item.answers)}
                                  </span>
                                </p>
                              : <div className="uk-text-right">
                                  <p className="uk-article-meta uk-text-warning uk-margin-remove-bottom">Continue</p>
                                </div>}
                          </div>
                        </div>

                        {this.props.match.params.id
                          ? <ul className="uk-iconnav uk-modal-close-default">
                              <li><span onClick={this.onExport} id={item._id} uk-icon="icon: cloud-download"></span></li>
                              <li><span onClick={this.onDelete} data-name={item._id} uk-icon="icon: trash"></span></li>
                            </ul>
                          : navigator.onLine && item.done ? <ul className="uk-iconnav uk-modal-close-default">
                                <li><Link to={`/tests/pacient/edit/${item.idTest}/${item._id}`} uk-icon="icon: file-edit"></Link></li>
                            </ul> : ''}
                      </Link>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </article>
      </Page>
    );
  }
}
