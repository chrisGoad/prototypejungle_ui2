

import {rs as generatorP} from '/instances/quad_0_8.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_0_8_0');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams.splitParams.ornt = 'v';
rs.quadParams.levels = 1;

rs.afterInitialize = rs.showLabelsV;

export {rs};

      

