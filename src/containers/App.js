import React from 'react';
import { Title, Calendar, Input } from '../components';
import inputJSON from './inputJSON';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputJSON: inputJSON,
      year: '2019',
    };
  }

  update = (year, inputJSON) => {
    // Update JSON and year to the Calendar
    this.setState({ year, inputJSON });
  };

  render() {
    const { year, inputJSON } = this.state;

    return (
      <div className='App'>
        <Title />
        <Calendar inputJSON={inputJSON} year={year} />
        <Input update={this.update} inputJSON={inputJSON} year={year} />
      </div>
    );
  }
}
export default App;
