
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let width = 400;
let height = window.innerHeight - 175;
let pushLine = false;
let amount = 20;
let step = amount;
let length = amount;
var counter = 0;


export default class Plus extends Component {

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
          this.canvas.resize(width, height);
        };
    }

    sketch = (p) => {
        this.p = p;

        let lineArray = [];

        p.setup = () => {
          p.pixelDensity(1);
          this.canvas = p.createCanvas(width, height);
          p.background(0);
        }

        p.mouseClicked = () => {
          lineArray.splice(0,1);
          step = 20;
          var vector = p.createVector(p.mouseX,p.mouseY);
          lineArray.push(new DrawRandomLine(vector));
        }

        class DrawRandomLine {
          constructor(vector){
            this.x = vector.x;
            this.y = vector.y;

            this.updatePath = () =>{
              var selector = p.random();

              if(selector <= 0.25){
                this.x += 2;
                if(this.x > width){
                  this.x = 0;
                }
              }else if(selector > 0.25 && selector <= 0.5){
                this.x -= 4;
                if(this.x < 0){
                  this.x = width;
                }
              }else if(selector > 0.5 && selector <= 0.75){
                this.y += 6;
                if(this.y > height){
                  this.y = 0;
                }
              }else if(selector > 0.75 && selector <= 1.0){
                this.y -= 8;
                if(this.y < 0){
                  this.y = height;
                }
            }
          }
            this.displayPath = () => {
              
              counter = p.random();
              if(counter > 0.5){
              p.push();
              p.translate(this.x, this.y);
              p.line(length,0, 0, length);
              p.pop();
            }else if(counter < 0.5){
              p.push();
              p.strokeWeight(p.random(1,3));
              p.translate(this.x, this.y);
              p.line(0,0, length, length);
              p.pop();
            }
          }
        }
      }

         p.draw = () => {

          for(var i = 0; i < lineArray.length; i++){
            let line = lineArray[i];
              p.stroke(255);
              line.updatePath();
              line.displayPath();
          }
        }
}

    render(){
      return (
    <div>
         <h1 className='text-center'>" + + + "</h1>
         <div id="cnv" ref={this.rootRef}></div>
    </div>
      );
    }
    }

