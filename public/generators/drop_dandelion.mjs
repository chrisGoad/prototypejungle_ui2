
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/dropForest.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_dandelion');
let ht = 360;
let wd = 1* ht;

let topParams = {width:wd,height:ht,framePadding:0.15*ht};  

let dropParams = {fromEnds:1, extendWhich:'first', sepNext:0.01, dropTries:10, sepNext:0.1, maxDrops:Infinity, doNotExit:[geom.Circle.mk(Point.mk(0,0),0.5*ht)], splitChance:.40, splitAmount:0.05*Math.PI, directionChange:0.0*Math.PI, randomDirectionChange:0.025*Math.PI, segLength:5,maxDrops:10000};

let ringParams = {numSeeds:15,ringRadius:0.15 * 0.5 * wd};

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .5;
}

rs.initialDrop = function () {
  let segs = this.ringSeeds(ringParams); 
  let lines = segs.map((sg) => this.genLine(sg,this.lineP)); 
  return {geometries:segs,shapes:lines};
}

rs.generateDrop = function (p) {
  let segs = this.generateFan(p);
  let lines = segs.map( s => this.genLine(s,this.lineP,dropParams.lineExt));
  return {geometries:segs,shapes:lines};
}

rs.initialize = function () {
  this.initProtos();
  this.addFrame();
  this.generateDrops(dropParams);
}

export {rs};



