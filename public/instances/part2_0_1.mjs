
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_1');
let levels = 10;
//levels = 3;

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

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
rs.partStrokeWidth = function (prt) {
  let quadp = 1;
  let lev = prt.where.length;
  let levHigh = lev > 7;
  let pln = prt.polygon.corners.length;
  let quad = pln === 4;
  let prnt = prt.parent;
  if (prnt) {
  //  debugger;
    let  pln = prnt.polygon.corners.length;
    quadp = pln === 4;
  }
  let rs = (((quad&&quadp)|| levHigh)?1:.1)*strokeWidths[lev];
  //let rs = (((quad&&quadp)|| levHigh)?1:.01)*strokeWidths[lev];
  console.log('lev',lev,'quad',quad,'rs',rs);
  return rs;
}
  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


