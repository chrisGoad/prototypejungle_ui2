import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as innerDrop} from '/generators/drop_circles_0.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_circles_1');
let ht= 2000;
let topParams = {width:ht,height:ht,radius:50,framePadding:0.1*ht,frameStrokee:'white'}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:150,numIntersections:5}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'rgba(255,255,0,0.1)';
  circleP.stroke = 'white';
  circleP['stroke-width'] = 1;
}  

rs.generateDrop= function (p) {
  let {height:ht,radius} = this;
  debugger;
  let hht = 0.5*ht;
  //let fr = (p.y + hht)/ht;
  let d = p.length();
  if (d>=hht) {
    return;
  } 
  let fr= d/hht;
  let rad = 5 + (1-fr) * radius;
  let crc = Circle.mk(rad);
  //let crc = Circle.mk(10+Math.random()*radius);
  let crcs = crc.toShape(this.circleP);
  return {geometries:[crc],shapes:[crcs]}
}

rs.initialize = function () {
  this.initProtos();
  let {dropParams} = this;
  this.addFrame();
  let drops =  this.generateDrops(dropParams);
}

export {rs};


