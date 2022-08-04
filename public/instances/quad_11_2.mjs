
import {rs as generatorP} from '/generators/quad_11.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_11_2');


rs.computeFill = function (qd) { 
   const shade = ()=> Math.floor(0*Math.random());
   let r = shade();
   let g = shade();
   let b = shade();
   let fill = `rgb(${r},${r},${r})`;
   //return 'black';
   return 'rgb(0,0,0)'
}

rs.computeSplitParams = function (qd) {
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.dimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*0.2));
   //return [rp,.5,0.1,0.4,.1];
   return [rp,.1,.5,0.1,0.4];
   return [rp,.5,.5,0.5,0.5];

  //return [c,.7,.3,0.7,.3];
  return [c,.55,.52,0.52,0.52];
}

export {rs};


