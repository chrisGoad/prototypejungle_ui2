

import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_7');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:0.4,fr1:0.4,fr2:0.4,fr3:0.4,fr4:0.4,fr5:0.6}};
rs.adjustProtos = function () {
  let {polygonP} = this;
  polygonP['stroke-width'] =  .2;
}



export {rs};

      

