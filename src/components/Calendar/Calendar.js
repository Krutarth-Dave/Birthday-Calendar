import React, { Component } from 'react';
import { parseJSON } from '../../utils';
import './Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  }

  getCalendar = () => {
    const { inputJSON } = this.props;
    const { days } = this.state;
    const newJSON = JSON.parse(parseJSON(inputJSON));

    let calendar = [];

    newJSON.forEach(obj => {
      const { birthday } = obj;
      const date = birthday.split('/');

      let calendarObj = {
        ...obj,
        day: days[new Date(date[2], date[1] - 1, date[0]).getDay()],
      };
      calendar.push(calendarObj);
    });

    return calendar;
  };

  getTiles = day => {
    const calendar = this.getCalendar();

    let filteredArray = calendar.filter(obj => obj.day === day);

    return filteredArray.map(obj => <div>{obj.name}</div>);
  };

  getCards = () => {
    const { days } = this.state;

    return days.map(day => {
      const tiles = this.getTiles(day);
      console.log(tiles);

      return (
        <div className='Day-Card'>
          <div className='Day-Card__header'>{day}</div>
          <div className='Day-Card__body'>{tiles}</div>
        </div>
      );
    });
  };
  render() {
    return <div className='Calendar'>{this.getCards()}</div>;
  }
}

export default Calendar;
