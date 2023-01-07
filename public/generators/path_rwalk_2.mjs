import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_rwalk_2');
let ht= 100;
let topParams = {width:2.8*ht,height:2.8*ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:1}
let numGroups = 32;
let numWalkers = 32;
let groupSize = numWalkers/numGroups;
Object.assign(rs,topParams);

 let initState = {};
  //let pspace = {};
  let pspace = {};
  let displacements = {};
 let kind = 'random';
rs.biasBy =1;
rs.addPath = function (n) {
  debugger;
  let grn = Math.floor(n/groupSize);
  let nm = 'p'+n;
 
  pspace[nm] ={kind,step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
    initState[nm] = {pos:Point.mk(0,0),value:0,wrap:1,biasBy:1,biasTowards:0};
 let hdim = .1;
  displacements[nm] = Point.mk(0,-100).plus(Point.mk(Math.random()*2*hdim-hdim,Math.random()*2*hdim-hdim));
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
 
  let nm = 'p'+n;
  let psOfGroup = pspace[nm];
  let {cstate}= pstate;
  let nstate = cstate[nm];
  let npos;
  let pos = nstate.pos;
  if (pos) {
    pos = nstate.pos.copy();
    nstate.lastPos = pos;
    let dir = nstate.value;
    let ln = 2;
    let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(ln);
    npos = vec.plus(pos);
    nstate.pos.copyto(npos);
  } else {
    npos = nstate.pos;
    pos = nstate.lastPos;
  }
  let disp = displacements[nm];
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
  console.log('time',time);
  debugger;
  let ln = walkers.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  //let ta = 0.0025*time*2*Math.PI-Math.PI/2;
  //let ta = 0.0015*time*2*Math.PI-Math.PI/2;
 // let ta = 0.0014*time*2*Math.PI-Math.PI/2;
  let ta = .1+0.0028*time*2*Math.PI-Math.PI/2;
  let trg = Point.mk(Math.cos(ta),Math.sin(ta));
  this.goTowards = trg.times(100);;
  got.moveto(this.goTowards);
  let bbs = 50;
  if (time < bbs) {
    let bfr = time/bbs;
    this.biasBy = 1 - bfr*.4;
  }
  if (time > (numSteps - bbs)) {
    this.biasBy = 1;
  }
  //let lt = 670; //length of trail
  //let lt = 335; //length of trail MOD
  let lt = 357; //length of trail MOD
  let upto;
  if (time > lt) {
    let fr = (time-lt)*ln;
    upto = fr+ln;
    this.hideLines(fr,upto);
  
  //let dt = 720;
  //if (time>dt)
    this.hideLines(upto, upto+Math.floor(((time-lt)/(numSteps-lt))*(numSteps - lt))*ln);;
  }
 //let hcd = 90;
 let hcd = 40;
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

//rs.numSteps = 1430;
rs.numSteps = 715;
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
  //gotc.dimension =10;
  gotc.fill = 'white';
  //gotc.fill = 'transparent';
  this.set('got',gotc);
 let pstate = {pspace:pspace,cstate:initState};
 this.pstate = pstate;
 this.displacements = displacements;
  
}

export {rs};


