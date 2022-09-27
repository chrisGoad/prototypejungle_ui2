
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_7');
let levels = 7;
//levels = 4;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//levels++;
rs.hSplitParams = {Case:7,pcs:[0.5,1.5,2.5,3.8]};
rs.vSplitParams = {Case:8,pcs:[0.5,1.5,2.8]};
rs.vSplitParams = {Case:8,pcs:[0.5,1.5,2.6]};
rs.partSplitParams = function (qd) {
  let vertical = Math.random() < .5;
  let rs = vertical?this.vSplitParams:this.hSplitParams
  return rs;
}
rs.partParams.mangle = {lengthen:5.5,twist:.05*Math.PI,within:rs.canvasToRectangle()}


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.03,20);

export {rs};


