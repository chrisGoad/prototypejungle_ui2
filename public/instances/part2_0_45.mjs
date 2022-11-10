
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_45');
let levels = 4;
let topLevels = levels;
let introSteps = -1;
let kind = 'sweep';
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
levels++;
let initState = {sw:{value:0}};
//initState = {speedup:{value:1}}
let step = 0.1;
let pspace = {
  sw:{kind,step:step,min:1,max:topLevels,interval:1,steps:0.5},
};

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
  let eps = ssf>=introSteps?0.4*(ssf/ns):0.6*0.5;
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
rs.computeExponentials({dest:strokeWidths,n:20,root:0.5,factor:.7});
let startToFade = 100;
rs.numSteps = 250;

rs.partStrokeWidthw = function (prt) {
  debugger;
  let {cstate} = this.pstate;
  let {sw} =cstate;
  let ssf = this.stepsSoFar;
  let saf = ssf - startToFade;
  
  let ns = this.numSteps;
  let stg = ns-ssf;
  let clevs,clevsr,stepsPerLevel,inLev;
  let lev = prt.where.length;
  let fr = 0;
  if (saf >= 0) {
     
    stepsPerLevel = Math.floor((ns-startToFade)/topLevels);
    clevsr = saf/stepsPerLevel;
    clevs = Math.floor(clevsr);
    inLev = clevsr-clevs;
    if (lev === (topLevels - clevs)) {
      fr = inLev;///stepsPerLevel;
    }
    if (lev === 0) {
      console.log('spl',stepsPerLevel,'saf',saf,'clevs',clevs,'inLev',inLev,'fr',fr);
    }
    if (lev > (topLevels - clevs)) {
      return 0;
    }
    
 } 
 // debugger;
  if (lev <2) {
    fr =0;
  }
  let quadp = 1;
  let levHigh = lev > 6;
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
  //console.log('lev',lev,'quad',quad,'swvfr',swvfr,'rs',rs);
  }
  return (1-fr)*rs;
}

rs.updateState = function () {
 debugger;
 

  this.resetShapes();
}

rs.saveAnimation = 1;
rs.chopOffBeginning = 10; // in steps
rs.chopOffBeginning = 140; // in steps
rs.chopOffBeginning = 0; // in steps
rs.chopOffEnd = 0; // in steps

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


