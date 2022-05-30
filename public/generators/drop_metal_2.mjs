
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_metal_2');
let wd = 400;
let topParams = {width:wd,height:wd,dropTries:40,numSegs:4,framePadding:0.1*wd}
let dropParams = {dropTries:40}

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP['stroke-width'] = .3;
}  

rs.lengthFunction = () => 40;


rs.directionFunction = function (p) {
  return  (Math.random() < 0.5)?0:Math.PI/4;
}



rs.strokeFunction = function (p) {
  return 'white';
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
  let v = genRGBval();
  let clr = `rgb(${v},${v},${v})`;
  return  clr;
}

rs.dropAt = function (p) {
  debugger;
  let {width,height,lineP,numSegs} = this;
  let segWidth = (this.lengthFunction(p))/numSegs;
  if (segWidth < 4) {
    return;
  }
  let dir = this.directionFunction(p)
  let hh = height/2;
 // let fr = (p.y+hh)/height;
  let params = {direction:dir,zigzag:1,randomness:0,vertical:1,widths:[segWidth],heightRatio:0.05,numSegs:numSegs,pos:p};
  //let params2 = Object.assign({},params);
  //params2.direction = 0;
  //let segs = (Math.random() < 0.5)?this.wigglySegments(params):this.wigglySegments(params2);
  let segs = this.wigglySegments(params);
  let lines = segs.map((sg) => this.genLine(sg,lineP));
  let clr = this.strokeFunction(p);
  lines.forEach( (line) => line.stroke = clr);
  return [segs,lines];
}

rs.initialDrop = function () {
  let {width,height,lineP} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg,lineP)); 
  return [segs,lines];
}

rs.initialize = function () {
  this.initProtos();
  this.addFrame();
  this.generateDrop(dropParams);
}

export {rs};


