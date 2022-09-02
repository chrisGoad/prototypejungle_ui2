

import {rs as generatorP} from '/instances/quad_15_7.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_7_4');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams.splitParams.ornt = 'h';
rs.quadParams.levels = 1;
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'h',fr0:.4,fr1:.4,fr2:.4,fr3:.4,fr4:.6,fr5:.4}};
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'h',fr0:.4,fr1:.4,fr2:.4,fr3:.3,fr4:.7,fr5:.6}};

//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitialize = rs.showLabelsH;

export {rs};

      

