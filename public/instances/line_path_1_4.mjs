import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/line_path_1.mjs';

let rs = generatorP.instantiate();

rs.setName('line_path_1_4');

 let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
 let part0tm = 180;

debugger;
rs.setTopParams = function () {
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:6,theta:-0.2 *Math.PI,vel,
  cycleTime,part0tm,numSteps:2*part0tm,noNewPaths:8*cycleTime,lineLength:30,addPathInterval:30,fromOneSide:0,gap:0,saveAnimation:1	}
  Object.assign(this,topParams);
}

let fc = 0.8;
rs.pointsToShow =  rs.pointsOnSeg(10,LineSegment.mk(Point.mk(-fc*d,0),Point.mk(fc*d,fc*d))).concat(
                   rs.pointsOnSeg(10,LineSegment.mk(Point.mk(-fc*d,0),Point.mk(fc*d,-fc*d))));
rs.pointsToShow =  rs.pointsOnSeg(50,LineSegment.mk(Point.mk(-fc*d,0),Point.mk(fc*d,0))).concat(
                   rs.pointsOnSeg(50,LineSegment.mk(Point.mk(0,-fc*d),Point.mk(0,fc*d))));

rs.initProtos = function () {
  debugger;
  let {ht} = this;
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.stroke = 'transparent';
  icircleP.fill = 'blue';
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.006*ht;
  let pcircleP = this.pcircleP = circlePP.instantiate();
  pcircleP.stroke = 'transparent';
  //pcircleP.fill = 'transparent';
  pcircleP.fill = 'red';
  pcircleP['stroke-width'] = 0;
  pcircleP.dimension =0.01*ht;
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


