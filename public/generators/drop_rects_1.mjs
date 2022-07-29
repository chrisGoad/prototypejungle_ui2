import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_rects_1');
let ht= 2000;
let nr = 128;
let topParams = {width:ht,height:ht,numRows:nr,numCols:nr,dimension:50,framePadding:0.1*ht}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:500,numIntersections:2}

rs.initProtos = function () {
  let rectP = this.rectP = rectPP.instantiate();
  rectP.stroke = 'white';
  rectP['stroke-width'] = 1;
}  


rs.genRandomPoint = function (irect) {
  let {numRows,numCols,width:wd,height:ht} = this;
  let cellDimX = wd/numCols;
  let cellDimY= ht/numRows;
  let rect;
  if (irect) {
     rect = irect;
  } else {
    let cx = -0.5*wd;
    let cy = -0.5*ht;
    rect = Rectangle.mk(Point.mk(cx,cy),Point.mk(wd,ht));
  }
  let {corner,extent} = rect;
  let lx = corner.x;
  let ly = corner.y;
  let x = (Math.floor(Math.random()*numCols)/numCols) * extent.x + lx + 0.5*cellDimX;
  let y = (Math.floor(Math.random()*numRows)/numRows) * extent.y + ly + 0.5*cellDimY;;
  return Point.mk(x,y);
}


rs.generateDrop= function (p) {
  let {width:wd,height:ht,dimension,numRows,numCols} = this;
  let {x,y} = p;
  let hwd = 0.5*wd;
  let hht = 0.5*ht;
  let cellDimX = wd/numCols;
  let cellDimY = ht/numRows;
  let ax = x+hwd -0.5*cellDimX;
  let ay = y+hwd -0.5*cellDimY;
  let dims = [1,2,4,8];
  const mkGrey = (v) => `rgba(${v},${v},${v},0.1)`;
  let fills = [mkGrey(255),mkGrey(200),mkGrey(100),mkGrey(100)];
  let which = Math.floor(Math.random()*dims.length);
  let dim = cellDimX*dims[which];
  let sxi = Math.floor(ax/dim);
  let syi = Math.floor(ay/dim);
  let ap = Point.mk((sxi+0.5)*dim-hwd,(syi+0.5)*dim-hht);
  let fdim = 0.5*dim;
  let rct = Rectangle.mkCentered(Point.mk(fdim,fdim));
  rct.isSolid = 1;
  let rcts = rct.toShape(this.rectP);
  rcts.fill = fills[which];
  return {geometries:[rct],shapes:[rcts],pos:ap}
}

rs.initialize = function () {
  let {width:wd,height:ht} = this;
  this.initProtos();
  let {dropParams} = this;
  this.addFrame();
  this.addRectangle({width:wd,height:ht,position:Point.mk(0,0),stroke_width:0,fill:'red'});
  let drops =  this.generateDrops(dropParams);
}

export {rs};


