
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_15');
debugger;
let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:7,polygonal:1};
//let strokeWidths = rs.quadParams.strokeWidths = [];
//rs.computeExponentials(strokeWidths,levels,0.1,0.9);

rs.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] =0 ;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =0 ;
    this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP['stroke-width'] =.05;
}


//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}
//rs.offCenter = 0.2;
rs.quadSplitParamss = function (qd) {
   //let v = 0.7;
   debugger;
   if (this.sp) {
     return this.sp;
   }
   //return {ornt:'v',fr0:.6,fr1:.3,fr2:.3,fr3:.6,fr4:.3,fr5:.2};
  // return {ornt:'v',fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v};
  let v = {low:.45,high:.55};
   let rs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
   //let rs = this.randomizeFrom({ornt:['h','v'],fr0:{low:.2,high:.8},fr1:{low:.2,high:.8},fr2:{low:.2,high:.8},fr3:{low:.2,high:.8},fr4:{low:.2,high:.8},fr5:{low:.2,high:.8}});
   this.sp = rs;
   //let rs = this.randomizeFrom({ornt:['h','v'],fr0:{low:.2,high:.6},fr1:.2,fr2:.2,fr3:.6,fr4:0.3,fr5:.2});
   console.log('ornt',rs.ornt,'fr0',rs.fr0);
  return rs;
}


export {rs};

      

