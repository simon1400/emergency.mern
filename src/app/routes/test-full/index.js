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
    this.setState({
      userId: currentUser._id
    });
    axios
      .get("http://localhost:4000/admin/test/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          test: res.data
        });
      })
      .then(() =>
        axios
          .get("http://localhost:4000/result/" + this.props.match.params.id)
          .then(res => {
            var data = res.data[0];
            if (!data.done) {
              this.setState({
                resultId: data._id,
                currentAsk: data.currentAsk,
                idTest: data.idTest,
                answers: data.answers
              });
            }
          })
          .then(() => console.log(this.state))
      );
  }

  updateAnswers = e => {
    var answers = this.state.answers;

    var answer = {
      nameAsk: this.state.test.questions[this.state.currentAsk].nameQuestion,
      checkedValue: this.state.checkedName,
      checkedBody: this.state.checkedBody
    };
    answers.push(answer);

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

    this.setState({
      currentAsk: this.state.currentAsk + 1,
      answers: answers,
      date: date
    });
  };

  onPrev = e => {
    this.setState({
      currentAsk: this.state.currentAsk - 1
    });
  };

  onNext = async e => {
    await this.updateAnswers();

    var data = {
      idTest: this.state.test._id,
      currentAsk: this.state.currentAsk,
      answers: this.state.answers,
      date: this.state.date,
      done: false,
      userId: this.state.userId
    };

    if (this.state.resultId) {
      axios.post(
        "http://localhost:4000/result/update/" + this.state.resultId,
        data
      );
    } else {
      axios.post("http://localhost:4000/result/create", data);
    }
  };

  onFinish = async () => {
    await this.updateAnswers();

    var data = {
      idTest: this.state.test._id,
      currentAsk: this.state.currentAsk,
      answers: this.state.answers,
      date: this.state.date,
      done: true
    };

    axios
      .post("http://localhost:4000/result/update/" + this.state.resultId, data)
      .then(res => {
        window.location.href = "/";
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
