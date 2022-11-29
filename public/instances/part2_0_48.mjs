
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_48');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
//topLevels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};
const addPath = function (kind,n) {
  let snm = kind+'pcsub'+n;
  let nm = kind+'pc'+n;
  let d = 0.01;
  pspace[snm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[snm] = {value:0};
  pspace[nm] = {kind:'randomWalkScalar',subComponent:snm,min:-.4,max:.4};
  initState[nm] = {value:0};
};

for (let i=0;i<4;i++) {
  addPath('q',i);
}

for (let i=0;i<2;i++) {
  addPath('t',i);
}

rs.numSteps = 1000;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.triSplitParams = {Case:1,vertexNum:0,pcs:[0.3,1.3]};
rs.triSplitParams = null;
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  if (ln === 4) {
 //   debugger;
  }
  let {pstate} = this;
  let {cstate} = pstate;
  let qpc0 = cstate.qpc0.value;
  let qpc1 = cstate.qpc1?cstate.qpc1.value:qpc0;
  let qpc2 = cstate.qpc2?cstate.qpc2.value:qpc0;
  let qpc3 = cstate.qpc3?cstate.qpc3.value:qpc0;
  //console.log('qpcs',qpc0,qpc1,qpc2,qpc3);
  let qp = {Case:3,pcs:[0.5+qpc0,1.5+qpc1,2.5+qpc2,3.5+qpc3]};
  let tpc0 = cstate.tpc0.value;
  let tpc1 = cstate.tpc1.value;
  let tp = {Case:1,pcs:[0.5+tpc0,1.5+tpc1]};

  //let qp = {Case:3,pcs:[0.5+qpc0,1.5+qpc0,2.5+qpc0,3.5+qpc0]};
  let rs = (ln === 3)?tp:qp;
  //let lev = prt.where.length;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

rs.updateStatee= function () {
 debugger;
  let ssf = this.stepsSoFar;
  let pastIntro = ssf >= introSteps;

  let ns = this.numSteps;
  let hns = 0.5*ns;
  let fr = ssf<hns?ssf/hns:1-(ssf-hns)/hns;
  levelsToShow = pastIntro? Math.floor(1 + (levels-1)*fr):levels;
  console.log('levels',levels);
  this.partParams.levels = levels;

  this.resetShapes();
}

rs.saveAnimation = 0;


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


