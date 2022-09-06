import {rs as textPP} from '/shape/textOneLine.mjs';

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
let topParams = {width:wd,height:wd,framePadding:0.1*wd,frameStrokee:'white'}
Object.assign(rs,topParams);
rs.quadParams = {};
//rs.quadParams = {chance:1,levels:7,polygonal:1};
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
   let textP = this.textP =  textPP.instantiate();
  textP["font-size"] = "12";
  textP["font-style"] = "normal";
  textP["font-family"] = "arial";
  textP["font-weight"] = "normal";
  textP.stroke = 'white';
}



export {rs};

      

