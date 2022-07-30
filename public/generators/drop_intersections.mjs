import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as innerDrop} from '/generators/drop_circles_0.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_intersections');
let ht= 4000;
let topParams = {width:2*ht,height:ht,radius:50,framePadding:0.1*ht,frameStrokee:'white'}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:150,numIntersections:2}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'rgba(255,0,0,0.3)';
  circleP.stroke = 'white';
  circleP['stroke-width'] = 1;
  let rectP = this.rectP = rectPP.instantiate();
  rectP.fill = 'rgba(0,0,255,0.3)';
  rectP.stroke = 'white';
  rectP['stroke-width'] = 1;
}  

rs.generateDrop= function (p) {
  let {width:wd,radius} = this;
  debugger;
  let {x,y} = p;
  let hwd = 0.5*wd;
  let fr= (x+hwd)/wd;
  let g,s;
  if ( fr<0.5) {
     g = Circle.mk(radius);
     s = g.toShape(this.circleP);
  }  else {
     g = Rectangle.mkCentered(Point.mk(2*radius,2*radius));
     s = g.toShape(this.rectP);
  }
  
  return {geometries:[g],shapes:[s]}
}

rs.initialize = function () {
  this.initProtos();
  let {dropParams} = this;
  this.addFrame();
  let drops =  this.generateDrops(dropParams);
}

export {rs};


