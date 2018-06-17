import React, { Component } from 'react';
import logo from './elTopo.png';
import './App.css';
import 'p5/lib/addons/p5.sound';

import Terra from './Terra';
import Luv from './Luv';
import Plus from './Plus';
import terraform from './tracks/terraform.mp3';
import do4luv from './tracks/do4luv.mp3';
import plusplusplus from './tracks/plusplusplus.mp3';

import BackButton from './vectors/BackButton.png';
import NextButton from './vectors/NextButton.png';

let counter = 0;

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      enter: false,
      playTerra: true,
    }
  }
  
  pressedEnter = () => {
    this.setState({enter: true});
  }

  nextTrack = () => {
    console.log('trying to go to the next track');
    counter++;
    counter = counter % 3;

    console.log(counter);
    if(counter === 0){
      console.log('trying to set state to play terra true');
      this.setState({playTerra : true, playLuv : false, playPlus: false});
    }else if(counter === 1){
      console.log('trying to set state to play terra false');
      this.setState({playTerra: false, playLuv: true, playPlus: false});
    }else if(counter === 2){
      this.setState({playTerra: false, playLuv: false, playPlus: true});
    }
  }

  lastTrack = () => {
    console.log('trying to go to the next track');
    counter--;
    counter = counter % 3;

    console.log(counter);
    if(counter <= 0){
      counter = 0;
      console.log('trying to set state to play terra true');
      this.setState({playTerra : true, playLuv : false, playPlus: false});
    }else if(counter === 1){
      console.log('trying to set state to play terra false');
      this.setState({playTerra: false, playLuv: true, playPlus: false});
    }else if(counter === 2){
      this.setState({playTerra: false, playLuv: false, playPlus: true});
    }
  }

  render() {
    if(this.state.enter === false){
    return (
      <div className = "container align-items-center">
        <div className="row">
            <img alt={'el topo logo'} style={{width: 300, height: 300}} className="mx-auto" src={logo} />
        </div>
        <div className="row text-center">
          <div className="col">
            <p onClick={this.pressedEnter} className="d-inline">ENTER</p>
          </div>
        </div>
      </div>
    );

  }else if(this.state.enter === true && this.state.playTerra === true){
    return(
      <div>
      <div>
        < Terra />
      </div>
      <div className='container'>
          <div className='row justify-content-center'>
              <img  onClick={this.lastTrack}  alt={'back button'} className='pl-2 pr-2 mt-2 playback' src={BackButton} />
              <audio autoPlay={true} controls={true} src={terraform} id='terraform' />
              <img alt={'next button'} onClick={this.nextTrack} className='pl-2 pr-2 mt-2 playback' src={NextButton} />
          </div>
        </div>
        </div>
    )
  }else if(this.state.enter === true && this.state.playLuv === true){
    return(
      <div>
      <div>
        < Luv />
      </div>
      <div className='container'>
          <div className='row justify-content-center'>
              <img onClick={this.lastTrack} alt={'back button'} className='pl-2 pr-2 mt-2 playback' src={BackButton} />
              <audio autoPlay={true} controls={true} src={do4luv} id='terraform' />
              <img alt={'next button'} onClick={this.nextTrack} className='pl-2 pr-2 mt-2 playback' src={NextButton} />
          </div>
        </div>
        </div>
    )
  }else if(this.state.enter === true && this.state.playPlus === true){
    return(
      <div>
      <div>
        < Plus />
      </div>
      <div className='container'>
          <div className='row justify-content-center'>
              <img onClick={this.lastTrack} alt={'back button'} className='pl-2 pr-2 mt-2 playback' src={BackButton} />
              <audio autoPlay={true} controls={true} src={plusplusplus} id='terraform' />
              <img alt={'next button'} onClick={this.nextTrack} className='pl-2 pr-2 mt-2 playback' src={NextButton} />
          </div>
        </div>
        </div>
    )
  }
}
}
export default App;
