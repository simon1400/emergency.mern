import React, { Component, Fragment } from "react";

export default class CreateAsk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [
        {
          nameAsk: "",
          valueAsk: 0
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
        <h3 className="uk-legend">Odpoved</h3>

        <div className="uk-grid uk-grid-small" uk-grid="">
          <div className="uk-margin uk-width-4-5">
            <input
              className="uk-input"
              type="text"
              onChange={this.onChangeHandler}
              name="questions[0].asks[0].nameAsk"
              placeholder="Odpoved"
              value={this.state.asks[0].nameAsk}
            />
          </div>
          <div className="uk-width-1-5 uk-flex uk-flex-between">
            <input
              className="uk-input"
              type="text"
              onChange={this.onChangeHandler}
              name="questions[0].asks[0].valueAsk"
              placeholder="Body"
              value={this.state.asks[0].valueAsk}
            />
            <span>minus</span>
          </div>
        </div>

        <button className="uk-button uk-button-text"> + Add answer</button>

        <hr />
      </Fragment>
    );
  }
}
