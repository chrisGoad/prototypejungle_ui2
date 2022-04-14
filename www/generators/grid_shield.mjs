
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_shield');

let opacity = 0.7;
let r = 255;
let b = 255;
let fc = 0.2;

rs.pByC  = {	
  widthFactor:3,
  heightFactor:3,
  maxSizeFactor:6,
  sizePower:3,
  genCircles:1,
  sizeMap:{0:fc*1.5,1:fc*1,  2:fc*2,3:fc*0,4:fc*0,5:fc*1,6:0},
  colorMap:{
    0: `rgba(0,${r},0,${opacity})`,
    1: `rgba(${r},0,0,${opacity})`,
    2: `rgba(255,255,255,${opacity})`,
    3: `rgba(0,${b},${b},${opacity})`,
    4: `rgba(250,0,0,0.8)`,
    5: `rgba(250,0,0,1)`,
    6: `rgba(${r},${r},0,1)`
  }
};



rs.paramsByCell = function (cell) {
  return this.pByC;
}

let wd = 400;
let orad = 200;
let topParams = {
  width:wd,
  height:wd,
  framePadding:0.15*wd,
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
  orderByOrdinal : 0,
  randomizeOrder : 0,
  pointJiggle:5,  
  numRows : 66,
  numCols : 66,
  center:Point.mk(0,0),
  outerRadius:orad,
  innerRadius:0.1 * orad,
  center:Point.mk(0,0)
}

Object.assign(rs,topParams);
rs.positionFunction = rs.radialPositionFunction;

rs.initProtos = function () {
  this.circleP = circlePP.instantiate().show();
  this.circleP['stroke-width'] = 0.4;
  this.circleP.fill = "red";
  this.circleP.dimension = 2;
}

rs.shapeGenerator = function () {
  let shape =this.circleP.instantiate().show();
  shape.dimension = 2;
  return shape;
}


rs.boundaryLineGeneratorr = function (p11,p21,rvs) {
  let line = this.lineP.instantiate().show();
  line.setEnds(p11,p21);
  return line
}

rs.initialize = function () {
  
  this.addFrame();
  this.initProtos();
  this.pByC.shapeProto = this.circleP;
  this.generateGrid();
}

export {rs};



