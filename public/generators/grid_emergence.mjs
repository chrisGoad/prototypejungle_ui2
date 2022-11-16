
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

rs.setName('grid_beacons');
addGridMethods(rs);
//addRandomMethods(rs);
let nr = 30;
let wd=100;

let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:0,framePadding:0.15*wd};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .1;
  lineP.stroke='white';
}

rs.shapeGenerator = function (rvs,cell) {
  let dir = Math.random()*Math.PI;
  let {lineP} = this;
  let shape = lineP.instantiate().show();
  let hvec = Point.mk(Math.cos(dir),Math.sin(dir)).times(1);
  shape.setEnds(hvec.times(-1),hvec);
  shape.update();
  return shape;
}

rs.initialize = function () {
  this.addFrame();
  this.initProtos();
  this.generateGrid();
}

export {rs};


