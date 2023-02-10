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


//rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {
rs.addPath = function (params) {
  let {name,fromSide,fromP,dir,line,inBack,addingTrailer} = params;
  let {stepsSoFar:ssf,ecircles,ecircleP,sides,ht,lineP,lines,pstate,segs} = this;
  let {pspace,cstate} = pstate;
  let ln = ecircles.length;
  let nm = name?name:'p'+ln;
  let maxH = 20;
  // debugger;
  //let fromP = this.sideI2pnt(sdi,fr);
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  let lvec = vec.times(10*ht);
  let seg = LineSegment.mk(fromP,fromP.plus(lvec));
  seg.active = 1;
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
  const randomValue = function () {
      return 155 + Math.floor(100*Math.random());
  }
  const randomColor = function () {
    let r = randomValue();
    let b = randomValue();
    let g = randomValue();
    return `rgb(${r},${g},${b})`;
  }
    
  if (!name) {
    let circ = ecircleP.instantiate().show();
    ecircles.push(circ);
  //if ((!line)|| addingTrailer) {
    line = lineP.instantiate().show();
    lines.push(line);
    segs.push(seg);
    //line.stroke = randomColor();
    
  }
  let dist = toP.distance(fromP);
  //let vec = toP.difference(fromP).normalize();
  pspace[nm] ={kind:'sweep',step:vel,min:0,max:dist/vel,interval:1,once:1};
  if (name) {
    let cs = cstate[nm];
   //Object.assign(ist,{value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,line,inBack});
    Object.assign(cs,{value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,done:0,cstep:undefined});
    debugger;
  } else {
    cstate[nm] = {value:0,fromP,toP,fromSide,toSide,start:ssf,vec,dir,line,inBack,trailerNeeded:!inBack,seg};
  }
}

rs.atCycleEnd = function (nm) {
 let {pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {dir,toP,toSide,line,inBack} = cs;
 // let na = toSide%2?dir-Math.PI:Math.PI -dir;
  let na = toSide%2?-dir:Math.PI -dir;
  //rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {

  this.addPath({name:nm,fromSide:toSide,fromP:toP,dir:na,line,inBack});
 debugger;
}
let L  =rs.lineLength = 10;

rs.updateStateOfCC = function (n){
  let {stepsSoFar:ssf,ends,ht,ecircles,pstate,lineLength:ll,trailerAdded} = this;
  let circ = ecircles[n];
  let nm = 'p'+n;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:v,done,fromP,toP,vec,dir,line,inBack,fromSide,trailerNeeded,seg} = cs;
  let   pos = fromP.plus(vec.times(v*vel));

  let toGo = pos.distance(toP);
  let lGone = pos.distance(fromP);
  line.show();
  seg.active = 1;
 // line.stroke = 'rgba(250,250,250,.5)';
  line.update();

  if (inBack) {
    if (toGo >= ll) {
      seg.active = 0;
  //      line.stroke = 'rgba(0,0,250,.5)';
        line.update();

   //  return;
    } 
    let lnl = Math.min(toGo,ll);
    let epos = pos.plus(vec.times(lnl));
    line.setEnds(pos,epos);
    seg.end0 = pos;
    seg.end1 = epos;
  } else {
    let farOut = lGone >= ll;
    if (farOut) {
   //   debugger;
    }
    if (farOut && trailerNeeded) {
       debugger;
       cs.trailerNeeded = 0;
       //rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {
//rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {

       this.addPath({fromSide,fromP,dir,line,inBack:1,addingTrailer:1});
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
  debugger;
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
      if (ints) {
        ai.push(ints);
      }
    }
  };
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
    for (let  k=cl;k<ail;k++) {
      let crc = icircles[k];
      crc.hide();
      crc.update();
    }
  }
}


rs.addSomePaths = function () {
  let theta = Math.random()*0.2*Math.PI-0.1*Math.PI
 theta = -0.1*Math.PI

 //for (let i=1;i<3;i++) {
 for (let i=1;i<10;i++) {
    let tt =theta+0.0*i*Math.PI;
    this.addPath({fromSide:0,fromP:this.sideI2pnt(0,i/10),dir:tt});
    this.addPath({fromSide:2,fromP:this.sideI2pnt(2,i/10),dir:Math.PI-tt});
  }
}
let vStep=5;
let nr = 80;
rs.updateState = function () {
  //debugger;
  let {stepsSoFar:ssf,numSteps,cycleTime,lines,ecircles,segs,ht} = this;
  //let lln = vlines.length;
  let ecln = ecircles.length;
  for (let i=0;i<ecln;i++) {
    this.updateStateOfCC(i);
  }
  if (ssf % 30 === 0) {
    this.addSomePaths();
  }
  this.placeCircles();
}
  
  
rs.initProtos = function () {
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.fill = 'red';
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.005*this.ht;
  icircleP.dimension =0.01*this.ht;
  let ecircleP = this.ecircleP = circlePP.instantiate();
  ecircleP.fill = 'blue';
  ecircleP['stroke-width'] = 0;
  ecircleP.dimension =0.01*this.ht;
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP.fill = 'blue';
  polygonP.fill = 'transparent';
    let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'rgb(250,250,250)';
  lineP['stroke-width'] = .4;
}  


rs.numSteps = 2.4*Math.floor(rs.ht/vel);
rs.numSteps = 2*Math.floor(rs.ht/vel);
let cycleTime = rs.cycleTime = Math.floor(rs.ht/vel); 
rs.numSteps = cycleTime+1;
rs.numSteps = 60*cycleTime;
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
  let ecircles = this.set('ecircles',arrayShape.mk());
  this.set('segs',arrayShape.mk());
  this.set('vends0',arrayShape.mk());
  this.set('hends1',arrayShape.mk());
  this.set('vends1',arrayShape.mk());
 // this.addLine(1);
 
  this.segs = [];
  let theta = 0.1*Math.PI;
  //rs.addPath = function (fromSide,fromP,dir,line,inBack) {
//rs.addPath = function (fromSide,fromP,dir,line,inBack,addingTrailer) {
  for (let i=1;i<0;i++) {
    this.addPath({fromSide:0,fromP:this.sideI2pnt(0,i/10),dir:theta});
    this.addPath({fromSide:2,fromP:this.sideI2pnt(2,i/10),dir:Math.PI-theta});
  }
}

export {rs};

