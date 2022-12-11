import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('spirals_0');
let initState = {};
  let pspace = {};
rs.pstate = {pspace,cstate:initState};

rs.addPath = function () {
  initState['a'] = {value:0};
  let rng = 0.7*Math.Pi;
  pspace['a'] = {kind:sweep,step:0.05*Math.PI,min:-rng,max:rng,interval:1,steps:0.5,once:1};
}

rs.addPath();


let ht= 100;
let hht = 0.5*ht;
rs.wb = 1; // white background
rs.clockwise = 0;
let topParams = {width:ht,height:ht,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 2;
  circleP['stroke-width'] = 0;
   let circleP2 = this.circleP2 = circlePP.instantiate();
  circleP2.fill = 'transparent';
 // circleP2.dimension = 0.9;
  circleP2['stroke-width'] = .5;
  circleP2.stroke = 'white';
  let lineP = this.lineP2 = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
}  

rs.allocateDots = function (n) {
  for (let i=0;i<n;i++) {
    let dot = this.circleP.instantiate();
    this.dots.push(dot);
  }
}
    
rs.numRings = 40;
rs.numDotsPerRing = 8;
rs.angleInc = 0.05*Math.PI;
rs.placeDotsOnRing = function (r,rn) {
  let {dots,numDotsPerRing,angleInc,numRings} = this;
  let delta = 2*Math.PI/numDotsPerRing;
  let  ri = numRings - (rn+1);
  let ap = ri*angleInc;
  for (let i=0;i<numDotsPerRing;i++) {
    let angle = ap + i*delta - Math.PI;
    let pos = Point.mk(Math.cos(angle),Math.sin(angle)).times(r);
    let doti = rn*numDotsPerRing + i;
    let dot = dots[doti];
    dot.moveto(pos);
  }
}

rs.placeDotsOnRings = function (ar) {
  let {numRings} = this;
  let od = 0.9*ht;
  let id = 0.05*ht;
  let df = od - id;
  let delta = df/(numRings+0);
  for (let i=0;i<numRings;i++) {
    let cd = 2*(id+i*delta);
    if (ar) {
      let circ = this.circleP2.instantiate();
      circ.dimension = cd;
      rings.push(circ);
    }
    this.placeDotsOnRing(cd/2,i);
  }
}

rs.initialize = function () {
  debugger;
  let {numRings,numDotsPerRing} = this;
  this.initProtos();
  let rings = this.set('rings',arrayShape.mk());
  let dots = this.set('dots',arrayShape.mk());
 
  this.allocateDots(numRings*numDotsPerRing);
 /* for (let i=0;i<numRings;i++) {
    let cd = 2*(id+i*delta);
    let circ = this.circleP2.instantiate();
    circ.dimension = cd
    rings.push(circ);
    this.placeDotsOnRing(cd/2,i);
  }*/
  this.placeDotsOnRings(1);
}


rs.updateState = function () {
  let {pstate} = this;
  let {cstate} = pstate;
}

export {rs}