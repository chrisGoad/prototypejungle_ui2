import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('logic');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.7*wd;
  let people = [{name:'Boole',birth:1815,death:1864,whichLine:-5,skip:0},
                {name:'Cantor',birth:1845,death:1918,whichLine:-4,skip:0,events:[{color:'black',year:1874}]},
                {name:'Frege',birth:1848,death:1925,whichLine:-3,skip:0,events:[{color:'cyan',year:1879}]},
                {name:'Gödel',birth:1906,death:1978,whichLine:0,skip:0,events:[{color:'red',year:1930}]},
                {name:'Russell',birth:1872,death:1970,whichLine:-2,skip:0,events:[{color:'green',year:1903},{color:'green',year:1912}]},
                {name:'Turing',birth:1912,death:1954,whichLine:1,skip:1},
              {name:'Zermelo',birth:1871,death:1953,whichLine:-1,skip:0,events:[{color:'blue',year:1922}]}, 
              {name:'Kripke',birth:1940,death:2022,whichLine:2,skip:1},
               
  ];
    let eventTexts = [{color:'black',text:'Set Theory 1874',whichLine:2,textSep:70},{color:'cyan',text:'Predicate Logic 1874',whichLine:3,textSep:85},
                      {color:'green',text:"Russell's Paradox 1903, Principia Mathematica 1912 (with Whitehead)",whichLine:4,textSep:235},
                      {color:'blue',text:"Axiomatic Set Theory 1922 (with Fraenkel)",whichLine:5,textSep:150},
                      {color:'red',text:"Incompleteness Theorems 1930",whichLine:6,textSep:120}];

  
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,eventTexts,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'A Revolutionary Century of Logic',eventX:-0.4*wd}
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

