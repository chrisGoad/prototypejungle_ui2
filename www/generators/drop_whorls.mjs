
//core.require('/gen0/drop0.js',function (addDropMethods) {
//core.require('/gen1/drop0_1.js',function (rs) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();

addRandomMethods(rs);
addDropMethods(rs);
addSegsetMethods(rs);

rs.setName('drop_whorls');
let ht  = 400;
let topParams = {width:1.5*ht,height:ht,numRows:20,numCols:30,numSeedRows:4,numSeedCols:4,maxDrops:10000,maxTries:10,lineLength:10,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*ht,backStripeVisible:0,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'last',numSegStarts:16,splitChance:1,splitAmount:0.02 * Math.PI,fanAngles:[0.5*Math.PI,-0.5*Math.PI],randomDirectionChange:0.1*Math.PI}

Object.assign(rs,topParams);

//let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'black',/*'rgb(1,1,1)',*/backgroundPadding:40,separation:15}
//topParams = {width:600,height:400,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'last'}

Object.assign(rs,topParams);


rs.initProtos = function () {
  this.lineP = linePP.instantiate();
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  debugger;
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,clr);
}

/*
rs.genSegmentss = function (p) {
  let {width,height,separation:sep,sepNext,randomGridsForShapes} = this;
  debugger;
  let angle;
  if (0) {
		segs = this.sizedRectangleSegments(sizes,p); //Upper left
		let lines = segs.map((sg) => this.genLine(sg));
		lines.forEach( (line) => line.stroke = clr);
		return ( [segs,lines]);
  }
  let cell = this.cellOf(p);
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} =rvs;
	let rn = Math.random();
  if (p.direction) {
   angle = p.direction + ((rn<0.5)?0.01*Math.PI:-0.01*Math.PI);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let a0 = angle+0.02 * Math.PI;
  let a1 = angle-0.02 * Math.PI;
	let len = 10;//2 + Math.floor(r*4)*4;
	let seg0 = this.genSegment(p,len,a0,sep,sepNext,0);
	let seg1 = this.genSegment(p,len,a1,sep,sepNext,0);
  p.isEnd = 1;
	let ln0 = this.genLine(seg0.end0,seg0.end1,2);
	let ln1 = this.genLine(seg1.end0,seg1.end1,2);
  let clr = `rgb(${r},${r},${r})`;
	ln0.stroke = clr;//'white';//clr;
	ln1.stroke = clr;//'white';//clr;
	return [[seg0,seg1],[ln0,ln1]];
}
*/
rs.genSeeds = function () {
  debugger;
  let {width} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  return this.gridSeeds('white');
}
/*
rs.initialSegmentss = function () {
  let {width,height,separation:sep,sepNext} = this;

  let segs = this.rectangleSegments(width,height);
  let csegs = [];// this.crossSegments(1*width,1*height);
 // let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let numStarts = 4;
  let numRows = 4;
  let invx = width/(numStarts+1);
  let invy = height/(numRows+1);
  let hwd = width/2;
  let hht = height/2;
  let ix = invx-hwd;
 // let iy = hht-invy;
  let iy = hht;
  let angle0 = 0.5*Math.PI;
  let angle1 = -0.5*Math.PI;
  let len = 5;//2 + Math.floor(r*4)*4;
  for (let j=0;j<numRows+1;j++) {
    ix = invx-hwd;
		for (let i=0;i<numStarts;i++) {
			let ip = Point.mk(ix,iy);
			ix += invx;
			let vseg0 =  this.genSegment(ip,len,angle0,sep,sepNext,0);
			let vseg1 =  this.genSegment(ip,len,angle1,sep,sepNext,0);
			asegs.push(vseg0);
			asegs.push(vseg1);
		}	 
    iy -= invy;
  }
  let lines = asegs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
  const rrgb = () => {
    return 0 + Math.floor(Math.random()*154);
  }
  let r = rrgb();
  let g = rrgb();
  let b = rrgb();
  let clr = `rgb(${r},${g},${b})`;
 // lines.forEach((ln) => ln.stroke = clr);//'white');
  return [asegs,lines];
}
*/
rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let lines = asegs.map((sg) => this.genLine(sg)); 
  //lines.forEach((ln) => ln.stroke = 'rgb(100,0,0)');
  //lines.forEach((ln) => ln.stroke = 'cyan');
  return [asegs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
  this.initProtos();
  this.addBackStripe();
	 this.setupColorRandomizer({step:10,min:100,max:240});
/*
 this.setupShapeRandomizer('r',{step:10,min:50,max:240});
 this.setupShapeRandomizer('g',{step:10,min:50,max:240});
 this.setupShapeRandomizer('b',{step:10,min:50,max:240});
*/
	this.initializeDrop();
  this.addBackStripe();
}

export {rs};


