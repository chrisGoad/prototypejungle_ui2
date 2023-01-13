import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addAnimationMethods} from '/mlib/animate0.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);
addAnimationMethods(rs);

rs.setName('drop_circles_16');
 let ht= 500;
let nr = 40;
let topParams = {width:ht,height:ht,numRows:nr,numCols:nr,radius:100,framePadding:1*ht}
Object.assign(rs,topParams);
let numI = 1;
rs.firstDropParams = {dropTries:350,maxDrops:1,numIntersections:numI}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
}  

rs.firstDrop = 0;
rs.initialDrop = function () {
  if (this.firstDrop) {
    let crc = Circle.mk(0.8*0.5*this.height);
    crc.isDisk = 1;
    let crcs = crc.toShape(this.circleP);
    this.firstDrop = 0;
    return {geometries:[crc],shapes:[]};
  }
}

rs.generateDrop= function (p,rvs) {
 // debugger;
  let {height:ht,stepsSoFar:ssf} = this;
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
  crc.isDisk = 1;
  let crcs = crc.toShape(this.circleP);
  crcs.dimension = 0.2*rad;
  crcs.birth = ssf;
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
rs.numSteps = 150;
rs.numSteps = 250;
rs.saveAnimation = 1;
rs.removedSoFar = 0;
rs.stepInterval = 40;
rs.removeDrops = function () {
  let rsf = this.removedSoFar;
  let numR = 15;
  for (let i=rsf;i<rsf+numR;i++) {
    this.removeDrop(i);
  }
  this.removedSoFar = rsf + numR;
}
//let dropParams = {dropTries:350,maxDrops:100,numIntersections:1}
let dropParams = {dropTries:3500,maxDrops:20,numIntersections:numI,maxLoops:100}

rs.theta = 0.01;
rs.deltaTheta = 0.01;
rs.hubble = 1.03;

rs.rotateEm = function () {
  let {shapes,drops,theta,deltaTheta,hubble} = this;
  let ln = shapes.length;
  let rm = geom.rotationMatrix(theta);
  rm.theta = theta+deltaTheta;
  for (let i=0;i<ln;i++) {
    let s = shapes[i];
    let d = drops[i];
    if (d) {
      let p = s.getTranslation();
      let np = p.rotate(rm).times(hubble);
      let pl = p.length();
      let npl = np.length();
      let diff = npl - pl;
     // console.log('pl',pl,'diff',diff);
      s.moveto(np);
      d.center = np;
    }
  }
}
 
rs.stopDrop = rs.numSteps - 100;
rs.maxDist = 500;
rs.pointFilter = function (p) {
  let {stepsSoFar:ssf,numSteps,shapes,stopDrop,maxDist} = this;
  if (ssf > stopDrop) {
    let dist = p.length();
    let tfr = (ssf - stopDrop)/(numSteps - stopDrop);
    let dfr = dist/maxDist;
    console.log('tfr',tfr,'dfr',dfr);
    let pf = tfr < dfr;
    if (!pf) {
      debugger;
    }
    return pf;
  }
  return 1;
}
rs.updateState = function () {
 // debugger;
   let {stepsSoFar:ssf,numSteps,shapes,drops,maxDist} = this;
   if (1 || (ssf < stopDrop)) {
     this.generateDrops(dropParams);
   }
  this.rotateEm();
  //this.removeDrops();
  console.log('update ',ssf);
 // debugger;
  let fc = 0.9;
  let mind = .5;
 // let maxDist = 500;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    let s = shapes[i];
    let d = drops[i];
    if (!d) {
      continue;
    }
    let sh = s.shrinking;
    let r = d.radius;
    let c = d.center;
    let dist = c.length();
    let dim = s.dimension;
    let rs = 0.5*dim;
    let nd;
    if (sh) {
      nd = fc*dim;
    } else  if (rs < r) {
      nd = (1/fc)*dim;
    } else {
      nd = dim;
      sh = s.shrinking = 1;
    }
    if ((nd < mind)|| (dist > maxDist)) {
   // if (dist > maxDist) {
      s.hide();
      drops[i] = undefined;
    } else {
      s.dimension = nd;
      if (sh) {
        d.radius = 0.5*nd;
      }
    }
    s.update();
  };
}


export {rs};


