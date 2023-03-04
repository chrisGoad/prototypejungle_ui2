import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('mathematicians_0');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.5*wd;
  let people = [{name:'Gauss',birth:1777,death:1885,whichLine:-2,skip:0},{name:'Noether',birth:1882,death:1935,whichLine:1,skip:0},
                {name:'Pascal',birth:1623,death:1662,whichLine:-1,skip:0},{name:'Euler',birth:1707,death:1783,whichLine:2,skip:0},
                {name:'Hilbert',birth:1862,death:1943,whichLine:-1,skip:0},{name:'Poincaré',birth:1854,death:1912,whichLine:2,skip:0},
                {name:'Gödel',birth:1906,death:1978,whichLine:-4,skip:0},{name:'Descartes',birth:1596,death:1650,whichLine:0},
                {name:'Grothendieck',birth:1928,death:2014,whichLine:-2,skip:0},{name:'Cantor',birth:1845,death:1918,whichLine:0},
                {name:'Turing',birth:1912,death:1978,whichLine:-3,skip:0},{name:'Galois',birth:1811,death:1832,whichLine:0},
                {name:'Bernoulli',birth:1655,death:1705,whichLine:-3,skip:0},{name:'Fermat',birth:1607,death:1665,whichLine:1},
                {name:'Fourier',birth:1768,death:1830,whichLine:-3,skip:0},{name:'Ramanujan',birth:1887,death:1920,whichLine:3},
                {name:'Newton',birth:1643,death:1727,whichLine:3,skip:0},{name:'Lagrange',birth:1736,death:1813,whichLine:-1},
                {name:'Bayes',birth:1701,death:1761,whichLine:0,skip:0},{name:'Laplace',birth:1749,death:1827,whichLine:1},
                {name:'Leibniz',birth:1646,death:1716,whichLine:-2,skip:0},{name:'von Neumann',birth:1903,death:1957,whichLine:4,skip:0},
                {name:'Cohen',birth:1934,death:2007,whichLine:0,skip:0},{name:'Hamilton',birth:1805,death:1865,whichLine:4,skip:0},
                {name:'Wiles',birth:1953,death:2023,whichLine:1,skip:0},{name:'Hamilton',birth:1805,death:1865,whichLine:4,skip:1},
               
  ]
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'Some Mathematicians of the Modern Era'}
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

