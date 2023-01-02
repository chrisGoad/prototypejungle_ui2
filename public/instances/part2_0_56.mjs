
import {rs as basicP} from '/generators/basics.mjs';

import {rs as addPathMethods} from '/mlib/path.mjs';	

import {rs as addFlowMethods} from '/mlib/flows.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
addFlowMethods(rs);
rs.pstate = {pspace:{},cstate:{}};

rs.setName('part2_0_56');
let wd = 1000;
let nr = 4;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStroke:'white',numRows:nr,numCols:nr}
Object.assign(rs,topParams);
let levels = 16;
levels = 6;
import {rs as partp} from '/instances/part2_0_57.mjs';	

let qsr = 0.03;
let qssf = 0.04;
let qmin = 0.2;
let qmax = 0.8;
let qiv = 0.5;



rs.buildGrid = function (proto) {
  let {numRows,numCols,height:ht,width:wd,hht,hwd,parts,deltaX,deltaY} = this;
  // column major order
  debugger;
  let lx = - (0.5*(wd-deltaX));
  let ly = - (0.5*(ht-deltaY));
  for (let i=0;i<numRows;i++) {
    let x = i*deltaX +lx;
    for (let j=0;j<numCols;j++) {
       let y = j*deltaY+ly;
       let p = Point.mk(x,y);
       let parti = proto.instantiate()
       parts.push(parti);
       parti.initialize();
       parti.moveto(p);
    }
  }
}
 
rs.cycles = 2;
rs.initialize = function () {
  let {numRows,width,cycles} = this;
  this.set('parts',arrayShape.mk());
  this.deltaX = width/numRows;
  this.deltaY = width/numRows;
 let numSteps = this.numSteps = cycles * 1* numRows;
  let numFrames = this.numFrames = (cycles+2) *1* numRows;     
  this.buildGrid(partp);
  this.addWpath('L1q0s0',qsr,qssf,qmin,qmax,qiv);
    this.addWpath('L1q0s1',qsr,qssf,qmin,qmax,qiv);
    this.addWpath('L1q0s2',qsr,qssf,qmin,qmax,qiv);
    this.addWpath('L1q0s3',qsr,qssf,qmin,qmax,qiv);
   let L1q0s0t =this.L1q0s0t = [];
   let L1q0s1t =this.L1q0s1t = [];
   let L1q0s2t =this.L1q0s2t = [];
   let L1q0s3t =this.L1q0s3t = [];
   this.pushTrace(L1q0s0t,'L1q0s0',numFrames);
   this.pushTrace(L1q0s1t,'L1q0s1',numFrames);
   this.pushTrace(L1q0s2t,'L1q0s2',numFrames);
   this.pushTrace(L1q0s3t,'L1q0s3',numFrames);

  //let parti = partp.instantiate();
  //this.set('part',parti);
  //parti.initialize();
}

rs.adjustPart = function (va,i,j) {
  let {numRows,parts} = this;

 let idx = i*numRows + j;
 let prt = parts[idx];
  let [L1q0s0,L1q0s1,L1q0s2,L1q0s3] = va;
 let qp =  {Case:3,pcs:[L1q0s0,L1q0s1+1,L1q0s2+2,L1q0s3+3]};
 prt.quadSplitParams = qp;
 prt.resetShapes();
}
 
rs.setFromTraces = function (n) {
  let {L1q0s0t,L1q0s1t,L1q0s2t,L1q0s3t} = this;
  this.setFromTraceArray(n,[L1q0s0t,L1q0s1t,L1q0s2t,L1q0s3t],
                           [this.toLeftCfn,this.toRightCfn,this.downCfn,this.upCfn],
                           this.adjustPart);
  this.draw();
}


rs.updateState = function () {
  let {stepsSoFar:ssf} = this;
  /*let {cFrame,numSteps,wentBack,stepsSoFar:ssf,rt,firstState,pstate,frameDelta} = this;
  let fr = (ssf+frameDelta)%numSteps;
  if (fr === 2) {
    debugger;
  }*/
  this.setFromTraces(ssf);
  
}

rs.updateStatee = function () {
  debugger;
  this.resetShapes();
  draw.zoomStep(1.01);
  return;
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
rs.numSteps = 500;
//rs.recycle = 1;
//rs.numSteps = 300;
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


