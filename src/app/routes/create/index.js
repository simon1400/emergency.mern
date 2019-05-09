import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTest: "",
      currentQuestion: 0,
      questions: [
        {
          nameQuestion: "",
          descriptionQuestion: "",
          descriptionShow: false,
          countAsk: 1,
          asks: [
            {
              nameAsk: "",
              valueAsk: 0
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get("http://server.dotaznik.hardart.cz/admin/test/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            ...res.data
          });
          console.log();
        });
    }
  }

  handleChange = e => {
    var questions = this.state.questions;
    if (["nameAsk", "valueAsk"].includes(e.target.name)) {
      questions[e.target.dataset.countparent].asks[e.target.dataset.countitem][
        e.target.name
      ] = e.target.value;
      this.setState({ questions });
    } else if (
      ["nameQuestion", "descriptionQuestion"].includes(e.target.name)
    ) {
      questions[e.target.dataset.countquestion][e.target.name] = e.target.value;
      this.setState({ questions });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  toggleDescription = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions[e.target.dataset.countquestions].descriptionShow = !questions[
      e.target.dataset.countquestions
    ].descriptionShow;
    this.setState({
      questions
    });
  };

  addQuestion = e => {
    e.preventDefault();
    if (this.state.currentQuestion + 1 < this.state.questions.length) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      });
    } else {
      this.setState(prevState => ({
        questions: [
          ...prevState.questions,
          {
            nameQuestion: "",
            descriptionQuestion: "",
            descriptionShow: false,
            countAsk: 1,
            asks: [
              {
                nameAsk: "",
                valueAsk: 0
              }
            ]
          }
        ],
        currentQuestion: prevState.currentQuestion + 1
      }));
    }
  };

  prevQuestion = e => {
    e.preventDefault();
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    });
  };

  addAsk = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions[e.target.dataset.countparent].countAsk++;
    questions[e.target.dataset.countparent].asks.push({
      nameAsk: "",
      valueAsk: 0
    });
    this.setState({
      questions
    });
  };

  deleteAsk = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions[e.target.dataset.countparent].countAsk =
      questions[e.target.dataset.countparent].countAsk - 1;
    for (
      var i = 0;
      i < questions[e.target.dataset.countparent].asks.length;
      i++
    ) {
      if (i === parseInt(e.target.dataset.index)) {
        questions[e.target.dataset.countparent].asks.splice(i, 1);
      }
    }
    this.setState({
      questions
    });
  };

  submitForm = e => {
    e.preventDefault();

    if (this.props.match.params.id) {
      axios
        .post(
          "http://server.dotaznik.hardart.cz/admin/test/update/" +
            this.props.match.params.id,
          this.state
        )
        .then((window.location.href = "/tests/admin"));
    } else {
      axios
        .post("http://server.dotaznik.hardart.cz/admin/test/create", this.state)
        .then((window.location.href = "/tests/admin"));
    }
  };

  render() {
    return (
      <Page id="create">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <form>
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">Nazev otaznika</legend>

                  <div className="uk-margin">
                    <input
                      className="uk-input"
                      onChange={this.handleChange}
                      name="nameTest"
                      type="text"
                      placeholder="Nazev"
                      value={this.state.nameTest}
                    />
                  </div>

                  <hr />

                  <h3 className="uk-legend">
                    Otazka {this.state.currentQuestion + 1}
                  </h3>

                  <div className="uk-margin">
                    <input
                      className="uk-input"
                      type="text"
                      name="nameQuestion"
                      onChange={this.handleChange}
                      data-countquestion={this.state.currentQuestion}
                      placeholder="Otazka"
                      value={
                        this.state.questions[this.state.currentQuestion]
                          .nameQuestion
                      }
                    />
                  </div>

                  <button
                    className="uk-button uk-button-text"
                    data-countquestions={this.state.currentQuestion}
                    onClick={this.toggleDescription}
                  >
                    {" "}
                    + Add description
                  </button>

                  {this.state.questions[this.state.currentQuestion]
                    .descriptionShow ? (
                    <div className="uk-margin">
                      <textarea
                        className="uk-textarea"
                        rows="5"
                        id="toggle-usage"
                        data-countquestion={this.state.currentQuestion}
                        onChange={this.handleChange}
                        name="descriptionQuestion"
                        placeholder="Textarea"
                        value={
                          this.state.questions[this.state.currentQuestion]
                            .descriptionQuestion
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <hr />

                  <h3 className="uk-legend">Odpoved</h3>
                  {this.state.questions[this.state.currentQuestion].asks.map(
                    (ask, index) => (
                      <div
                        key={index}
                        className="uk-grid uk-grid-small"
                        uk-grid=""
                      >
                        <div className="uk-margin uk-width-4-5">
                          <input
                            className="uk-input"
                            type="text"
                            onChange={this.handleChange}
                            name="nameAsk"
                            data-countparent={this.state.currentQuestion}
                            data-countitem={index}
                            placeholder="Odpoved"
                            value={
                              this.state.questions[this.state.currentQuestion]
                                .asks[index].nameAsk
                            }
                          />
                        </div>
                        <div className="uk-width-1-5 uk-flex uk-flex-between">
                          <input
                            className="uk-input"
                            type="text"
                            onChange={this.handleChange}
                            name="valueAsk"
                            data-countparent={this.state.currentQuestion}
                            data-countitem={index}
                            placeholder="Body"
                            value={
                              this.state.questions[this.state.currentQuestion]
                                .asks[index].valueAsk
                            }
                          />
                          <span
                            data-countparent={this.state.currentQuestion}
                            data-index={index}
                            onClick={this.deleteAsk}
                          >
                            minus
                          </span>
                        </div>
                      </div>
                    )
                  )}

                  <button
                    className="uk-button uk-button-text"
                    data-countparent={this.state.currentQuestion}
                    onClick={this.addAsk}
                  >
                    {" "}
                    + Add answer
                  </button>

                  <hr />

                  <button
                    className="uk-button uk-button-primary uk-align-right"
                    onClick={this.addQuestion}
                  >
                    Next question
                  </button>
                  {this.state.currentQuestion ? (
                    <button
                      className="uk-button uk-button-primary uk-align-right"
                      onClick={this.prevQuestion}
                    >
                      Prev question
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    className="uk-button uk-button-primary"
                    onClick={this.submitForm}
                  >
                    Save
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
