//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/grid0.js',
//function (linePP,circlePP,rectPP,addGridMethods) {
//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',

//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();


  addGridMethods(rs);
  addRandomMethods(rs);
	//rs.initProtos();
	//rs.saveImage = true;
	rs.setName('grid_2');
  //rs.loadFromPath = 0;


let wd = 300;
let nr= 40
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,backgroundColor:'rgb(200,0,0)'};
Object.assign(rs,topParams);

  
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(00,200,200)';
	this.circleP.dimension = 4;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'rgb(200,0,0)';
}  
rs.rgb2color = function (r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
}

 let trueCount = 0;
 let falseCount = 0;

rs.shapeGenerator = function (rvs) {
	debugger;
	let shapes = this.shapes;
	let wv = rvs.which;
	let showCircle = wv > 50;
	console.log('wv',wv,showCircle,trueCount,falseCount);
  let len = rvs.length;
  let shape;
	if (showCircle) {
		trueCount++;
		shape = this.circleP.instantiate();
		shape.dimension = rvs.dimension;
		shape.update();
		shape.show();
		return shape;
	}
	trueCount++;
	shape = this.rectP.instantiate();
	shape.width = rvs.dimension;
	shape.height = rvs.dimension;
	shape.update();
	shape.show();
	return shape;

}
	

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	debugger;
	let lines = this.lines;
	let line = this.lineP.instantiate();
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}

rs.initialize = function () {
	this.initProtos();
    this.addFrame();
    this.addBackground();
    core.root.backgroundColor = 'black';
	let  rParams = {step:30,min:50,max:200};
	this.setupRandomGridForBoundaries('red', rParams);
	let  dimParams = {step:2,min:1,max:4};
	this.setupRandomGridForShapes('dimension', dimParams);
 	let  wParams = {step:80,min:0,max:100};
	this.setupRandomGridForShapes('which', wParams);
  this.initializeGrid();
}
export {rs};



