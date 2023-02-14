import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.setName('reflected_path_0');

rs.setSides = function (d) {
  let corners = [Point.mk(-d,d),Point.mk(-d,-d),Point.mk(d,-d),Point.mk(d,d)];
  let sides = [LineSegment.mk(corners[0],corners[1]),
               LineSegment.mk(corners[1],corners[2]),
               LineSegment.mk(corners[2],corners[3]),
               LineSegment.mk(corners[3],corners[0])];
  this.corners = corners;
  this.sides = sides;
}
rs.setTopParams = function () {
  let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:10,theta:-0.2 *Math.PI,vel,
  cycleTime,numSteps:7.0*cycleTime,noNewPaths:5*cycleTime,lineLength:20}
  Object.assign(this,topParams);
}
rs.setTopParams();



rs.sideI2pnt = function (sideI,fr) {
  let side = this.sides[sideI];
  let e0 = side.end0;
  let e1 = side.end1;
  let vec = e1.difference(e0);
  let p = e0.plus(vec.times(fr));
  return p;
}

rs.onSide= function (p) {
  let {d} = this;
  const near = function (x) {
    let eps = 0.1;
    return ((d-eps) <= x)&&(x <= (d+eps))||((-d-eps) <= x)&&(x <= (eps-d))
  }
  return near(p.x) || near(p.y);
}

let pspace = {};
rs.pstate = {pspace,cstate:{time:0}}


rs.addPath = function (params) {
  let {name,fromSide,fromP,dir,line,inBack,addingTrailer} = params;
  let {stepsSoFar:ssf,ecircles,ecircleP,sides,ht,lineP,lines,pstate,segs,vel} = this;
  let {pspace,cstate} = pstate;
  let ln = ecircles.length;
  let nm = name?name:'p'+ln;
  let maxH = 20;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  let lvec = vec.times(10*ht);
  let seg = LineSegment.mk(fromP,fromP.plus(lvec));
  seg.active = 0;
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
  if (!name) {
    let circ = ecircleP.instantiate().show();
    ecircles.push(circ);
    line = lineP.instantiate().show();
    lines.push(line);
    segs.push(seg);
  }
  let dist = toP.distance(fromP);
  pspace[nm] ={kind:'sweep',step:vel,min:0,max:dist/vel,interval:1,once:1};
  if (name) {
    let cs = cstate[nm];
    Object.assign(cs,{value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,done:0,cstep:undefined});
  } else {
    cstate[nm] = {value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,line,inBack,trailerNeeded:!inBack,seg};
  }
}

rs.atCycleEnd = function (nm) {
 let {pstate,noNewPaths,stepsSoFar:ssf} = this;
 
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {dir,toP,toSide,line,inBack,seg} = cs;
  let na = toSide%2?-dir:Math.PI -dir;
  if (ssf < noNewPaths) {
    this.addPath({name:nm,fromSide:toSide,fromP:toP,dir:na,line,inBack});
  } else if (ssf>noNewPaths) {
    //line.hide();
   line.stroke = 'transparent';
   seg.active  = 0;
    line.update();
  }
}

rs.pauseAnimation = function() {
  let {stepsSoFar:ssf,pstate} = this;
  let {pspace,cstate} = pstate;
  debugger;
}
rs.updateStateOfCC = function (n){
  let {stepsSoFar:ssf,ends,ht,ecircles,pstate,lineLength:ll,trailerAdded,noNewPaths,vel} = this;
  let circ = ecircles[n];
  let nm = 'p'+n;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:v,done,fromP,toP,vec,dir,line,inBack,fromSide,trailerNeeded,seg} = cs;
  let   pos = fromP.plus(vec.times(v*vel));
  let toGo = pos.distance(toP);
  let lGone = pos.distance(fromP);
  line.show();
  if (ssf < noNewPaths) {
    seg.active = 1;
  }
  line.update();

  if (inBack) {
    if (toGo >= ll) {
      seg.active = 0;
      line.update();
    } 
    let lnl = Math.min(toGo,ll);
    let epos = pos.plus(vec.times(lnl));
    line.setEnds(pos,epos);
    seg.end0 = pos;
    seg.end1 = epos;
  } else {
    let farOut = lGone >= ll;
    if (farOut && trailerNeeded) {
       cs.trailerNeeded = 0;
       this.addPath({fromSide,fromP,dir,line,inBack:nm,addingTrailer:1});
    }    
    let lnl = Math.min(lGone,ll);
    let epos = pos.difference(vec.times(lnl));
    line.setEnds(epos,pos);
    seg.end0 = epos;
    seg.end1 = pos;
  }
  line.update();
  circ.moveto(pos);
  circ.update();
}

