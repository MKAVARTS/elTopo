
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let width = window.innerWidth - 350;
let height = window.innerHeight - 175;
var clearBackground = true;
let counter = 0;
let buffer, cnv, capture;



export default class Luv extends Component {

    constructor(props){
        super(props);
            this.state={playLuv: this.props.playLuv}}


    rootRef = node => {
        this.root = node;
    }

    componentDidMount() {
        // console.log('luv component mounted');
        width = window.innerWidth - 350;
        height = window.innerHeight - 175;
        new p5(this.sketch, this.root);
        // window.onresize = () => {
        //   if(window.innerWidth < 800){
        //     this.canvas.resize(width, window.innerHeight-175);
        //   }else{
        //     this.canvas.resize(window.innerWidth - 350, window.innerHeight-175);
        //   }
        //   }
          };

    sketch = (p) => {
        this.p = p;
        
        // setup
           p.setup = () => {

            if(window.innerWidth < 900){
              width = 350;
              height = window.innerHeight-175
              // capture.resize(wid, window.innerHeight-175);
            }else{
              width = window.innerWidth - 350;
              height = window.innerHeight - 175;
              // capture.resize(window.innerWidth - 350, window.innerHeight-175);
            }
        
            this.canvas = p.createCanvas(width, height);
            cnv = this.canvas;
            p.pixelDensity(1);
            p.background(0);
            p.noSmooth();
            buffer = p.createGraphics(width, height);
            buffer.noSmooth();
          
        
          }
        
        
          // draw 
           p.draw = () => {

       
        
              if(this.state.playLuv){
        
            let translateX = p.map(p.mouseX - width/2, -width, width, -20, 20);
            let translateY = p.map(p.mouseY - height/2, -height, height, -20, 20);
            let scaleX = 1.;
            let scaleY = 1.;
        
            if(p.mouseIsPressed && p.mouseX > 0 && p.mouseX < width && p.mouseY > 0 && p.mouseY < height){
            clearBackground = false;
            smear(translateX, translateY, scaleX, scaleY, 0.005);
            p.image(buffer, 0, 0);
            }
        
            if(!p.mouseIsPressed){
                      
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
            buffer.push();
            buffer.translate(tx + width/2, ty + height/2);
            buffer.rotate(angle);
            buffer.image(cnv, -width/2, -height/2, width, height);
            buffer.pop();
          }

          p.windowResized = () => {
            // p.resizeCanvas(width,height);
              if(window.innerWidth < 800){
                width = 350;
                height = window.innerHeight-175
                p.resizeCanvas(width, height);
                buffer = p.createGraphics(width,height);
                buffer.noSmooth();
                // capture.resize(wid, window.innerHeight-175);
              }else{
                width = window.innerWidth - 350;
                height = window.innerHeight - 175;
                p.resizeCanvas(width, height);
                buffer = p.createGraphics(width,height);
                buffer.noSmooth();
                // capture.resize(window.innerWidth - 350, window.innerHeight-175);
              }
        }
        
         
        
}

    render(){
      return (
        <div className='container'>
        <div className='row align-items-center justify-content-center'>
            <h1>"do 4 luv"</h1>
        </div>
        <div className='row align-items-center justify-content-center'>
            <div style={{border: '2px solid white'}} id="luvCnv" ref={this.rootRef}></div>
        </div>
   </div>
      );
    }
    }

