import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
addDropMethods(rs);
debugger;
rs.setName('drop_move');
let ht= 100;
let hht = 0.5*ht;
let topParams = {width:ht,height:ht,framePadding:.1,frameStrokee:'white',frameStrokeWidth:100}
Object.assign(rs,topParams);

 let initState = {};
  let pspace = {};
rs.pstate = {pspace,cstate:initState};
 let kind = 'sweep';
rs.addPath = function (n) {
  let {drops,shapes} = this;
  let crc = shapes[n];
  let nm = 'c'+n;
  let inv = {value:-hht,y:crc.getTranslation().y};
  initState[nm] = inv;
  pspace[nm] = {kind,step:1,min:-hht,max:hht,interval:1,steps:0.5,once:0};
}  

rs.addPaths  = function (frm) {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=frm;i<ln;i++) {
    this.addPath(i);
  }
}

let dropParams = {dropTries:150,maxDrops:4}


//let dropParams = {dropTries:150,maxDrops:20}
rs.generateDrop= function (oneD) {
 
  let crc = Circle.mk(2);
  let crcs = crc.toShape(this.circleP,.5)
  return {geometries:[crc],shapes:[crcs]}; 
 }

rs.updateStateOf = function (n) {
  let {shapes,pstate,drops} = this;
  let cstate = pstate.cstate;
  let tm = cstate.time;
  let shape = shapes[n]
  let drop = drops[n]
  let nm = 'c'+n;
  let nstate = cstate[nm];
  let {value:x,y} = nstate;
  let pnt = Point.mk(x,y);
  shape.moveto(pnt);
  drop.center = pnt;
  debugger;
  if (x>0) {
    shape.fill = 'black';
    shape.update();
  } else {
    shape.fill = 'white';
    shape.update();
  }
}

rs.updateState = function () {
  debugger;
  let {shapes,pstate} = this;
  let {cstate} = pstate;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  let tm = cstate.time;
  if (tm%1 === 0) {
      this.generateDrops(dropParams);
  }
  this.addPaths(ln);
  return;
  for (let i=0;i<6;i++) {
    this.oneDrop();
    this.addPath(ln+i);
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 1;
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
rs.oneDropp = function () {
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
  let crc = Circle.mk(pnt,4);
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
    this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(-0.25*ht,0),stroke_width:0,fill:'rgb(0,0,0)'});
  this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(0.25*ht,0),stroke_width:0,fill:'rgb(255,255,255)'});
  this.drops = [];
  this.set('shapes',arrayShape.mk());
  const mkVline = (x) => {
    let top=0.5*ht;
    let bot = -top;
    let p0 = Point.mk(x,top);
    let p1 = Point.mk(x,bot);  
    let vline = oneDf.mkStraight(p0,p1);
    vline.ornt = 'v';
   
    return vline;
  }
  debugger;
  let Vline = mkVline(-0.5*ht);
  dropParams.oneD = Vline;

  let rnd = Vline.randomPoint();
  this.generateDrops(dropParams);
  //this.generateDrops(dropParams);
  let drops = this.drops;
  debugger;
  this.addPaths(0);
  return;
  for (let i=0;i<0;i++) {
   this.oneDrop();
  //this.addPath(ln);
  }
  this.addPaths(0);
 let pstate = {pspace,cstate:initState};
 this.pstate = pstate;
  
}

rs.numSteps = 500;
export {rs};


