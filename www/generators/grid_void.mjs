
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_void');


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
  let {numRows,numCols,rectP} = this;
  let {x,y} = cell;
  let cx = numCols/2;
  let cy = numRows/2;
  // {x:cx,y:cy} are coordinates of center
  let maxd = Math.sqrt(cx*cx + cy*cy);
  let xdc = x - cx;
  let ydc = y - cy;
  let cd = Math.sqrt(xdc*xdc + ydc*ydc); // distande from center
  let df = cd/maxd; //fractional distance from center; 1 = far as possible; 0 = at center
  let yf = y/numRows;
  let wf =  1.3* df;
  pbc.widthFactor = wf;
  pbc.heightFactor = wf;
  pbc.shapeProto = rectP;
  return pbc;
}
	
rs.globalParams = {genCircles:0,genPolygons:0,randomizingFactor:0};
let wd = 100;

let topParams = {
  pointJiggle:1,	
  numRows : 96,
  numCols : 96,
  width:wd,
  height:wd,
  backgroundColor : 'red',
  framePadding:15,
}
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
  let rect = this.set('rect',this.rectP.instantiate()).show();
  let rdim = 10;
  rect.width = rdim;
  rect.height = rdim;
  rect.fill = 'black';
  this.addFrame();
}

export {rs};




