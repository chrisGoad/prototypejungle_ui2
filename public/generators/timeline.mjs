import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';


let rs = basicP.instantiate();

rs.setName('timeline');

rs.setTopParams = function () {
  let wd = 1000;
  let ht = 0.5*wd;
  let d = 0.5*ht;
  let vel = 1;
  let cycleTime = Math.floor(ht/vel)
  let people = [{name:'Hume',birth:1711,death:1776,whichLine:0},{name:'Frege',birth:1848,death:1925,whichLine:1},
                {name:'Kant',birth:1724,death:1804,whichLine:1},{name:'Fichte',birth:1762,death:1814,whichLine:1},
  ];

  //this.setSides(d);
  let topParams = {width:wd,height:ht,people,framePadding:.0*ht,frameStroke:'black',frameStrokeWidth:1,backGroundColor:'white',
  lineSep:40,lineLength:20}
  Object.assign(this,topParams);
}
rs.setTopParams();
rs.yearToX = function (y) {
  debugger;
  let {minYear:miny,maxYear:maxy,width:w} = this;
  let fr = (y-miny)/(maxy-miny);
  let ws = 0.9*w;
  let hws = 0.5*ws;
  let x = fr*ws - hws;
  return x;
}
  

rs.addPerson = function (params) {
  let {name,birth,death,whichLine:wl,skip} = params;
  let {texts,textP,lines,lineP,lineSep} = this;
  let mlife = 0.5*(birth+death);
  let txt = textP.instantiate();
  txt.text = name;
  texts.push(txt);
  let tx = this.yearToX(mlife);
  let bx = this.yearToX(birth);
  let dx = this.yearToX(death);
  let dateY = 10;
  let lineY = wl*lineSep;
   let ty = lineY-10;
  let e0 = Point.mk(bx,lineY);
  let e1 = Point.mk(dx,lineY);
  let bp = e0.plus(Point.mk(12,dateY));
  let dp = e1.plus(Point.mk(-12,dateY));
  let tb = textP.instantiate();
  tb.text = ''+birth;
  texts.push(tb);
  tb.moveto(bp);
  let td = textP.instantiate();
  td.text = ''+death;
  texts.push(td);
  td.moveto(dp);
  let line = lineP.instantiate();
  line.setEnds(e0,e1);
  lines.push(line);
  txt.moveto(Point.mk(tx,ty));
}

rs.addPeople = function () {
  let {people} = this;
  let n=0;
  people.forEach( (p) => {
    let {skip} = p;
    if (!skip) {
      this.addPerson(p);
      n++;
    }
  });
  console.log('num people',n);

}

rs.computeTimeRange = function () {
  debugger;
  let {people} = this;
  let max = -10000;
  let min = 10000;
  people.forEach( (p) => {
    let {birth,death} = p;
    max = Math.max(death,max);
    min = Math.min(birth,min);
  });
  this.minYear = min;
  this.maxYear = max;
}
    


  
  
rs.initProtos = function () {
  let {ht} = this;
  
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'black';
  lineP['stroke-width'] = 2;
  
  let textP = this.textP = textPP.instantiate();
  
}  

rs.saveAnimation = 1;
rs.schedule = [];


rs.initialize = function () {
  debugger;
  let {d,schedule,backGroundColor} = this;
  let bkc = backGroundColor?backGroundColor:'black';
 
 this.setBackgroundColor(bkc);
  this.initProtos();
  this.addFrame();
  this.computeTimeRange();
  let lines = this.set('lines',arrayShape.mk());
  let texts = this.set('texts',arrayShape.mk());
  this.addPeople();
  this.callIfDefined('afterInitialize');

 
}

export {rs};

