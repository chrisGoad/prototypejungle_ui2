import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as oneDf}  from '/mlib/oneDf.mjs';

debugger;
let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_on_circles');
let ht= 3200;
let topParams = {width:ht,height:ht,frameWidth:1.5*ht,frameHeight:1.35*ht,framePos:Point.mk(0,-0.12*ht),frameStroke:'black'}
Object.assign(rs,topParams);

let dropParams = {dropTries:150,numIntersections:1}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'rgba(100,100,100,0.3)';
  circleP.fill = 'rgba(0,0,200,0.3)';
  circleP.stroke = 'black';
  circleP['stroke-width'] = 10;
}  

rs.generateDrop= function (oneD) {
  debugger;
  let p = oneD.value;
  let ln = Math.max(20,p.length());
  //let crc = Circle.mk(.01*ln);
  let crc = Circle.mk(20);
  let crcs = crc.toShape(this.circleP,1);
  let ornt = oneD.part.ornt;
  //let fill = (ornt === 'h')?'rgba(0,0,255,0.5)':'rgba(255,0,0,0.5)';
  let lv=0,v=200;
  let fill = `rgba(${v},${v},${v},1)`;
  crcs.fill = fill;
  return {geometries:[crc],shapes:[crcs]}; 
 }

rs.initialize = function () {
  debugger;
  this.setBackgroundColor('black');
  //this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  let circles = oneDf.mk();
  let radius = 0.5*ht;
  let disp = 0.2;
  let p0 = Point.mk(-disp*ht,0);
  let p1 = Point.mk(disp*ht,0);
  let p2 = Point.mk(0,-1.2*disp*ht);
  
  let crcs = [];
  for (let i=0;i<5;i++) {
    let rad = radius - 80*i;
    crcs.push(oneDf.mkArc(p0,rad));
  }
  for (let i=0;i<5;i++) {
    let rad = radius - 80*i;
    crcs.push(oneDf.mkArc(p1,rad));
  }
   for (let i=0;i<5;i++) {
    let rad = radius - 80*i;
    crcs.push(oneDf.mkArc(p2,rad));
  }
  
  
  
  circles.mixin(crcs);
  dropParams.oneD = circles;
  let vs = [];
  for (let i=0;i<10;i++)  {
    let v = circles.randomPoint();
    vs.push(v);
  }
    let drops =  this.generateDrops(dropParams);

}

export {rs};


