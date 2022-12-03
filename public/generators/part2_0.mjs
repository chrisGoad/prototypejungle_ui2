import {rs as textPP} from '/shape/textOneLine.mjs';

import {rs as circlePP} from '/shape/circle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPartMethods} from '/mlib/partTree2.mjs';	
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPartMethods(rs);
addPathMethods(rs);
rs.setName('part2_0');
let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStrokee:'white'}
Object.assign(rs,topParams);
rs.set('partParams',ObjectNode.mk());
//let strokeWidths = rs.quadParams.strokeWidths = [];
//rs.computeExponentials(strokeWidths,levels,0.1,0.9);

rs.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'transparent';
  this.polygonP['stroke-width'] =1;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =.5 ;
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

      

