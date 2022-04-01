//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',

//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
rs.setName('grid_maze');
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
}  

//let nr = 50;
let nr = 25;
//let ht = 200;
let ht = 20;
let ar = 6;
let wd = ar*ht
let nc = ar*nr;

let topParams = {numRows:nr,numCols:nc,width:wd,height:ht,frameStroke:'white',framePadding:0.01*wd,frameStrokeWidth:1,backgroundColorr:'black'};

Object.assign(rs,topParams);

	
	rs.shapeGenerator = function (rvs,cell) {
	 debugger;
		let {rectP,shapes,height} = this;
		let v = rvs.v;
		let shape  = svg.Element.mk('<g/>');
		let inner = this.rectP.instantiate();
		shape.set('i',inner);
		let r = rvs.red;
		if (v<0.5) {
			inner.width = 4;
			inner.width = 0.04*height;
			inner.height = 3;
			inner.height = 0.03*height;
			inner.fill = 'rgb(100,50,50)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)},1)`;
		} else {
			inner.width = 3;
      inner.width = 0.03*height;

			inner.height = 4;
      			inner.height = 0.04*height;

			inner.fill = 'rgb(50,50,100)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)},1)`;
		}
		shapes.push(shape);
		inner.update();
		inner.show();
		shape.show();
		return shape;
	}

rs.initialize = function () {
  
  let {numRows,numCols} = this;
  	debugger;

	core.root.backgroundColor = 'black';
	this.initProtos();
	this.addFrame();
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j) {
		//debugger;
		let t0 = 0.1*numCols;
		let t1 = 0.5*numCols;
		let t2 = 0.9*numCols;
		let step = 0.3;
		let max,min;
	  if (i < t0) {
			min = 0;
			max = i/t0;
			max = 0;
		} else if (i < t2) {
			min = 0;
			max = 1;
		} else {
			min  = (i-t2)/(1-t2);
			min  = 1;
			max = 1;
		}
		rnp.min = min;
		rnp.max = max;
 		rnp.step = step;
		return rnp;
	}

		
		
this.setupRandomGridForShapes('v', {walkParams});
//this.setupShapeRandomizer('v', {step:0.3,min:0,max:1});
this.setupRandomGridForShapes('red', {step:30,min:150,max:250});


		
		
		debugger;
this.addFrame();
 
this.initializeGrid();
}
export {rs};


