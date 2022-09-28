
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_11');
debugger;
let levels = 10;
levels = 10	;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.offCenter = 0.2;
let visibles = rs.partParams.visibles = [];
//rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);
//rs.quadParams.mangle = {'lengthen':5,'twist':0.05*Math.PI};
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
rs.computeExponentials({dest:strokeWidths,n:20,factor:.8,root:.2});
rs.partSplitParams = function (qd) {
  let vertexNum = Math.random() < 0.5?0:1;
  let v0 = this.randomBetween({low:.4,high:.6});
  let v1 = this.randomBetween({low:.4,high:.6});
  //debugger;
   //return {Case:2,vertexNum,pcs:[0.6,2.2]};
   return {Case:2,vertexNum,pcs:[v0,2+v1]};
}

rs.adjustProtoss = function () {
  this.polygonP['stroke-width'] = 0.1;
}
export {rs};


