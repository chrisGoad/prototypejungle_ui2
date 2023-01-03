
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStrokee:'white'}
Object.assign(rs,topParams);
rs.setName('part2_0_57');
let levels = 10;
levels = 2;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;

rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.triSplitParams = {Case:1,vertexNum:0,pcs:[0.3,1.3]};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let rs = (ln === 3)?this.triSplitParams:this.quadSplitParams
  let lev = prt.where.length;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


