
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';

let rs = basicsP.instantiate();

addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);

rs.setName('grid_quilt_3');

let opa = 0.8;

rs.pByC = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,maxSizeFactor:4,genPolygons:0,
	  colorMap:{0: `rgba(0,255,0,${opa}`,
	            1: `rgba(255,0,0,${opa})`,
		          2:`rgba(255,255,255,${opa})`,
	            3:`rgba(0,0,255,0.5)`,
		          4:`rgba(0,0,255,1)`,
		          5:`rgba(0,0,255,${opa})`,
	            6:`rgba(255,255,255,${opa})`},
		sizeMap: {0:1,1:1,2:2,3:2,4:4,5:1,6:1},
};

rs.paramsByCell = function (cell) {
  return this.pByC;
}

let wd =300;
let topParams = {
  pointJiggle:2,	
  numRows : 96,
  numCols : 96,
	width:wd,
	height:wd,
	framePadding  : 0.15*wd,
  orderByOrdinal:1,
  ordinalMap:[0,1,2,3,4,5]
}
Object.assign(rs,topParams);
	
rs.initProtos = function () {
	this.circleP=circlePP.instantiate();
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 1;
}

rs.initialize = function () {
  
  this.addFrame();
	this.initProtos();
  this.pByC.shapeProto = this.circleP;
	this.generateGrid();
}

export {rs};



