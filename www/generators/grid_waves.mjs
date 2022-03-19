
//core.require('/shape/polygon.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
//function (polygonPP,rs,addGridMethods,addRandomMethods) {
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
  
rs.setName('grid_waves');
let wd = 400;
let topParams = {width:400,height:400,numRows:100,numCols:100,pointJiggle:10};

Object.assign(rs,topParams);
	

rs.initProtos = function () {
  this.polygonP = polygonPP.instantiate();
  this.polygonP['stroke-width'] = 0;
  this.polygonP.stroke = 'yellow';
  this.polygonP.fill = 'transparent';
}  
	

rs.colorGenerator = function (rvs,cell) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${g},${b})`;
	return rgb;
}

rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polygonP,deltaX,deltaY} = this;
	let {ulx,uly,urx,ury,lrx,lry,llx,lly,interior} = rvs;
	let ul = Point.mk(-ulx,-uly).times(deltaX/200);
	let ur = Point.mk(urx,-ury).times(deltaX/200);		
	let lr = Point.mk(lrx,lry).times(deltaX/200);
	let ll = Point.mk(-llx,lly).times(deltaX/200);
	let col = cell.x;
  let shape = polygonP.instantiate();
  shapes.push(shape);
	//shape.corners = [ul,ur,lr,ll,ul];
	shape.corners = [ul,ur,lr,ll];
	shape.update();
	let clr = this.colorGenerator();
	shape.fill = clr;
	//if (interior > 0.5) {
	//}
	shape.show()
  return shape;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
  this.addBackStripe();
	let rmin = 0;
	let rmax = 50;
	let rstep = 15;
	this.setupShapeRandomizer('ulx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('uly',  {step:rstep,min:rmin,max:rmax});
  this.setupShapeRandomizer('urx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('ury',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lrx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lry',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('llx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lly',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('interior',  {step:0.1,min:0,max:1});
  this.initializeGrid();
}	
export {rs};

 