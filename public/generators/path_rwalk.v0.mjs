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
let topParams = {width:2.5*ht,height:2.5*ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:1}
let numGroups = 32;
let numWalkers = 32;
let groupSize = numWalkers/numGroups;
Object.assign(rs,topParams);

 let initStateByGroup = {};
  //let pspace = {};
  let pspaceByGroup = {};
  let displacements = {};
 let kind = 'random';
rs.biasBy =1;
rs.addPath = function (n) {
  debugger;
  let grn = Math.floor(n/groupSize);
  let gnm = 'g'+grn;
  let psOfGroup = pspaceByGroup[grn];
  if (!psOfGroup) {
    psOfGroup = {kind,step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
    pspaceByGroup[gnm] = psOfGroup;
    //initStateByGroup[gnm] = {pos:Point.mk(0,0),value:Math.PI*2*Math.random()-Math.PI,wrap:1,biasBy:.7,biasTowards:0};
    //initStateByGroup[gnm] = {pos:Point.mk(0,0),value:0,wrap:1,biasBy:.7,biasTowards:0};
    initStateByGroup[gnm] = {pos:Point.mk(0,0),value:0,wrap:1,biasBy:1,biasTowards:0};
  }
  let hht = 0.5*ht;
 // let {walkers} = this;
  //let crc = walkers[n];
  let nm = 'p'+n;
  let swd = 1.8*ht;
  let hswd = 0.5*swd;
 // let color = this.randomColorObject();
 let hdim = .1;
  displacements[nm] = Point.mk(0,-100).plus(Point.mk(Math.random()*2*hdim-hdim,Math.random()*2*hdim-hdim));
  //displacements[nm] = Point.mk(0,100).pludPoint.mk(Math.random()*swd-hswd,Math.random()*swd-hswd);
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

rs.goTowards = Point.mk(0,0);

rs.updateStateOf = function (n) {
  debugger;
  let {walkers,pstate,displacements,goTowards} = this;
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
  let dnvec = goTowards.difference(dnpos);
  let dnangle = Math.atan2(dnvec.y,dnvec.x);
  nstate.biasTowards = dnangle;
  nstate.biasBy  = this.biasBy;
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
  let {walkers,goTowards,pstate,numSteps,got} = this;
  let {cstate} = pstate;
  let {time} = cstate;
  debugger;
  let ln = walkers.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  //let ta = 0.0025*time*2*Math.PI-Math.PI/2;
  let ta = 0.0018*time*2*Math.PI-Math.PI/2;
  let trg = Point.mk(Math.cos(ta),Math.sin(ta));
  this.goTowards = trg.times(100);;
  got.moveto(this.goTowards);
  let bbs = 40;
  if (time > bbs) {
    this.biasBy =0.5;
  }
  let lt = 360; //length of trail
  let upto;
  if (time > lt) {
    let fr = (time-lt)*ln;
    upto = fr+ln;
    this.hideLines(fr,upto);
  
  //let dt = 720;
  //if (time>dt)
    this.hideLines(upto, upto+Math.floor(((time-lt)/(numSteps-lt))*380)*ln);;
  }
  let hcd = 100;
  let hct = numSteps - hcd;
  
  if (time > hct) {
    let fr = 1 - (time-hct)/hcd;
    console.log('fr',fr);
    for (let j=0;j<ln;j++) {
      let w = walkers[j];
      w.fill = `rgba(255,255,255,${fr})`;
      w.update();
    }
  }
    
    
}
  
 rs.hideLines = function (fr,upto) {
   let {lines} = this;
   let ln=lines.length;
   let ub = Math.min(upto,ln);
   for (let i=fr-2;i<ub;i++) {
    let line = lines[i];
    line.hide();
   }
}

  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.stroke = 'yellow';
  circleP.dimension =0.025*ht;
  //circleP.dimension =0;
   let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'red';
  lineP.stroke = 'white';
}  

rs.callAtCycleEnd = function (nm) {
}

rs.numSteps = 800;
rs.saveAnimation = 0;
rs.initialize = function () {
  debugger;
  this.setBackgroundColor('grey');
 this.setBackgroundColor('black');

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
  let gotc = this.circleP.instantiate();
  gotc.dimension =10;
  gotc.fill = 'red';
  this.set('got',gotc);
 let pstate = {pspace:pspaceByGroup,cstate:initStateByGroup};
 this.pstate = pstate;
 this.displacements = displacements;
  
}

export {rs};


