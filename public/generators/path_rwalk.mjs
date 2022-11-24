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
Object.assign(rs,topParams);

 let initState = {};
  let pspace = {};
 let kind = 'random';
rs.addPath = function (n) {
  let hht = 0.5*ht;
  let {walkers} = this;
  let crc = walkers[n];
  let nm = 'p'+n;
  let swd = 0.2*ht;
  let hswd = 0.5*swd;
 // let color = this.randomColorObject();
  initState[nm] = {pos:Point.mk(Math.random()*swd-hswd,Math.random()*swd-hswd),value:Math.PI*2*Math.random()};
 // pspace[nm] = {kind,step:50,min:ln,max:10000*Math.SQRT2,interval:1,steps:0.5,once:1};
  pspace[nm] = {kind,step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
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
  let {walkers,pstate} = this;
  let cstate = pstate.cstate;
  debugger;
  let tm = cstate.time;
  let w = walkers[n]
  let nm = 'p'+n;
  let nstate = cstate[nm];
  let {pos,value:dir} = nstate;
  console.log('dir',dir);
   let ln = 1;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(ln);
  let npos = vec.plus(pos);
  let line=this.lineP.instantiate();
  line.setEnds(pos,npos);
  this.lines.push(line);
  line.update();
  nstate.pos.copyto(npos);
  w.moveto(npos);
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
  circleP.stroke = 'black';
  circleP.dimension =0.005*ht;
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
  for (let i=0;i<100;i++) {
   let crc = this.circleP.instantiate();
   walkers.push(crc)
  //this.addPath(ln);
  }
  this.addPaths();
 let pstate = {pspace,cstate:initState};
 this.pstate = pstate;
  
}

export {rs};


