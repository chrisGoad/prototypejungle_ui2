

import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_8');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
let dir = 0.25*Math.PI;
let c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5}};
rs.adjustProtos = function () {
  let {polygonP} = this;
  polygonP['stroke-width'] =  .2;
}



export {rs};

      

