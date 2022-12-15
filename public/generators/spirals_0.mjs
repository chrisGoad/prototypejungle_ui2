//import {rs as circlePP} from '/shape/circle.mjs';
//import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('spirals_0');
/*let initState = {};
  let pspace = {};
rs.pstate = {pspace,cstate:initState};
let step = 0.0002*Math.PI;
step = 0.0004*Math.PI;
step = 0.004*Math.PI;
rs.addPath = function () {
  initState['a'] = {value:0};
  let rng = 0.4*Math.PI;
  pspace['a'] = {kind:'sweep',step:step,min:-rng,max:rng,interval:1,steps:0.5,once:0};
}

rs.addPath();

debugger;
let ht= 100;
let hht = 0.5*ht;
rs.wb = 1; // white background
rs.clockwise = 0;
let ff = 2;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.1*ht,frameStroke:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 1;
  circleP['stroke-width'] = 0;
   let circleP2 = this.circleP2 = circlePP.instantiate();
  circleP2.fill = 'transparent';
 // circleP2.dimension = 0.9;
  circleP2['stroke-width'] = .2;
  circleP2.stroke = 'white';
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
}  
*/
rs.allocateDots = function (n) {
  for (let i=0;i<n;i++) {
    let dot = this.circleP.instantiate();
    this.dots.push(dot);
  }
}

rs.allocateLines = function (n) {
  for (let i=0;i<n;i++) {
    let line = this.lineP.instantiate();
    this.lines.push(line);
    line.hide();
  }  
}

rs.placeLines = function () {
  debugger;
  let {numRings,numDotsPerRing,lines} = this;
   for (let rn=1;rn<numRings;rn++) {
    for (let sn=0;sn<numDotsPerRing;sn++) {
      let odp = this.dotPos(rn-1,sn);
      let idp = this.dotPos(rn,sn);
      let li = numDotsPerRing*(rn-1)+sn;
      let line = lines[li];
      line.show();
      line.setEnds(idp,odp);
      line.update();
    }
  }
}


rs.numRings = 100;
rs.numRings = 50;
rs.numRings = 20;
rs.numDotsPerRing = 8;
//rs.angleInc = 0.05*Math.PI;
rs.angleInc = 0;

// rn 0 is the outer ring
rs.dotPos = function (rn,sn) { //ringNumber, spokenumber
  let {numDotsPerRing,angleInc,numRings,ht} = this;
  let od = 0.9*ht;
  let id = 0.05*ht;
  let df = od - id;
  let deltar = df/(numRings+0);
  let deltaa = 2*Math.PI/numDotsPerRing;
  let  ri = numRings - (rn+1);
  let ap = rn*angleInc;
  let angle = ap + sn*deltaa;
  //let r = 1*(id+ri*deltar);
  let r = this.ringRadius(rn);
  let pos = Point.mk(Math.cos(angle),Math.sin(angle)).times(r);
  return pos;
}

rs.ringRadius = function (rn) {
  let {numRings,ht} = this;
   let od = 0.9*ht;
  let id = 0.05*ht;
  let df = od - id;
  let deltar = df/(numRings+0);
    let  ri = numRings - (rn+1);
  let r = 1*(id+ri*deltar);
  return r;
}

rs.placeDotsOnRings = function () {
  debugger;
  let {numDotsPerRing,numRings,dots} = this;
  for (let rn=0;rn<numRings;rn++) {
    for (let sn=0;sn<numDotsPerRing;sn++) {
      let pos = this.dotPos(rn,sn);
      let doti = rn*numDotsPerRing + sn;
      let dot = dots[doti];
      //dot.hide();
      dot.moveto(pos);
      dot.update();
    }
  }
}
rs.placeRings = function () {
  let {numRings,rings} = this;
  for (let rn=0;rn<numRings;rn++) {
    let d = 2*this.ringRadius(rn);
    let circ = this.circleP2.instantiate();
    rings.push(circ);
    circ.dimension = d;
  }
}

rs.includeDots = 1;
rs.includeLines = 1;
rs.includeRings = 1;
rs.initialize = function () {
  debugger;
  let {numRings,numDotsPerRing,includeDots,includeLines,includeRings} = this;
  this.initProtos();
  this.addFrame();
  let rings = this.set('rings',arrayShape.mk());
  let dots = this.set('dots',arrayShape.mk());
  let lines = this.set('lines',arrayShape.mk());
  if (includeDots) {
    this.allocateDots(numRings*numDotsPerRing);
  }
  if (includeRings) {
    this.placeRings();
  }
  if (includeLines) {
    this.allocateLines(numRings*numDotsPerRing);
    this.placeLines();
  }
 /* for (let i=0;i<numRings;i++) {
    let cd = 2*(id+i*delta);
    let circ = this.circleP2.instantiate();
    circ.dimension = cd
    rings.push(circ);
    this.placeDotsOnRing(cd/2,i);
  }*/
 
  this.callIfDefined('afterInitialize');
  
}


rs.updateState = function () {
  let {pstate,includeDots,includeLines} = this;
  let {cstate} = pstate;
  let a = cstate['a'].value;
  this.angleInc  = a;
  debugger;
  if (includeDots) {
    this.placeDotsOnRings();
  } 
  if (includeLines) {
    this.placeLines();
  }
  this.callIfDefined('afterUpdateState');
}
rs.saveAnimation = 1;
rs.numSteps = 1263;
rs.numSteps = 626;
export {rs}