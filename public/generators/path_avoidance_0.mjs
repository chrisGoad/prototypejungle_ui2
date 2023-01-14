import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_0');
let ht = rs.ht= 100;
let topParams = {width:rs.ht,height:rs.ht,framePadding:.1*ht,frameStroke:'white',frameStrokeWidth:1}

Object.assign(rs,topParams);
rs.numH = 1;
rs.numV = 1;
 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let stepH = 1;
let stepV = 1;
let minH = -0.5*ht;
let maxH = 0.5*ht;
let minV = -0.5*ht;
let maxV = 0.5*ht;
let yDelta =10;
let yMin = -0.5*ht;

rs.addHpath = function (n) {
  debugger;
  let nm = 'h'+n;
  pspace[nm] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm] = {value:minH,y:0};
}


rs.addVpath = function (n) {
  debugger;
  let nm = 'v'+n;
  pspace[nm] ={kind:'sweep',step:stepV,min:minV,max:maxV,interval:1,once:1};
  initState[nm] = {value:minV,y:0};
}    

rs.addPaths  = function () {
  let {numH} = this;
  for (let i=0;i<numH;i++) {
    this.addHpath(i);
  }
  for (let i=0;i<numH;i++) {
    this.addVpath(i);
  }
}


rs.updateStateOfH= function (n){
  debugger;
  let nm = 'h'+n
  let {hTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let pos = Point.mk(cs.value,cs.y);
  let tr = hTravelers[n]
  tr.moveto(pos);
  tr.update();
}

rs.updateStateOfV= function (nn){
  debugger;
  let gap = 5;
  let nt = 2*nn;
  let nb = 2*nn+1;
  let nm = 'v'+nn;
  let {vTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let ps = pspace[nm]
  let {value:v} = cs;
  let topy = ps.min;
  let boty = ps.max;
  let trht = v-topy-gap;
  let brht = boty -v -gap;
  let ttry = topy + 0.5*trht;
  let btry = boty - 0.5*brht;
  let ttrpos = Point.mk(0,ttry);
  let btrpos = Point.mk(0,btry);
  
  let ttr = vTravelers[nt]
  let btr = vTravelers[nb]
  ttr.moveto(ttrpos);
  btr.moveto(btrpos);
  ttr.height = trht;
  ttr.update();
  btr.height = brht;
  btr.update();
}

rs.updateState = function () {
  let {numH,numV} = this;
  for (let i=0;i<numH;i++) {
    this.updateStateOfH(i);
  }
  for (let i=0;i<numV;i++) {
    this.updateStateOfV(i);
  }     
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.025*this.ht;
    let rectP = this.rectP = rectPP.instantiate();
  rectP.fill = 'white';
  rectP['stroke-width'] = 0;
  rectP.width =0.01*this.ht;
}  


rs.numSteps = 100;
rs.saveAnimation = 0;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hTtravelers = this.set('hTravelers',arrayShape.mk());
  for (let i=0;i<numH;i++) {
   let crc = this.circleP.instantiate();
   hTtravelers.push(crc)
  }
  let vTtravelers = this.set('vTravelers',arrayShape.mk());
  for (let i=0;i<2*numV;i++) {
   let rect= this.rectP.instantiate();
   vTtravelers.push(rect)
  }
  this.addPaths();
  
}

export {rs};


