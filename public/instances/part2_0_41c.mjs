
import {rs as generatorP} from '/instances/part2_0_41.mjs';

let rs = generatorP.instantiate();

debugger;
rs.setName('part2_0_41a');
let levels = 5;
//levels = 4;
levels = 2;

rs.theFills10 = {P1:'rgb(0,0,0)',P0:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};
rs.theFills12 = {P0:'rgb(0,0,0)',P1:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.partParams.stroke = 'white';
//rs.altps = [4,6,7,8]; 
rs.quadCases = [7,8,9]; 
let minStep = 0.02;
let maxStep = 0.04;
let sp = 1.5;
let kind = 'sweep';
debugger;
speedup:{kind,step:.05,min:1,max:2,interval:1,steps:0.5}

rs.buildPspaceElement = function () {
  {kind,step:.05,min:1,max:2,interval:1,steps:0.5};
}
let pspace = rs.buildWhereMap({},rs.buildPspaceElement);
let pspace0 = {};

rs.pspace = pspace;
rs.qcMap = rs.buildWhereMap({},rs.qcRandomVal);

rs.partSplitParams = function (prt) {
  let {polygon:pgon} = prt;
  let levels = this.partParams.levels;
  let where = prt.where;
  let ws = this.whereString(where);
  let lev = where.length;
  let idx = ws?this.qcMap[ws]:4;
  let qp;
  if (lev < (levels-1)) {
    qp = {Case:7,pcs:[0.5,1.5,2.5,3.5]}
  } else {
    qp = mkCase(idx,this.eps0,this.eps1);
  }
  
   return qp;
}
//rs.setAltps();
rs.numSteps = 300;
rs.saveAnimation = 1;

export {rs};