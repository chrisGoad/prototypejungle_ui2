
import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_0');

let levels = 7;

rs.quadParams = {levels};

//rs.quadParams.mangle = {'lengthen':.2,'twist':0.05*Math.PI,within:rs.canvasToRectangle()};



export {rs};


rs.quadSplitParams = function (qd) {
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.minDimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*0.2));
  let v=0.4;
  let w=0.5;
   return {center:rp,pfr0:v,pfr1:v,pfr2:w,pfr3:w};
   return {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
}