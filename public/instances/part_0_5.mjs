

import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();
rs.setName('part_0_5');

let levels = 6;
rs.partParams.levels = levels;
rs.partParams = {rectangular:1,levels:levels,polygonal:1,splitParams:{Case:4,fr0:.4,fr1:.4,fr2:0.4,fr3:0.4,fr4:0.7,fr5:0.3}};
console.log('qp',rs.quadParams);
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
//rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.8,.7);
rs.computeExponentials(strokeWidths,10,.5,.5);
 /*rs.quadParams.strokeWidths = [2,1,.3,.035];
rs.quadParams.mangle = {'lengthen':1,'twist':0,within:rs.canvasToRectangle()};


rs.quadMangle = function (qd) {
  let {mangles,mangle} = this.;pa
  let lv =  qd.where.length;
  if (lv) { 
    return mangle;
  }
}
*/
export {rs};

      

