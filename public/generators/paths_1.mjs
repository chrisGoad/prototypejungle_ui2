import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('paths_1');
let initState = {};
let pspace = {};
rs.pstate = {pspace,cstate:initState};
rs.step = 5;


let ht= 100;
let hht = 0.5*ht;
rs.wb = 1; // white background
rs.clockwise = 0;
let ff = 2;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.1*ht,frameStroke:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);

let step = 1;
rs.addPath = function (nm,frm,tO,lln,lineP) {
   debugger;
   let {pstate,lines} = this;
  let {cstate,pspace} = pstate;
  let vec = tO.difference(frm);
  let dst = vec.length();
  let nvec = vec.times(1/dst);
  initState[nm] = {value:0};
  let line =  lineP.instantiate();
  let hln = 0.5*lln;
  line.setEnds(Point.mk(0,0),nvec.times(lln));
  lines.push(line);
  pspace[nm] = {kind:'sweep',step:step,min:0,max:dst,once:1,frm,nvec,line};
}

rs.updateStateOf = function (nm) {
  let {pstate} = this;
  let {cstate,pspace} = pstate;
  let d = cstate[nm].value;
  let ps = pspace[nm];
  let {frm,line,nvec} = ps;
  let pos = frm.plus(nvec.times(d));
  line.moveto(pos);
  line.update();
}


rs.updateState = function (nm) {
  let {pstate,stepsSoFar:ssf} = this;
  if (ssf%30===3) {
    for (let i=0;i<20;i++) {
      this.addHpath('ha'+ssf+'_'+i,i*4);
    }
     for (let i=0;i<20;i++) {
      this.addVpath('va'+ssf+'_'+i,i*4);
    }
  }
  let {cstate,pspace} = pstate;
  let pnms = Object.getOwnPropertyNames(pspace);
  if (ssf === 32) {
    debugger;
  }
  pnms.forEach((nm) => {
    this.updateStateOf(nm);
  });
}
    
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 1;
  circleP['stroke-width'] = 0;
  
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
}  


rs.addHpath = function (nm,y) {
  let scl = 0.8;
  this.addPath(nm,Point.mk(-scl*hht,y),Point.mk(scl*hht,y),40,this.lineP);
}

rs.addVpath = function (nm,x) {
  let scl = 0.8;
  this.addPath(nm,Point.mk(x,-scl*hht),Point.mk(x,scl*hht),40,this.lineP);
}
rs.initialize = function () {
  debugger;
  this.initProtos();
  this.addFrame();
  let lines = this.set('lines',arrayShape.mk());
  let scl = 0.8;
  //this.addPath('a',Point.mk(-scl*hht,0),Point.mk(scl*hht,0),10,this.lineP);
  for (let i=0;i<0;i++) {
    this.addHpath('h'+i,i*4);
  }
   //this.addPath('a',Point.mk(-scl*hht,0),Point.mk(scl*hht,0),10,this.lineP);
  for (let i=0;i<0;i++) {
    this.addVpath('v'+i,i*4);
  }
  this.callIfDefined('afterInitialize');
  
}


rs.saveAnimation = 0;
rs.numSteps = 1263;
rs.numSteps = 626;
export {rs}