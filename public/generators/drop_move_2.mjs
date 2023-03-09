import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
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
let topParams = {width:ht,height:ht,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);
let circDim = 2;
 let initState = {};
  let pspace = {};
rs.pstate = {pspace,cstate:initState};


rs.dropParams = {dropTries:150,maxDrops:16}
rs.cycleL = 57;
rs.rcda = rs.cycleL*rs.dropParams.maxDrops;
 let kind = 'sweep';
rs.addPath = function (n) {
  let {dropys,shapes,rcda} = this;
  //let crc = shapes[n];
  let y = dropys[n%rcda];
  let nm = 'c'+n;
  //let inv = {value:-hht,y:crc.getTranslation().y};
  //let inv = {value:-hht,y:d.center.y};
  let inv = {value:-hht,y};
  initState[nm] = inv;
  //pspace[nm] = {kind,step:1,min:-hht,max:hht,interval:1,steps:0.5,once:1};
  pspace[nm] = {kind,step:1,min:-hht,max:0,interval:1,steps:0.5,once:1};
}  

rs.addPaths  = function (frm) {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=frm;i<ln;i++) {
    this.addPath(i);
  }
  return;
  if (pspace.spin){
  } else {
    pspace.spin = {kind,step:.05*Math.PI,min:0,max:.5*Math.PI,steps:0.5,once:1};
      initState.spin = {value:0};
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

rs.goingIn = 1;
rs.goingInFrames = 100;
rs.nextLineN = 0;
rs.allocateLine = function () {
  let {lines,nextLineN} = this;
  let ln = lines.length;
  let line;
  if (ln<1024) {
    line = this.lineP.instantiate();
    lines.push(line);
  }  else {
    line = lines[nextLineN];
    nextLineN = nextLineN+1;
    if (nextLineN >= ln) {
       nextLineN = 0;
    }
    this.nextLineN = nextLineN;
  }
  line.stroke = 'white';
  line.update();
  return line;
}

rs.linesHidden;

rs.forLines = function (lw,hg,stroke) {
  let {lines} = this;
  for (let i=lw;i<hg;i++) {
    let line = lines[i];
    line.stroke = stroke;
    line.update();
  }
}
rs.hideSomeLines = function (n) {
  let {nextLineN,lines,linesHidden} = this;
  let ln = lines.length;
    debugger;

  let hdut = linesHidden + n;
  if (hdut > ln) {
    this.forLines(linesHidden,ln,'transparent');
    hdut = hdut%ln;
    this.forLines(0,hdut,'transparent');
  } else {
    this.forLines(linesHidden,hdut,'transparent');
  }
  this.linesHidden = hdut;

}
  
    

  
rs.updateStateOf = function (n) {
  let {shapes,lines,pstate,drops,wb,goingIn} = this;
 // debugger;
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
  
  let omfrx = 1-frx;
  let gfrx = goingIn?frx:omfrx;
  if ((gfrx >  0.95)||(gfrx < 0.05)) {
    shape.hide();
    shape.inactive = 1;
    shape.update();
    return;
  } else {
     shape.unhide();
     shape.inactive = 0;
     shape.update();
  }
  let inactive = shape.inactive;
  let spin = 0.8*frx*Math.PI;
  let fry = (Math.abs(y)/hht);
  let angle = (fry *2* Math.PI - Math.PI)+spin;
  let pnt = Point.mk(Math.cos(angle),Math.sin(angle)).times(gfrx*hht);
//  let pnt = Point.mk(frx*x,frx*y);
 let lastPos = shape.lastPos;
  if (lastPos  && (!inactive)) {
    let line=this.allocateLine();
    line.time = tm;
    line.setEnds(lastPos,pnt);
    line.update();
  }
  shape.lastPos = shape.getTranslation();
  shape.moveto(pnt);
  shape.dimension = circDim * gfrx;
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
  let {nextLineN,shapes,pstate,rdrops,dropParams,drops,dropys,rcda,goingInFrames,cycleL,stepsSoFar:ssf} = this;
  let {cstate} = pstate;
  // let spin = cstate.spin.value;
  debugger;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOf(i);
  }
  let tm = ssf;//cstate.time;
  this.goingIn = tm < goingInFrames;
 // if ((tm < 2*cycleL)||((tm>3.5*cycleL)&&(tm<4.2*cycleL))) {
  if ((tm < 2*cycleL)||((tm>3.5*cycleL)&&(tm<4.8*cycleL))) {
    this.generateDrops(dropParams);
  }
  if (tm>4.2*cycleL) {
    this.hideSomeLines(3*16);
  }

  if ((tm > 2.8*cycleL)&&(tm<3.5*cycleL)) {
    if (this.linesHidden === undefined) {
       debugger;
       this.linesHidden = this.nextLineN;
    }
    this.hideSomeLines(3*16);
  }
  if (ln < rcda) {
    let aln  = shapes.length;
    for (let i=ln;i<aln;i++) {
      dropys.push(drops[i].center.y);
    }
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
   let lineP = this.lineP = linePP.instantiate();
  
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
}  

rs.callAtCycleEnd = function (nm) {
}

rs.hideLastNLines = function (n) {
  let {lines} = this;
  let ln = lines.length;
  let frm = Math.max(0,ln-n);
  for (let i=frm;i<ln;i++) {
    let line = lines[i];
    line.hide();
    line.update();
  }
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
  let lines = this.set('lines',arrayShape.mk());
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
rs.fs = function (n) {
  let {dropys} = this;
  let ln = dropys.length;
  let lnf = Math.floor(ln/16);
  let v = dropys[n*16];
  for (let i = n+1;i<lnf;i++) {
     let ov = dropys[i*16];
     if (ov === v) {
       return i;
     }
  }
}

//rs.chopOffBeginning = 57;
rs.numSteps = 5.9*rs.cycleL;
rs.saveAnimation = 0;
rs.goingInFrames = 3*rs.cycleL;
export {rs};


