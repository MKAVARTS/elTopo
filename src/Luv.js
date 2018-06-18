
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let  width = window.innerWidth;
let  height = window.innerHeight;
let walkerAmount = 20;
let walkerArray = [];



export default class Terra extends Component {

    constructor(props){
        super(props);
            this.state={playTerra: this.props.playTerra, loadedComponent : false}
        }


    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {
        new p5(this.sketch, this.root);
        window.onresize = () => {
          this.canvas.resize(400, window.innerHeight - 175);
        };
    }

    sketch = (p) => {
        this.p = p;

        class Particle {
            constructor(){
                this.location = p.createVector(p.random(100, 200),p.random(100, 200));
                this.velocity = p.createVector(0,0);
                this.acceleration = p.createVector(0,0);
                this.step = 2;

                this.fillColorOneFunction = () => {
                    var pickAColor = p.floor(p.random(3));
    
                    switch(pickAColor){
                        case 0: 
                        return '#DC143C';
                        case 1: 
                         return '#f28500';
                        case 2: 
                        return '#ffffff';
                    }
                }

                this.fillColorTwoFunction = () => {
                    var pickAColor = p.floor(p.random(3));
    
                    switch(pickAColor){
                        case 0: 
                        return '#DC143C';
                        case 1: 
                         return '#f28500';
                        case 2: 
                        return '#ffffff';
                    }
                }


                this.fillColorOne = this.fillColorOneFunction();
                this.fillColorTwo = this.fillColorTwoFunction();
        
            this.startColor = () => {
                var pickAColor = p.floor(p.random(3));

                switch(pickAColor){
                    case 0: 
                    this.fillColorOne = '#DC143C';
                    this.fillColorTwo = '#f28500';
                    break;
                    case 1: 
                    this.fillColorOne = '#f28500';
                    this.fillColorTwo = '#ffffff';
                    break;
                    case 2: 
                    this.fillColorOne = '#ffffff';
                    this.fillColorTwo = '#DC143C';
                    break;
                }
            }
       

            this.startPosition = () => {

                this.location = p.createVector(p.random(100, 200),p.random(100, 200));
                this.velocity = p.createVector(0,0);
                this.acceleration = p.createVector(0,0);
                this.positionX = this.location.x;
                this.positionY = this.location.y;
            }
      
            this.update = () => {

                this.mouse = p.createVector(p.mouseX,p.mouseY);
                this.mousePosition = this.mouse.copy();
                this.mouse.sub(this.location);
                this.mouse.setMag(0.8);
                this.acceleration = this.mouse.add(p.createVector(p.random(-this.step,this.step), p.random(-this.step,this.step)));
                this.acceleration = this.mouse;

                this.velocity.add(this.acceleration);
                this.velocity.limit(1.);
                this.location.add(this.velocity);
               
                this.howClose = this.mousePosition.sub(this.location);
               
                if(p.mouseIsPressed && this.howClose.mag() < 10.0){
                    this.startPosition();
                    this.startColor();
                    return p.clear();
            }
                
            }

            this.display = () => {

                p.strokeWeight(0);
                p.fill(this.fillColorOne);
                p.ellipse(this.location.x, this.location.y, 1, 1);
                p.fill(this.fillColorTwo);
                p.rect(this.location.x, this.location.y, 1,1);  

              }
            } 
        } 

        p.setup = () => {
            p.pixelDensity(1);
            p.background(0);



            this.canvas = p.createCanvas(400, window.innerHeight-175);
            for(var i = 0; i < walkerAmount; i++){
                walkerArray.push(new Particle());
              }

            for(var i = 0; i < walkerAmount; i++){
                walkerArray[i].startColor();
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

    render(){
      return (
    <div>
         <h1 className='text-center'>"do 4 luv"</h1>
         <div id="cnv" ref={this.rootRef}></div>
    </div>
      );
    }
    }

