
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


let pbc  = {
  widthFactor:1,
  heightFactor:1,
  maxSizeFactor:3,
  sizePower:2,
  sizeMap:  {0:1,1:1,2:2,3:4},
  colorMap: 
    {
      0:`rgba(${255},0,0,0)`,
      1:`rgba(${255},0,0,0.4)`,
      2:`rgba(255,255,255,0.4)`,
      3:`rgba(0,0,0,1)`,
    }
};
rs.paramsByCell = function (cell) {
  pbc.shapeProto = this.rectP;
  return pbc;
}
	
let wd = 100;
let nr = 96;
let topParams = {pointJiggle:1,numRows:nr,numCols:nr,width:wd,height:wd,backgroundColor:'red',framePadding:0.15*wd};
Object.assign(rs,topParams);

rs.initProtos = function () {
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
  this.rectP.stroke = 'rgba(0,0,0,.8)';
  this.rectP['stroke-width'] = 0.2;
}


rs.initialize = function () {
  this.initProtos();
  this.addBackground();
  this.generateGrid();
  this.addFrame();
}

export {rs};




