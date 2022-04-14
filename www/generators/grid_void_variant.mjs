
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_void_variant');


rs.pByC  = {
  widthFactor:1,
  heightFactor:1,
  maxSizeFactor:3,
  sizePower:2,
  sizeMap:  {0:0.5,1:0.5,2:1,3:1},
  colorMap: 
    {
      0:'red',
      1:'yellow',
      2:'blue',
      3:'white',
    }
};
rs.paramsByCell = function (cell) {
  return this.pByC;
}
	
let wd = 100;
let nr = 32;
let topParams = {pointJiggle:1,numRows:nr,numCols:nr,width:wd,height:wd,backgroundColorr:'red',framePadding:0.15*wd};
Object.assign(rs,topParams);

rs.initProtos = function () {
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
  this.rectP.stroke = 'rgba(0,0,0,.8)';
  this.rectP['stroke-width'] = 0.2;
}


rs.initialize = function () {
  this.initProtos();
  this.pByC.shapeProto = this.rectP;
  this.addRectangle(this.backFill)();
  this.generateGrid();
  this.addFrame();
}

export {rs};




