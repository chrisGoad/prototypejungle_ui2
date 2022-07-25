import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as innerDrop} from '/generators/drop_circles_0.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_rects_1');
let ht= 2000;
let nr = 128;
let topParams = {width:ht,height:ht,numRows:nr,numCols:nr,dimension:50,framePadding:0.1*ht,frameStrokee:'white'}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:500,numIntersections:2}

rs.initProtos = function () {
  let rectP = this.rectP = rectPP.instantiate();
  rectP.fill = 'rgba(255,255,0,0)';
  rectP.stroke = 'white';
  rectP['stroke-width'] = 1;
   let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = 1;
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

rs.drawGrid = function () {
  let {numRows,numCols,width:wd,height:ht,lineP} = this;
  let deltaX = wd/numCols;
  let deltaY = ht/numRows;
  let hwd = 0.5*wd;
  let hht = 0.5*ht;
  let cx = -hwd;
  let cy = -hht;
  let lines = this.set("lines",arrayShape.mk());
  for (let i=0;i<=numRows;i++) {
    let top = Point.mk(cx,-hht);
    let bot = Point.mk(cx,hht);
    let sg = LineSegment.mk(bot,top)
    let ln = sg.toShape(lineP);
    lines.push(ln);
    cx += deltaX;
  }
  for (let i=0;i<=numCols;i++) {
    let left = Point.mk(-hwd,cy);
    let right = Point.mk(hwd,cy);
    let sg = LineSegment.mk(left,right)
    let ln = sg.toShape(lineP);
    lines.push(ln);
    cy += deltaY;
  }
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
  
  let xi = Math.floor(ax/cellDimX);
  let yi = Math.floor(ay/cellDimY);
  //let fr = (p.y + hht)/ht;
  let d = p.length();
  let dims = [1,2,4,8];
  //let fills = ['white','blue','cyan','magenta']
  const mkGrey = (v) => `rgba(${v},${v},${v},0.1)`;
  let fills = [mkGrey(255),mkGrey(200),mkGrey(100),mkGrey(100)];
  //let dims = [1,2];
  let which = Math.floor(Math.random()*dims.length);
  let dim = cellDimX*dims[which];
  let sxi = Math.floor(ax/dim);
  let syi = Math.floor(ay/dim);
  let ap = Point.mk((sxi+0.5)*dim-hwd,(syi+0.5)*dim-hht);
  debugger;
  let fdim = 0.5*dim;
  if (d>=hht) {
  //  return;
  } 
  let fr= d/hht;
  //let rad = 5 + (1-fr) * radius;
  //let crc = Circle.mk(rad);
 // let dim = 20+Math.random()*dimension;
  let rct = Rectangle.mkCentered(Point.mk(fdim,fdim));
  rct.isSolid = 1;
//  = function (icenter,iextent) {Circle.mk(10+Math.random()*radius);
  let rcts = rct.toShape(this.rectP);
  let fill = fills[which];
  rcts.fill = fill;
  return {geometries:[rct],shapes:[rcts],pos:ap}
}

rs.initialize = function () {
  let {width:wd,height:ht} = this;
  this.initProtos();
  let {dropParams} = this;
  this.addFrame();
 // this.drawGrid();
  this.addRectangle({width:wd,height:ht,position:Point.mk(0,0),stroke_width:0,fill:'red'});
  let drops =  this.generateDrops(dropParams);
}

export {rs};


