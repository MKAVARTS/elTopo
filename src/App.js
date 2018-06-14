import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';

class App extends Component {
  render() {
    return (
      <div>
        < P5Wrapper rotation={100.0} sketch={sketch}  />
      </div>
    );
  }
}

export default App;
