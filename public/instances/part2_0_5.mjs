
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_5');
let levels = 10;
//levels = 9;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;
rs.quadSplitParams = {Case:1,vertexNum:3,fr0:0.52,fr1:0.5};
//rs.quadSplitParams = {Case:2,vertexNum:1,fr0:0.48,fr1:0.48};
rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.triSplitParams = {Case:1,vertexNum:0,pcs:[0.3,1.3]};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let rs = (ln === 3)?this.triSplitParams:this.quadSplitParams
  //let rs = (ln === 3)?null:this.quadSplitParams
  let lev = prt.where.length;
 //rs. vertexNum = lev%2; 
  return rs;
}

rs.partFill = function (prt) {
  let ln = prt.polygon.corners.length;
  let lev = prt.where.length;
  let rs;
  if ((lev>(levels-2))&&(ln === 4 )) {
    let v = Math.floor(Math.random()*250);
   // rs = Math.random()<0.5?'rgb(0,0,250)':'rgb(250,0,0)';
    rs = Math.random()<0.5?`rgb(0,0,${v})`:`rgb(${v},0,0)`;
    console.log('fill',rs);
  }
  
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
rs.computeExponentials({dest:strokeWidths,n:20,root:0.34,factor:.9});
rs.partStrokeWidth = function (prt) {
  let quadp = 1;
  let lev = prt.where.length;
  //let levHigh = lev > 7;
  let levHigh = lev > 70;
  let pln = prt.polygon.corners.length;
  let quad = pln === 4;
  let prnt = prt.parent;
  if (prnt) {
  //  debugger;
    let  pln = prnt.polygon.corners.length;
    quadp = pln === 4;
  }
  //let rs = (((quad&&quadp)|| levHigh)?1:.1)*strokeWidths[lev];
  let rs = (((quad&&quadp)|| levHigh)?1:.01)*strokeWidths[lev];
  console.log('lev',lev,'quad',quad,'rs',rs);
  return rs;
}
  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


