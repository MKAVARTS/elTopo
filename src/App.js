import React, { Component } from 'react';
import logo from './elTopo.png';
import './App.css';
import 'p5/lib/addons/p5.sound';

import Terra from './Terra';
import Luv from './Luv';
import Plus from './Plus';
import Info from './Info';
import terraform from './tracks/terraform.mp3';
import do4luv from './tracks/do4luv.mp3';
import plusplusplus from './tracks/plusplusplus.mp3';

import BackButton from './vectors/BackButton.png';
import NextButton from './vectors/NextButton.png';
import PauseButton from './vectors/PauseButton.png';
import PlayButton from './vectors/PlayButton.png';

let counter = 0;
let terraformTrack = document.getElementById('terraform');

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      showInfo: false,
      enter: false,
      playTerra: true,
      playLuv : false,
      playPlus : false,
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

  showInfo = () => {
    this.setState(
      {
        showInfo : true,
        playTerra : false,
        playLuv : false,
        playPlus : false,
      })
  }

  goBack = () => {
    this.setState({
      showInfo : false,
      playTerra: true
    })
  }

  render() {
    if(this.state.enter === false){
    return (
      <div id='homeScreen' className = " mt-4 pt-3 container align-items-center">
        <div className="row mt-5 pt-5">
            <img alt={'el topo logo'} style={{width: 300, height: 300}} className="mx-auto" src={logo} />
        </div>
        <div className="row d-block text-center">
            <p id='enter' onClick={this.pressedEnter} className="hoverable">ENTER</p>
        </div>
      </div>
    );

  }else if(this.state.enter === true && this.state.playTerra === true){
    return(
      <div id='terra' className='container'>
          <div className='row text-center'>
            <div className='col'>
            < Terra />
            </div>
          </div>
          <div id='terraPlayer' className='row justify-content-space-around'>

                  <div className='col align-self-center px-0 ml-3 hoverable text-center '>
                  <h5 onClick={this.lastTrack} alt={'back button'}>last</h5>
                  </div>
                  <div className='col'><audio autoPlay={true} controls={true} src={terraform}/></div>
                  <div className='col align-self-center px-0 hoverable text-center '>
                  <h5 onClick={this.nextTrack} alt={'back button'}>next</h5>
                 </div>
                  <div className='col align-self-center d-inline  hoverable text-left '><h5 onClick={this.showInfo} alt={'back button'}>?</h5></div>
             
            </div>
      </div>
    )
  }else if(this.state.enter === true && this.state.playLuv === true){
    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
          < Luv />
          </div>
        </div>
          <div id='luvPlayer' className='row justify-content-space-around'>

          <div className='col align-self-center px-0 ml-3 hoverable text-center '>
          <h5 onClick={this.lastTrack} alt={'back button'}>last</h5>
          </div>
          <div className='col'><audio autoPlay={true} controls={true} src={do4luv}/></div>
          <div className='col align-self-center px-0 hoverable text-center '>
          <h5 onClick={this.nextTrack} alt={'back button'}>next</h5>
          </div>
          <div className='col align-self-center d-inline  hoverable text-left '><h5 onClick={this.showInfo} alt={'back button'}>?</h5></div>
        </div>
      </div>
    )
  }else if(this.state.enter === true && this.state.playPlus === true){
    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
          < Plus />
          </div>
        </div>
        <div id='luvPlayer' className='row justify-content-space-around'>

          <div className='col align-self-center px-0 ml-3 hoverable text-center '>
          <h5 onClick={this.lastTrack} alt={'back button'}>last</h5>
          </div>
          <div className='col'><audio autoPlay={true} controls={true} src={plusplusplus}/></div>
          <div className='col align-self-center px-0 hoverable text-center '>
            <h5 onClick={this.nextTrack} alt={'back button'}>next</h5>
          </div>
          <div className='col align-self-center d-inline  hoverable text-left '><h5 onClick={this.showInfo} alt={'back button'}>?</h5></div>

          </div>
      </div>
    )
  }else if(this.state.showInfo === true){
    return(
      < Info goBack={this.goBack} />
    )
  }
}
}
export default App;
