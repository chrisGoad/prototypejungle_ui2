import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('philosophers_1');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.7*wd;
  let people = [{name:'Boole',birth:1815,death:1864,whichLine:-5,skip:0},{name:'Cantor',birth:1845,death:1918,whichLine:-4,skip:0,events:[1874]},
                {name:'Frege',birth:1848,death:1925,whichLine:-3,skip:0},{name:'Gödel',birth:1906,death:1978,whichLine:0,skip:0},
                {name:'Russell',birth:1872,death:1970,whichLine:-1,skip:0},{name:'Turing',birth:1912,death:1954,whichLine:1,skip:1},
              {name:'Zermelo',birth:1871,death:1953,whichLine:-2,skip:0}, {name:'Kripke',birth:1940,death:2022,whichLine:2,skip:1},
               
  ]
  
  
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'Modern Logicians'}
  Object.assign(this,topParams);
}
rs.setTopParams();

    


  
  
rs.initProtos = function () {
  let {ht} = this;
  
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'black';
  lineP['stroke-width'] = 2;   
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP.dimension = 15;
  //circleP.radius = 5;
  circleP['stroke-width'] = 0;
  
  
  let textP = this.textP = textPP.instantiate();
  
}  


export {rs};

