import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as generatorP} from '/generators/timeline.mjs';

let rs = generatorP.instantiate();

rs.setName('philosophers_2');


rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.5*wd;
  let people = [{name:'Parmenides',birth:-520,death:-440,whichLine:-1,skip:0},{name:'Aristotle',birth:-384,death:-322,whichLine:2,skip:0},
                {name:'Socrates',birth:-470,death:-399,whichLine:0,skip:0},{name:'Plato',birth:-428,death:-348,whichLine:1,skip:0},
                {name:'Heraclitus',birth:-525,death:-475,whichLine:1,skip:0},{name:'Zeno',birth:-495,death:-430,whichLine:2,skip:0},
                {name:'Pythagorus',birth:-570,death:-495,whichLine:0,skip:0},{name:'Archimedes',birth:-287,death:-212,whichLine:1,skip:0},
                {name:'Democritus',birth:-460,death:-370,whichLine:3,skip:0},{name:'Epicurus',birth:-341,death:-270,whichLine:-1,skip:0},
                {name:'Eratosthenes',birth:-276,death:-194,whichLine:3,skip:0},{name:'Sophocles',birth:-476,death:-405,whichLine:-2,skip:0},
                {name:'Euripides',birth:-480,death:-406,whichLine:-3,skip:0},{name:'Aeschylus',birth:-525,death:-456,whichLine:-4,skip:0},
                {name:'Euclid',birth:-345,death:-290,whichLine:0,skip:0},{name:'Aeschylus',birth:-525,death:-456,whichLine:-4,skip:1},
               
               
  ]
  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,minYear:1500,maxYear:2000,backGroundColor:'white',
  lineSep:40,lineLength:20,titlePos:Point.mk(0,-0.8*0.5*ht),title:'Ancient Greek Philosophers, Playwrights, and Mathematicians'}
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

