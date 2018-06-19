
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let  width = 400;
let  height = window.innerHeight - 150;
let walkerAmount = 20;
let walkerArray = [];

var buffer;
var counter = 0;
var melt_tx = 0.0;
var melt_ty = 0.0;
var melt_sx = 0.0;
var melt_sy = 0.0;
var melt_a  = 0.0;
var capture;
var VIDEO;

var walkers = [];

var NUM_SPLATS = 8;
var splat_index = 0;
var splats = [];
var splat_ready = false;

var melt_interval = 1000;
var start = Date.now();



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
          this.canvas.resize(width, window.innerHeight - 175);
        };
    }

    sketch = (p) => {
        this.p = p;

        class Walker {
            constructor(x, y){
              this.posX = x;
              this.posY = y;
              this.walkX = this.posX;
              this.walkY = this.posY;

            this.update = () => {
              let rx = p.random(-64, 64);
              let ry = p.random(-64, 64);
              if (this.walkX + rx > width || this.walkX + rx < 0){
                rx *= -1;
              }
              if (this.walkY + ry > height || this.walkY + ry < 0){
                ry *= -1;
              }
              
              this.walkX += rx;
              this.walkY += ry;
              
              let dx = this.walkX - this.posX;
              let dy = this.walkY - this.posY;
              if (p.abs(dx) < 1){
                this.posX = this.walkX;
              }
              if (p.abs(dy) < 1){
                this.posY = this.walkY;
              }
              this.posX += dx*0.024;
              this.posY += dy*0.024;
            
            }
          }
        }
           

           p.setup = () => {
            p.pixelDensity(1);
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(255);
            p.noSmooth();

            capture = p.ellipse(width/2, height/2, 20, 20);
            capture.size(window.innerWidth, window.innerHeight);
            capture.hide();

            melt_tx = p.random(width);
            melt_ty = p.random(height);
            melt_sx = p.random(width);
            melt_sy = p.random(height);
            melt_a  = p.random(-0.01, 0.01);

            this.setupBuffer = () => {
                let b = p.createGraphics(width, window.innerHeight);
                b.noSmooth();
            
                return b;
              }

              this.randomizeMelt = () => {
                melt_tx = p.random(width);
                melt_ty = p.random(height);
                melt_sx = p.random(width);
                melt_sy = p.random(height);
                melt_a  = p.random(-0.0048, 0.0048);
              }
            
            buffer = this.setupBuffer();
        
            walkers[0] = new Walker(width, height * 0.25);
        
          }
        

         p.draw = () => {

            this.updateMelt = () =>{
                melt_tx += p.cos(1.1*p.frameCount*0.01)*4;
                melt_ty += p.sin(1.2*p.frameCount*0.01)*4;
                melt_sx += p.cos(1.3*p.frameCount*0.01)*4;
                melt_sy += p.sin(1.4*p.frameCount*0.01)*4;
              }

              this.melt = (tx, ty, sx, sy, angle) => {
                counter++;
                buffer.push()
                buffer.p.translate(tx + width/2, ty + height/2);
                buffer.p.rotate(angle);
                if(counter % 200 === 0){
                buffer.image(capture, -window.innerWidth/2,-window.innerHeight/2,window.innerWidth,window.innerHeight);
                }
                buffer.image(buffer, -sx/2 - width/2, -sy/2 - height/2, sx + width, sy + height);
                buffer.pop()
              }

            this.updateMelt();
        
            let translateX = (melt_tx - width/2) * 0.0024;
            let translateY = (melt_ty - height/2) * 0.0024;
            let scaleX = (melt_sx - width/2) * 0.01;
            let scaleY = (melt_sy - height/2) * 0.01;
        
            this.melt(translateX, translateY, scaleX, scaleY, 0.001);
        
            // image(capture,0,0,320,240);
            p.image(buffer, 0, 0);
        
            for (let i = 0; i < walkers.length; i++){
              walkers[i].update();
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

