import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('drop_move');
let ht= 10000;
let topParams = {width:1.5*ht,height:1.5*ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:100}
Object.assign(rs,topParams);

 let initState = {};
  let pspace = {};
 let kind = 'sweep';
rs.addPath = function (n) {
  let {drops} = this;
  let crc = drops[n];
  let cnt = crc.center;
  let dir = Math.atan2(cnt.y,cnt.x);
  let nm = 'p'+n;
  let ln = cnt.length();
  let color = this.randomColorObject();
  initState[nm] = {value:ln,dir,color};
 // pspace[nm] = {kind,step:50,min:ln,max:10000*Math.SQRT2,interval:1,steps:0.5,once:1};
  pspace[nm] = {kind,step:60,min:ln,max:10000*Math.SQRT2,interval:1,steps:0.5,once:1};
}  

rs.addPaths  = function () {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.addPath(i);
  }
}


//let dropParams = {dropTries:150,maxDrops:20}


rs.updateStateOf = function (n) {
  debugger;
  let {shapes,pstate} = this;
  let cstate = pstate.cstate;
  debugger;
  let tm = cstate.time;
  let shape = shapes[n]
  let nm = 'p'+n;
  let nstate = cstate[nm];
  let {dir,value:ln,color} = nstate;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(ln);
  shape.moveto(vec);
  shape.dimension = 0.05*ln;
  let fc = ln/6000;
  debugger;
  //let cscl = ln>3000?1-2*(fc-0.5):1;
  let cscl = Math.max(0,ln>3000?1-2*(fc-0.5):1);
  console.log('ln',ln,'cscl',cscl);
  shape.fill = this.scaleColor(color,cscl);
  //shape.dimension = 59;
  shape.update();
}

rs.updateState = function () {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  for (let i=0;i<6;i++) {
    this.oneDrop();
    this.addPath(ln+i);
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP['stroke-width'] = 0;
  circleP.stroke = 'black';
}  

rs.randomColorObject = function () {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = r;
  //Math.floor(Math.random()*255);
  //let rs = `rgb(${r},${g},${r})`;
  //let rs = {r,g,b};
 let rs = {r:255,g:255,b:255};
 //let rs = {r:0,g:0,b:0};
  debugger;
  return rs;
}


rs.scaleColor = function (clr,ifc) {
  debugger;
  let {r,g,b} = clr;
 // let fc = 1-ifc;
  let fc =ifc;
  let nr = Math.floor(r*fc);
  let ng = Math.floor(g*fc);
  let nb = Math.floor(r*fc); 
  console.log('fc',fc,'r,g,b',r,g,b,'nr,ng,nb',nr,ng,nb);
  let rs = `rgb(${nr},${ng},${nr})`;
  //let rs = 'rgb(100,100,100)';
  debugger;
  return rs;
}
rs.oneDrop = function () {
debugger;
  let {shapes,drops,pstate}  = this;
  let {cstate} = pstate;
  let {time} = cstate;
  let rwd = 400;
  let hrwd = 0.5*rwd;
  //let rect = Rectangle.mk(Point.mk(-hrwd,-hrwd),Point.mk(rwd,rwd));
  //let pnt = this.genRandomPoint(rect);
  let numdirs = Math.max(128-.9*time,32);
  let dir = (Math.floor(Math.random()*numdirs)/numdirs)*2*Math.PI;
  let pnt = Point.mk(Math.cos(dir),Math.sin(dir)).times(600+time?10*Math.pow(time,1.2):0);
  debugger;
 // let ln = pnt.length();
 // if (ln>400) {
 //   return;
 // }
  let crc = Circle.mk(pnt,40);
  let crcs = crc.toShape(this.circleP);
 // crcs.moveto(pnt);
  //crc.moveto(pnt);
  shapes.push(crcs);
  drops.push(crc);
  crcs.dimension = 40;
  crcs.fill = 'white';
  //crcs.fill = this.randomColor();
}

rs.callAtCycleEnd = function (nm) {
}

rs.numSteps = 230;
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  this.setBackgroundColor('white');
  this.setBackgroundColor('black');

  //this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  this.drops = [];
  this.set('shapes',arrayShape.mk());
  for (let i=0;i<0;i++) {
   this.oneDrop();
  //this.addPath(ln);
  }
  this.addPaths();
 let pstate = {pspace,cstate:initState};
 this.pstate = pstate;
  
}

rs.numSteps = 100;
rs.saveAnimation = 1;
export {rs};


