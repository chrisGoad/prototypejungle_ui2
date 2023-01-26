import {rs as circlePP} from '/shape/circle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_6');
let ht = rs.ht= 100;
let d=0.5*ht;
let fade = 1;
let topParams = {width:rs.ht,height:rs.ht,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}

Object.assign(rs,topParams);
rs.numH = 2;

rs.gap = 5;
rs.gap = 9;
rs.gap = 15;

rs.numV = 8; //on each side
//rs.numV = 16; //on each side
//rs.numV = 4;


rs.numV = 8; //on each side
//rs.numV = 16; //on each side
//rs.numV = 4;

let L  =rs.lineLength = 30;

rs.rotateLine = function(line,a) {
  let {lineLength:L} = this;
  let cs =Math.cos(a);
  let sn = Math.sin(a);
  let hvec = Point.mk(cs,sn).times(0.5*L);
  let ne0 = hvec.times(-1);
  let ne1 = hvec;
  line.setEnds(ne0,ne1);
  line.update();
 }
rs.adjustLine = function (line,pos,h,angle) {
  debugger;
  let {lineLength:L} = this;
  let {x,y} = pos;
  let p = h?x:y;
  let ae0 = p-0.5*L;
  let ae1 = p+0.5*L;
  
  if ((ae0 >d) && (ae1 > d)) {
    line.hide();
  } else if ((ae0 < -d) && (ae1 < -d)) {
    line.hide();
  } else {
    ae1 = Math.min(ae1,d);
    ae0 = Math.max(ae0,-d);
    let ne0 = h?Point.mk(ae0-p,0):Point.mk(0,ae0-p);
    let ne1 = h?Point.mk(ae1-p,0):Point.mk(0,ae1-p);
    line.show();
    this.rotateLine(line,angle);
   // line.setEnds(ne0,ne1);
  }
  line.update();
}

rs.adjustLines = function (y) {
 // debugger;
  let {lineDataDown,lineDataUp} = this;
  let lnd = lineDataDown.length;
  for (let i = 0;i<lnd;i++) {
    let ld = lineDataDown[i];
    if (i ===1) {
      debugger;
    }
   this.adjustLine(ld,y);
  };
  lineDataUp.forEach((ld) => {
   this.adjustLine(ld,-y);
  });
}
 
   



  
 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let stepH = 2;
let stepV = 1.;
let minH = -d-L;
let maxH = d+L;



rs.addHpath = function (n,y,od) {
  debugger;
  let nm = 'h'+n;
  pspace[nm] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm] = {value:minH,y,od,angle:0};
}



rs.addVpath = function (n,x,od) {
  debugger;
  let nm = 'v'+n;
  pspace[nm] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm] = {value:minH,x,od,angle:Math.PI/2};
}

rs.addLine = function (h) {
  let {lineLength:L,hlines,vlines,lineP} = this;
  let line = lineP.instantiate();
  if (h) {
    line.setEnds(Point.mk(-0.5*L,0),Point.mk(0.5*L,0));
  } else {
    line.setEnds(Point.mk(0,-0.5*L),Point.mk(0,0.5*L));
  }
  //lineData.push(lineDat);
  line.hide();
  let lines = h?hlines:vlines;
  lines.push(line);
  line.update();
  return  line;
}     
 

rs.updateStateOfH= function (n,angle){
 debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {hlines,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:iv,done,y,od} = cs;
  let line = hlines[n];
  if (done) {
    line.hide();
    return;
  }
  let v = od?-iv: iv;
  let pos = Point.mk(v,y);
  this.adjustLine(line,pos,1,angle);

  line.moveto(pos);
  line.update();
}

rs.updateStateOfV= function (n,angle){
 // debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'v'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {vlines,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:iv,done,x,od} = cs;
  let line = vlines[n];
  if (done) {
    line.hide();
    return;
  }
  let v = od?-iv: iv;
  let pos = Point.mk(x,v);
  this.adjustLine(line,pos,0,angle);
 // line.show();
  line.moveto(pos);
  line.update();
}


let vStep=5;
let nr = 80;
rs.updateState = function () {
  //debugger;
  let {stepsSoFar:ssf,numSteps,cycleTime,hlines,vlines} = this;
  //let angle = (0.1*(ssf%cycleTime)/cycleTime)*Math.PI;
  let angle = 0*(ssf/numSteps)*Math.PI;
  let hln = hlines.length;
  let vln = vlines.length;
  for (let i=0;i<hln;i++) {
    this.updateStateOfH(i,angle);
  }
  for (let i=0;i<vln;i++) {
    this.updateStateOfV(i,angle+Math.PI/2);
  }
  if (Math.random() < 2) {
    let rw = Math.floor(Math.random()*nr);
    let r = (rw-nr/2) * (ht/nr);
    debugger;
    let od = (Math.random()<0.5)?1:0;
    if (Math.random()<0.5) {
      this.addLine(1);
      this.addHpath(hln,r,od);
    } else {
      this.addLine(0);
      this.addVpath(vln,r,od);
    }
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.1*this.ht;
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP.fill = 'blue';
  polygonP.fill = 'transparent';
  circleP.dimension =0.1*this.ht;
    let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .5;
}  


rs.numSteps = 2.4*Math.floor(ht/stepH);
rs.numSteps = 2*Math.floor(ht/stepH);
let cycleTime = rs.cycleTime = Math.floor(ht/stepH); 
rs.numSteps = cycleTime+1;
rs.numSteps = 6*cycleTime;
rs.chopOffBeginning =0;
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hlines = this.set('hlines',arrayShape.mk());
  let vlines = this.set('vlines',arrayShape.mk());
 // this.addLine(1);
 
  let lineData = this.lineData = [];
  //this.addHpath(0,0);
}

export {rs};


