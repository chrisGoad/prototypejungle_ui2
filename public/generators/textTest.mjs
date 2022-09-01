import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as basicP} from '/generators/basics.mjs';



let rs = basicP.instantiate();
debugger;
rs.setName('textTest');

let wd = 100;
let hwd = 0.5*wd;
let topParams = {width:wd,height:wd,framePadding:0.1*wd,frameStroke:'white'};
Object.assign(rs,topParams);


rs.initProtos = function () {
  let textP = this.textP =  textPP.instantiate();
  textP["font-size"] = "12";
  textP["font-style"] = "normal";
  textP["font-family"] = "arial";
  textP["font-weight"] = "normal";
  textP.stroke = 'white';
  //textP.fill = 'black';
  //textP['stroke-width'] =.05;
}

rs.initialize = function () {
  debugger;
  this.addFrame();
  this.initProtos();
  let txt0 = this.textP.instantiate();
  txt0.text = "eutelic";
   this.set('txt0',txt0);
 }
  
 export {rs};