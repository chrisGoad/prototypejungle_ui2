
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
rs.setName('web_wheel');
let rd= 3000;

let  topParams = {webTries:1000,numRings:20,radius:rd,numPointsPerRing:20,framePadding:1.2*rd,minConnectorLength:0,maxConnectorLength:2000}

Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1;
  this.lineP['stroke-width'] = 5;
}  

rs.initialize = function () {
  root.backFill = 'black';
  this.initProtos();
  let points = this.genRings();
  this.generateWeb({points});
  this.addFrame();
}

export {rs};
