
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicsP.instantiate();

rs.setName('grid_emergence');
addGridMethods(rs);
addPathMethods(rs);
//addRandomMethods(rs);
let nr = 16;
let wd=100;

let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:0,framePadding:0.15*wd};
Object.assign(rs,topParams);


let initState = {gb:{value:0}};
let pspace = {
  gb:{kind:'sweep',step:5,min:0,max:255,interval:1,steps:0.5,startDown:0,bounce:1,sinusoidal:1}
};


rs.pstate = {pspace,cstate:initState};

rs.numSteps = 309;
rs.saveAnimation = 1;
rs.chopOffBeginning = 0;
rs.stepInterval = 100;


rs.initProtos = function () {	
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .4;
  lineP.stroke='blue';
}

rs.onNthDiagonal0 = function (n,cell) {
  let {x,y} = cell;
  return x+y === n;
}

rs.onNthDiagonal1 = function (n,cell) {
  let {x,y} = cell;
  return x-y === n;
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
  //let ond0 = this.onNthDiagonal0(4,cell)
  let ond0_top = this.onNthDiagonal0(nr/2,cell)
  let ond0_bot = this.onNthDiagonal0(nr*(3/2),cell)
  let ond1_top = this.onNthDiagonal1(nr/2,cell);
  let ond1_bot = this.onNthDiagonal1(-nr/2,cell)
  let onmd0 = this.onNthDiagonal0(nr,cell);
  let onmd1 = this.onNthDiagonal1(0,cell);
  let {lineP} = this;
  let shape = lineP.instantiate().show();
  let dir;
  if (ond0_top||ond0_bot || onmd0) {
    dir = .25*Math.PI;
  } else if (ond1_top||ond1_bot || onmd1) {
    dir = -.25*Math.PI;
  } else {
    dir = this.angleByCell(cell);
  }
  let hvec = Point.mk(Math.cos(dir),Math.sin(dir)).times(2);
  shape.setEnds(hvec.times(-1),hvec);
  let {pstate} = this;
  let {cstate} = pstate;
  let ctime = cstate.time;
  let gb= cstate.gb.value;
  let stroke = `rgb(${gb},${gb},${255-gb})`;

  if ((ond0_bot || ond0_top || ond1_top || ond1_bot) && (ctime <= 103)) {
    shape.stroke = stroke;
  }
  if ((onmd0 || onmd1)  && (ctime > 103)) {
   shape.stroke = stroke;
  }
  if ((ond0_bot || ond0_top || ond1_top || ond1_bot ) && (ctime > 206)) {
    shape.stroke = stroke;
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


