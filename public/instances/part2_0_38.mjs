
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_38');
let levels = 8;
levels = 2;
debugger;
/*const  buildStatePs = function (n,m) {
  let st = {};
  for (let i = 0;i<n;i++) {
    for (let j = 0;j<n;j++) {
      let nm = ('a'+i)+j;
         st[nm] = {value:0};
 */     
let kind = 'randomSteps';
//let initState = {rd:{value:0},dir:{value:0}};
const randomRGB = () => {
  return Math.floor(Math.random()*255);
}
function addComponent(st,ps,n) {
  ps['dir'+n] = {kind,step:.015,min:0,max:2*Math.PI,interval:1,steps:0.5};
  ps['rd'+n] = {kind,step:.001,min:0,max:0.051,interval:1,steps:0.5};
  ps['rd'+n] = {kind,step:.01,min:0,max:0.4,interval:1,steps:0.5};
 st['dir'+n] = {value:0};
 // st['dir'+n] = {value:randomRGB()};
 st['rd'+n] = {value:0};
 // st['rd'+n] = {value:randomRGB()};
}
rs.addFillComponent = function (st,ps,ws) {
  ps[ws] = {kind,step:1,min:0,max:255,interval:1,steps:0.5};
  st[ws] = {value:randomRGB()};
}

//let aws = rs.allWhereStrings(levels,4);
let aws = rs.allWheres(levels,4);
console.log('aws',aws);
debugger;
let initState = {};
let pspace = {};
debugger;
aws.forEach((w) => w[0].length?rs.addFillComponent(initState,pspace,w[0]):0);
addComponent(initState,pspace,0);
addComponent(initState,pspace,1);
addComponent(initState,pspace,2);

//let pspace = {dir:{kind,step:.015,min:0,max:2*Math.PI,interval:1,steps:0.5},rd:{kind,step:.013,min:0,max:0.5,interval:1,steps:0.5}};
rs.pstate = {pspace,cstate:initState};
//pstate = {pspace,cstate:initState};

rs.copyOfInitState = rs.deepCopy(initState);
//let copyInit = rs.deepCopy(initState);
  
rs.partSplitParams = function (qd) {
  //debugger;
  let lev = qd.where.length;
  let {cstate} = this.pstate;
  
  let radius = cstate['rd'+lev].value;
  let direction = cstate['dir'+lev].value;
  
   return {Case:9,direction,radius,pcs:[.5,1.5,2.5,3.5]};
}
  
//rs.timeSteps(pstate,30,doWhat);


rs.partParams.levels = levels;
rs.partParams.rectangular = 1;




let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'white',20);
rs.computeExponentials({dest:strokeWidths,n:20,root:0,factor:.7});

/*
rs.oneStep = function () {
  debugger;
  this.resetShapes();
    this.timeStep(pstate);
 setTimeout(() => this.oneStep(),40)
}*/

/*

rs.stepsSoFar = 0;
rs.numSteps = 150;
rs.saveAnimation = 0;
rs.iStepsSoFar = 0;
rs.numISteps = 20;
rs.interpFrom;
rs.interpTo;
rs.stepInterval = 40;
rs.oneInterpolationStep = function () {
  let i = this.iStepsSoFar;
  this.iStepsSoFar++;
  this.resetShapes();
  this.pstate.cstate = this.interpolateStates(this.interpFrom,this.interpTo,i/this.numISteps);
  if (this.saveAnimation) {
    draw.saveFrame(this.numSteps+this.iStepsSoFar-2);
  }
  if (i < this.numISteps) {
     setTimeout(() => this.oneInterpolationStep(),this.stepInterval);
  }

}
rs.oneStep = function () {
  let ns = this.stepsSoFar;
  if (this.stepsSoFar++ > this.numSteps) {
    this.iStepsSoFar = 0;
    this.interpFrom = this.pstate.cstate;
    this.interpTo = this.copyOfInitState;
    this.oneInterpolationStep();
    return;
  }
  if (ns&&this.saveAnimation) { // for some reason, the first frame is corrupted 
    draw.saveFrame(ns-1);
  }
  this.resetShapes();
  this.timeStep(this.pstate);
 setTimeout(() => this.oneStep(),this.stepInterval)
}


*/
rs.numSteps = 150;
rs.numISteps = 20;
rs.afterInitialize = function () {
 debugger;
 this.oneStep();
}

rs.afterDisplayCelll = function (prt) {
  console.log('CSF',csf);
  let crc = this.circleP.instantiate();
  let pgon =  prt.polygon;
  let dim = pgon.minDimension();
  crc.dimension = csf*dim;
  crc.dimension = 0.2*dim;
  crc.fill = 'black';//Math.random()<0.5?'blue':'blue';
  this.shapes.push(crc);
  let cnt = pgon.center();
  crc.moveto(cnt);
}

rs.partFill = function (prt) {
//debugger;
  let ws = this.whereString(prt.where);
  let vc = this.pstate.cstate[ws];
  if (vc) {
    let v = vc.value;
    console.log('ws',ws,'v',v);
    let fill = `rgb(${v},${v},100)`;
    return fill;
  }
}
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


