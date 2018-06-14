export default function sketch (p) {
    let rotation = 0;
    let framecount;
  
    p.setup = function () {
      p.createCanvas(600, 400, p.WEBGL);
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.rotation){
        rotation = props.rotation * Math.PI / 180;
      }
    };
  
    p.draw = function () {

      framecount = p.frameCount;
      p.ambientLight(255)
      p.background(0);
      p.noStroke();
      p.push();
      p.rotateY(framecount * 0.01 * rotation % 360.0);
      p.rotateX(framecount * 0.01 * rotation % 360.0);
      p.box(100);
      p.pop();


    };
  };