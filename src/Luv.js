
import React, { Component } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';

let width = 400;
let height = window.innerHeight - 175;
let capture;


export default class Luv extends Component {

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

        var x1 = p.random(1, width);
        var y1 = p.random(1, height);
        var x2 = p.random(1, width);
        var y2 = p.random(1, height);
        var x3 = p.random(1, width);
        var y3 = p.random(1, width);
        var x4 = p.random(1, width);
        var y4 = p.random(1, width);
        var value = p.frameCount % 50;
        var amount = p.map(value, 0, 100, 0.0,1.0);

        var buffer;
        var counter = 0;
        var melt_tx = 0.0;
        var melt_ty = 0.0;
        var melt_sx = 0.0;
        var melt_sy = 0.0;
        var melt_a  = 0.0;
        var walkersAmount = 100;
        var clearBackground = true;
        var melting = false;
        
        var walkers = [];
        var NUM_SPLATS = 8;
        var splat_index = 0;
        var splats = [];
        var splat_ready = false;
        let cnv;
        
        var melt_interval = 1000;
        var start = Date.now();
        var c1,c2;
        
        // setup
           p.setup = () => {
        
            cnv = p.createCanvas(width, height);
            p.pixelDensity(1);
            p.background(0);
            p.noSmooth();
            
            buffer = setupBuffer();
          }
        
        
          // draw 
           p.draw = () => {
        
              this.mouseReleased = () => {
              console.log('released mouse');
              p.clear();
              p.background(0);
              clearBackground = true;
            }
        
            // updateMelt();
        
            let translateX = p.map(p.mouseX - width/2, -width, width, -5, 5);
            let translateY = p.map(p.mouseY - height/2, -height, height, -5, 5);
            let scaleX = 1.;
            let scaleY = 1.;
        
            if(p.mouseIsPressed){
            clearBackground = false;
            smear(translateX, translateY, scaleX, scaleY, 0.001);
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
          }
        
        
          // functions 
          function smear(tx, ty, sx, sy, angle){

            p.fill(0);
            capture = p.ellipse(0,0,0,0);
            counter++;
            buffer.push()
            buffer.translate(tx + width/2, ty + height/2);
            buffer.rotate(angle);
            buffer.image(capture, -width/2, -height/2, width, height);
            buffer.pop();
          }
        
          function setupBuffer(){
            p.pixelDensity(1);
            p.background(0);
            let b = p.createGraphics(width, height);
            b.noSmooth();
        
            return b;
          }
        
            p.windowResized = () => {
            p.resizeCanvas(width, height);
            buffer = setupBuffer();
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

