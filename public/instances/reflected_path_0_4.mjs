import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/reflected_path_0.mjs';

let rs = generatorP.instantiate();

rs.setName('reflected_path_0_4');

debugger;
rs.setTopParams = function () {
  debugger;
  let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:10,theta:-0.2 *Math.PI,vel,
  cycleTime,numSteps:6*cycleTime,noNewPaths:4*cycleTime,lineLength:20,addPathInterval:30,fromOneSide:0,gap:0,randomAngleFactor:0.2	}
  Object.assign(this,topParams);
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
  ecircleP.fill = 'rgba(0,0,250,.5)';
  ecircleP.stroke= 'rgb(250,250,250,.5)';
  ecircleP['stroke-width'] = .2;
  ecircleP.dimension =.0005*ht;
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .1;
}  

rs.setTopParams();

export {rs};


