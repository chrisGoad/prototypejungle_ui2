
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_1');
let levels = 10;
levels = 2;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

rs.quadSplitParams = {Case:3,vertexNum:0,fr0:0.4,fr1:0.4,fr2:.6,fr3:0.4};
rs.triSplitParams = {Case:1,vertexNum:0,fr0:0.3,fr1:0.3};
//rs.triSplitParams = {Case:2,vertexNum:0,fr0:0.3,fr1:0.3};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let rs = (ln === 3)?this.triSplitParams:this.quadSplitParams
  //let rs = (ln === 3)?null:this.quadSplitParams
  let lev = prt.where.length;
 //rs. vertexNum = lev%2; 
  return rs;
}

//let visibles = rs.partParams.visibles = [0,0,0,1,0,0,0];
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);
//rs.addToArray(visibles,1,levels);
//let lengthenings = rs.lengthenings = [];
//s.addToArray(lengthenings,.5,levels);
//let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
//rs.addToArray(twists,0.05*Math.PI,levels);
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
rs.computeExponentials(strokeWidths,20,0.4,.7);
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