rs.allIntersections = function (segs) {
  let ln = segs.length;
  let ai = [];
  for (let i=0;i<ln;i++) {
    let segi = segs[i];
    if (!segi.active) {
      continue;
    }
    for (let j=i+1;j<ln;j++) {
      let segj = segs[j];
      if (!segj.active) {
        continue;
      }
 
      let ints = segi.intersect(segj);
      if (ints&&(typeof ints === 'object')&& (!this.onSide(ints))) {
        ai.push(ints);
      }
    }
  }
  return ai;
}

rs.placeCircles = function () {
  let {icircles,icircleP,segs} = this;
  let ai = this.allIntersections(segs);
  let cl = icircles.length;
  let ail = ai.length;
  if (ail > cl) {
    let nn = ail-cl;
    for (let j=0;j<nn;j++) {
      let crc = icircleP.instantiate();
      icircles.push(crc);
    }
  }
  for (let k=0;k<ail;k++) {
    let crc = icircles[k];
    crc.moveto(ai[k])
    crc.show();
    crc.update();
  }
  if (cl > ail) {
    debugger;
    for (let  k=ail;k<cl;k++) {
      let crc = icircles[k];
      crc.hide();
      crc.update();
    }
  }
}


rs .addSomePaths = function (n) {
  let {theta} = this;
 for (let i=2;i<n-1;i++) {
    let tt =theta+0.0*i*Math.PI;
    let fr = i/(n-1);
    let fromP0 = this.sideI2pnt(0,i/n);
    let fromP1 = this.sideI2pnt(2,i/n);
    this.addPath({fromSide:0,fromP:fromP0,dir:tt});
    this.addPath({fromSide:2,fromP:fromP1,dir:Math.PI+tt});
  }
}
rs.updateState = function () {
  let {stepsSoFar:ssf,numSteps,cycleTime,lines,ecircles,segs,ht,numPaths,noNewPaths} = this;
  //let lln = vlines.length;
  let ecln = ecircles.length;
  for (let i=0;i<ecln;i++) {
    this.updateStateOfCC(i);
  }
  if ((ssf % 30 === 0)&& (ssf < noNewPaths)) {
    this.addSomePaths(numPaths);
  }
  this.placeCircles();
}
  
  
rs.initProtos = function () {
  let {ht} = this;
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.stroke = 'transparent';
  icircleP.fill = 'red';
  icircleP['stroke-width'] = .01;
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.01*ht;
  let ecircleP = this.ecircleP = circlePP.instantiate();
  ecircleP.fill = 'blue';
  ecircleP['stroke-width'] = 0;
  ecircleP.dimension =0.003*ht;
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .1;
}  

rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numPaths} = this;
 this.setBackgroundColor('black');
  this.initProtos();
  this.addFrame();
  let lines = this.set('lines',arrayShape.mk());
  let icircles = this.set('icircles',arrayShape.mk());
  let ecircles = this.set('ecircles',arrayShape.mk());
  this.set('segs',arrayShape.mk());
  this.set('vends0',arrayShape.mk());
  this.set('hends1',arrayShape.mk());
  this.set('vends1',arrayShape.mk());
 
  this.segs = [];
  //let theta = 0.1*Math.PI;
  //rs.addPath = function (fromSide,fromP,dir,line,inBack) {
//rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {
  this.addSomePaths(numPaths);
 
}

export {rs};

