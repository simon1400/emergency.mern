import React, { Component } from "react";
import Page from "../../components/page";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validQuestName: false,
      validAskName: false,
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
      axios.get("https://server.dotaznik.hardart.cz/admin/test/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            ...res.data
          });
        });
    }
  }

  handleChange = e => {
    var questions = this.state.questions;
    if (["nameAsk", "valueAsk"].includes(e.target.name)) {
      questions[e.target.dataset.countparent].asks[e.target.dataset.countitem][e.target.name] = e.target.value;
      this.setState({
        validAskName: false,
        questions
      });
    } else if (["nameQuestion", "descriptionQuestion"].includes(e.target.name)) {
      questions[e.target.dataset.countquestion][e.target.name] = e.target.value;
      this.setState({
        validQuestName: false,
        questions
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  toggleDescription = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions[e.target.dataset.countquestions].descriptionShow = !questions[e.target.dataset.countquestions].descriptionShow;
    this.setState({
      questions
    });
  };

  addQuestion = e => {
    e.preventDefault();

    var questions = this.state.questions;
    var currentQuestion = this.state.currentQuestion
    var lastAsk = questions[currentQuestion].asks.length - 1;

    if(Boolean(questions[currentQuestion].nameQuestion) && Boolean(questions[currentQuestion].asks[lastAsk].nameAsk)){
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
    }else if(Boolean(questions[currentQuestion].nameQuestion)){
      this.setState({
        validAskName: true
      })
    }else if(Boolean(questions[currentQuestion].asks[lastAsk].nameAsk)){
      this.setState({
        validQuestName: true
      })
    }else{
      this.setState({
        validAskName: true,
        validQuestName: true
      })
    }

  };

  prevQuestion = e => {
    e.preventDefault();

    var questions = this.state.questions;
    var currentQuestion = this.state.currentQuestion
    var lastAsk = questions[currentQuestion].asks.length - 1;
    
    if(Boolean(questions[currentQuestion].nameQuestion) && Boolean(questions[currentQuestion].asks[lastAsk].nameAsk)){
      this.setState({
        currentQuestion: this.state.currentQuestion - 1,
        validQuestName: false,
        validAskName: false
      });
    }else if(Boolean(questions[currentQuestion].nameQuestion)){
      this.setState({
        validAskName: true
      })
    }else if(Boolean(questions[currentQuestion].asks[lastAsk].nameAsk)){
      this.setState({
        validQuestName: true
      })
    }else{
      this.setState({
        validAskName: true,
        validQuestName: true
      })
    }
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

  deleteQuestion = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions.pop()
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
      questions
    })
  }

  deleteAsk = e => {
    e.preventDefault();
    let questions = this.state.questions;
    questions[e.currentTarget.dataset.countparent].countAsk = questions[e.currentTarget.dataset.countparent].countAsk - 1;
    for (var i = 0; i < questions[e.currentTarget.dataset.countparent].asks.length; i++) {
      if (i === parseInt(e.currentTarget.dataset.index)) {
        questions[e.currentTarget.dataset.countparent].asks.splice(i, 1);
      }
    }
    this.setState({
      questions
    });
  };

  submitForm = e => {
    e.preventDefault();

    if (this.props.match.params.id) {
      axios.post("https://server.dotaznik.hardart.cz/admin/test/update/" + this.props.match.params.id, this.state)
        .then(res => window.location.href = "/tests/admin");
    } else {
      axios.post("https://server.dotaznik.hardart.cz/admin/test/create", this.state)
        .then(res => {
          window.location.href = "/tests/admin"
        });
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
                  <legend className="uk-legend">Questionnaire name</legend>

                  <div className="uk-margin">
                    <input
                      className="uk-input"
                      onChange={this.handleChange}
                      name="nameTest"
                      type="text"
                      placeholder="Name"
                      value={this.state.nameTest}
                    />
                  </div>

                  <hr />

                  <h3 className="uk-legend">
                    Question {this.state.currentQuestion + 1}
                    {this.state.currentQuestion === this.state.questions.length - 1 ? <a
                      nohref=""
                      data-countparent={this.state.currentQuestion}
                      onClick={this.deleteQuestion}
                      className="uk-margin-left uk-align-right"
                    >
                      <span className="uk-text-danger" uk-icon="icon: close; ratio: 2" />
                  </a> : ''}
                  </h3>

                  <div className="uk-margin">
                    <input
                      className={`uk-input ${this.state.validQuestName ? 'uk-form-danger' : ''}`}
                      type="text"
                      name="nameQuestion"
                      onChange={this.handleChange}
                      data-countquestion={this.state.currentQuestion}
                      placeholder="Question"
                      value={this.state.questions[this.state.currentQuestion].nameQuestion}
                    />
                  </div>

                  <button
                    className="uk-button uk-button-text"
                    data-countquestions={this.state.currentQuestion}
                    onClick={this.toggleDescription}
                  >
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

                <h3 className="uk-legend">Answers:</h3>
                  {this.state.questions[this.state.currentQuestion].asks.map(
                    (ask, index) => (
                      <div
                        key={index}
                        className="uk-grid uk-grid-small uk-margin"
                        uk-grid=""
                      >
                        <div className="uk-width-4-5@s uk-width-1-1">
                          <input
                            className={`uk-input ${this.state.validAskName ? 'uk-form-danger' : ''}`}
                            type="text"
                            onChange={this.handleChange}
                            name="nameAsk"
                            data-countparent={this.state.currentQuestion}
                            data-countitem={index}
                            placeholder="Answer"
                            value={
                              this.state.questions[this.state.currentQuestion]
                                .asks[index].nameAsk
                            }
                          />
                        </div>
                        <div className="uk-width-1-5@s uk-width-1-1 uk-flex uk-flex-between uk-flex-middle">
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
                          <a
                            nohref=""
                            data-countparent={this.state.currentQuestion}
                            data-index={index}
                            onClick={this.deleteAsk}
                            className="uk-margin-left"
                          >
                            <span className="uk-text-danger" uk-icon="icon: close; ratio: 2" />
                          </a>
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

                  <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-1" uk-grid="">
                    <div>
                      <button className="uk-button uk-button-primary uk-width-auto@s uk-width-1-1" onClick={this.submitForm}>
                        Save
                      </button>
                    </div>
                    <div>
                      <div className="uk-grid uk-grid-collapse@s" uk-grid="">
                      {this.state.currentQuestion ?
                        <div className="uk-width-2-3@s uk-width-1-2">
                          <button className="uk-button uk-button-primary uk-width-1-1 uk-width-auto@s uk-align-right@s" onClick={this.prevQuestion}>
                            Prev
                          </button>
                        </div>
                       : ""}

                        <div className={this.state.currentQuestion ? 'uk-width-1-3@s uk-width-1-2' : 'uk-width-1-1'}>
                          <button className="uk-button uk-button-primary uk-width-1-1 uk-align-right@s" onClick={this.addQuestion}>
                            Next
                          </button>
                        </div>


                      </div>
                    </div>


                  </div>



                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
