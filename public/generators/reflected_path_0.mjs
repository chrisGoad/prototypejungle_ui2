import {rs as circlePP} from '/shape/circle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('reflected_path_0');
rs.ht= 100;
let d;
rs.setTopParams = function () {
  let {ht} = this;
  debugger;
  d = this.d=0.5*ht;
  let corners = [Point.mk(-d,d),Point.mk(-d,-d),Point.mk(d,-d),Point.mk(d,d)];
  let sides = [LineSegment.mk(corners[0],corners[1]),
               LineSegment.mk(corners[1],corners[2]),
               LineSegment.mk(corners[2],corners[3]),
               LineSegment.mk(corners[3],corners[0])];
  let topParams = {width:rs.ht,height:rs.ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,corners,sides}
  Object.assign(this,topParams);
}
rs.setTopParams();



rs.sideI2pnt = function (sideI,fr) {
  debugger;
  let side = this.sides[sideI];
  let e0 = side.end0;
  let e1 = side.end1;
  let vec = e1.difference(e0);
  let p = e0.plus(vec.times(fr));
  return p;
}


 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let vel = 1;


//rs.addPath = function (sdi,fromP,dir) {
rs.addPath = function (fromSide,fromP,dir) {
  let {stepsSoFar:ssf,ccircles,circleP,sides,ht,lineP,lines} = this;
  debugger;
  let ln = ccircles.length;
  let nm = 'p'+ln;
  let maxH = 20;
 
  //let fromP = this.sideI2pnt(sdi,fr);
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  let lvec = vec.times(10*ht);
  let seg = LineSegment.mk(fromP,fromP.plus(lvec));
  let toP,toSide;
  for (let i=0;i<4;i++) {
    if (i!==fromSide) {
      let side = sides[i];
      let isect = seg.intersect(side);
      if (isect) {
        toP = isect;
        toSide = i;
        break;
      }
    }
  }
  if (!toP) {
    return;
  }
  let circ = circleP.instantiate().show();
  ccircles.push(circ);
  let line = lineP.instantiate().show();
  lines.push(line);
  let dist = toP.distance(fromP);
  //let vec = toP.difference(fromP).normalize();
  pspace[nm] ={kind:'sweep',step:vel,min:0,max:dist/vel,interval:1,once:1};
  initState[nm] = {value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,line};
}

rs.atCycleEnd = function (nm) {
 let {pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {dir,toP,toSide} = cs;
 // let na = toSide%2?dir-Math.PI:Math.PI -dir;
  let na = toSide%2?-dir:Math.PI -dir;
  this.addPath(toSide,toP,na);
 debugger;
}
let L  =rs.lineLength = 30;


rs.adjustLine = function (line,pos,h) {
  let {lineLength:L,hends0,hends1,vends0,vends1,d} = this;
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
 
   







rs.addLine = function (h) {
  let {lineLength:L,hlines,vlines,lineP,hends0,hends1,vends0,vends1,circleP1} = this;
  debugger;
  let line = lineP.instantiate();
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
 

rs.updateStateOfCC = function (n){
  let {stepsSoFar:ssf,ends,ht,ccircles,pstate,lineLength:ll} = this;
  let circ = ccircles[n];
  let nm = 'p'+n;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:v,done,fromP,toP,vec,line} = cs;
 /*
 let line = hlines[n];
  if (done) {
    line.hide();
    return;
  }
  let v = od?-iv: iv;
  */
  let pos = fromP.plus(vec.times(v*vel));
  let toGo = pos.distance(toP);
  let lnl = Math.min(toGo,ll);
  let epos = pos.plus(vec.times(lnl));
  line.setEnds(pos,epos);
  line.update();
  circ.moveto(pos);
  circ.update();
 /*
  this.adjustLine(line,pos,1);

  line.moveto(pos);
  line.update();*/
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
  

let vStep=5;
let nr = 80;
rs.updateState = function () {
  //debugger;
  let {stepsSoFar:ssf,numSteps,cycleTime,lines,ccircles,ht} = this;
  //let lln = vlines.length;
  let ccln = ccircles.length;
  for (let i=0;i<ccln;i++) {
    this.updateStateOfCC(i);
  }
  return;
  this.placeCircles()
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
  circleP.fill = 'red';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.005*this.ht;
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
  lineP['stroke-width'] = .1;
}  


rs.numSteps = 2.4*Math.floor(rs.ht/vel);
rs.numSteps = 2*Math.floor(rs.ht/vel);
let cycleTime = rs.cycleTime = Math.floor(rs.ht/vel); 
rs.numSteps = cycleTime+1;
rs.numSteps = 6*cycleTime;
rs.chopOffBeginning =0;
rs.saveAnimation = 0;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let lines = this.set('lines',arrayShape.mk());
  let icircles = this.set('icircles',arrayShape.mk());
  let ccircles = this.set('ccircles',arrayShape.mk());
  this.set('hends0',arrayShape.mk());
  this.set('vends0',arrayShape.mk());
  this.set('hends1',arrayShape.mk());
  this.set('vends1',arrayShape.mk());
 // this.addLine(1);
 
  let lineData = this.lineData = [];
  let theta = 0.1*Math.PI;
  this.addPath(0,this.sideI2pnt(0,0.5),theta);
  this.addPath(2,this.sideI2pnt(2,0.5),Math.PI-theta);
}

export {rs};

