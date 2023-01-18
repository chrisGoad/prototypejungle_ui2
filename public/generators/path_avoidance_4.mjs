import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_4');
let ht = rs.ht= 100;
let d=0.5*ht;

let topParams = {width:rs.ht,height:rs.ht,framePadding:.2*ht,frameStrokee:'white',frameStrokeWidth:1}

Object.assign(rs,topParams);
rs.numH = 2;

rs.ngaps = function (x) {
  let g0 = -x-2*d;
  let g1 = x;
  let g2 = -x;
  let g3 = x+ 2*d;
  return [g0,g1,g2,g3];
}

rs.pgaps = function (x) {
  let g0 = x-2*d;
  let g1 = -x;
  let g2 = x;
  let g3 = 2*d -x;
  return [g0,g1,g2,g3];
}

rs.zgaps = function () {
  let g0 = -2*d;
  let g1 = 0;
  let g2 = 2*d;
  return [g0,g1,g2];
}

rs.gap = 5;

rs.addLines = function (x) {
  debugger;
  let {gap,lineP,lines,lineData} = this;
  let tgap = 2*gap;
  let gaps;
  if  (x<0) {
    gaps = this.ngaps(x);
  } else if (x>0) {
    gaps = this.pgaps(x);
  } else {
    gaps = this.zgaps();
  }
  let [g0,g1,g2,g3,g4] = gaps;
  let L0e0 = Point.mk(x,-2*d);
  let L0e1 = Point.mk(x,g0-gap);
  let L1e0 = Point.mk(x,g0+gap);
  let L1e1 = Point.mk(x,g1-gap);
  let L2e0 = Point.mk(x,g1+gap);
  let L2e1 = Point.mk(x,g2-gap); 
 let L3e0 = Point.mk(x,g2+gap);
  let L3e1 = Point.mk(x,g3-gap); 
  let L4e0 = Point.mk(x,g3+gap);
  let L4e1 = Point.mk(x,2*d); 
  const addLine = (e0,e1) => {
    if (e0.distance(e1) > tgap) {
      let line = lineP.instantiate();
      line.setEnds(e0,e1);
      let lineDat = {line,e0,e1};
      lineData.push(lineDat);
      line.show();
      lines.push(line);
      line.update();

    } 
  }
  addLine(L0e0,L0e1);
  addLine(L1e0,L1e1);
  addLine(L2e0,L2e1);
  addLine(L3e0,L3e1);
  addLine(L4e0,L4e1);
}

rs.numV = 8; //on each side

rs.addAllLines = function () {
  let {numV} = this;
  let delta = d/numV;
  for (let i=0;i<numV;i++) {
    this.addLines(-i*delta);
  }
  for (let i=1;i<numV;i++) {
    this.addLines(i*delta);
  }
}

rs.adjustLine = function (ld,y) {
  let {line,e0,e1} = ld;
  let ae0 = Point.mk(e0.x,y+e0.y);
  let ae1 = Point.mk(e1.x,y+e1.y);
  line.setEnds(e0,e1);
}

rs.adjustLines = function (y) {
  let {lineData} = this;
  lineData.forEach((ld) => {
   this.adjustLine(ld);
  });
}
 
   



  
 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let stepH = 1;
let stepV = 1;
let minH = -d;
let maxH = d;


rs.addHpaths = function () {
  debugger;
  let nm0 = 'h0';
  let nm1 = 'h1';
  pspace[nm0] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm0] = {value:minH,y:0};
  pspace[nm1] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm1] = {value:minH,y:0};
}



rs.updateStateOfH= function (n){
  //debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {hTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:iv,done,y} = cs;
  let v = (n===0)?iv: -5-iv;
  let pos = Point.mk(v,y);
  let tr = hTravelers[n];
  /*if (((ssf>stt)&&(n===0))||((ssf <= stt)&&(n===1))) {
    tr.hide();
  } else {*/
    tr.show();
    tr.moveto(pos);
  //}
  tr.update();
}
let vStep=5;
rs.updateState = function () {
  let {stepsSoFar:ssf} = this;
  console.log('ssf',ssf);
  let {numH} = this;
  this.adjustLines(vStep*ssf);
  this.updateStateOfH(0);
  this.updateStateOfH(1);
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.025*this.ht;
    let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = 2;
}  


rs.numSteps = 2.4*Math.floor(ht/stepH);
rs.numSteps = 2*Math.floor(ht/stepH);
rs.numSteps = Math.floor(ht/stepH);
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hTtravelers = this.set('hTravelers',arrayShape.mk());
  let lines = this.set('lines',arrayShape.mk());
  let lineData = this.lineData = [];
   let crc0 = this.circleP.instantiate();
   crc0.fill = 'blue';
   hTtravelers.push(crc0);
    let crc1 = this.circleP.instantiate();
   crc1.fill = 'red';
   hTtravelers.push(crc1);
   this.addAllLines()
  
  this.addHpaths();
  
}

export {rs};


