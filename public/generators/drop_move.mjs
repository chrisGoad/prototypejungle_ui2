import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('drop_move');
let ht= 6000;
let topParams = {width:ht,height:ht}
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
  initState[nm] = {value:ln,dir};
  pspace[nm] = {kind,step:50,min:ln,max:3000,interval:1,steps:0.5};
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
  let shape = shapes[n]
  let nm = 'p'+n;
  let nstate = cstate[nm];
  let {dir,value:ln} = nstate;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(ln);
  shape.moveto(vec);
  shape.dimension = 0.2*ln;
  //shape.dimension = 59;
  shape.update();
}

rs.updateState = function () {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'yellow';
  circleP['stroke-width'] = 1;
  circleP.stroke = 'black';
}  

rs.oneDrop = function () {
  let {shapes,drops}  = this;
  let rwd = 400;
  let hrwd = 0.5*rwd;
  let rect = Rectangle.mk(Point.mk(-hrwd,-hrwd),Point.mk(rwd,rwd));
  let pnt = this.genRandomPoint(rect);
  let ln = pnt.length();
  if (ln>400) {
    return;
  }
  let crc = Circle.mk(pnt,40);
  let crcs = crc.toShape(this.circleP);
 // crcs.moveto(pnt);
  //crc.moveto(pnt);
  shapes.push(crcs);
  drops.push(crc);
  crcs.dimension = 400;
}



rs.initialize = function () {
  debugger;
  this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  this.drops = [];
  this.set('shapes',arrayShape.mk());
  for (let i=0;i<20;i++) {
   this.oneDrop();
  }
  this.addPaths();
 let pstate = {pspace,cstate:initState};
 this.pstate = pstate;
  
}

export {rs};


