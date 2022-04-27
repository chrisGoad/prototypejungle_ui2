
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();

addRandomMethods(rs);
addDropMethods(rs);
addSegsetMethods(rs);

rs.setName('drop_whorls');
let ht  = 400;
let topParams = {width:1.5*ht,height:ht,numRows:20,numCols:30,numSeedRows:4,numSeedCols:4,maxDrops:10000,maxTries:10,segLength:10,framePadding:0.1*ht,frameVisible:0,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'last',numSegStarts:16,stroke:'white'};

let fanParams = {separation:0,splitChance:1,splitAmount:0.02 * Math.PI,randomDirectionChange:0.1*Math.PI};

let gridParams = {numSeedRows:4,numSeedCols:4,fanAngles:[0.5*Math.PI,-0.5*Math.PI]}

Object.assign(rs,topParams);

 let props = ['width','height','lineP','stroke','sepNext','fanAngles','numSeedRows',
       'numSeedCols','gridPadding','lineExt'];
rs.initProtos = function () {
  this.lineP = linePP.instantiate();
	this.lineP['stroke-width'] = .6;
}  

rs.dropAt = function (p) {
  return this.genFan(p,fanParams);
}

rs.initialDrop = function () {
  let {width,lineP} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  return this.gridSeeds(gridParams);
}
  
rs.initialize = function () {
  this.initProtos();
  this.addFrame();
  this.generateDrop();
}

export {rs};


