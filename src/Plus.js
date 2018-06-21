
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let draw;
let width;
let height;
let amount = 20;
let displayType = 0;
let length = amount;
var counter = 0;
let lineArray = [];




export default class Plus extends Component {

    constructor(props){
        super(props);
            this.state={playPlus: this.props.playPlus, loadedComponent: false}
        }


    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {
        // console.log('mounted plus component');
        new p5(this.sketch, this.root);
        window.onresize = () => {
            width = Math.floor(window.innerWidth-175);
            width = Math.round(width/ amount) * amount; 
            console.log("plus width", width);
            height = Math.floor(window.innerHeight-175);
            height = Math.round(height / amount) * amount; 
            console.log("plus height", height);

            if(width < 400){
              width = 350;
              height = 550;
            }
            this.canvas.resize(width, height);
          }

    }

    componentWillUnmount(){
      draw = false;
    }

    sketch = (p) => {
        this.p = p;

        p.setup = () => {
          p.pixelDensity(1);

          draw = true;

          width = Math.floor(window.innerWidth-175);
          width = Math.round(width/ amount) * amount;
          console.log("setup width", width);
          height = Math.floor(window.innerHeight-175);
          height = Math.round(height / amount) * amount;
          console.log("setup height", height);

          if(width < 400){
            width = 350;
            height = 500;
          }

          this.canvas = p.createCanvas(width, height);
          p.background(0);

        }

        p.touchEnded = () => {
          if(p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height){

          displayType++;
          displayType = displayType % 3;

          var mouseX = p.round(p.floor(p.mouseX) / amount) * amount;
          var mouseY = p.round(p.floor(p.mouseY) / amount) * amount;
          console.log('pMouseX', mouseX);
          console.log('p.MouseY', mouseY );
          lineArray.splice(0,1);
          var vector = p.createVector(mouseX,mouseY);
          lineArray.push(new DrawRandomLine(vector));
          }
        }

        class DrawRandomLine {
          constructor(vector){
            this.x = vector.x;
            this.y = vector.y;

            this.updatePath = () =>{

              var selector = p.random();
              if(selector < 0.25){
                this.x += amount;
                if(this.x > width){
                  this.x = 0;
                }
              }else if(selector >= 0.25 && selector < 0.5){
                this.x -= amount;
                if(this.x < 0){
                  this.x = width;
                }
              }else if(selector >= 0.5 && selector < 0.75){
                this.y -= amount;
                if(this.y > height){
                  this.y = 0;
                }
              }else if(selector >= 0.75 && selector < 1.0){
                this.y += amount;
                if(this.y < 0){
                  this.y = height;
                }
            }
        }
            this.displayPath = () => {
              
              if(displayType === 0){
              counter = p.random();
              if(counter < 0.5){
              // p.push();
              p.stroke(255,255,255);
              p.strokeWeight(1);
              p.line(this.x ,this.y, this.x, this.y + amount);
              // p.pop();
            }else if(counter > 0.5){
              // p.push();
              p.stroke(0,0,255);
              p.strokeWeight(1);
              p.fill(0);
              p.line(this.x,this.y + amount, this.x + amount, this.y + amount);
              // p.pop();
            }
          }else if(displayType === 1){
            counter = p.random();
            if(counter < 0.5){
            // p.push();
            p.stroke(0,0,255);
            p.strokeWeight(1.5);
            p.line(this.x ,this.y + amount, this.x + amount, this.y + amount);
            // p.pop();
          }else if(counter > 0.5){
            // p.push();
            p.stroke(255,255,255);
            p.strokeWeight(1.5);
            p.fill(0);
            p.line(this.x ,this.y, this.x + amount, this.y);
            // p.pop();
          }
          }else if(displayType === 2){
            counter = p.random();
            if(counter < 0.5){
            // p.push();
            p.stroke(255,255,255);
            p.strokeWeight(1);
            p.line(this.x ,this.y + amount, this.x + amount, this.y);
           
            // p.pop();
          }else if(counter > 0.5){
            // p.push();
            p.stroke(0,0,255);
            p.strokeWeight(1);
            p.rect(this.x ,this.y, amount, amount);
            // p.pop();
          }
        }
        }
        }
      }

         p.draw = () => {

          if(draw){

          console.log("drawing plus");
          for(var i = 0; i < lineArray.length; i++){
            let line = lineArray[i];
              p.stroke(255);
              line.updatePath();
              line.displayPath();
          }
        }else if(!draw){
            console.log('not drawing plus');
            p.noLoop();
        }
      }
}

    render(){
      return (
        <div className='container'>
        <div className='row align-items-center justify-content-center'>
            <h1>"+ + +"</h1>
        </div>
        <div className='row align-items-center justify-content-center'>
            <div style={{border: '2px solid white'}} id="cnv" ref={this.rootRef}></div>
        </div>
   </div>
      );
    }
    }

