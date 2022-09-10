import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
rs.setName('web_thing_2');
let wd = 100;
let nr = 10;
let  topParams = {width:wd,height:wd,framePadding:1.2*wd};
let  webParams = {webTries:1000,minConnectorLength:0,maxConnectorLength:50,lengthenBy:0.2,checkCollisions:0};
let gridParams = {width:wd,height:wd,numRows:nr,numCols:nr};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .3;
   let circleP = this.circleP = circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'cyan';
  this.circleP['stroke-width'] = .01;
  this.circleP.dimension= 1;
}  

rs.initialize = function () {
  this.initProtos();
  webParams.lineP = this.lineP;
  let points = this.gridPoints(gridParams);
    this.placeShapesAtPoints(points,this.circleP);

  this.generateWeb(Object.assign(webParams,{points}));
  this.addFrame();
}

export {rs};
