
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';	
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
addQuadMethods(rs);
rs.setName('web_quad');
let wd = 100;

//let topParams = {width:wd,height:wd,levels:7,chance:0.8,framePadding:0.1*wd,backFill:'red'}
let topParams = {width:wd,height:wd,levels:7,chance:0.8,framePadding:0.1*wd,backFill:'red'}

//let  topParams = {width:rd,height:rd,framePadding:1.2*rd};
let  webParams = {webTries:1000,maxLoops:100000,minConnectorLength:0,maxConnectorLength:100};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1;
  let circleP = this.circleP = circlePP.instantiate();
  this.circleP.fill = 'transparent';
  this.circleP.stroke = 'white';
  this.circleP.dimension = 5;
  this.circleP.dimension = 1;
  this.circleP['stroke-width'] = 0.01;
}  


rs.chooseCircle = function (r,depth=0) {
  debugger;
  return 1;
}

const leafPositions = function (qd,depth=0) {
   if (qd.UL) {
     let ulp = leafPositions(qd.UL,depth+1);
     rs = ulp.concat(leafPositions(qd.UR,depth+1),leafPositions(qd.LL,depth+1),leafPositions(qd.LR,depth+1))
     return rs;
   }
   return (depth > 0)?[qd.rectangle.center()]:[];
}
     
rs.initialize = function () {
  root.backFill = 'black';
  this.initProtos();
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*wd),Point.mk(wd,wd));
  debugger;
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,this);
  
  let points = leafPositions(qd);
  this.placeShapesAtPoints(points,this.circleP);
 return;
  this.generateWeb(Object.assign(webParams,{points}));
  this.addFrame();
}

export {rs};


