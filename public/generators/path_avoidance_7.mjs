import {rs as circlePP} from '/shape/circle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_7');
let ht = rs.ht= 100;
let d=0.5*ht;
let fade = 1;
let topParams = {width:rs.ht,height:rs.ht,framePadding:.2*ht,frameStroke:'white',frameStrokeWidth:1}

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

//let L  =rs.lineLength = 30;
let L  =rs.lineLength = 2;

rs.adjustLine = function (line,pos,h) {
  let {lineLength:L,hends0,hends1,vends0,vends1} = this;
  let {index} = line;
  let {x,y} = pos;
  debugger;
  let p = h?x:y;
  let ae0 = p-0.5*L;
  let ae1 = p+0.5*L;
  let ends0 = h?hends0:vends0;
  let ends1 = h?hends1:vends1;
  let crc0 = ends0[index];
  let crc1 = ends1[index];
  if ((ae0 >d) && (ae1 > d)) {
    line.hide();
    crc0.hide();
    crc1.hide();
  } else if ((ae0 < -d) && (ae1 < -d)) {
    line.hide();
    crc0.hide();
    crc1.hide();
  } else {
    ae1 = Math.min(ae1,d);
    ae0 = Math.max(ae0,-d);
    let ne0 = h?Point.mk(ae0-p,0):Point.mk(0,ae0-p);
    let ne1 = h?Point.mk(ae1-p,0):Point.mk(0,ae1-p);
    line.show();
    line.setEnds(ne0,ne1);
    return;
    crc0.moveto(pos.plus(ne0));
    crc1.moveto(pos.plus(ne1));
    crc0.show();
    crc1.show();
  
    
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
let vel = 2;
let stepV = 1.;
let minH = -d-L;
let maxH = d+L;



rs.addHpath = function (n,y,od) {
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
  pspace[nm] ={kind:'sweep',step:vel,min:minH,max:maxH,interval:1,once:1};
  initState[nm] = {value:minH,y,od,start:ssf};
}



rs.addVpath = function (n,x,od) {
  let {stepsSoFar:ssf} = this;
  let nm = 'v'+n;
  pspace[nm] ={kind:'sweep',step:vel,min:minH,max:maxH,interval:1,once:1};
  initState[nm] = {value:minH,x,od,start:ssf};
}

rs.addLine = function (h) {
  let {lineLength:L,hlines,vlines,lineP,hends0,hends1,vends0,vends1,circleP1,stepsSoFar:ssf} = this;
  debugger;
  let line = lineP.instantiate();
  line.h = h;
  line.start = ssf;
  let ends0 = h?hends0:vends0;
  let ends1 = h?hends1:vends1;
  if (h) {
    line.setEnds(Point.mk(-0.5*L,0),Point.mk(0.5*L,0));
  } else {
    line.setEnds(Point.mk(0,-0.5*L),Point.mk(0,0.5*L));
  }
  let crc0 = circleP1.instantiate();
  let crc1 = circleP1.instantiate();
  ends0.push(crc0);
  ends1.push(crc1);
  //lineData.push(lineDat);
  line.hide();
  let lines = h?hlines:vlines;
  let ln = lines.length;
  line.index = ln;
  lines.push(line);
  line.update();
  return  line;
}     
 

rs.updateStateOfH= function (n){
  let {stepsSoFar:ssf,ends} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/vel));
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
  this.adjustLine(line,pos,1);

  line.moveto(pos);
  line.update();
}

rs.updateStateOfV= function (n){
 // debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'v'+n;
    let stt = Math.floor(1.0*(ht/vel));
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
  this.adjustLine(line,pos,0);
 // line.show();
  line.moveto(pos);
  line.update();
}
rs.intersectLine = function (hline,vline) {
  let L = this.lineLength;
  let ph = hline.getTranslation();
  let pv = vline.getTranslation();
  if ((ph.x+0.5*L)<pv.x) { 
    return;
  }
  if (pv.x<(ph.x-0.5*L)) { 
    return;
  }
  if ((pv.y+0.5*L)<ph.y) { 
    return;
  }
  if (ph.y<(pv.y-0.5*L)) { 
    return;
  }
  return Point.mk(pv.x,ph.y);
}

rs.allIntersections = function () {
  debugger;
  let {hlines,vlines} = this;
  let ai = [];
  hlines.forEach((h) => {
    vlines.forEach((v) => {
      let i = this.intersectLine(h,v);
      if (i) {
        ai.push(i);
      }
    });
  });
  return ai;
}

