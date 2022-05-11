
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';	
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
//addPointMethods(rs);
addWebMethods(rs);
addQuadMethods(rs);
rs.setName('web_quad');
let wd = 100;

let topParams = {width:wd,height:wd,levels:7,chance:0.8,framePadding:0.1*wd,backFill:'red'}

//let  topParams = {width:rd,height:rd,framePadding:1.2*rd};
let  webParams = {webTries:1000,minConnectorLength:0,maxConnectorLength:2000};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1;
  this.lineP['stroke-width'] = 5;
}  


rs.chooseCircle = function (r,depth) {
  debugger;
  return 1;
}

const leafPositions = function (qd) {
   if (qd.UL) {
     let ulp = leafPositions(qd.UL);
     rs = ulp.concat(leafPositions(qd.UR),leafPositions(qd.LL),leafPositions(qd.LR))
     return rs;
   }
   return [qd.rectangle.center()]
}
     
rs.initialize = function () {
  root.backFill = 'black';
  this.initProtos();
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*wd),Point.mk(wd,wd));
  debugger;
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,this);
  
  let points = leafPositions(qd);
  this.generateWeb(Object.assign(webParams,{points}));
  this.addFrame();
}

export {rs};


