import {rs as polygonPP} from '/shape/polygon.mjs';

import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_4');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:0.6,levels:7,alwaysSplitBefore:4,splitParams:{ornt:'h',fr0:0.5,fr1:0.5,fr2:0.4},rectangular:1};

//rs.quadParams = {chance:0.8,levels:7, alwaysSplitBefore:3};

rs.initProtos = function () {
  this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP['stroke-width'] =.15; 
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP['stroke-width'] =.15;
    this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP['stroke-width'] = 0.01;
}

rs.quadFill = function () { 
   const shade = ()=> Math.floor(255*Math.random());
   let v = shade();
   let fill = `rgb(${v},0,${v})`;
   return fill;
}


rs.displayCellAsRectangle = function (qd) {
  debugger;
  let {shapes,rectP} = this;
  let rect = qd.rectangle;
  //let rs = rect.toShape(rectP,0.8);
  let rs = rect.toShape(rectP,0.8);
  rs.fill = this.computeFill();
  shapes.push(rs);
}


rs.displayCellAsCircle = function (qd) {
  debugger;
  let {shapes,circleP} = this;
  let pgon = qd.polygon;
  let rs = pgon.toCircleShape(circleP,0.8);
  rs.fill = this.quadFill();
  shapes.push(rs);
}

rs.displayCell = function (qd) {
  if (qd.UL) {
    return;
  }
  this.displayCellAsCircle(qd);
}

rs.initializee = function () {
  let {width:wd,height:ht} = this;
  this.addFrame();
  this.initProtos();
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd);
}	

export {rs};

      

