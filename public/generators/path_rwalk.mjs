import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_rwalk');
let ht= 100;
let topParams = {width:5*ht,height:5*ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:1}
let numGroups = 2;
let numWalkers = 64;
let groupSize = numWalkers/numGroups;
Object.assign(rs,topParams);

 let initStateByGroup = {};
  //let pspace = {};
  let pspaceByGroup = {};
  let displacements = {};
 let kind = 'random';
rs.addPath = function (n) {
  debugger;
  let grn = Math.floor(n/groupSize);
  let gnm = 'g'+grn;
  let psOfGroup = pspaceByGroup[grn];
  if (!psOfGroup) {
    psOfGroup = {kind,step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
    pspaceByGroup[gnm] = psOfGroup;
    initStateByGroup[gnm] = {pos:Point.mk(0,0),value:Math.PI*2*Math.random()};
  }
  let hht = 0.5*ht;
 // let {walkers} = this;
  //let crc = walkers[n];
  let nm = 'p'+n;
  let swd = 1.8*ht;
  let hswd = 0.5*swd;
 // let color = this.randomColorObject();
  displacements[nm] = Point.mk(Math.random()*swd-hswd,Math.random()*swd-hswd);
 // initStateB[nm] = {pos:Point.mk(Math.random()*swd-hswd,Math.random()*swd-hswd),value:Math.PI*2*Math.random()};
 // pspace[nm] = {kind,step:50,min:ln,max:10000*Math.SQRT2,interval:1,steps:0.5,once:1};
  //pspaceByGroup[gnm] = {kind,step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
}  

rs.addPaths  = function () {
  let {walkers} = this;
  let ln = walkers.length;
  for (let i=0;i<ln;i++) {
    this.addPath(i);
  }
}


//let dropParams = {dropTries:150,maxDrops:20}


rs.updateStateOf = function (n) {
  debugger;
  let {walkers,pstate,displacements} = this;
  let {pspace} = pstate;
  let grn = Math.floor(n/groupSize);
  let gnm = 'g'+grn;
  let inm = 'p'+n;
  let inn = n%groupSize;
  let psOfGroup = pspace[gnm];
  let {cstate}= pstate;
  let nstate = cstate[gnm];
  let pos,npos;
  if (!inn) {
    pos = nstate.pos.copy();
    nstate.lastPos = pos;
    let dir = nstate.value;
    let ln = 1;
    let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(ln);
    npos = vec.plus(pos);
    nstate.pos.copyto(npos);
  } else {
    npos = nstate.pos;
    pos = nstate.lastPos;
  }
  let disp = displacements[inm];
  let dpos = pos.plus(disp);
  let dnpos = npos.plus(disp);
  let tm = cstate.time;
  let w = walkers[n]
  let line=this.lineP.instantiate();
  line.setEnds(dpos,dnpos);
  this.lines.push(line);
  line.update();
  w.moveto(dnpos);
  w.update();
}

rs.updateState = function () {
  let {walkers} = this;
  let ln = walkers.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP['stroke-width'] = 0;
  circleP.stroke = 'blue';
  circleP.dimension =0.015*ht;
   let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .1;
  lineP.stroke = 'red';
}  

rs.callAtCycleEnd = function (nm) {
}

rs.numSteps = 530;
rs.saveAnimation = 0;
rs.initialize = function () {
  debugger;
  this.setBackgroundColor('white');
 //this.setBackgroundColor('black');

  //this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  //this.drops = [];
  let walkers = this.set('walkers',arrayShape.mk());
  let lines = this.set('lines',arrayShape.mk());
  for (let i=0;i<numWalkers;i++) {
   let crc = this.circleP.instantiate();
   walkers.push(crc)
  //this.addPath(ln);
  }
  this.addPaths();
 let pstate = {pspace:pspaceByGroup,cstate:initStateByGroup};
 this.pstate = pstate;
 this.displacements = displacements;
  
}

export {rs};


