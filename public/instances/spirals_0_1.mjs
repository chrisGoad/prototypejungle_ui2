import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/spirals_0.mjs';


let rs = generatorP.instantiate();

rs.setName('spirals_0_1');
let initState = {};
let pspace = {};
rs.pstate = {pspace,cstate:initState};
let step = 0.0086*Math.PI;
//let step = 0.0004*Math.PI;
let sfc = .9913;
//higher towards jumping, lower towards stasis
sfc = 1.087;
sfc = 1.04;
sfc = 1.045;
sfc = 1.042;
sfc = 1.043;
sfc = 1.0428;
sfc = 1.0432;
sfc = 1.0435;
sfc = 1.0433;
sfc = 1.0434;
sfc = 1.0430;//stasisd
sfc = 1.0431;//stasisd
sfc = 1.04318;//stasisd
sfc = 1.0432; //jump
sfc = 1.04319; //jump
sfc = 1.043185; 
sfc = 1.043187; //stasis
sfc = 1.043188; //stasis
sfc = 1.043189; //stasis
sfc = 1.043190; //stasis
sfc = 1.043192; //stasis
sfc = 1.043193; //jump
sfc = 1.0431925; // stasis
sfc = 1.0431927; //stasis
sfc = 1.0431928; //jump
sfc = 1.04319275; //jump
/*sfc = 1.04345;
sfc = 1.04342;
sfc = 1.04343;
sfc = 1.043435;
sfc = 1.043437;
sfc = 1.043438;
sfc = 1.0434375;
sfc = 1.0434372;
sfc = 1.0434373;
sfc = 1.0434374;
sfc = 1.0434376;
sfc = 1.0434377;
sfc = 1.0434378;
sfc = 1.0434379;*/
//step = 0.0004*sfc*Math.PI;
//step = 0.004*Math.PI;
//step = 0.008*Math.PI;
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
let ff = rs.ff =  2;
let topParams = {width:ht*rs.ff,height:ht*ff,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.numRings = 100;
//rs.numRings = 50;
rs.numRings = 50	;
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

rs.afterInitializee = function () {
  this.addRectangle({width:1.9*ht,height:1.9*ht,fill:'rgba(0,0,0,.05)'})
}

rs.afterUpdateState = function  () {
  let {stepsSoFar:ssf,lines,numSteps} = this;
  let lva =580;
  if (ssf > lva) {
    lines.forEach((line) => {
      line['stroke-width'] = .2 * ((numSteps - ssf)/(numSteps - lva));
    });
  }
}
rs.includeDots = 1;
rs.includeLines = 1;
rs.includeRings = 0
 rs.copyOfInitState = rs.deepCopy(initState);

rs.stepInterval = 0;
rs.saveAnimation = 1;
rs.numISteps = 100;

//rs.numSteps = 627-(rs.numISteps);
rs.numSteps = 313;
//rs.numSteps = Math.floor(627/sfc);
export {rs}