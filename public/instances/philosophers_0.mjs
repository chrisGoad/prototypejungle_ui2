import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('philosophers_0');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.5*wd;
  let people = [{name:'Hume',birth:1711,death:1776,whichLine:0},{name:'Frege',birth:1848,death:1925,whichLine:1,skip:1},
                {name:'Kant',birth:1724,death:1804,whichLine:1},{name:'Fichte',birth:1762,death:1814,whichLine:2},
                {name:'Schelling',birth:1775,death:1854,whichLine:3},{name:'Hegel',birth:1770,death:1831,whichLine:-1},
                {name:'Schopenhauer',birth:1788,death:1860,whichLine:4},{name:'Descartes',birth:1596,death:1650,whichLine:-1},
                {name:'Nietzsche',birth:1844,death:1900,whichLine:0},{name:'Leibniz',birth:1646,death:1716,whichLine:-3},
                {name:'Spinoza',birth:1632,death:1677,whichLine:0},{name:'Kierkegaard',birth:1813,death:1855,whichLine:-2},
                {name:'Locke',birth:1632,death:1704,whichLine:-2},{name:'Berkeley',birth:1685,death:1753,whichLine:-1,skip:0},
                {name:'Hobbes',birth:1588,death:1679,whichLine:1},{name:'Rousseau',birth:1712,death:1778,whichLine:-2,skip:0},
  ]
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'Some European Philosophers of the 17th Through 19th centuries'}
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

