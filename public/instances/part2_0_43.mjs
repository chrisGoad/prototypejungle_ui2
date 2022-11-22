
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_43');
let levels = 16;
let topLevels = 9;
rs.frameStrokee = 'white';
rs.framePadding = .05*rs.width;
let kind = 'sweep';
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;
//let initState = {sw:{value:-.4},pc0:{value:-.5},pc1:{value:-.5},pc2:{value:-.5},pc3:{value:-.5}};
let initState = {sw:{value:0},pc0:{value:0},pc1:{value:0},pc2:{value:0},pc3:{value:0}};
//initState = {speedup:{value:1}}
let step = 0.05;
let minpc = -.5;
let maxpc = .5;
let baseStep = 0.01;
let step0 = 1.0;
/*let step1 = 1.1;
let step2 = 1.2;
let step3 = 1.3;*/
let step1 =1.0;
let step2 =1.0;
let step3 =1.0;
let bounce  = 0;
let sinusoidal = 0;
let pspace = {
  sw:{kind,step:step,min:1,max:topLevels,interval:1,steps:0.5},
  pc0:{kind,step:step0*baseStep,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
  pc1:{kind,step:step1*baseStep,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
  pc2:{kind,step:step2*baseStep,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
  pc3:{kind,step:step3*baseStep,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
};

rs.numSteps = 200;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.triSplitParams = {Case:1,vertexNum:0,pcs:[0.3,1.3]};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let {pstate} = this;
  let {cstate} = pstate;
  let eps0 = cstate.pc0.value;
  let eps1 = cstate.pc1.value;
  let eps2 = cstate.pc2.value;
  let eps3 = cstate.pc3.value;
  let qp = {Case:3,pcs:[0.5+eps0,1.5+eps1,2.5+eps3,3.5+eps3]};
 // let rs = (ln === 3)?this.triSplitParams:qp;
  let rs = (ln === 3)?null:qp;
  //let lev = prt.where.length;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.8});
rs.partStrokeWidth = function (prt) {
  let {cstate} = this.pstate;
  let {sw} =cstate;
  let swv= sw.value;
  let quadp = 1;
  let lev = prt.where.length;
 /*if (lev >= swv) {
    return 0;
  }
  let swvi = Math.floor(swv);
  let swvfr = Math.min(swv - lev,1);
  if (lev >= swvi+1) {
    return 0;
   }*/
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

rs.updateStatee = function () {
  debugger;
  let ssf = this.stepsSoFar;
  let ns = this.numSteps;
  let hns = 0.5*ns;
  let fr = ssf<hns?ssf/hns:1-(ssf-hns)/hns;
  levels = Math.floor(1 + (topLevels-1)*fr);
  console.log('levels',levels);
  this.partParams.levels = levels;

  this.resetShapes();
}

rs.saveAnimation = 1;
rs.chopOffBeginning = 1;
 rs.stepInterval = 40;
let ist=rs.numISteps = 0;

rs.numSteps = 101-ist;
//rs.numSteps = 2000;
rs.recycle = 1;
//rs.numSteps = 300;
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


