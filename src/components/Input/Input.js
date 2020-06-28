import React, { Component } from 'react';
import { parseJSON } from '../../utils';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputJSON: props.inputJSON,
      year: props.year,
    };
  }

  handleYearChange = year => {
    this.setState({
      year,
    });
  };

  updateInputJSON = event => {
    let inputJSON = event.target.value;
    let newJson = parseJSON(inputJSON);
    // remove non-printable and other non-valid JSON chars

    this.setState({
      inputJSON: newJson,
    });
  };

  update = () => {
    // Update JSON and year to the Calendar
    const { year, inputJSON } = this.state;

    this.props.update(year, JSON.parse(inputJSON));
  };

  render() {
    const { year, inputJSON } = this.state;

    return (
      <div className='Input'>
        <textarea
          className='InputJSON'
          value={inputJSON}
          rows='20'
          onChange={this.updateInputJSON}
        />

        <div className='YearInputContainer'>
          <div className='YearInput'>
            <div className='title'>Year</div>
            <input
              className='year'
              val={year}
              onChange={this.handleYearChange}
            />
          </div>
          <div className='Button' onClick={this.props.update}>
            Update
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
