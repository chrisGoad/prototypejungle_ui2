
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
debugger;
addQuadMethods(rs);
rs.setName('quad_9');

let wd = 100;
let hwd = 0.5*wd;
let topParams = {width:wd,height:wd,framePadding:0.1*wd,frameStrokee:'white',lengthenings:undefined,twists:undefined,emitLineSegs:undefined}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:7,rectangular:1};

rs.orect = Rectangle.mk(Point.mk(-hwd,-hwd),Point.mk(wd,wd));

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP.fill = 'black';
  this.rectP['stroke-width'] =.05;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP.fill = 'black';
  this.lineP['stroke-width'] =.1;
  this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP['stroke-width'] =.05;
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP['stroke-width'] = 0.01;
}



rs.quadSplitParams = function (qd) {
  let ornt = Math.random()<0.5?'h':'v';
  return {ornt,fr0:0.5,fr1:0.5,fr2:0.2};
}




export {rs};

      

