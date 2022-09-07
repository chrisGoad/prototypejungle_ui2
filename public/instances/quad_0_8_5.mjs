

import {rs as generatorP} from '/instances/quad_0_8.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_0_8_5');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams.splitParams.ornt = 'h';
rs.quadParams.levels = 1;
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'h',fr0:.4,fr1:.4,fr2:.4,fr3:.4,fr4:.6,fr5:.4}};
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'h',fr0:.4,fr1:.4,fr2:.4,fr3:.3,fr4:.7,fr5:.6}};
let dir = 0.25*Math.PI;
let c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,pfr0:.3,pfr1:.4,pfr2:0.5,pfr3:0.6}};
//rs.quadParams = {chance:1,levels:levels,polygonal:1};
/*let strokeWidths = rs.quadParams.strokeWidths = [];

rs.computeExponentials(strokeWidths,10,0.05,.9);

rs.quadSplitParams = function (qd) {
  debugger;
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.minDimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*.2));
   return {center:rp,pfr0:.3,pfr1:.4,pfr2:0.5,pfr3:0.6};
}
*/
//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitialize = rs.showLabelsC;

export {rs};

      

