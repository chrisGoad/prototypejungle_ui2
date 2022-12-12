import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/spirals_0.mjs';


let rs = generatorP.instantiate();

rs.setName('spirals_0_0');
let initState = {};
let pspace = {};
rs.pstate = {pspace,cstate:initState};
let step = 0.0002*Math.PI;
step = 0.0004*Math.PI;
step = 0.004*Math.PI;
let rng = 0.4*Math.PI;
rs.addPath = function () {
  initState['a'] = {value:0};
  pspace['a'] = {kind:'sweep',step:step,min:-rng,max:rng,interval:1,steps:0.5,once:0};
}

rs.addPath();


let ht = rs.ht= 100;
let hht = rs.hht = 0.5*rs.ht;
rs.wb = 1; // white background
rs.clockwise = 0;
let ff = 2;
let topParams = {width:ht*rs.ff,height:ht*ff,framePadding:.1*ht,frameStroke:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.numRings = 100;
rs.numRings = 50;
rs.numRings = 20;
rs.numDotsPerRing = 8;

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

rs.includeDots = 1;
rs.includeLines = 1;
rs.includeRings = 1;


rs.saveAnimation = 0;
rs.numSteps = 1263;
rs.numSteps = 626;
export {rs}