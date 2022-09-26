
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
  let fr0 = Math.sqrt((minx + 0.5*wd)/wd);
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  let radius = 2*fr0*this.offCenter
   return {Case:9,direction:rd,radius,pcs:[.5,1.5,2.5,3.5]};
}

rs.adjustProtos = function () {
  this.polygonP['stroke-width'] = 0.1;
}
export {rs};


