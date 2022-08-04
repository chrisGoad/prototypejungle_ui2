
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_11');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:8};

rs.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] =0 ;
}



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

rs.displayCell = function (qd) {
  let {shapes,polygonP,width:wd,circular} = this;
  let pgon = qd.polygon;
  let rs = pgon.toShape(polygonP,1);
  let c = pgon.center();
  if ((c.length()>0.5*wd) && circular) {
    return;
  }
  let  lnw = qd.where.length;
  if ((lnw <7 ) && circular) {
    return;
  }
  let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = strokew;
  rs.fill = this.computeFill();
  shapes.push(rs);
}


rs.offCenter = 0.2;
rs.computeSplitParams = function (qd) {
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.dimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*this.offCenter));
  // return [rp,.3,.5,0.5,0.3];
   return [rp,.5,.5,0.5,0.5];

  //return [c,.7,.3,0.7,.3];
  return [c,.55,.52,0.52,0.52];
}

rs.initialPolygon = Rectangle.mk(Point.mk(-0.5*wd,-0.5*wd),Point.mk(wd,wd)).toPolygon();
rs.initialize = function () {
  let {width:wd,height:ht,quadParams,initialPolygon:pgon} = this;
  this.addFrame();
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

      

