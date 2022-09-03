

import {rs as generatorP} from '/instances/quad_15_7.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_7_6');

let wd = 100;
let levels = 3;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams.levels = levels;
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

      

