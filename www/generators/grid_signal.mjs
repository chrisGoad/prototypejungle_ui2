
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/paramsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);

let sqd = 48;
sqd = 16;
let ar = 2;
let wd = 1000;
 

rs.pByC  = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:wd,height:wd,pointJiggle:3,sizePower:2,maxSizeFactor:3,genCircles:1,
opacity1:0.4,opacity2:0.4,opacity3:0.4,opacity4:0.4,randomizeOrder:1,widthFactor:3,heightFactor:.7,backgroundColor:'yellow',randomizingFactor:0.5,sizePower:3,
colorMap:{0: 'white',
          1:'white',
          2:'white',
          3:'white'},
sizeMap: {0:.1,1:.2,2:.4,3:.8,4:0,5:0,6:0},
};

rs.paramsByCell = function (cell) {
  return this.pByC;
}
	


rs.ordinalMap = {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7};

let topParams = {saveJson:0,loadFromPath:0,randomizeOrder:0,orderByOrdinal:1,widthFactor:.4,heightFactor:.4,numRows:32,numCols:64,width:wd,height:wd,backgroundColor:'black',randomizingFactor:0.5}

Object.assign(rs,topParams);
rs.initProtos = function () {
  this.circleP = circlePP.instantiate();
  this.circleP.stroke = 'rgba(0,0,0,.8)';
  this.circleP['stroke-width'] = 0.2;
}

rs.initialize = function () {
  this.initProtos();
  this.globalParams.shapeProto = this.circleP;
  this.generateGrid();
}

export {rs};

