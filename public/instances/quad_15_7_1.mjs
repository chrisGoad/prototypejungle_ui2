
import {rs as generatorP} from '/instances/quad_15_7.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_7_1');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams.splitParams = {fr0:.5,fr1:.5,fr2:.5,fr3:.5,fr4:.5,fr5:.5}
rs.quadParams.levels = 3;
 rs.quadParams.strokeWidths = [2,1,.3,.035];
rs.quadParams.mangle = {'lengthen':1,'twist':0,within:rs.canvasToRectangle()};


rs.quadMangle = function (qd) {
  let {mangles,mangle} = this.quadParams;
  let lv =  qd.where.length;
  if (lv) { 
    return mangle;
  }
}

export {rs};

