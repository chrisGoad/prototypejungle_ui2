
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_15');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:7,polygonal:1};
let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.1,.9);
rs.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] =0 ;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =0 ;
}


//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()};


rs.offCenter = 0.2;
rs.quadSplitParams = function (qd) {
   let v = 0.7;
   //return {ornt:'v',fr0:.6,fr1:.3,fr2:.3,fr3:.6,fr4:.3,fr5:.2};
  // return {ornt:'v',fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v};
   return {ornt:'h',fr0:.2,fr1:.2,fr2:.2,fr3:.6,fr4:0.3,fr5:.2};
}
/*
rs.initialPolygon = Rectangle.mk(Point.mk(-0.5*wd,-0.5*wd),Point.mk(wd,wd)).toPolygon();
rs.initializee = function () {
  let {width:wd,height:ht,quadParams,initialPolygon:pgon} = this;
  //this.addFrame();
  this.initProtos();
  this.strokeWidths = this.computeExponentials(quadParams.levels,0.1,0.9);
 // this.strokeWidths[0] = 0;
 // this.strokeWidths[1] = 0;
 // this.strokeWidths[2] = 0;
  //let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  //debugger;
 //let p = r.toPolygon();
  //let qd = {polygon:p};
  let qd = {polygon:pgon};
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd);
}	
*/
rs.initializee = function () {
  debugger;
  let e0 =  Point.mk(-5,-10);
  let e1 =  Point.mk(15,10);
  let seg = LineSegment.mk(e0,e1);
  let a0 = seg.along(0.25);
  let a1 = seg.along(0.5);
  let a2 = seg.along(0.75);
}
export {rs};

      

