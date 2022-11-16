
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

rs.setName('grid_beacons');
addGridMethods(rs);
//addRandomMethods(rs);
let nr = 16;
let wd=100;

let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:0,framePadding:0.15*wd};
Object.assign(rs,topParams);

rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .4;
  lineP.stroke='white';
}

rs.onNthDiagonal0 = function (n,cell) {
  let {x,y} = cell;
  return x+y === n;
}

rs.onNthDiagonal1 = function (n,cell) {
  let {x,y} = cell;
  return x-y === n;
}


rs.onNthDiagonal3 = function (n,cell) {
  let {x,y} = cell;
  return y-x === n;
}

rs.anglesByCell = [];
rs.angleByCell = function (cell) {
  let {x,y} = cell;
  let idx = nr*x+y;
  return this.anglesByCell[idx];
} 
rs.computeAnglesByCell = function () {
  for (let i=0;i<nr;i++) { 
    for (let j=0;j<nr;j++) { 
      let dir = Math.random()*Math.PI;
      this.anglesByCell.push(dir);
    }
  }
}
   

rs.shapeGenerator = function (rvs,cell) {
  //let dir = Math.random()*Math.PI;
  let dir = this.angleByCell(cell);
  //let ond0 = this.onNthDiagonal0(4,cell)
  let ond0_top = this.onNthDiagonal0(nr/2,cell)
  let ond0_bot = this.onNthDiagonal0(nr*(3/2),cell)
  let ond1_top = this.onNthDiagonal1(nr/2,cell);
  let ond1_bot = this.onNthDiagonal1(-nr/2,cell)

  debugger;
  let {lineP} = this;
  let shape = lineP.instantiate().show();
  let hvec = Point.mk(Math.cos(dir),Math.sin(dir)).times(2);
  shape.setEnds(hvec.times(-1),hvec);
  if (ond0_bot || ond0_top || ond1_top || ond1_bot) {
    shape.stroke = 'red';
  }
  shape.update();
  return shape;
}

rs.initialize = function () {
  this.addFrame();
  this.initProtos();
  this.computeAnglesByCell();
  this.generateGrid();
}

export {rs};