rs.placeCircles = function () {
  let {circles,circleP} = this;
  let ai = this.allIntersections();
  let cl = circles.length;
  let ail = ai.length;
  if (ail > cl) {
    let nn = ail-cl;
    for (let j=0;j<nn;j++) {
      let crc = circleP.instantiate();
      circles.push(crc);
    }
  }
  for (let k=0;k<ail;k++) {
    let crc = circles[k];
    crc.moveto(ai[k])
    crc.show();
    crc.update();
  }
  if (cl > ail) {
    for (let  k=cl;k<ail;k++) {
      let crc = circles[k];
      crc.hide();
      crc.update();
    }
  }
}
  
rs.willBeInRangeSN = function (x,od) { 
  let {stepsSoFar:ssf} = this;
 // let low = (x-0.5*L)/vel+ssf;
  let low = od?(d-(x+0.5*L))/vel+ssf:(x-0.5*L)/vel+ssf;
  //let high = (x+0.5*L)/vel+ssf;
  let high = od?(d-x-0.5*L)/vel+ssf:(x+0.5*L)/vel+ssf;
  return {low,high};
}
rs.willBeInRange = function (line,x) {
  let st = line.start;
  let od = line.od;
  // let low = (x-0.5*L)/vel+st;
  let low = od?(d-(x+0.5*L))/vel+st:(x-0.5*L)/vel+st;
 // let high = (x+0.5*L)/vel+st;
    let high = od?(d-x-0.5*L)/vel+st:(x+0.5*L)/vel+st;

  return {low,high};

}

rs.rangesIntersect = function (r0,r1) {
  let L0 = r0.low;
  let H0 = r0.high;
  let L1 = r1.low;
  let H1 = r1.high;
  let I0 = (L0<=L1)&&(L1<=H0); 
  let I1 = (L0<=H1)&&(H1<=H0); 
  let I2 = (L1<=L0)&&(L0<= H1);
  return I0 || I1 || I2;
}

rs.willIntersectH = function (y,od) {
  let {vlines} = this;
  let ln = vlines.length;
  for (let i=0;i<ln;i++) {
    let line = vlines[i];
    let pos = line.getTranslation();
    let x = pos.x;
    let myrange = this.willBeInRangeSN(x,od);
    let linerange = this.willBeInRange(line,y);
    if (this.rangesIntersect(myrange,linerange)) {
      return 1;
    }
  }
}

rs.willIntersectV = function (x,od) {
  let {hlines} = this;
  let ln = hlines.length;
  for (let i=0;i<ln;i++) {
    let line = hlines[i];
    let pos = line.getTranslation();
    let y = pos.y;
    let myrange = this.willBeInRangeSN(y,od);
    let linerange = this.willBeInRange(line,x);
    if (this.rangesIntersect(myrange,linerange)) {
      return 1;
    }
  }
}
    




let vStep=5;
let nr = 80;
rs.updateState = function () {
  //debugger;
  let {stepsSoFar:ssf,numSteps,cycleTime,hlines,vlines} = this;
  let hln = hlines.length;
  let vln = vlines.length;
  for (let i=0;i<hln;i++) {
    this.updateStateOfH(i);
  }
  for (let i=0;i<vln;i++) {
    this.updateStateOfV(i);
  }
  this.placeCircles()
  if (Math.random() < 1) {
    let rw = Math.floor(Math.random()*nr);
    let r = (rw-nr/2) * (ht/nr);
    debugger;
    let od = (Math.random()<0.5)?1:0;
    //let od = (Math.random()<0)?1:0;
    if (Math.random()<0.5) {
      if (this.willIntersectH(r,od)) {
        return;
      }
      this.addLine(1,od);
      this.addHpath(hln,r,od);
    } else {
      if (this.willIntersectV(r,od)) {
        return;
      }
      this.addLine(0,od);
      this.addVpath(vln,r,od);
    }
  }
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'red';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.01*this.ht;
  let circleP1 = this.circleP1 = circlePP.instantiate();
  circleP1.fill = 'blue';
  circleP1['stroke-width'] = 0;
  circleP1.dimension =0.01*this.ht;
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP.fill = 'blue';
  polygonP.fill = 'transparent';
    let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .4;
}  


rs.numSteps = 2.4*Math.floor(ht/vel);
rs.numSteps = 2*Math.floor(ht/vel);
let cycleTime = rs.cycleTime = Math.floor(ht/vel); 
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
  let circles = this.set('circles',arrayShape.mk());
  this.set('hends0',arrayShape.mk());
  this.set('vends0',arrayShape.mk());
  this.set('hends1',arrayShape.mk());
  this.set('vends1',arrayShape.mk());
 // this.addLine(1);
 
  let lineData = this.lineData = [];
  //this.addHpath(0,0);
}

export {rs};

