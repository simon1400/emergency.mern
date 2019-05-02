import React, { Component, Fragment } from "react";

import CreateAsk from "./ask";

export default class CreateQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          nameQuestion: "",
          descriptionQuestion: "",
          descriptionShow: false,
          countAsk: 1
        }
      ]
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <h3 className="uk-legend">Otazka 1</h3>

        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            name="questions"
            onChange={this.onChangeHandler}
            placeholder="Otazka"
            value={this.state.questions[0].nameQuestion}
          />
        </div>

        <button className="uk-button uk-button-text"> + Add description</button>

        <div className="uk-margin">
          <textarea
            className="uk-textarea"
            rows="5"
            placeholder="Textarea"
            value={this.state.questions[0].descriptionQuestion}
          />
        </div>

        <hr />

        <CreateAsk />
      </Fragment>
    );
  }
}
