import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";


export default class TestFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultId: "",
      test: {},
      currentAsk: 0,
      answers: [],
      checkedName: "",
      checkedBody: "",
      date: "",
      done: false,
      userId: "",
      prev: false
    };
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    var allTests = JSON.parse(localStorage.getItem("tests"));
    var allResults = JSON.parse(localStorage.getItem("results"));

    if(navigator.onLine){
      axios.get("http://967a6564.ngrok.io/admin/test/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            test: res.data
          });
        });

      axios.get("http://967a6564.ngrok.io/result/all/" + this.props.match.params.id)
        .then(res =>
            res.data
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
                this.getResult(res.data, currentUser, true))
              : false
        );
    }else{
      allTests.map(item => {
        if(item._id === this.props.match.params.id){
          this.setState({
            test: item
          });
        }
      })
      allResults.map(item => {
        if(item.idTest === this.props.match.params.id){
          this.setState({
            userId: currentUser._id,
            resultId: "",
            currentAsk: 0,
            answers: [],
            checkedName: "",
            checkedBody: "",
            date: "",
            done: false
          })
          this.getResult(item, currentUser)
        }
      })
    }
  }

  getResult = (resData, currentUser, online) => {
    var allResults = JSON.parse(localStorage.getItem("results"));
    resData.map(data =>
      !data.done && data.userId === currentUser._id
        ? online
          ? allResults.map((result, index) => {
              if(result.dateUpdate <= data.dateUpdate){
                console.log('local mense!');
                this.setState({
                  resultId: data._id,
                  currentAsk: data.currentAsk,
                  idTest: data.idTest,
                  answers: data.answers
                })
                allResults[index] = data;
                localStorage.setItem("results", JSON.stringify(allResults))
              }else{
                console.log('local bolse');
                axios.post("http://967a6564.ngrok.io/result/update/" + result._id, result);
              }
            })
          : this.setState({
              resultId: data._id,
              currentAsk: data.currentAsk,
              idTest: data.idTest,
              answers: data.answers
            })
        : false
    );
  };

  updateAnswers = e => {
    let answers = this.onCheckedAnswers(
      this.state.checkedName,
      this.state.checkedBody
    );

    var now = new Date();
    var date = now.getDate() + "." + now.getMonth() + "." + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();

    if (e === "next") {
      this.setState({
          currentAsk: this.state.currentAsk + 1,
          answers: answers,
          date: date
        });
    } else {
      this.setState({
        answers: answers,
        date: date
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
    var allResults;
    if (!this.state.prev && !this.state.resultId) {
      if(navigator.onLine){
        await axios.get("http://967a6564.ngrok.io/result/all/" + this.props.match.params.id)
          .then(res => (res.data ? this.getResult(res.data, currentUser, true) : false));
      }else{
        allResults = JSON.parse(localStorage.getItem("results"));
        allResults.map(item => {
          if(item.idTest === this.props.match.params.id){
            this.getResult(item, currentUser)
          }
        })
      }
    }

    await this.updateAnswers("next");

    var data = this.sendObjectData(this.state, false);

    if (this.state.currentAsk === 1 && !this.state.resultId) {
      if(navigator.onLine){
        await axios.post("http://967a6564.ngrok.io/result/create/", data);
      }else{
        allResults = JSON.parse(localStorage.getItem("results"));
        allResults.push(data);
        localStorage.setItem("results", JSON.stringify(allResults))
      }
    }

    if (this.state.currentAsk && this.state.resultId) {
      if(navigator.onLine){
        await axios.get("http://967a6564.ngrok.io/result/" + this.state.resultId)
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
          }).then(() => {
            axios.post("http://967a6564.ngrok.io/result/update/" + this.state.resultId, data);
          });
      }else{
        allResults = JSON.parse(localStorage.getItem("results"));
        allResults.map((item, index) => {
          if(item._id === this.state.resultId){
            if (item && !item.done) {
              this.setState({
                resultId: item._id,
                currentAsk: item.currentAsk,
                idTest: item.idTest,
                answers: item.answers
              });
            }
            allResults[index] = data;
            localStorage.setItem("results", JSON.stringify(allResults))
          }
        })

      }
    }

  };

  onFinish = async () => {
    await this.updateAnswers("finish");

    var data = this.sendObjectData(this.state, true);

    if(navigator.onLine){
      await axios.get("http://967a6564.ngrok.io/result/all/" + this.props.match.params.id)
                .then(res => res.data
                  ? res.data.map(item => !item.done && data.userId === item.userId
                    ? (this.setState({
                        resultId: item._id,
                        currentAsk: item.currentAsk,
                        idTest: item.idTest,
                        answers: item.answers
                      }),
                      axios.post("http://967a6564.ngrok.io/result/update/" + item._id, data)
                        .then(() => (window.location.href = "/results/pacient")
                        )) : false
                  ) : false
                );
    }else{
      var allResults = JSON.parse(localStorage.getItem("results"));
      allResults.map((item, index) => !item.done && data.userId === item.userId
          ? (this.setState({
              resultId: item._id,
              currentAsk: item.currentAsk,
              idTest: item.idTest,
              answers: item.answers
            }),
            allResults[index] = data,
            localStorage.setItem("results", JSON.stringify(allResults)),
            window.location.href = "/results/pacient"
          ) : false
        )
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
      dateUpdate: Date.now()
    };

    return data;
  };

  onHandleCheckbox = e => {
    let answers = this.onCheckedAnswers(e.target.value, e.target.dataset.body);

    this.setState({
      checkedName: e.target.value,
      checkedBody: e.target.dataset.body,
      answers: answers
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

  render() {
    var test = this.state.test;
    var currentAsk = this.state.currentAsk;
    var answers = this.state.answers;
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h1 className="uk-heading-divider uk-text-center uk-margin-remove-bottom">
                {test.nameTest}
              </h1>

              <h3 className="uk-heading-divider uk-margin-small-top">
                {test.questions
                  ? test.questions[currentAsk].nameQuestion
                  : false}
              </h3>

              <form>
                <div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
                  {Object.entries(test).length
                    ? test.questions[currentAsk].asks.map((ask, indexAsk) => (
                        <label key={indexAsk}>
                          {answers.length >= 1 &&
                          currentAsk < answers.length ? (
                            answers[currentAsk].checkedValue === ask.nameAsk ? (
                              <input
                                className="uk-radio"
                                onClick={this.onHandleCheckbox}
                                type="radio"
                                value={ask.nameAsk}
                                data-body={ask.valueAsk}
                                name={`radio-${currentAsk}`}
                                checked
                              />
                            ) : (
                              <input
                                className="uk-radio"
                                onClick={this.onHandleCheckbox}
                                type="radio"
                                value={ask.nameAsk}
                                data-body={ask.valueAsk}
                                name={`radio-${currentAsk}`}
                              />
                            )
                          ) : (
                            <input
                              className="uk-radio"
                              onClick={this.onHandleCheckbox}
                              type="radio"
                              value={ask.nameAsk}
                              data-body={ask.valueAsk}
                              name={`radio-${currentAsk}`}
                            />
                          )}
                          {ask.nameAsk}
                        </label>
                      ))
                    : false}
                </div>
              </form>

              <progress
                id="js-progressbar"
                className="uk-progress"
                value={this.state.currentAsk + 1}
                max={test.questions ? test.questions.length : 0}
              />
              <hr />
              {test.questions ? (
                currentAsk === test.questions.length - 1 ? (
                  <button
                    className="uk-button uk-button-primary uk-align-right"
                    onClick={this.onFinish}
                  >
                    Finish
                  </button>
                ) : (
                  <button
                    className="uk-button uk-button-primary uk-align-right"
                    onClick={this.onNext}
                  >
                    Next
                  </button>
                )
              ) : (
                ""
              )}
              {currentAsk >= 1 ? (
                <button
                  className="uk-button uk-button-primary uk-align-right"
                  onClick={this.onPrev}
                >
                  Prev
                </button>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
