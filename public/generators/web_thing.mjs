
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
rs.setName('web_thing');
let rd= 3000;

let  topParams = {width:rd,height:rd,framePadding:1.2*rd};
let  webParams = {webTries:1000,minConnectorLength:0,maxConnectorLength:2000};
let ringParams = {numRings:20,radius:rd,numPointsPerRing:20};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1;
  this.lineP['stroke-width'] = 5;
}  

rs.initialize = function () {
  this.initProtos();
  webParams.lineP = this.lineP;
  let points = this.ringPoints(ringParams);
  this.generateWeb(Object.assign(webParams,{points}));
  this.addFrame();
}

export {rs};
