import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);

rs.setName('drop_circles_14');
 let ht= 500;
let nr = 40;
let topParams = {width:ht,height:ht,numRows:nr,numCols:nr,radius:100,framePadding:-0.1*ht}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:3500,maxDrops:1000000,numIntersections:2}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
}  
rs.initialDrop = function () {
  let crc = Circle.mk(0.8*0.5*this.height);
  crc.isDisk = 0;
  let crcs = crc.toShape(this.circleP);
  return {geometries:[crc],shapes:[]};
}

rs.generateDrop= function (p,rvs) {
  let {height:ht} = this;
  let hht = 0.5*ht;
  let fr = 1- p.length()/(0.5*ht);
  if (fr<0.2) {
   return;
  }
  let radius = rvs.radius;
  let rad = (Math.random() > 0.5)?radius*fr:0.2*radius*fr;
  let alpha = Math.floor(rvs.alpha)/100;
  let b = Math.floor(rvs.b);
  let r = Math.floor(rvs.r);
  let clr = `rgba(${r+100},${r},${100+b})`;
  let fill  = `rgba(250,250,250,${alpha})`;
  let crc = Circle.mk(rad);
  crc.isDisk = 0;
  let crcs = crc.toShape(this.circleP);
  crcs.stroke = clr;
  crcs.fill = fill;
  crcs['stroke-width'] = fr;
  return {geometries:[crc],shapes:[crcs]}
}

rs.initialize = function () {
  this.initProtos();
  this.setupRandomGridForShapes('radius',{step:10,min:10,max:40});
  this.setupRandomGridForShapes('b',{step:20,min:100,max:150});
  this.setupRandomGridForShapes('r',{step:20,min:100,max:150});
  this.setupRandomGridForShapes('alpha',{step:20,min:0,max:100});
  let {dropParams} = this;
  this.addFrame();
  let drops =  this.generateDrops(dropParams);
}

export {rs};


