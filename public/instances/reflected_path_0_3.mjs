import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/reflected_path_0.mjs';

let rs = generatorP.instantiate();

rs.setName('reflected_path_0_2');

debugger;
rs.setTopParams = function () {
  debugger;
  let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
  let LL = 20;
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:6,theta:-0.1 *Math.PI,vel,
  cycleTime,numSteps:10*cycleTime,noNewPaths:8*cycleTime,lineLength:LL,origLL:LL,addPathInterval:30,fromOneSide:0,gap:0	}
  Object.assign(this,topParams);
}

rs.afterUpdatee = function () {
  let {origLL,numSteps,stepsSoFar:ssf} = this;
  let fr = Math.max(0,ssf/numSteps);
  //let fr = Math.max(0,ssf/100);
  this.lineLength = fr*origLL;
}

rs.initProtos = function () {
  debugger;
  let {ht} = this;
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.stroke = 'transparent';
  icircleP.fill = 'red';
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.01*ht;
  let ecircleP = this.ecircleP = circlePP.instantiate();
  ecircleP.fill = 'blue';
  ecircleP['stroke-width'] = 0;
  ecircleP.dimension =0;
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .1;
}  

rs.setTopParams();

export {rs};


