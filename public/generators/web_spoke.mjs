
import {rs as linePP} from '/shape/line.mjs';
//import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointGenMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	
let rs = basicP.instantiate();

addPointGenMethods(rs);
addWebMethods(rs);

rs.setName('web_spoke');

let wd= 2000;
let ht = 0.02*wd; // height  of stripes

let  webParams = {minConnectorLength:0.5*ht,maxConnectorLength:2.2*ht,webTries:100};

//make gridParams modifiable from the outside
rs.gridParams = {initialPos:Point.mk(-0.0*wd,0),initialDirection:0,width:ht,step:0.007*wd,delta:0.02*Math.PI,numSteps:70};

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 3;
}

rs.initialize = function () {
  this.initProtos();
  let points =this.randomWalkPoints(this.gridParams);
  this.generateWeb(Object.assign(webParams,{points}));
}
  
export {rs};


