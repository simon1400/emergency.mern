import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";
import Cookies from "js-cookie";

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
      userId: ""
    };
  }

  componentDidMount() {
    let currentUser = Cookies.getJSON("user");

    axios
      .get("http://localhost:4000/admin/test/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          test: res.data
        });
      });
    axios
      .get("http://localhost:4000/result/all/" + this.props.match.params.id)
      .then(res => {
        if (res.data) {
          this.setState({
            userId: currentUser._id,
            resultId: "",
            currentAsk: 0,
            answers: [],
            checkedName: "",
            checkedBody: "",
            date: "",
            done: false
          });
          res.data.map(data => {
            if (!data.done && data.userId === currentUser._id) {
              this.setState({
                resultId: data._id,
                currentAsk: data.currentAsk,
                idTest: data.idTest,
                answers: data.answers
              });
            }
          });
        }
      });
  }

  updateAnswers = e => {
    var answers = this.state.answers;
    var index;
    var answer = {
      nameAsk: this.state.test.questions[this.state.currentAsk].nameQuestion,
      checkedValue: this.state.checkedName,
      checkedBody: this.state.checkedBody
    };
    if (
      answers.find(
        x =>
          x.nameAsk ===
          this.state.test.questions[this.state.currentAsk].nameQuestion
      )
    ) {
      index = answers.findIndex(
        x =>
          x.nameAsk ===
          this.state.test.questions[this.state.currentAsk].nameQuestion
      );
      answers[index] = answer;
    } else {
      answers.push(answer);
    }

    var now = new Date();
    var date =
      now.getDate() +
      "." +
      now.getMonth() +
      "." +
      now.getFullYear() +
      " " +
      now.getHours() +
      ":" +
      now.getMinutes();

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
      currentAsk: this.state.currentAsk - 1
    });
  };

  onNext = async e => {
    await this.updateAnswers("next");

    var data = {
      idTest: this.state.test._id,
      nameTest: this.state.test.nameTest,
      currentAsk: this.state.currentAsk,
      answers: this.state.answers,
      date: this.state.date,
      done: false,
      userId: this.state.userId
    };

    if (this.state.currentAsk <= 1 && !this.state.resultId) {
      await axios
        .post("http://localhost:4000/result/create/", data)
        .then(res => console.log("create data next!"));
    }

    if (this.state.currentAsk && this.state.resultId) {
      await axios
        .get("http://localhost:4000/result/" + this.state.resultId)
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
        })
        .then(() => {
          axios.post(
            "http://localhost:4000/result/update/" + this.state.resultId,
            data
          );
        });
    }
  };

  onFinish = async () => {
    await this.updateAnswers("finish");

    var data = {
      idTest: this.state.test._id,
      nameTest: this.state.test.nameTest,
      currentAsk: this.state.currentAsk,
      answers: this.state.answers,
      date: this.state.date,
      done: true,
      userId: this.state.userId
    };

    await axios
      .get("http://localhost:4000/result/all/" + this.props.match.params.id)
      .then(res => {
        if (res.data) {
          res.data.map(item => {
            if (!item.done && data.userId === item.userId) {
              this.setState({
                resultId: item._id,
                currentAsk: item.currentAsk,
                idTest: item.idTest,
                answers: item.answers
              });
              axios
                .post("http://localhost:4000/result/update/" + item._id, data)
                .then(() => (window.location.href = "/results/pacient"));
            }
          });
        }
      });
  };

  onHandleCheckbox = e => {
    this.setState({
      checkedName: e.target.value,
      checkedBody: e.target.dataset.body
    });
  };

  render() {
    var test = this.state.test;
    var currentAsk = this.state.currentAsk;
    return (
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h1 className="uk-heading-divider uk-text-center">
                {test.nameTest}
              </h1>

              <h3 className="uk-heading-divider">
                {test.questions
                  ? test.questions[currentAsk].nameQuestion
                  : false}
              </h3>

              <form>
                <div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
                  {test.questions
                    ? test.questions[currentAsk].asks.map((ask, indexAsk) => (
                        <label key={indexAsk}>
                          {this.state.answers.length > 1 ? (
                            this.state.answers[currentAsk].checkedValue ===
                            ask.nameAsk ? (
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
