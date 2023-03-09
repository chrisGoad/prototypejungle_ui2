import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/line_path_2.mjs';

let rs = generatorP.instantiate();
let ns=6*64;
let vr = 'b';
//rs.setName('line_path_2_9_'+ns);
rs.setName('line_path_2_11'+vr);

 let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
 //let part0tm = 180;
debugger;
rs.setTopParams = function () {
  //let cycleTime = Math.floor(ht/vel);
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.1*ht,frameStroke:'rgb(2,2,2)',frameStrokeWidth:1,numPaths:6,theta:-0.2 *Math.PI,step:1,
  part0tm:100000,numSteps:ns,lineLength:25,addPathInterval:30,fromOneSide:0,gap:0,saveAnimation:1,chopOffBeginning:63	}
 // part0tm:100000,numSteps:ns,lineLength: d * .33 * 1.667,addPathInterval:30,fromOneSide:0,gap:0,saveAnimation:1,chopOffBeginning:63	}
  Object.assign(this,topParams);
}


let fc = 0.8;

//let fromPoints =  rs.pointsOnCircle(20,0.7*d);
debugger;
let sz = 0.33*d;

//sz = 0.44*d;
let ps = .7*d;
let circle0= Circle.mk(Point.mk(-ps,-ps),sz);
let circle1= Circle.mk(Point.mk(0,-ps),sz);
let circle2= Circle.mk(Point.mk(ps,-ps),sz);
let circle3= Circle.mk(Point.mk(-ps,0),sz);
let circleC= Circle.mk(Point.mk(0,0),sz);
let circle5= Circle.mk(Point.mk(ps,0),sz);
let circle6= Circle.mk(Point.mk(-ps,ps),sz);
let circle7= Circle.mk(Point.mk(0,ps),sz);
let circle8= Circle.mk(Point.mk(ps,ps),sz);

rs.froms = [];
let cnt = 0;
rs.fromsForCircle = function (crc,n,angle,vel,icircleDim,xReflect) {
  let {d,froms} = this;
  let {center} = crc;
 // debugger;
  let fromPoints =  rs.pointsOnCircle(crc,n,xReflect);
  fromPoints.forEach((ip) => {
   let p = ip.difference(center);
   let nvec =p.normalize().normal();
   let {x,y} = nvec;
  // let dir = Math.atan2(y,x)+((cnt%2)?0.3:0.2)*Math.PI;
   let dir = Math.atan2(y,x)+(angle*(1+0.0*Math.random()))*Math.PI;
   //let dir = Math.atan2(y,x)+(0.4*(1+0.0*Math.random()))*Math.PI;
   //let h = {p,dir,circle:mainCircle}
   let h = {p:ip,dir,circle:crc,vel,icircleDim}
   froms.push(h);
  // cnt++;
  });
}

let aa = 0.25;
aa = 0.35;//Cl
aa = 0.34;//cl
aa = 0.433333;//cl
let bb = 2/5;
aa=bb;

//let bb = 0.33333;
let vv = 0.5;
let idim = 0.016*ht;
if (vr==='a') {
rs.fromsForCircle (circle0,3,aa,vv,idim);
rs.fromsForCircle (circle8,3,aa,vv,idim);
rs.fromsForCircle (circle1,2,aa,vv,idim);
rs.fromsForCircle (circle7,2,aa,vv,idim);
rs.fromsForCircle (circle2,4,aa,vv,idim);
rs.fromsForCircle (circle6,4,aa,vv,idim);
rs.fromsForCircle (circle3,5,aa,vv,idim);
rs.fromsForCircle (circle5,5,aa,vv,idim);
} else {

rs.fromsForCircle (circle0,1,aa,vv,idim);
rs.fromsForCircle (circle1,2,aa,vv,idim);
rs.fromsForCircle (circle2,1,aa,vv,idim,1);
rs.fromsForCircle (circle3,4,aa,vv,idim);
rs.fromsForCircle (circle5,4,aa,vv,idim,1);
rs.fromsForCircle (circle6,5,aa,vv,idim);
rs.fromsForCircle (circle7,3,aa,vv,idim);
rs.fromsForCircle (circle8,5,aa,vv,idim,1);
}
//
//rs.fromsForCircle (circleC,5,bb,0.5*vv*(65/50));
rs.fromsForCircle (circleC,16,aa,vv,0.3*idim);
rs.fromsForCircle (circleC,17,aa,vv,0.3*idim);
//rs.fromsForCircle (circleC,6,bb,.5*vv*(65/50)*(55/50)*(76/50));
//rs.fromsForCircle (circleC,17,bb,0.5*vv*(65/50)*(55/50));
//rs.fromsForCircle (circleC,17,aa);
//rs.fromsForCircle (circleC,42,0.4);
//rs.fromsForCircle (circleC,3,0.4);
//rs.fromsForCircle (circleC,4,0.4);
//rs.fromsForCircle (circleC,5,0.4);
//rs.fromsForCircle (circleC,1,0.4);
//rs.fromsForCircle (circle3,7,0.4);
//rs.fromsForCircle (mainCircle,6,0.7,1);

rs.circles = [circle0,circle1,circle2,circle3,circleC,circle5,circle6,circle7,circle8];

let fc0 = .4;
let fcc = 0.4;
/*
rs.pointsToShow =  rs.pointsOnCircle(67,fc0*d,Point.mk(-fcc*d,-fcc*d)).concat(
                   rs.pointsOnCircle(67,fc0*d,Point.mk(fcc*d,fcc*d)),
                   rs.pointsOnCircle(67,fc0*d,Point.mk(-fcc*d,fcc*d)),
                   rs.pointsOnCircle(67,fc0*d,Point.mk(fcc*d,-fcc*d))
                   );
*/
rs.initProtos = function () {
  let {ht} = this;
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.stroke = 'transparent';
  icircleP.fill = 'blue';
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.006*ht;
  icircleP.dimension =0.008*ht;
  let bcircleP = this.bcircleP = circlePP.instantiate();
  bcircleP.stroke = 'white';
  bcircleP.fill = 'transparent';
  bcircleP['stroke-width'] = .3;
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
// lineP.stroke = 'transparent';
  lineP['stroke-width'] = .3;
}  

rs.setTopParams();

export {rs};


