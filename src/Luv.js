
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let width = 350;
let height = window.innerHeight - 150;
var clearBackground = true;
let counter = 0;
let buffer, cnv;



export default class Luv extends Component {

    constructor(props){
        super(props);
            this.state={playLuv: this.props.playLuv}}


    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {
        // console.log('luv component mounted');
        new p5(this.sketch, this.root);
        window.onresize = () => {
          this.canvas.resize(400, window.innerHeight - 175);
        };
    }

    sketch = (p) => {
        this.p = p;
        
        // setup
           p.setup = () => {
        
            cnv = p.createCanvas(width, height);
            p.pixelDensity(1);
            p.background(0);
            p.noSmooth();
            buffer = p.createGraphics(width, height);
            buffer.noSmooth();
          
        
          }
        
        
          // draw 
           p.draw = () => {
        
              if(this.state.playLuv){
              this.mouseReleased = () => {
              p.clear();
              p.background(0);
              clearBackground = true;
            }
        
            // updateMelt();
        
            let translateX = p.map(p.mouseX - width/2, -width, width, -20, 20);
            let translateY = p.map(p.mouseY - height/2, -height, height, -20, 20);
            let scaleX = 1.;
            let scaleY = 1.;
        
            if(p.mouseIsPressed){
            clearBackground = false;
            smear(translateX, translateY, scaleX, scaleY, 0.005);
            p.image(buffer, 0, 0);
            }
        
            if(!p.mouseIsPressed){
              if(!clearBackground){
                this.mouseReleased();
              }
                      
              function pickColor(){
                var number = p.floor(p.random(4));
                if(number === 0 ){
                  return p.color(153,0,0);
                }else if(number === 1){
                  return p.color(242,133,0);
                }else if(number === 2){
                  return p.color(255,244,79);
                }else if(number === 3){
                  return p.color(255,255,255);
                }
              }
        
              if(p.frameCount % 10 === 0){
                var x1 = p.random(1, width);
                var y1 = p.random(1, height);
                var x2 = p.random(1, width);
                var y2 = p.random(1, height);
                var x3 = p.random(1, width);
                var y3 = p.random(1, width);
                var x4 = p.random(1, width);
                var y4 = p.random(1, width);
              p.fill(pickColor());
              p.quad(x1,y1,x2,y2,x3,y3,x4,y4);
              }
        
            }
          }else{
            p.noLoop();
          }
          }
        
        
          // functions 
          function smear(tx, ty, sx, sy, angle){

            p.fill(0);
            counter = counter + 1;
            buffer.push()
            buffer.translate(tx + width/2, ty + height/2);
            buffer.rotate(angle);
            buffer.image(cnv, -width/2, -height/2, width * 1.001, height * 1.001);
            buffer.pop();
          }
        
            p.windowResized = () => {
            p.resizeCanvas(width, height);
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

