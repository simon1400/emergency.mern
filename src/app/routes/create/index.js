import React, { Component } from "react";
import Page from "../../components/page";

import CreateQuestions from "./question";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTest: "",
      countQuestions: 1
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
      <Page id="homepage">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <form>
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">Nazev otaznika</legend>

                  <div className="uk-margin">
                    <input
                      className="uk-input"
                      onChange={this.onChangeHandler}
                      name="nameTest"
                      type="text"
                      placeholder="Nazev"
                      value={this.state.nameTest}
                    />
                  </div>

                  <hr />

                  <CreateQuestions />

                  <button className="uk-button uk-button-primary uk-align-right">
                    Next question
                  </button>
                  <button className="uk-button uk-button-primary">Save</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
