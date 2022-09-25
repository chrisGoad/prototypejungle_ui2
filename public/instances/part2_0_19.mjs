
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_19');
debugger;
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.offCenter = 0.2;
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);
//rs.quadParams.mangle = {'lengthen':5,'twist':0.05*Math.PI};
rs.partSplitParams = function (qd) {
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
   return {Case:9,center:rp,pc0:.5,pc1:1.5,pc2:2.5,pc3:3.5};
}

rs.adjustProtos = function () {
  this.polygonP['stroke-width'] = 0.1;
}
export {rs};


