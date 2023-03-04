import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/line_path_2.mjs';

let rs = generatorP.instantiate();

rs.setName('line_path_2_3');

 let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
 let part0tm = 180;

debugger;
rs.setTopParams = function () {
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:6,theta:-0.2 *Math.PI,vel,backGroundColorr:'white',
  cycleTime,part0tm,numSteps:2*part0tm+20,noNewPaths:8*cycleTime,lineLength:10,addPathInterval:30,fromOneSide:0,gap:0,saveAnimation:1,turnBlack:0	}
  Object.assign(this,topParams);
}

let fc = 0.8;

let fc0 = .4;
let fcc = 0.4;

let pointsToShow =  rs.pointsOnCircle(67,fc0*d,Point.mk(-fcc*d,-fcc*d)).concat(
                   rs.pointsOnCircle(67,fc0*d,Point.mk(fcc*d,fcc*d)),
                   rs.pointsOnCircle(67,fc0*d,Point.mk(-fcc*d,fcc*d)),
                   rs.pointsOnCircle(67,fc0*d,Point.mk(fcc*d,-fcc*d))
                   );


let hits = [];
let cnt = -0;
pointsToShow.forEach((p) => {

   let h = {p,dir0:cnt%2?0:Math.PI,dir1:cnt%2?0.5*Math.PI:-0.5*Math.PI}
   hits.push(h);
   cnt++;
  });

rs.hits = hits;

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
  //lineP.stroke = 'black';
  lineP['stroke-width'] = .1;
}  

rs.setTopParams();

export {rs};


