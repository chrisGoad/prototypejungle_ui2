import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('philosophers_1');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.7*wd;
  let people = [{name:'Heidegger',birth:1889,death:1976,whichLine:0,skip:0},{name:'Husserl',birth:1859,death:1938,whichLine:1,skip:0},
                {name:'Frege',birth:1848,death:1925,whichLine:-1,skip:0},{name:'Wittgenstein',birth:1889,death:1951,whichLine:2,skip:0},
                {name:'Rorty',birth:1931,death:2007,whichLine:-1,skip:0},{name:'Arendt',birth:1906,death:1975,whichLine:3,skip:0},
                {name:'Weil',birth:1909,death:1943,whichLine:-2,skip:0},{name:'Davidson',birth:1917,death:2003,whichLine:4,skip:0},
                {name:'Searle',birth:1932,death:2023,stillAlive:1,whichLine:-3,skip:0},{name:'Merleau-Ponty',birth:1908,death:1961,whichLine:5,skip:0},
                {name:' Beauvoir',birth:1908,death:1986,whichLine:-4,skip:0},{name:'Gödel',birth:1906,death:1978,whichLine:-5,skip:0},
                {name:'Sartre',birth:1905,death:1980,whichLine:6,skip:0},{name:'Gödel',birth:1906,death:1978,whichLine:-5,skip:1},
               
  ]
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'Some 20th Century Philosophers'}
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

