export default function sketch (p) {
    let rotation = 0;
    let framecount;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cnv;
    let elTopo;
  
    p.preload = function(){
      elTopo = p.loadFont('./D.otf');
      console.log("this should be digestive font", elTopo);
    }

    p.setup = function () {
     cnv = p.createCanvas(width, height, p.WEBGL);
     p.loadFont()
    };

    p.windowResized = function (){
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      // console.log("canvas width and height", cnv.width, cnv.height);
    }
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.rotation){
      }
    };
  
    p.draw = function () {
      p.background(0);
    };
  };