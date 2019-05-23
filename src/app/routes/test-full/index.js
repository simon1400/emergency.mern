import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";


export default class TestFull extends Component {
  state = {
    resultId: "",
    test: {},
    currentAsk: 0,
    answers: [],
    checkedName: "",
    checkedBody: "",
    date: "",
    done: false,
    userId: "",
    prev: false,
    dateUpdate: Date.now(),
    showDescr: false,
    changeInput: false
  };

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    console.log('update');
    if(navigator.onLine){
      axios.get("https://server.dotaznik.hardart.cz/admin/test/" + this.props.match.params.id)
        .then(res => this.setState({
          test: res.data
        })
      );

      axios.get("https://server.dotaznik.hardart.cz/result/all/" + this.props.match.params.id)
        .then(res => res.data
          ? (this.setState({
              userId: currentUser._id,
              resultId: "",
              currentAsk: 0,
              answers: [],
              checkedName: "",
              checkedBody: "",
              date: "",
              done: false
            }),
            this.getResult(res.data, currentUser))
          : false
        );
    }else if(!navigator.onLine){
      let test = JSON.parse(localStorage.getItem('tests')).filter(item => item._id.includes(this.props.match.params.id))
      let results = JSON.parse(localStorage.getItem('results')).filter(item => item.idTest.includes(this.props.match.params.id))
      this.getResult(results, currentUser)
      this.setState({ test })
    }
  }

  getResult = (resData, currentUser) => {
    let url = this.props.match.url.split('/')
    url.shift()
    if(url[2] !== 'edit'){
      resData.map(
        data => !data.done && data.userId === currentUser._id
          ? this.setState({
              resultId: data._id,
              currentAsk: data.currentAsk,
              idTest: data.idTest,
              answers: data.answers
            })
          : false
      );
    }else if(url[2] === 'edit'){
      resData.map(
        data => data.userId === currentUser._id
          ? this.setState({
              resultId: data._id,
              currentAsk: 0,
              idTest: data.idTest,
              answers: data.answers,
              done: false
            }, async () => {
              var dataSend = this.sendObjectData(this.state, false)
              await axios.post("https://server.dotaznik.hardart.cz/result/update/" + this.state.resultId, dataSend)
            })
          : false
      );
    }

  };

  updateAnswers = e => {
    if(e === 'finishEmpty'){
      var answers = this.onCheckedAnswers(
        this.state.answers[this.state.currentAsk].checkedValue,
        this.state.answers[this.state.currentAsk].checkedBody,
      );
    }else{
      var answers = this.onCheckedAnswers(
        this.state.checkedName,
        this.state.checkedBody
      );
    }

    var url = this.props.match.url.split('/')
    url.shift()

    if(url[2] === 'edit'){
      this.setState({
        changeInput: false
      })
    }

    var now = new Date();
    var date = now.getDate() + "." + now.getMonth() + "." + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();

    if (e === "next") {
      this.setState({
        currentAsk: this.state.currentAsk + 1,
        answers: answers,
        date: date,
        dateUpdate: Date.now()
      });
    } else {
      this.setState({
        answers: answers,
        date: date,
        dateUpdate: Date.now()
      });
    }
  };

  onPrev = e => {
    this.setState({
      currentAsk: this.state.currentAsk - 1,
      prev: true
    });
  };

  onNext = async e => {
    let currentUser = JSON.parse(localStorage.getItem("user"));

    console.log('next');

    if (!this.state.prev && !this.state.resultId) {
      if(navigator.onLine){
        await axios.get("https://server.dotaznik.hardart.cz/result/all/" + this.props.match.params.id)
          .then(res => (res.data ? this.getResult(res.data, currentUser) : false));
      }else{
        var results = JSON.parse(localStorage.getItem('results')).filter(item => item.idTest.includes(this.props.match.params.id));
        if(results){
          this.getResult(results, currentUser)
        }
      }
    }

    await this.updateAnswers("next");


    var data = this.sendObjectData(this.state, false);

    if (this.state.currentAsk === 1 && !this.state.resultId) {
      if(navigator.onLine){
        await axios.post("https://server.dotaznik.hardart.cz/result/create/", data)
                  .then(res => console.log("create data next!"));
      }else{
        let results = JSON.parse(localStorage.getItem('results'))
        results.push(data)
        localStorage.setItem('results', JSON.stringify(results))
      }
    }

    if (this.state.currentAsk && this.state.resultId) {
      if(navigator.onLine){
        await axios.get("https://server.dotaznik.hardart.cz/result/" + this.state.resultId)
                .then(res => {
                  var data = res.data[0];
                  if (data && !data.done) {
                    this.setState({
                      resultId: data._id,
                      currentAsk: data.currentAsk,
                      idTest: data.idTest,
                      answers: data.answers
                    });
                  }
                }).then(() => axios.post("https://server.dotaznik.hardart.cz/result/update/" + this.state.resultId, data));
      }else{
        let results = JSON.parse(localStorage.getItem('results'))
        let result = results.filter(item => item._id.includes(this.state.resultId))
        if (result && !result.done) {
          this.setState({
            resultId: result._id,
            currentAsk: result.currentAsk,
            idTest: result.idTest,
            answers: result.answers
          });
        }
        if(results.find(item => item._id === this.state.resultId)){
          let index = results.findIndex(item => item._id === this.state.resultId);
          results[index] = data;
          localStorage.setItem('results', JSON.stringify(results))
        }
      }
    }
  };

  onNextEmpty = e => {

    // console.log(this.state.currentAsk);
    // console.log(this.state.answers[this.state.currentAsk].checkedValue);
    // console.log(this.state.answers[this.state.currentAsk].checkedBody);

    let answers = this.onCheckedAnswers(this.state.answers[this.state.currentAsk].checkedValue, this.state.answers[this.state.currentAsk].checkedBody);

    this.setState({
      checkedName: this.state.answers[this.state.currentAsk].checkedValue,
      checkedBody: this.state.answers[this.state.currentAsk].checkedBody,
      answers: answers,
      changeInput: false
    }, () => this.onNext());
  }

  onFinish = async () => {
    if(this.state.changeInput){
      await this.updateAnswers("finish");
    }else{
      await this.updateAnswers("finishEmpty");
    }


    var data = this.sendObjectData(this.state, true);

    if(navigator.onLine){
      await axios.get("https://server.dotaznik.hardart.cz/result/all/" + this.props.match.params.id)
                .then(res => res.data
                  ? res.data.map(item => !item.done && data.userId === item.userId
                    ? (this.setState({
                        resultId: item._id,
                        currentAsk: item.currentAsk,
                        idTest: item.idTest,
                        answers: item.answers
                      }),
                      axios.post("https://server.dotaznik.hardart.cz/result/update/" + item._id, data)
                        .then(() => window.location.href = "/results/pacient"))
                    : false
                  ) : false
                );
    }else{
      let results = JSON.parse(localStorage.getItem('results'))
      let result = results.filter(item => item._id.includes(this.state.resultId))
      if (result && !result.done) {
        this.setState({
          resultId: result._id,
          currentAsk: result.currentAsk,
          idTest: result.idTest,
          answers: result.answers
        });
      }
      if(results.find(item => item._id === this.state.resultId)){
        let index = results.findIndex(item => item._id === this.state.resultId);
        results[index] = data;
        localStorage.setItem('results', JSON.stringify(results))
      }
    }
  };

  sendObjectData = (state, done) => {
    var data = {
      idTest: state.test._id,
      nameTest: state.test.nameTest,
      currentAsk: state.currentAsk,
      answers: state.answers,
      date: state.date,
      done: done,
      userId: state.userId,
      dateUpdate: state.dateUpdate
    };

    return data;
  };

  onHandleCheckbox = e => {
    let answers = this.onCheckedAnswers(e.target.value, e.target.dataset.body);

    this.setState({
      checkedName: e.target.value,
      checkedBody: e.target.dataset.body,
      answers: answers,
      changeInput: true
    });
  };

  onCheckedAnswers = (value, body) => {
    var answers = this.state.answers;
    var index;
    var answer = {
      nameAsk: this.state.test.questions[this.state.currentAsk].nameQuestion,
      checkedValue: value,
      checkedBody: body
    };
    if (answers.find(x => x.nameAsk === this.state.test.questions[this.state.currentAsk].nameQuestion)) {
      index = answers.findIndex(x => x.nameAsk === this.state.test.questions[this.state.currentAsk].nameQuestion);
      answers[index] = answer;
    } else {
      answers.push(answer);
    }

    return answers;
  };

  handleText = e => {
    let answers = this.onCheckedAnswers(e.target.value, '0');

    this.setState({
      checkedName: e.target.value,
      checkedBody: '0',
      answers: answers,
      changeInput: true
    });
  }

  handleDescr = () => {
    this.setState({
      showDescr: !this.state.showDescr
    })
  }

  render() {
    var test = this.state.test;
    var currentAsk = this.state.currentAsk;
    var answers = this.state.answers;
    var url = this.props.match.url.split('/')
    url.shift()
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h1 className="uk-heading-divider uk-text-center uk-margin-remove-bottom">{test.nameTest}</h1>
              <h3 className="uk-heading-divider uk-margin-small-top">
                {test.questions ? test.questions[currentAsk].nameQuestion : ''}
                {test.questions ? test.questions[currentAsk].descriptionQuestion ? <button className="uk-button uk-button-link uk-text-capitalize uk-margin-left" onClick={this.handleDescr}>Description</button> : '' : ''}
              </h3>

              {test.questions ? test.questions[currentAsk].descriptionQuestion
                ? <div className={!this.state.showDescr ? 'uk-hidden' : ''}>
                  {test.questions[currentAsk].descriptionQuestion}
                  <hr className="uk-margin-small-top" />
                </div> : '' : ''}

              <form>
                <div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
                  {Object.entries(test).length
                    ? test.questions[currentAsk].asks.map((ask, indexAsk) => (
                      test.questions[currentAsk].typeQuestion === 'radio'
                        ? <label key={indexAsk}>
                            {answers.length >= 1 && currentAsk < answers.length
                              ? <input className="uk-radio" onChange={this.onHandleCheckbox} type="radio" value={ask.nameAsk} data-body={ask.valueAsk} checked={answers[currentAsk].checkedValue === ask.nameAsk} />
                              : <input className="uk-radio" onChange={this.onHandleCheckbox} type="radio" value={ask.nameAsk} data-body={ask.valueAsk} />}
                            {ask.nameAsk}
                          </label>
                        : <div key={indexAsk} className="uk-margin">
                            <div className="uk-form-controls">
                              <textarea className="uk-textarea" onChange={this.handleText} value={url[2] === 'edit' || answers[currentAsk] ? answers[currentAsk].checkedValue : ask.checkedValue} rows="3" placeholder={test.questions[currentAsk].nameQuestion} />
                            </div>
                          </div>)
                      ) : ''}
                </div>
              </form>

              <progress id="js-progressbar" className="uk-progress" value={this.state.currentAsk + 1} max={test.questions ? test.questions.length : 0} />
              <hr />

              {test.questions
                ? (currentAsk === test.questions.length - 1
                  ? <button className="uk-button uk-button-primary uk-align-right" onClick={this.onFinish}>Finish</button>
                  : <button className="uk-button uk-button-primary uk-align-right" onClick={url[2] === 'edit' && !this.state.changeInput ? this.onNextEmpty : this.onNext}>Next</button>
                ) : ""}
              {currentAsk >= 1 ? <button className="uk-button uk-button-primary uk-align-right" onClick={this.onPrev}>Prev</button> : ""}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
