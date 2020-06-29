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

  getBirthDayForYear = birthday => {
    const { year } = this.props;
    const { days } = this.state;

    const date = birthday.split('/');
    const dayIndex = new Date(year, date[1] - 1, date[0]).getDay();

    return days[dayIndex];
  };

  getCalendar = () => {
    const { inputJSON } = this.props;
    let newJSON;
    try {
      newJSON = JSON.parse(parseJSON(inputJSON));
    } catch (error) {
      console.log({ error });
      return;
    }

    let calendar = [];

    newJSON.forEach(obj => {
      const { birthday, name } = obj;
      let nameArray = name.split(' ');
      let FI = nameArray[0].split('')[0];
      let SI = nameArray[1].split('')[0];
      let initials = FI + SI;

      const randomHsl = `hsla(${Math.random() * 360}, 50%, 40%, 1)`;

      let calendarObj = {
        ...obj,
        initials,
        bgColor: randomHsl,
        day: this.getBirthDayForYear(birthday),
      };
      calendar.push(calendarObj);
    });

    calendar.sort((a, b) => {
      const aArray = a.birthday.split('/');
      const bArray = b.birthday.split('/');
      const aBirthDay = new Date(aArray[2], aArray[1] - 1, aArray[0]).getTime();
      const bBirthday = new Date(bArray[2], bArray[1] - 1, bArray[0]).getTime();

      return bBirthday - aBirthDay;
    });

    return calendar;
  };

  getFilteredCalendar = day => {
    if (!day) {
      return null;
    }
    const calendar = this.getCalendar();

    if (!calendar) {
      return null;
    }

    let filteredArray = calendar.filter(obj => obj.day === day);
    return filteredArray;
  };

  generateTiles = filteredArray => {
    return filteredArray.map(obj => {
      const { initials, bgColor } = obj;

      return (
        <div
          className='Tile'
          style={{ backgroundColor: bgColor }}
          key={obj.name + bgColor}
        >
          {initials}
        </div>
      );
    });
  };

  getCards = () => {
    const { days } = this.state;

    return days.map(day => {
      const filteredArray = this.getFilteredCalendar(day);
      const { length } = filteredArray;

      const grids =
        length % 2 === 0 ? (length === 2 ? 2 : length / 2) : (length + 1) / 2;

      const tiles = this.generateTiles(filteredArray);

      return (
        <div className='Day-Card' key={day}>
          <div className='Day-Card__header'>{day}</div>
          <div
            className='Day-Card__body grid'
            style={{
              gridTemplateColumns: `repeat(${grids}, 1fr)`,
              gridTemplateRows: `repeat(${grids}, 1fr)`,
            }}
          >
            {tiles.length ? (
              tiles
            ) : (
              <span className='smiley' role='img' aria-label='smiley'>
                😐
              </span>
            )}
          </div>
        </div>
      );
    });
  };
  render() {
    return <div className='Calendar'>{this.getCards()}</div>;
  }
}

export default Calendar;
