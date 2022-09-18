
import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_11');
let levels = 1;
rs.quadParams.levels = levels;
levels++;
rs.splitParams = {fr0:0.5,fr1:0.5,fr2:0.2};
rs.quadSplitParams = function (qd) {
  let ornt = Math.random() < 0.5?'h':'v';
  let rs = this.splitParams;
  rs.ornt = ornt;
  return rs;
}
rs.quadParams.manglee = {lengthen:5.5,twist:.05*Math.PI,within:rs.canvasToRectangle()}


let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,3,levels);

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,20);

export {rs};


