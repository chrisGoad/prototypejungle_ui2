
import {rs as generatorP} from '/instances/part2_0_41.mjs';

let rs = generatorP.instantiate();

debugger;
rs.setName('part2_0_41c');
let levels = 5;
//levels = 4;
//levels = 4;

rs.theFills10 = {P1:'rgb(0,0,0)',P0:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};
rs.theFills12 = {P0:'rgb(0,0,0)',P1:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.partParams.stroke = 'white';
//rs.altps = [4,6,7,8]; 
rs.quadCases = [7,8]; 
let minStep = 0.02;
let maxStep = 0.08;
let sp = 1.5;
let kind = 'sweep';
debugger;

rs.qcMap = rs.buildWhereMap({},rs.qcRandomVal);

rs.buildPspaceElement = function () {
  let ratio = 0.9;
  //let step = minStep + Math.random()*(maxStep-minStep);
  let step = Math.random()>0.9?maxStep:minStep;
  let vl =
  //{ eps0:{kind,step,min:this.minEps,max:this.maxEps,interval:1,steps:0.5},
  { eps0:{kind,step,min:this.mineps,max:this.maxeps,interval:1,steps:0.5},
    eps1:{kind:kind,step:ratio*step,min:this.mineps,max:this.maxeps,interval:1,steps:0.5}
  }
  return vl;
}


rs.buildInitElement = function () {
  let vl =
  { eps0:{value:0},
    eps1:{value:0}
  }
  return vl;
}
let pspace = rs.buildWhereMap({},rs.buildPspaceElement,true);
let cstate = rs.buildWhereMap({},rs.buildInitElement,true);
rs.pstate = {pspace,cstate};
debugger;


//rs.qcMap = rs.buildWhereMap({},rs.qcRandomVal);

rs.partSplitParams = function (prt) {
 // debugger;
  let levels = this.partParams.levels;
  let where = prt.where;
  let ws = this.whereString(where);
  let lev = where.length;
  let idx = ws?this.qcMap[ws]:4;
  let eps0nm = ws+'_eps0';
  let eps1nm = ws+'_eps1';
  let {cstate} = this.pstate;
  let eps0 = cstate[eps0nm];
  let eps1 = cstate[eps1nm];
  let qp;
  if (lev < (levels-1)) {
    qp = {Case:7,pcs:[0.5,1.5,2.5,3.5]}
  } else {
    qp = this.mkCase(idx,eps0.value,eps1.value);
  }
  
   return qp;
}
//rs.setAltps();
rs.numSteps = 300;
rs.saveAnimation = 1;

export {rs};