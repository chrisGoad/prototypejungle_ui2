import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
addDropMethods(rs);
rs.setName('drop_move_2');
let ht= 100;
let hht = 0.5*ht;
rs.wb = 1; // white background
let topParams = {width:ht,height:ht,framePadding:.1*ht,frameStroke:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);
let circDim = 2;
 let initState = {};
  let pspace = {};
rs.pstate = {pspace,cstate:initState};


rs.dropParams = {dropTries:150,maxDrops:16}
rs.rcda = 57*rs.dropParams.maxDrops;
 let kind = 'sweep';
rs.addPath = function (n) {
  debugger;
  let {dropys,shapes,rcda} = this;
  //let crc = shapes[n];
  let y = dropys[n%rcda];
  let nm = 'c'+n;
  //let inv = {value:-hht,y:crc.getTranslation().y};
  //let inv = {value:-hht,y:d.center.y};
  let inv = {value:-hht,y};
  initState[nm] = inv;
  pspace[nm] = {kind,step:1,min:-hht,max:hht,interval:1,steps:0.5,once:1};
  pspace[nm] = {kind,step:1,min:-hht,max:0,interval:1,steps:0.5,once:1};
}  

rs.addPaths  = function (frm) {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=frm;i<ln;i++) {
    this.addPath(i);
  }
}


//let dropParams = {dropTries:150,maxDrops:20}
rs.generateDrop= function (oneD) {
  let crc = Circle.mk(1);
  let crcs = crc.toShape(this.circleP,.5);
  crcs.fill = 'transparent';
  crcs.update();
  return {geometries:[crc],shapes:[crcs]}; 
 }

rs.updateStateOf = function (n) {
  let {shapes,pstate,drops,wb} = this;
  let cstate = pstate.cstate;
  let tm = cstate.time;
  let shape = shapes[n]
  let drop = drops[n]
  let nm = 'c'+n;
  let nstate = cstate[nm];
  let {value:x,y} = nstate;
  //let frx = 2*(1-(Math.abs(x)/hht);
  //let frx = 1-(Math.abs(x)/hht);
  let frx = (Math.abs(x)/hht);
  let fry = (Math.abs(y)/hht);
  let angle = fry *2* Math.PI - Math.PI;
  let pnt = Point.mk(Math.cos(angle),Math.sin(angle)).times(frx*hht);
//  let pnt = Point.mk(frx*x,frx*y);
  shape.moveto(pnt);
  shape.dimension = circDim * frx;
  shape.fill = wb?'black':'white';
  drop.center = pnt;
  shape.unhide();
  shape.update();
  return;
  if (x>0) {
    shape.fill = 'black';
    shape.update();
  } else {
    shape.fill = 'white';
    shape.update();
  }
}

  
rs.updateState = function () {
  let {shapes,pstate,rdrops,dropParams,drops,dropys} = this;
  let {cstate} = pstate;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  let tm = cstate.time;
  this.generateDrops(dropParams);
  let aln  = shapes.length;
  for (let i=ln;i<aln;i++) {
    dropys.push(drops[i].center.y);
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
  circleP.fill = 'black';
  circleP.dimension = 1;
  circleP['stroke-width'] = 0;
  //circleP.stroke = 'white';
}  

rs.callAtCycleEnd = function (nm) {
}

rs.numSteps = 230;
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {wb,dropParams} = this;
  this.setBackgroundColor(wb?'white':'black');
  //this.setBackgroundColor('black');

  //this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  //  this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(-0.25*ht,0),stroke_width:0,fill:'rgb(128,128,128)'});
  //  this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(-0.25*ht,0),stroke_width:0,fill:'rgb(0,0,0)'});
  //this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(0.25*ht,0),stroke_width:0,fill:'rgb(255,255,255)'});
 // this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(0.25*ht,0),stroke_width:0,fill:'rgb(128,128,128)'});
  let drops = this.drops = [];
  let dropys = this.dropys = []; 
  let shapes = this.set('shapes',arrayShape.mk());
  const mkVline = (x) => {
    let top=0.5*ht;
    let bot = -top;
    let p0 = Point.mk(x,top);
    let p1 = Point.mk(x,bot);  
    let vline = oneDf.mkStraight(p0,p1);
    vline.ornt = 'v';
   
    return vline;
  }
  let Vline = mkVline(-0.5*ht);
  dropParams.oneD = Vline;

  let rnd = Vline.randomPoint();
  this.generateDrops(dropParams);
  let aln  = shapes.length;
  for (let i=0;i<aln;i++) {
    dropys.push(drops[i].center.y);
  }
  //this.generateDrops(dropParams);
 // let drops = this.drops;
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
rs.chopOffBeginning = 57;
rs.numSteps = 57*2+6;
rs.saveAnimation = 1;
export {rs};


