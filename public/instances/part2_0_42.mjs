
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_42');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
//topLevels = 6;
let introSteps = -2;
let kind = 'sweep';
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;
let initState = {sw:{value:0}};
//initState = {speedup:{value:1}}
let step = 0.05;
let pspace = {
  sw:{kind,step:step,min:1,max:levels,interval:1,steps:0.5,bounce:1},
};

rs.numSteps = 2*Math.floor(levels/step);
rs.numSteps = 1000;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.triSplitParams = {Case:1,vertexNum:0,pcs:[0.3,1.3]};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let ssf = this.stepsSoFar;
  let ns = this.numSteps;
  let hns = 0.5*ns;
  let lev = prt.where.length;
 // let eps = ssf<hns ?0.2*(ssf/hns):0.2*(1-(ssf-hns)/hns);
  let eps = ssf>=introSteps?0.3*(ssf/ns):0.3*0.5;
  if (lev === 1) {
    console.log('eps',eps);
  }
  let qp = {Case:3,pcs:[0.5-eps,1.5-eps,2.5+eps,3.5-eps]};
  let rs = (ln === 3)?this.triSplitParams:qp;
  //let lev = prt.where.length;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
rs.partStrokeWidth = function (prt) {
 //return .05;
 debugger;
  let {cstate} = this.pstate;
  let {sw} =cstate;
  let ssf = this.stepsSoFar;
  let pastIntro = ssf >= introSteps;
 // debugger;
  let swv= sw.value;
  let quadp = 1;
  let lev = prt.where.length;
  if (pastIntro && (lev >= swv)) {
    return 0;
  }
  let swvi = Math.floor(swv);
  let swvfr = Math.min(swv - lev,1);
  if (pastIntro && (lev >= swvi+1)) {
    return 0;
   }
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
 	if (lev === 1) {
    console.log('lev',lev,'quad',quad,'swvfr',swvfr,'rs',rs);
  }
  return pastIntro?swvfr * rs:rs;
}

rs.updateState = function () {
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

rs.saveAnimation = 1;
rs.chopOffBeginning = 10; // in steps
rs.chopOffBeginning = 140; // in steps
rs.chopOffBeginning = 10; // in steps
rs.chopOffEnd = 18; // in steps

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


