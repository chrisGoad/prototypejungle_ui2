
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_7');
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//levels++;
rs.hSplitParams = {Case:7,fr0:0.5,fr1:0.5,fr3:0.8};
rs.vSplitParams = {Case:8,fr0:0.5,fr1:0.5,fr2:0.8};
rs.partSplitParams = function (qd) {
  let vertical = Math.random() < 0.5?0:1;;
  let rs = vertical?this.vSplitParams:this.hSplitParams
  //rs.ornt = ornt;
  return rs;
}
rs.partParams.mangle = {lengthen:5.5,twist:.05*Math.PI,within:rs.canvasToRectangle()}


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,20);

export {rs};


