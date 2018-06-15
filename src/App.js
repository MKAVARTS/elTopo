import React, { Component } from 'react';
import logo from './elTopo.png';
import './App.css';
import 'p5/lib/addons/p5.sound';
import Sketchy from './newSketch';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={enter: false}
  }
  
  pressedEnter = () => {
    this.setState({enter: true});
  }

  render() {
    const {enter} = this.state;
    if(!enter){
    return (
      <div className = "container align-items-center">
        <div className="row">
            <img alt={'el topo logo'}style={{width: 300, height: 300}} className="mx-auto" src={logo} />
        </div>
        <div className="row text-center">
          <div className="col">
            <p onClick={this.pressedEnter} className="d-inline">ENTER</p>
          </div>
        </div>
      </div>
    );
  }else if(enter){
    console.log('trying to render p5Wrapper');
    return(
      < Sketchy />
    )
  }
}
}
export default App;
