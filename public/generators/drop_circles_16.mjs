import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addAnimationMethods} from '/mlib/animate0.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);
addAnimationMethods(rs);

rs.setName('drop_circles_15');
 let ht= 500;
let nr = 40;
let topParams = {width:ht,height:ht,numRows:nr,numCols:nr,radius:100,framePadding:-0.1*ht}
Object.assign(rs,topParams);

rs.dropParams = {dropTries:3500,maxDrops:1000000,numIntersections:1}
rs.firstDropParams = {dropTries:350,maxDrops:100,numIntersections:1}
rs.dropParams = {dropTries:150,maxDrops:16,numIntersections:1}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
}  

rs.firstDrop = 1;
rs.initialDrop = function () {
  if (this.firstDrop) {
    let crc = Circle.mk(0.8*0.5*this.height);
    crc.isDisk = 0;
    let crcs = crc.toShape(this.circleP);
    this.firstDrop = 0;
    return {geometries:[crc],shapes:[]};
  }
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
  crcs.stroke = 'white';
  crcs.fill = fill;
  crcs['stroke-width'] = fr;
 // debugger;
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
  let drops =  this.generateDrops(this.firstDropParams);
}
rs.removeDrop  = function (n) {
  let {drops,shapes} = this;
  let ln = drops.length;
  if (n<ln) {
    drops[n] = undefined;
    let shp = shapes[n];
    shp.hide();
  }
}
rs.numSteps = 350;
rs.removedSoFar = 0;
rs.stepInterval = 200;
rs.removeDrops = function () {
  let rsf = this.removedSoFar;
  let numR = 15;
  for (let i=rsf;i<rsf+numR;i++) {
    this.removeDrop(i);
  }
  this.removedSoFar = rsf + numR;
}
let dropParams = {dropTries:150,maxDrops:16,numIntersections:1}

rs.updateState = function () {
  debugger;
   let {stepsSoFar:ssf,shapes,drops} = this;
  this.generateDrops(dropParams);
  this.removeDrops();
  console.log('update ',ssf);
  debugger;
  let fc = 0.99;
  let mind = 2;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    let s = shapes[i];
    let d = drops[i];
    let nd = fc * s.dimension;
    if (nd < mind) {
      s.hide();
      drops[i] = undefined;
    } else {
      s.dimension = nd;
    }
    s.update();
  };
}


export {rs};


