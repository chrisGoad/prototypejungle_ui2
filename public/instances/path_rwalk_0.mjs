import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_rwalk');
rs.ht= 100;
let topParams = {width:2.8*rs.ht,height:2.8*rs.ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:1}
rs.numWalkers = 2;
Object.assign(rs,topParams);

 let initState = {time:0};
  let pspace = {};
 
rs.addPath = function (n) {
  debugger;
  let nm = 'dir'+n;
  pspace[nm] ={kind:'random',step:.1*Math.PI,min:-Math.PI,max:Math.PI,interval:1,steps:0.5,once:1};
    initState[nm] = {pos:Point.mk(0,0),value:0,wrap:1,biasBy:1,biasTowards:0};
  let rnm = 'rw'+n;
  pspace[rnm] = {kind:'randomWalk',directionComponent:nm};
   let hdim = .1;
  initState[rnm] = {stepLength:2,pos:Point.mk(0,-100).plus(Point.mk(Math.random()*2*hdim-hdim,Math.random()*2*hdim-hdim))};
}  

rs.addPaths  = function () {
  let {walkers} = this;
  let ln = walkers.length;
  for (let i=0;i<ln;i++) {
    this.addPath(i);
  }
}

rs.goTowards = Point.mk(0,0);

rs.updateStateOf = function (n){
  debugger;
  let {walkers,pstate,displacements,goTowards} = this;
  let {pspace} = pstate;
  let nm = 'rw'+n;
  let {cstate}= pstate;
  let nstate = cstate[nm];
  let npos;
  let pos = nstate.pos;
  let w = walkers[n]
  w.moveto(pos);
  nstate.goTowards = this.computeGoTowards(nm);
  nstate.biasBy = this.computeBiasBy(nm);
  let lastPos = nstate.lastPos;
  if (lastPos) {
    let line=this.lineP.instantiate();
    line.setEnds(lastPos,pos);
    this.lines.push(line);
    line.update();
  }
}

rs.computeGoTowards = function (component) {
  let {pstate} = this;
  let {cstate} = pstate;
  let {time} = cstate;
   let ta = .1+0.0028*time*2*Math.PI-Math.PI/2;
  let trg = Point.mk(Math.cos(ta),Math.sin(ta));
  return trg.times(100);
}


rs.computeBiasBy = function (component) {
  let {pstate,numSteps} = this;
  let {cstate} = pstate;
  let {time} = cstate;
  let bbs = 50;
  let minbb = .6;
  if (time < bbs) {
    let bfr = time/bbs;
    return 1 - bfr*(1 - minbb);
  }
  if (time > (numSteps - bbs)) {
    return 1;
  }
  return minbb;
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
  got.moveto(this.computeGoTowards());
  let lt = 357; //length of trail MOD
  let upto;
  if (time > lt) {
    let fr = (time-lt)*ln;
    upto = fr+ln;
    this.hideLines(fr,upto);
    this.hideLines(upto, upto+Math.floor(((time-lt)/(numSteps-lt))*(numSteps - lt))*ln);;
  }
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
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.025*this.ht;
   let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'red';
  lineP.stroke = 'white';
}  


rs.numSteps = 715;
rs.saveAnimation = 0;
rs.initialize = function () {
  debugger;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let walkers = this.set('walkers',arrayShape.mk());
  let lines = this.set('lines',arrayShape.mk());
  for (let i=0;i<this.numWalkers;i++) {
   let crc = this.circleP.instantiate();
   walkers.push(crc)
  }
  this.addPaths();
  let gotc = this.circleP.instantiate();
  gotc.fill = 'white';
  this.set('got',gotc);
 let pstate = {pspace:pspace,cstate:initState};
 this.pstate = pstate;
  
}

export {rs};


