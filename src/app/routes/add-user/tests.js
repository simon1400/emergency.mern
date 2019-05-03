import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/admin/test").then(res => {
      let tests = [];
      res.data.map(item =>
        tests.push({ name: item.nameQuestion, _id: item._id })
      );
      this.setState({
        tests
      });
    });
  }

  render() {
    return (
      <div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        {this.state.tests.map((item, index) => (
          <label
            key={index}
            className="uk-margin-small-bottom uk-display-block"
          >
            <input
              className="uk-checkbox"
              type="checkbox"
              name={item._id}
              onClick={this.props.changeCheckbox}
            />{" "}
            {item.name}
          </label>
        ))}
      </div>
    );
  }
}
