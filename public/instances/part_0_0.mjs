
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_0');
let levels = 7;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;
rs.splitParams = {vertexNum:0,fr0:0.5,fr1:0.5};
rs.splitParams = {vertexNum:0,fr0:0.3};
rs.partSplitParams = function (prt) {
  let rs = this.splitParams;
  let lev = prt.where.length;
  rs. vertexNum = lev%2;
    
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,levels-1);
rs.addToArray(visibles,1,levels);
//let lengthenings = rs.lengthenings = [];
//s.addToArray(lengthenings,.5,levels);
//let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
//rs.addToArray(twists,0.05*Math.PI,levels);
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
rs.computeExponentials(strokeWidths,20,0.04,.9);
//rs.addToArray(strokeWidths,.1,levels);

export {rs};


