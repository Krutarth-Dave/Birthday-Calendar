import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputJSON: props.inputJSON,
      year: props.year,
    };
  }

  handleYearChange = event => {
    let year = parseInt(event.target.value);

    if (isNaN(year)) {
      year = '';
    }

    this.setState({
      year: year,
    });
  };

  updateInputJSON = event => {
    let inputJSON = event.target.value;

    this.setState({
      inputJSON: inputJSON,
    });
  };

  update = () => {
    // Update JSON and year to the Calendar
    const { year, inputJSON } = this.state;
    this.props.update(year, inputJSON);
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
              value={year}
              onChange={this.handleYearChange}
              maxLength={4}
              type='text'
              pattern='\d*'
            />
          </div>
          <div className='Button' onClick={this.update}>
            Update
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
