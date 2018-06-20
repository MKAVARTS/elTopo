
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let width = 350;
let height = window.innerHeight - 150;
let amount = 20;
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
        this.setState({loadedComponent: true});
        // console.log('mounted plus component');
        new p5(this.sketch, this.root);
        window.onresize = () => {
          this.canvas.resize(width, height);
        };
    }

    sketch = (p) => {
        this.p = p;

        p.setup = () => {
          p.pixelDensity(1);
          this.canvas = p.createCanvas(width, height);
          p.background(0);
        }

        p.touchEnded = () => {
          if(p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height){
          lineArray.splice(0,1);
          var vector = p.createVector(p.mouseX,p.mouseY);
          lineArray.push(new DrawRandomLine(vector));
          }
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

          if(this.state.playPlus){
          for(var i = 0; i < lineArray.length; i++){
            let line = lineArray[i];
              p.stroke(255);
              line.updatePath();
              line.displayPath();
          }
        }else{
          p.noLoop();
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

