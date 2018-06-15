
import CSS from './App.css';
import digestive from './Digestive.otf';
import React, { Component } from 'react';
import terraform from './tracks/terraform.mp3';
import do4luv from './tracks/terraform.mp3';
import plusplusplus from './tracks/plusplusplus.mp3';

import BackButton from './vectors/BackButton.png';
import NextButton from './vectors/NextButton.png';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';
let  width = window.innerWidth;
let  height = window.innerHeight;
let step = 1;
let trackCounter = 0;
let fontsize = 100;
let walkerArray = [];
let trackOne, heading;
let backButton = BackButton;
let nextButton = NextButton;



export default class Sketchy extends Component {

    constructor(props){
        super(props)
            this.state={
                whichTrack : terraform
            }
        }

    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {
        new p5(this.sketch, this.root);
        window.onresize = () => {
          this.canvas.resize(400, window.innerHeight-125);
        };
    }

    // nextTrack = () => {
    //     counter += 1 % 3;
    //     if(counter === 0){
    //         this.setState({whichTrack : terraform});
    //     }else if(counter === 1){
    //         this.setState({whichTrack : do4luv});
    //     }else if(counter === 2){
    //         this.setState({whichTrack : plusplusplus});
    //     }
    // }

    sketch = p => {

        class Particle {
            constructor(){
            this.mouseX = width/2;
            this.mouseY = height/2;
            this.positionX = width/2;
            this.positionY = height/2;
            this.scale = 1.0;
            this.scaleMult = 10;
            this.angle = 0;
            this.addRandom = 1;

            this.startPosition = () =>{
                this.positionX = p.random(-width, width);
                this.positionY = p.random(-height, height);
            }
      
            this.update = () => {
      
              this.addRandom = p.random(-step,step);
              this.mouseX = p.mouseX;
              this.mouseY = p.mouseY;
      
              if(this.positionX > width){
                this.positionX = 0;
              }else if(this.positionX < 0){
                this.positionX = width;
              }else if(this.positionY > height){
                this.positionY = 0;
              }else if(this.positionY < 0){
                this.positionY = height;
              }
              if(this.mouseX >= width/2 && this.mouseY >= height/2){
                this.positionX += step;
                this.positionY += step;
              }else if(this.mouseX <= width/2 && this.mouseY <= height/2){
                this.positionX -= step;
                this.positionY -= step;
              }else if(this.mouseX <= width/2 && this.mouseY >= height/2){
                this.positionX -= step;
                this.positionY += step;
              }else if(this.mouseX >= width/2 && this.mouseY <= height/2){
                this.positionX += step;
                this.positionY -= step;
              }
            }
      
              this.color = (number) =>{
                if(number === 0){
                  return p.fill(255,0,0);
                }else if (number === 1){
                  return p.fill(255,255,0);
                }else if(number === 2){
                  return p.fill(255,255,255);
                }else if(number === 3){
                  return p.fill(51);
                }
              }
      
              this.display = () => {
                p.strokeWeight(0);
                p.fill(255,255,0);
                p.point(this.positionX - this.addRandom, this.positionY - this.addRandom);
                p.fill(255,255,255);
                p.ellipse(this.positionX + this.addRandom, this.positionY, 5, 5);
                p.fill(255,0,0);
                p.rect(this.positionX, this.positionY, 5,5);
                
              }
            }
        }  
        this.p = p;

        p.preload = () => {
            heading = p.loadFont(digestive);
            trackOne = p.loadSound(this.state.whichTrack);
        }

        p.setup = () => {
            p.pixelDensity(2);
            if(trackOne.isLoaded){
                this.setState({isLoaded: true});
            }
            trackOne.setVolume(1.0);
            trackOne.play();

            this.canvas = p.createCanvas(400, window.innerHeight - 125);
            p.background(0);
            for(var i = 0; i < 10; i++){
                walkerArray.push(new Particle());
              }

            for(var i = 0; i < walkerArray.length; i++){
                walkerArray[i].startPosition();
            }
        }

        p.draw = () => {

            for(var i = 0; i < walkerArray.length; i++){
                walkerArray[i].update();
                walkerArray[i].display();
            }
        }
    }

    render() {
      return (
        <div>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col text-center'>
                        <p>"terraform"</p>
                        <div style={{zIndex: -1}} id="cnv" ref={this.rootRef}></div>
                    </div>
                 </div>
            </div>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col' id="mediaPlayer">
                        <img alt={'Back Button'} className="mr-2 pt-2 pb-2" src={backButton} />
                        <img alt={'Next Button'} className="mr-2 pt-2 pb-2" src={nextButton} />
                    </div>
                </div>
            </div>
        </div>
      );
 }
}

  
