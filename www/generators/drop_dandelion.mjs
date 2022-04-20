
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_dandelion');
let ht = 360;
let wd = 1* ht;


let topParams = {width:wd,height:ht,framePadding:0.15*ht,
//parameters to performDrop
dropTries:10,maxDrops:Infinity,fromEnds:1,doNotExit:[geom.Circle.mk(Point.mk(0,0),0.5*ht)],
//parameters to genFan
lineLength:5,fromEnds:1,extendWhich:'first',sepNext:0.01,splitChance:.40,splitAmount:0.05 *Math.PI,
directionChange:0.0*Math.PI,randomDirectionChange:0.025*Math.PI,lineExt:0,
// parameters to ringSeeds
numSeeds:15};

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .5;
}

rs.initialDrop = function () {
  let rad  = 0.15 * 0.5 * this.width;
  return this.ringSeeds({stroke:'transparent',ringRadius:rad});  
}

rs.dropAt = function (p) {
  return this.genFan({startingPoint:p,stroke:'white'});
}

rs.initialize = function () {
  this.initProtos();
  this.addFrame();
  this.generateDrop();
}

export {rs};



