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


let counter = 0;
let activeSong;


class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      showInfo: false,
      enter: false,
      playTerra: false,
      playLuv : false,
      playPlus : false,
      playOrPauseTerra : 'pause'
    }
  }
  
  pressedEnter = () => {
    this.setState({enter: true, playTerra: true});
  }

  nextTrack = () => {
    counter++;
    counter = counter % 3;

    if(counter === 0){
      this.setState({playTerra : true, playLuv : false, playPlus: false});
    }else if(counter === 1){
      this.setState({playTerra: false, playLuv: true, playPlus: false});
    }else if(counter === 2){
      this.setState({playTerra: false, playLuv: false, playPlus: true});
    }
  }

  lastTrack = () => {
    counter--;
    counter = counter % 3;

    if(counter <= 0){
      counter = 0;
      this.setState({playTerra : true, playLuv : false, playPlus: false});
    }else if(counter === 1){
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
        playPlus : false
      })
  }

  playPause = (evt) => {

      if(evt.target.id === 'terra'){
      activeSong = document.getElementById('terraform');
      }else if(evt.target.id === 'luv'){
      activeSong = document.getElementById('do4luv');
      }

      if (activeSong.paused){
        activeSong.play();
        this.setState({playOrPauseTerra: 'play'});
      }else{
        this.setState({playOrPauseTerra: 'pause'});
        activeSong.pause();
      }
  }

  goBack = () => {
    this.setState({
      showInfo : false,
      playTerra: true
    })
  }

  render() {
    const playTerra = this.state.playTerra;
    if(this.state.enter === false){
    return (
        <div className = "container">
          <div id='homeScreen' className="row mb-0  pb-0 align-items-center justify-content-center">
                <img alt={'el topo logo'} style={{width: '300px', height: '300px'}} src={logo} />
                <h2 id='enter' onClick={this.pressedEnter} className=" d-inline text-center hoverable">ENTER</h2>
          </div>
          {/* <div className="row mt-0 align-items-center justify-content-center ">
            <h2 id='enter' onClick={this.pressedEnter} className=" d-inline text-center hoverable">ENTER</h2>
          </div> */}
        </div>
    );

  }else if(this.state.enter === true && this.state.playTerra === true){
    return(
      <div id='terra' className='container'>
          <div className='row text-center'>
            < Terra playTerra={playTerra} />
          </div>
          <div className=' mediaPlayer row align-items-center align-content-center text-center'>

                    <div><audio id='terraform' loop={true} autoPlay={true} src={terraform}/></div>

                    <h5 className='col hoverable' onClick={this.lastTrack} alt={'back button'}>last</h5>

                    <h5 id='terra' className='col hoverable' onClick={this.playPause} alt={'back button'}>{this.state.playOrPauseTerra}</h5>

                    <h5 className='col hoverable' onClick={this.nextTrack} alt={'back button'}>next</h5>
                
                  <h5 className='col hoverable' onClick={this.showInfo} alt={'back button'}>?</h5>
             
            </div>
      </div>
    )
  }else if(this.state.enter === true && this.state.playLuv === true){
    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
          < Luv playLuv={this.state.playLuv} />
          </div>
        </div>
        <div id='luvPlayer' className='row align-items-center align-content-center text-center'>

            <div><audio loop={true} id='do4luv' autoPlay={true} src={do4luv}/></div>

            <h5 className='col hoverable' onClick={this.lastTrack} alt={'back button'}>last</h5>

            <h5 id='luv' className='col hoverable' onClick={this.playPause} alt={'back button'}>{this.state.playOrPauseTerra}</h5>

            <h5 className='col hoverable' onClick={this.nextTrack} alt={'back button'}>next</h5>

            <h5 className='col hoverable' onClick={this.showInfo} alt={'back button'}>?</h5>

        </div>
      </div>
    )
  }else if(this.state.enter === true && this.state.playPlus === true){
    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
          < Plus playPlus={this.state.playPlus} />
          </div>
        </div>
        <div id='plusPlayer' className='row align-items-center align-content-center text-center'>

            <div><audio loop={true} id='do4luv' autoPlay={true} src={plusplusplus}/></div>

            <h5 className='col hoverable' onClick={this.lastTrack} alt={'back button'}>last</h5>

            <h5 id='luv' className='col hoverable' onClick={this.playPause} alt={'back button'}>{this.state.playOrPauseTerra}</h5>

            <h5 className='col hoverable' onClick={this.nextTrack} alt={'back button'}>next</h5>

            <h5 className='col hoverable' onClick={this.showInfo} alt={'back button'}>?</h5>

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
