
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_53');

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
let numCircles = 3;

let pspace = {};
let initState = {};
const addPath = function (n,cnm) {
  let nm = cnm+n;
  let snm = 's_'+cnm;
  let d = 6;
  pspace[snm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[snm] = {value:0};
 initState[nm] = {value:50 + Math.floor(Math.random()*(rng-50))};
 if (n%1) {
   pspace[nm] = {kind:'randomWalkScalar',subComponent:snm,min:50,max:rng};
  } else {
    pspace[nm] = {kind:'randomSteps',step:3,min:50,max:rng,interval:1,steps:0.5};
 }
}

const addPaths = function (n) {
  for (let i=0;i<n;i++) {
    addPath(i,'r');
    addPath(i,'g');
    addPath(i,'b');
  }
}

addPaths(numCircles);
/*
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
*/
let pstate = {pspace,cstate:initState};
rs.pstate = pstate;
rs.copyOfInitState = rs.deepCopy(initState);

let nineCs = nr === 9;
rs.numISteps = 40;
rs.numISteps = 5;
rs.numISteps = 40;
rs.numSteps = 1000;
//rs.numSteps = 80;
//rs.ssf = 0;
rs.saveAnimation = 0;
rs.getFill = function(n) {
  let {pstate} = this;
  let cstate = pstate.cstate;
  let r = cstate['r'+n].value;
  let g = cstate['g'+n].value;
  let b = cstate['b'+n].value;
  let fill = `rgb(${r},${g},${b})`;
  return fill;
}

rs.updateState = function () {
  let {pstate,circles} = this;
  let cstate = pstate.cstate;
  for (let i=0;i<numCircles;i++) {
    let circ = circles[i];
    let fill = this.getFill(i);
    circ.fill = fill;
    circ.update();
  }
  
}

  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 20;
  circleP['stroke-width'] = 0;
}
rs.initialize = function () {
  debugger;
  this.addFrame();
  this.initProtos();
  let circles = this.set('circles',arrayShape.mk());
 for (let i=0;i<numCircles;i++) {
    circles.push(this.circleP.instantiate());
  }
  circles[0].moveto(Point.mk(-dist,0));
  circles[2].moveto(Point.mk(dist,0));
//  crc.update();
 // draw.refresh();
  
}


//rs.addToArray(strokeWidths,.1,levels);
export {rs};


