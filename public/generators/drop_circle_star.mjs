
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
//import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();
addDropMethods(rs);
//addRandomMethods(rs);
//addSegsetMethods(rs);

rs.setName('drop_circle_star');
let ht = 100;
let wd = ht;

let topParams = {width:wd,height:ht,framePadding:0.17*ht,segLength:5,numCircles:8};

let dropParams = {dropTries:100,maxLoops:100000,maxDrops:100000};

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .15;
   let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'transparent';
  circleP.fill = 'black';
  circleP.stroke = 'white';
  circleP['stroke-width'] = 0;//.25;
  let circleP2 = this.circleP2 = circlePP.instantiate();
  circleP2.fill = 'blue';
  circleP2.stroke = 'white';
  circleP2['stroke-width'] = 0;//.25;
}  

let whichDrops = 0;




rs.segParams = function (np) {
  let r = Math.random();
 // let np = 4;
  let angle = (np === -1)?Math.PI/2:Math.floor(r*np)* (Math.PI/np)
  let length = 2;// + Math.floor(r*np)*4;
  return {angle,length};
} 	
rs.generateDrop = function (p) {
  //debugger;
  let {drops} = this;
   let p0 = Point.mk(0,0); 
  let {circleP2,circles,lineP} = this;
 /* let numCircles = circles.length;
  const inAcircle = (p) => {
    for (let i=0;i<numCircles;i++) {
      let c = circles[i];
      let cc = c.contains;
      if (typeof cc !== 'function') {
        debugger;
      }
      if (c.contains(p)) {
        return 1;
      }
    }
  }*/
  //if (inAcircle(p)) {  
 
  if (whichDrops) {
    debugger;
    //let crc = Circle.mk(2.5);
    let crc = Circle.mk(1);
    let crcs = crc.toShape(circleP2,1);
    return {geometries:[crc],shapes:[crcs]};
  }
  
  let sp = this.segParams(2);
  let {angle,length} = sp;
  let seg = LineSegment.mkAngled(p0,angle,length);
  let lseg = LineSegment.mkAngled(p0,angle,length+10);
  let ln = seg.toShape(this.lineP);
  return {geometries:[lseg],shapes:[ln]};

}

rs.initialize = function () {
  debugger;
  this.addFrame();
  this.initProtos();
 // dropParams.lineP = this.lineP;
 // this.initialForestDrop();
  this.generateDrops(dropParams);
  whichDrops = 1;
  let drops = this.drops;
   let dln = drops.length;
  console.log('dln',dln);
   drops.forEach((sg)=> {
      if (LineSegment.isPrototypeOf(sg)) {
        let nsg = sg.lengthen(-11);
        sg.end0 = nsg.end0;
        sg.end1 = nsg.end1;
      }
     });
    this.generateDrops(dropParams);

}

export {rs};


