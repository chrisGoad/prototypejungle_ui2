
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_11');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:7,polygonal:1};
let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:12,root:0.1,factor:.9});
rs.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] =0 ;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =0 ;
}


//rs.quadParams.mangle = {'lengthen':.2,'twist':0.05*Math.PI,within:rs.canvasToRectangle()};

rs.computeFill = function (qd) { 
   const shade = ()=> Math.floor(0*Math.random());
   let r = shade();
   let g = shade();
   let b = shade();
   let fill = `rgb(${r},${r},${r})`;
   //return 'black';
   return fill;
}
 
 
 rs.circular = 0;

rs.displayCellll = function (qd) {
  let {shapes,polygonP,width:wd,circular} = this;
  let pgon = qd.polygon;
  let pgons = pgon.toShape(polygonP,1);
  let c = pgon.center();
  if ((c.length()>0.5*wd) && circular) {
    return;
  }
  let  lnw = qd.where.length;
  if ((lnw <7 ) && circular) {
    return;
  }
  let strokew = this.quadParams.strokeWidths[lnw];
  pgons['stroke-width'] = strokew;
  pgons.fill = this.computeFill();
  pgons.update();
  shapes.push(pgons);
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

export {rs};

      

