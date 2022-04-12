

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addSphereMethods} from '/mlib/sphere.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addSphereMethods(rs);
addParamsByCellMethods(rs);
	
rs.setName('grid_sphere');

let opa = 0.3;
let r = 255;
let b = 255;
rs.pByC  = {
  widthFactor:1,
  heightFactor:1,
  maxSizeFactor:6,
  sizePower:2,
  sizeMap:{0:.5,1:1,2:2,3:3,4:4,5:0,6:0},
  colorMap:{
    0:'rgba(0,255,0,1)',
    1:'rgba(255,0,0,0.4)',
    2:'rgba(255,255,255,0.4)',
    3:'rgba(0,255,255,0.4)',
    4:'rgba(0,0,255,0.8)',
    5:'rgba(0,0,0,1)',
    6:'rgba(255,255,0,1)'
  }
};
    

rs.paramsByCell = function (cell) {
  return this.pByC;
}

let bkdim = 1200;

let topParams = {
  pointJiggle:0,  
  numRows : 96,
  numCols : 96,
  width:50,
  height:50,
  frameWidth:bkdim,
  frameHeight:bkdim,
  sphereCenter:Point3d.mk(0,0,-20),
  sphereDiameter:35,
  focalPoint:Point3d.mk(0,0,50),
  focalLength:10,
  cameraScaling:100
}
Object.assign(rs,topParams);

rs.initProtos = function () {
  let polygonP = this.set('polygonP',polygonPP.instantiate()).hide();
  polygonP.stroke = 'rgba(0,0,0,.8)';
  polygonP['stroke-width'] = 0;
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
  rectP.stroke = 'rgba(0,0,0,.8)';
  rectP['stroke-width'] = 0; 
}

rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 this.pByC.shapeProto = this.polygonP;
 this.addFrame();
 core.root.backgroundColor = 'black';
 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.generateGrid();
}


export {rs}



