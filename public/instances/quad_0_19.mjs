
import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_19');
debugger;
rs.quadParams.levels = 7;
rs.offCenter = 0.2;
//rs.quadParams.mangle = {'lengthen':5,'twist':0.05*Math.PI};
rs.quadSplitParams = function (qd) {
  debugger;
  let {width:wd} = this;
  let pgon = qd.polygon;
  let minx = pgon.left();
  let c = pgon.center();
  let d = pgon.minDimension();
  let fr0 = Math.sqrt((minx + 0.5*wd)/wd);
  let lv = qd.where.length;
  console.log('lv',lv, 'd',d,'fr0',fr0);
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(2*fr0*d*this.offCenter));
   return {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
}


export {rs};


