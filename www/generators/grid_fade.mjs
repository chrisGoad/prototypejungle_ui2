//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/boundeddRandomGrids.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
//import {rs as addAnimateMethods} from '/mlib/animate.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);	
//addAnimateMethods(rs);	
rs.setName('grid_fade');
	
rs.initProtos = function () {
	rs.rectP  = rectPP.instantiate();
	rs.rectP.fill = 'red';
	rs.rectP.fill = 'white';
	//rs.rectP.fill = 'rgba(55,55,55,0.6)';
	//rs.rectP.fill = 'red';
	rs.rectP['stroke-width'] = 0;
	rs.rectP.width = .5;
	rs.rectP.height = .5;
  rs.blineP  = linePP.instantiate();
  rs.blineP['stroke-width'] = 0.4;
  rs.blineP.stroke = 'cyan';
  rs.blineP.stroke = 'white';

}  

let nr = 64;
//nr = 48;
let wd = 200;
let topParams;
if (radial) {
  topParams = {numRows:0.5*nr,numCols:nr,width:wd,height:wd,outerRadius:wd,innerRadius:0.2*wd,angleMin:-180,angleMax:180,center: Point.mk(0,0),rotation:30,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd};
} else {
  topParams = {numRows:nr,numCols:nr,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd,backStripeVisible:0,numTimeSteps:10};
}

Object.assign(rs,topParams);

	
rs.shapeGenerator = function (rvs,cell) {
	// debugger;
	let {rectP,shapes,numRows} = this;
  let {x,y} = cell;
  let th = (x)/(numRows);
  let rr = Math.random();
  
  let k = ((rr)<th);//0.2;
  if (k) {
   return;
  }
	let shape = rectP.instantiate().show();
	shapes.push(shape);
  let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	return shape;
}




rs.boundaryLineGenerator= function (end0,end1,rvs,cell) {
	let {blineP,numRows,showMissing,lines,updating,lineIndex} =this;
  let {x,y} = cell;
  let th = (x)/(numRows);
  let rr = Math.random();
  let k = ((rr*rr*rr)<th);//0.2;
  if (k) {
   return;
  }
	let line = blineP.instantiate().show();
	lines.push(line);
  line.setEnds(end0,end1);
  let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	line.stroke = rgb;
	return line;
}

rs.boundaryLineUpdaterr = function (line,end0,end1,rvs,cell) {
//debugger;
  line.setEnds(end0,end1);
 // let {r,g,b} = rvs;
//	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
//	line.stroke = rgb;
  line.update();
	return line;
}

rs.initialize = function () {
  debugger;
   let rparams = {step:30,min:100,max:250}
   	this.setupBoundaryRandomizer('r',rparams); 
   	this.setupBoundaryRandomizer('g',rparams); 
   	this.setupBoundaryRandomizer('b',rparams); 
   
  this.initProtos();
  this.initializeGrid();
  this.addBackStripe();
}



export {rs};


