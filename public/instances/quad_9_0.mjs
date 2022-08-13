
import {rs as generatorP} from '/generators/quad_9.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_9_0');
let levels = 8;

rs.quadParams.levels = levels;
levels++;
rs.splitParams = {fr0:0.5,fr1:0.5,fr2:0.2};
rs.quadSplitParams = function (qd) {
  let ornt = Math.random() < 0.5?'h':'v';
  let rs = this.splitParams;
  rs.ornt = ornt;
  return rs;
}

let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);
//let lengthenings = rs.lengthenings = [];
//s.addToArray(lengthenings,.5,levels);
//let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
//rs.addToArray(twists,0.05*Math.PI,levels);
let strokeWidths = rs.quadParams.strokeWidths = [];
debugger;
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.04,1);
//rs.addToArray(strokeWidths,.1,levels);

export {rs};


