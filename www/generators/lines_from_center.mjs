
//core.require('/line/line.js','/mlib/lines.js','/gen0/Basics.js',
//function (linePP,addMethods,linesP) {



import {rs as linePP} from '/line/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addLinesMethods} from '/mlib/lines.mjs';	

let rs = basicP.instantiate();
addLinesMethods(rs);


debugger;	//this.initProtos();
//core.vars.whereToSave = 'images/grid_1_1.jpg';
rs.setName('lines_from_center');
let wd = 200;
let topParams = {width:wd,height:wd,numLines:5000,angleMin:-90,angleMax:90,backgroundColor:'black',lineColor:'white'};
Object.assign(rs,topParams);


	
 rs.excludeLineFunction = function (sg) {
    let md = sg.middle();
		let ln = md.length();
    return ln > 40;
  }
		
	
rs.initProtos = function () {
  this.set('lineP',linePP.instantiate().show());
  this.lineP.stroke = this.lineColor;
  this.lineP['stroke-width'] = .07; 	
}  

rs.initialize = function () {
  this.initProtos();
  this.addBackground();
  this.generateLines({lineP:this.lineP});
  //this.generateLines({lineP:this.lineP,rect:this.canvasToRectangle()});
}

export {rs}

