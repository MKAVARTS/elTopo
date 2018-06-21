
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let draw;
let amount = 40;
let walkerAmount = 100;
let walkerArray = [];
let width = window.innerWidth - 350;
let height = window.innerHeight - 175;


export default class Terra extends Component {

    constructor(props){
        super(props);
            this.state=
                {
                playTerra: null
                }
    }


    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {

         width = window.innerWidth - 350;
        height = window.innerHeight - 175;
        new p5(this.sketch, this.root);
        window.onresize = () => {
            width = Math.floor(window.innerWidth-175);
            width = Math.round(width/ amount) * amount; 
            height = Math.floor(window.innerHeight-175);
            height = Math.round(height / amount) * amount; 
            this.canvas.resize(width, height);
          }
    };

    componentWillUnmount(){
        draw = false;
        console.log('unmounting component');
        console.log('this.state.playTerra', this.props.playTerra);
    }

    sketch = (p) => {
        this.p = p;

        class Particle {
            constructor(){
                this.location = p.createVector(p.random(100, 200),p.random(100, 200));
                this.velocity = p.createVector(0,0);
                this.acceleration = p.createVector(0,0);
                this.step = 1;
                this.mag = 0.8;

                this.fillColorOneFunction = () => {
                    var pickAColor = p.floor(p.random(3));
    
                    switch(pickAColor){
                        case 0: 
                        return '#DC143C';
                        case 1: 
                         return '#f28500';
                        case 2: 
                        return '#ffffff';
                        default: 
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
                        default: 
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
                    default: 
                    this.fillColorOne = '#ffffff';
                    this.fillColorTwo = '#DC143C';
                }
            }
       

            this.startPosition = () => {

                this.location = p.createVector(p.random(-width, width), p.random(-height, height));
                this.velocity = p.createVector(0,0);
                this.acceleration = p.createVector(0,0);
                this.positionX = this.location.x;
                this.positionY = this.location.y;
            }
      
            this.update = () => {

                this.mouse = p.createVector(p.mouseX,p.mouseY);
                this.mousePosition = this.mouse.copy();
                this.mouse.sub(this.location);
                this.mouse.setMag(1.);
                this.acceleration = this.mouse;
                this.acceleration = this.mouse.add(p.createVector(p.random(-this.step,this.step), p.random(-this.step,this.step)));
               


                this.velocity.add(this.acceleration);
                this.velocity.limit(4);
                this.location.add(this.velocity);
               
                this.howClose = this.mousePosition.sub(this.location);
               
                if(p.mouseIsPressed && this.howClose.mag() < 10.0){
                    this.startPosition();
                    this.startColor();
                    return p.clear();
            }
                
            }

            this.display = () => {

                p.stroke(255);
                p.strokeWeight(0);
                p.fill(this.fillColorOne);
                p.ellipse(this.location.x, this.location.y, 2, 2);
                p.fill(this.fillColorTwo);
                p.rect(this.location.x, this.location.y, 2,2);  

              }
            } 
        } 

        p.setup = () => {

            draw = true;
            p.pixelDensity(1);
            p.background(0);

            
            width = Math.floor(window.innerWidth-175);
            width = Math.round(width/ amount) * amount;
         
            height = Math.floor(window.innerHeight-175);
            height = Math.round(height / amount) * amount;
        
  
            this.canvas = p.createCanvas(width, height);
            for(var i = 0; i < walkerAmount; i++){
                walkerArray.push(new Particle());
              }

            for(i = 0; i < walkerAmount; i++){
                walkerArray[i].startColor();
                walkerArray[i].startPosition();
                walkerArray[i].update();
            }

            
            
        }

        p.draw = () => {   
           

        if(draw === true){

        
        for(var i = 0; i < walkerArray.length; i++){
            walkerArray[i].update();
            walkerArray[i].display();
        }
    }else if(draw === false){
        p.noLoop();
    }
}
}

    render(){
      return (
    <div className='container'>
         <div className='row align-items-center justify-content-center'>
             <h1>"terraform"</h1>
         </div>
         <div className='row align-items-center justify-content-center'>
             <div style={{border: '2px solid white'}} id="cnv" ref={this.rootRef}></div>
         </div>
    </div>
      );
    }
    }

  
