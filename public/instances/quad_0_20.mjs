import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_20');

//let topParams = {width:wd,height:wd,framePadding:0.2*wd}
//Object.assign(rs,topParams);
rs.quadParams.levels = 4; // = {chance:1,levels:4,polygonal:1,splitByCenter:1};
let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.4,.9);
rs.adjustProtos = function () {
  debugger;
 // this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] =0 ;
  //this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =0 ;
}


rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()};

rs.quadFill = function (qd) {
 //		 return null;
  let lev = qd.where.length;
  return lev?'yellow':null;
  return 'rgb(0,0,200)';
  return 'rgb(200,200,200)';
  return 'black';//rgb(200,200,200)';
}


rs.quadFillScale = function (qd) {
  let lev = qd.where.length;
  return 0.1;
}

rs.offCenter = 0.2;
rs.quadSplitParams = function (qd) {
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.minDimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*this.offCenter));
   return {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
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
export {rs};

      

