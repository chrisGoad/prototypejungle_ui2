
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_32');

let dim = 40;
let dist = 60;
let wd = 1.8 * (dim + dist);
let topParams = {width:wd,height:60,framePadding:0.1*wd,frameStrokee:'white'};
Object.assign(rs,topParams);

let iv = 254;
let rng = 255;
let kind ='randomSteps';
//let kind ='sweep';
let nr = 9;
//let nr = 1;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    let nm = ('c'+i);
//    initS[nm] = {value:iv};
    initS[nm] = {value:50 + Math.floor(Math.random()*(rng-50))};
    ps[nm] = {kind,step:3,min:50,max:rng,interval:1,steps:0.5};
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
let pstate = {pspace,cstate:initState};
rs.pstate = pstate;
rs.copyOfInitState = rs.deepCopy(initState);

let nineCs = nr === 9;
rs.numISteps = 40;
rs.numISteps = 5;
rs.numISteps = 40;
rs.numSteps = 1000;
rs.numSteps = 80;
//rs.ssf = 0;
rs.saveAnimation = 1;

rs.updateState = function () {
  let cstate = pstate.cstate;
  let r0 = cstate.c0.value;
  let fill0,fill1,fill2;
  if (nineCs) {
    let g0 = cstate.c1.value;
    let b0 = cstate.c2.value;
    let r1 = cstate.c3.value;
    let g1 = cstate.c4.value;
    let b1= cstate.c5.value;
     let r2 = cstate.c6.value;
    let g2 = cstate.c7.value;
    let b2= cstate.c8.value;
    fill0 =`rgb(${r0},${r0},${b0})`;
    fill1 =`rgb(${r1},${g1},${b1})`;
    fill2 =`rgb(${r2},${b2},${b2})`;
  } else {
    fill0 =`rgb(${r0},${r0},${r0})`;
  }
  let c0 = this.circle0;
  c0.fill = fill0;
  c0.update();
  if (nineCs) {
    let c1 = this.circle1;
    c1.fill = fill1;
    c1.update();
    let c2 = this.circle2;
    c2.fill = fill2;
    c2.update();
  }
  draw.refresh();
//   this.timeStep(pstate);

}
rs.oneStepp = function () {
//  debugger;
  console.log('steps',this.ssf++);
  this.stepCount++;
//  if (rs.ssf>2000) {
 // if (rs.ssf>200000) {
  if  (this.ssf> this.numSteps) {
    debugger;
    if (this.numISteps) {
      this.iStepsSoFar = 0;
      this.interpFrom = this.deepCopy(this.pstate.cstate);
      this.interpTo = this.copyOfInitState;
      this.oneInterpolationStep();
    }
    return;
  }
  this.updateState();
  if (this.saveAnimation) { // for some reason, the first frame is corrupted 
    draw.saveFrame(this.ssf);
  }
 setTimeout(() => this.oneStep(),40)
}

rs.initialize = function () {
  debugger;
  this.addFrame();
  this.circleP = circlePP.instantiate();
  let crc0 = this.circleP.instantiate();
  let crc1 = this.circleP.instantiate();
  let crc2 = this.circleP.instantiate();
  crc0.dimension = dim;
  crc1.dimension = dim;
  crc2.dimension = dim;
  crc0.fill = 'white';//Math.random()<0.5?'blue':'blue';
  crc1.fill = 'white';//Math.random()<0.5?'blue':'blue';
  crc2.fill = 'white';//Math.random()<0.5?'blue':'blue';
  this.set('circle0',crc0);
  this.set('circle1',crc1);
  this.set('circle2',crc2);
  crc0.moveto(Point.mk(-dist,0));
  crc2.moveto(Point.mk(dist,0));
//  crc.update();
 // draw.refresh();
  
}


//rs.addToArray(strokeWidths,.1,levels);
export {rs};


