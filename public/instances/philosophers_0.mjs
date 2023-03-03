import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('philosophers');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.5*wd;
  let people = [{name:'Hume',birth:1711,death:1776,whichLine:0},{name:'Frege',birth:1848,death:1925,whichLine:1},
                {name:'Kant',birth:1724,death:1804,whichLine:1},
  ]
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20}
  Object.assign(this,topParams);
}
rs.setTopParams();

    


  
  
rs.initProtos = function () {
  let {ht} = this;
  
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'black';
  lineP['stroke-width'] = 2;
  
  let textP = this.textP = textPP.instantiate();
  
}  


export {rs};

