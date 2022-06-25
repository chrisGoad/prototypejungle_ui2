
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicP.instantiate();
addQuadMethods(rs);
addRandomMethods(rs);
//addDropMethods(rs);
rs.setName('quad_6');

let wd = 1000;
let nr  =20;
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,framePadding:0.1*wd}
Object.assign(rs,topParams);

let quadParams = {levels:8,alwaysSplitBefore:4}

rs.dropParams = {dropTries:3500,maxDrops:1000000}
rs.dropParams = {dropTries:35,maxDrops:10000}

rs.initProtos = function () {
  this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'white';
  this.circleP.fill = 'transparent';
  this.circleP['stroke-width'] = 0; 
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP.fill = 'gray';
  this.rectP['stroke-width'] = .15;
   this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP.fill = 'transparent';
  this.lineP['stroke-width'] =1;//.15;
} 

rs.displayCell = function (qd,depth) {
  let {shapes,cells,rectP} = this;    
  let rect = qd.rectangle;
  let rs = this.genRectangle(rect,rectP,0.8);
  shapes.push(rs);
  
}

rs.splitHere = function (qd,params,pnt,rvs) {
  debugger;
  let  chance = rvs.splitChance;
  return rs.randomSplit(qd,params,chance);
}

rs.showQuad = function() {
  let {width:wd,height:ht} = this;
  this.cells = [];
  this.ishapes = [];
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,quadParams);
    this.displayQuad(qd);
  return;
}

rs.initialize = function () {
  let {width:wd,height:ht,dropParams} = this;
  this.setupRandomGridForShapes('splitChance',{step:.1,min:.6,max:1});

  this.addFrame();
  this.initProtos();
  this.set('shapes',arrayShape.mk());
  debugger;
    
  this.showQuad();
}	

export {rs};

      

