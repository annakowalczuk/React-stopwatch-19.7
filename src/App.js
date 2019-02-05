import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      time: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
      running: false,
    };
    return initialState;
  }

  reset() {
    this.setState(this.getInitialState());
  }

  start() {
    if (!this.state.running) {
      this.setState({running: true});
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.setState({running: false});
    clearInterval(this.watch);
  }

  step() {
    if (this.state.running) {
    this.calculate();
    }
  }

  calculate() {
    const {time} = this.state;

    const newTime = time;
    newTime.miliseconds += 1;
    if (newTime.miliseconds >= 100) { //milisekund w sekundzie jest tysiąc, interwał wykonuje się co 10ms, należy podzielić 1000 przez 10
      newTime.seconds += 1;
      newTime.miliseconds = 0;
    }
    if (newTime.seconds >= 60) {
      newTime.minutes += 1;
      newTime.seconds = 0;
    }

    this.setState({time: newTime});
  }

  renderStopwatch = () => {
    const {time} = this.state;
    return (
    <div>
      {`${pad0(time.minutes)}:${pad0(time.seconds)}:${pad0(Math.floor(time.miliseconds))}`}
    </div>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="controls">
          <button 
            className="button"
            id="start"
            onClick={() => this.start()}>
            Start</button>
          <button
            className="button"
            id="stop"
            onClick={() => this.stop()}>Stop</button>
          <button
            className="button"
            id="reset"
            onClick={() => this.reset()}>Reset</button>
        </nav>
        <div className="stopwatch" >{this.renderStopwatch()}</div>
        <ul className="results"></ul>
      </div>
    );
  }
}

const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

export default App;
