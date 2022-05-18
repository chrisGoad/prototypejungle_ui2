import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addDropMethods} from '/mlib/dropCircles.mjs';

let rs = basicP.instantiate();

addRandomMethods(rs);
addDropMethods(rs);


rs.setName('drop_circles',3);
let ht= 2000;
ht = 6000;
let nrc = 100;
let topParams = {numRows:nrc,numCols:nrc,width:ht,height:ht,framePadding:0.15*ht}

let dropParams = {dropTries:150,radius:60}


Object.assign(rs,topParams);

rs.initProtos = function () {
  let lineP = this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1;
  this.lineP['stroke-width'] = 6;
  let circleP = this.circleP = circlePP.instantiate();
  circleP.dimension = 20;
  circleP.fill = 'rgb(255,255,255)';
 // circleP.fill = 'transparent';
  circleP.stroke = 'white';
  circleP['stroke-width'] = 0;
}  
/*
rs.dropAt = function (p) {
  debugger;
  let rd = this.radiusGenerator(p);
  let gcrc = geom.Circle.mk(p,rd);
  let scrc = this.circleP.instantiate();
  scrc.moveto(p);
  scrc.dimension = 2*rd;
  return [gcrc,scrc];
}
 */
  
rs.numCalls = 0;
rs.radiusGeneratorr= function (p) {
  //let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
  let cell = this.cellOf(p);
  let rvs = this.rvsAtCell(cell);
   let rad = rvs.radius;
   return rad;
  
}
rs.radiusGenerator= function (p) {
  let ln = p.length()-400;
  return 0.01*ln;
 }

rs.initialize = function () {
  debugger;
  this.initProtos();
  //let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,lineP} = this;
  let shapes = this.set('shapes',arrayShape.mk());
  this.setupRandomGridForShapes('radius',{step:10,min:10,max:100});
  this.addFrame();
  let rwd = 1.1*ht;
  this.addRectangle({width:rwd,height:rwd,stroke_width:4,stroke:'white'});
 // this.addRectangle({width:number,height:number,stroke_width:number,position:Point=Point(0,0),stroke:color='white',fill:color='Transparent':});

  let drop =  this.generateCircleDrop(dropParams);
  let {points,radii} = drop;
  let ln  = points.length;
  for (let i=0;i<ln;i++) {
    let p = points[i];
    if (p.length() > 3000) {
      continue;
    }
    let crc = this.circleP.instantiate();
    crc.dimension = 2*radii[i];
    let clr = (Math.random() < 1)?'rgb(200,200,200)':'white';
    crc.fill = clr;    
    shapes.push(crc);
    crc.moveto(points[i]);
   }
 // return;
 // let points = this.pointsFromCircleDrops();
  //let p = points[0];
 // p.onFringe = 1
  //this.generateWeb(pnts,lineP);
  //this.generateWeb(Object.assign({points},webParams));
}

export {rs};


