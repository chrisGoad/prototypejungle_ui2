import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addAudioMethods} from '/mlib/audio.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
addAudioMethods(rs);
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
  cycleTime,numSteps:7.0*cycleTime,noNewPaths:5*cycleTime,lineLength:20,addPathInterval:30,fromOneSide:0,gap:0,randomFactor:0,randomAngleFactor:0}
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
   // line.stroke = addingTrailer?'blue':'red';
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
  let {dir,toP,toSide,line,inBack,seg,start} = cs;
     console.log('cycleEnd ssf',ssf,'nm',nm,'inBack',inBack,'color',line.stroke);

  let na = toSide%2?-dir:Math.PI -dir;
  if (0 && (ssf < noNewPaths)) {
    this.addPath({name:nm,fromSide:toSide,fromP:toP,dir:na,line,inBack});
  } else {//if (ssf>noNewPaths) {
    //line.hide();
     // if (ssf - start)> 10)
     let lddone = true;
     if (inBack) {
         let lds = cstate[inBack];
         lddone = lds.done;
      }
      if (lddone) {
        line.stroke = 'transparent';
      } else {
        this.addPath({name:nm,fromSide:toSide,fromP:toP,dir:na,line,inBack});
      }
   seg.active  = 0;
   seg.stayInactive = 1;
    line.update();
  }
}

rs.stepAnimation = function(db) {
  let {stepsSoFar:ssf,pstate} = this;
  let {pspace,cstate} = pstate;
  debugger;
}

rs.pauseAnimation = function() {
  let {stepsSoFar:ssf,pstate} = this;
  let {pspace,cstate} = pstate;
  debugger;
}
rs.updateStateOfCC = function (n){
  let {stepsSoFar:ssf,ends,ht,ecircles,pstate,lineLength:ll,trailerAdded,noNewPaths,vel,gap,part0tm,turnBlack} = this;
  let dbg = 0;//(ssf > 204) && (n>3) && (n<6);
  if (dbg) {
    debugger;
  }
  let circ = ecircles[n];
  let nm = 'p'+n;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:v,done,fromP,toP,vec,dir,line,inBack,fromSide,trailerNeeded,seg} = cs;
  let   pos = fromP.plus(vec.times(v*vel));
 // console.log('inBack',inBack);
  let nvec = vec.normal();
  let snvec = nvec.times(gap*(inBack?1:-1));
  let  gpos = pos.plus(snvec);
  let toGo = pos.distance(toP);
  let lGone = pos.distance(fromP);
  line.show();
  if ((ssf < noNewPaths)&&(!seg.stayInactive)) {
    seg.active = 1;
  }
  if ((ssf>part0tm)&& (inBack) && (line.length()>5)&& turnBlack) {
    line.stroke='black';
  }
  line.update();
  if (inBack) {// pos is the trailing point and epos the leading
    if (toGo >= ll) {
      seg.active = 0;
      line.show();//new
      //line.stroke = 'yellow';
      line.update();//new
    }
    let lnl = Math.min(toGo,ll);
    let epos = pos.plus(vec.times(lnl));
    let gepos = epos.plus(snvec);
  //  line.setEnds(pos,epos);a
    line.setEnds(gpos,gepos);
    seg.end0 = pos;
    seg.end1 = epos;
     seg.end0 = gpos;
    seg.end1 = gepos;
  } else { // pos is the leading point and epos the trailing
    let farOut = lGone >= ll;
    if (farOut) {
      if (trailerNeeded) {
        cs.trailerNeeded = 0;
        this.addPath({fromSide,fromP,dir,line,inBack:nm,addingTrailer:1});
      }
      line.show();//new
      line.update();//new
    }  
    let lnl = Math.min(lGone,ll);
    let epos = pos.difference(vec.times(lnl));
    let gepos = epos.plus(snvec);
   // line.setEnds(epos,pos);
    line.setEnds(gepos,gpos);
    seg.end0 = epos;
    seg.end1 = pos;
    seg.end0 = gepos;
    seg.end1 = gpos;  
  }
  line.update();
  circ.moveto(pos);
  circ.update();
}

rs.allIntersections = function (segs) {
  let {d} = this;
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
        let {x,y} = ints;
        if (1 || (ints.length() < 0.81*(this.d))||(x<0)||(y<0)) {
          ai.push(ints);
        }
      }
    }
  }
  return ai;
}

rs.nearToApoint =function (p,pnts) {
  let ln = pnts.length;
  for (let i=0;i<ln;i++) {
    let pnt = pnts[i];
    if (pnt.distance(p)<1) {
      return true;
    }
  }
}

rs.updateShownPoints = function (pnts) {
  let {pointsToShow:pts,stepsSoFar:ssf,part0tm} = this;
  pts.forEach ( (p) => {
    if (ssf<part0tm) {
      if (!p.showMe) {
        if (this.nearToApoint(p,pnts)) {
          p.showMe =1;
        }
      }
    } else {
        if (!p.hideMe) {
        if (this.nearToApoint(p,pnts)) {
          p.hideMe =1;
        }
      }
    }
  });
}



rs.placePcircles = function (ai) {
  //debugger;
  let {pcircles,pcircleP,segs,pointsToShow:pts} = this;
  //let ai = this.allIntersections(segs);
  this.updateShownPoints(ai);
  let nts = 0;
  pts.forEach((p) => {
    if (p.showMe&&(!p.hideMe)) {
      nts++;
    }
  });
  let cl = pcircles.length;
  pcircles.forEach( (c) => {
    c.hide();
  });
  
  if (nts > cl) {
    let nn = nts-cl;
    for (let j=0;j<nn;j++) {
      let crc = pcircleP.instantiate();
      pcircles.push(crc);
    }
  }
  let cp=0;
  pts.forEach( (p) => {
    if (p.showMe&&(!p.hideMe)) {
      let crc = pcircles[cp];
      crc.moveto(p);
      crc.show();
      cp++;
    } 
  });
  return;
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

rs.placeIcircles = function (ai) {
  let {icircles,icircleP,segs} = this;
 // let ai = this.allIntersections(segs);
  let cl = icircles.length;
  let ail = ai.length;
  console.log('ail',ail);
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
    //debugger;
    for (let  k=ail;k<cl;k++) {
      let crc = icircles[k];
      crc.hide();
      crc.update();
    }
  }
}

rs.placeAllCircles = function () {
  let {segs} = this;
  let ai = this.allIntersections(segs);
  this.placeIcircles(ai);
    this.placePcircles(ai);

}


rs.computePathPositions = function (n) {
 let {randomFactor:rfp,randomAngleFactor:rfa,theta} = this;
 debugger;
 let pp0 = [];
 let pp2 = [];
 let aa = [];
 this.pathPositions0 = pp0;
 this.pathPositions2 = pp2;
 this.pathAngles = aa;
 for (let i=2;i<n-1;i++) {
    let r = rfp*(Math.random()-0.5);
    let fromP0 = this.sideI2pnt(0,i/n+r);
    let fromP2 = this.sideI2pnt(2,i/n+r);
    pp0.push(fromP0);
    pp2.push(fromP2);
    let ra = rfa*(Math.random()-0.5)*Math.PI;
    aa.push(theta+ra);
    
  }
}

rs .addVpath = function (x) {
  let {d} = this;
  let opnt = Point.mk(x,-d);
  this.addPath({fromSide:1,fromP:opnt,dir:0.5*Math.PI});
}


rs.addVpathM = function (x) {
  let {d} = this;
  let opnt = Point.mk(x,d);
  this.addPath({fromSide:3,fromP:opnt,dir:-0.5*Math.PI});
}



rs .addHpath = function (y) {
  let {d} = this;
  let opnt = Point.mk(-d,y);
  this.addPath({fromSide:0,fromP:opnt,dir:0});
}


rs.addHpathM = function (y) {
  let {d} = this;
  let opnt = Point.mk(d,y);
  this.addPath({fromSide:2,fromP:opnt,dir:Math.PI});
}

rs.timeDiff = function (p) {
  let {d,vel} = this;
  let {x,y} = p;
  let t0 = (x+d)/vel;
  let t1 = (y+d)/vel;
  return Math.floor(t1-t0);
}


rs.timeDiffM = function (p) {
  let {d,vel} = this;
  let {x,y} = p;
  let t0 = (d-x)/vel;
  let t1 = (d-y)/vel;
  return Math.floor(t1-t0);
}
rs .addSomePaths = function () {
  debugger;
  this.addVPath(0);
  this.addHPath(0);
 
}

rs .addSomePathsss = function (n) {
  let {theta,fromOneSide} = this;
 for (let i=2;i<n-1;i++) {
    let tt =theta+0.0*i*Math.PI;
    let fr = i/(n-1);
    let r = 0.1*(Math.random()-0.5);
    let fromP0 = this.sideI2pnt(0,i/n+r);
    let fromP1 = this.sideI2pnt(2,i/n+r);
    this.addPath({fromSide:0,fromP:fromP0,dir:tt});
    if (!fromOneSide) {
      this.addPath({fromSide:2,fromP:fromP1,dir:Math.PI+tt});
    }
  }
}
rs.updateState = function () {
  let {stepsSoFar:ssf,numSteps,cycleTime,lines,ecircles,segs,ht,numPaths,noNewPaths,addPathInterval,schedule,part0tm} = this;
 // let s0 = schedule[0];
 // let {dir,tm,pnt} = s0;
  //let lln = vlines.length;
  let ecln = ecircles.length;
  for (let i=0;i<ecln;i++) {
    this.updateStateOfCC(i);
  }
  schedule.forEach( (sel) => {
    let {dir,tm,pnt} = sel;
    let {x,y} = pnt;
    if (ssf === tm) {
      if (dir === 'V') {
        this.addVpath(x);
      } else if (dir === 'VM') {
        this.addVpathM(x);
      } else if (dir === 'H') {
        this.addHpath(y);
      } else {
        this.addHpathM(y);
      }

    }
  });
  
  if (0 && (ssf % addPathInterval === 0)&& (ssf < noNewPaths)) {
    this.addSomePaths(numPaths);
  }
  this.placeAllCircles();
  let pnts = this.pointsToShow;
  if (ssf === part0tm) {
    debugger;
      this.addPointsToSchedule(pnts,ssf+1);
  }

  this.callIfDefined('afterUpdate');

}
  
  
rs.initProtos = function () {
  debugger;
  let {ht} = this;
  let icircleP = this.icircleP = circlePP.instantiate();
  icircleP.stroke = 'transparent';
  icircleP.fill = 'red';
  icircleP['stroke-width'] = 0;
  icircleP.dimension =0.01*ht;
  let pcircleP = this.pcircleP = circlePP.instantiate();
  pcircleP.stroke = 'transparent';
  pcircleP.fill = 'red';
  pcircleP['stroke-width'] = 0;
  pcircleP.dimension =0.01*ht;
  let ecircleP = this.ecircleP = circlePP.instantiate();
  ecircleP.fill = 'blue';
  ecircleP['stroke-width'] = 0;
  ecircleP.dimension =0.003*ht;
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = .1;
}  

rs.saveAnimation = 1;
rs.schedule = [];

rs.addPointToSchedule = function (pnt,pd,itm) {
  let {d,schedule} = this;
  let sel0,sel1;
  let {x,y} = pnt;
  if (pd) {
    let td = this.timeDiff(pnt);
  
    if (td < 0) {
      //this.addHpath(y);
      sel0 = {tm:1+itm,dir:'H',pnt};
      sel1 = {tm:1+itm-td,dir:'V',pnt};
    } else {
     // this.addVpath(ix);
      sel0 = {tm:1+itm,dir:'V',pnt};
      sel1 = {tm:td+1+itm,dir:'H',pnt};
    }
  } else {
    let td = this.timeDiffM(pnt);
    if (td < 0) {
      sel0 = {tm:1+itm,dir:'HM',pnt};
      sel1 = {tm:1+itm-td,dir:'VM',pnt};
    } else {
     // this.addVpath(ix);
      sel0 = {tm:1+itm,dir:'VM',pnt};
      sel1 = {tm:itm+td+1,dir:'HM',pnt};
    }
  }
  schedule.push(sel0);
  schedule.push(sel1);
}

rs.addPointsToSchedule = function (pnts,itm) {
  let ln = pnts.length;
  for (let i=0;i<ln;i++) {
    let p = pnts[i] 
    //this.addPointToSchedule(p,Math.random()<0.5,itm);//i%2);
    this.addPointToSchedule(p,i%2,itm);//i%2);
  }
}

rs.randomPoints = function (n,fn) {
  let {d,ht} = this;
  let pnts = [];
  let cnt =0;
  while (cnt<n) {
    let rx = Math.floor(ht*Math.random())-d;
    let ry = Math.floor(ht*Math.random())-d;
    let p = Point.mk(rx,ry);
    if (fn(p)) {
      cnt++;
      pnts.push(p);
    }
  }
  return pnts;
}

rs.randomRectPoints = function (n,fr) {
  let {d,ht} = this;
  let frd = fr*d;
  let frht = fr*ht;
  let pnts = [];
  let cnt =0;
  for (let i=0;i<n;i++) {
    let rx = Math.floor(frht*Math.random())-frd;
    let ry = Math.floor(frht*Math.random())-frd;
    let p = Point.mk(rx,ry);
    pnts.push(p);
  }
  return pnts;
}

rs.pointsOnCircle = function (n,rad,icenter) {
  debugger;
  let center=icenter?icenter:Point.mk(0,0);
  let pnts = [];
  for (let i=0;i<n;i++) {
    let a = (i/n)*2*Math.PI;
    let p = center.plus(Point.mk(Math.cos(a)*rad,Math.sin(a)*rad));
    pnts.push(p);
  }
  return pnts;
}

rs.pointsOnSeg = function (n,seg) {
  let {end0,end1} = seg;
  let vec = end1.difference(end0);
  let dvec = vec.times(1/n);
  let pnts = [];
  for (let i=0;i<n;i++) {
    let p = end0.plus(dvec.times(i));
    pnts.push(p);
  };
  return pnts;
}
  
  
rs.initialize = function () {
  debugger;
  let {d,schedule,backGroundColor} = this;
  let bkc = backGroundColor?backGroundColor:'black';
 
 this.setBackgroundColor(bkc);
  this.initProtos();
  this.addFrame();
  let lines = this.set('lines',arrayShape.mk());
  let pcircles = this.set('pcircles',arrayShape.mk());
  let icircles = this.set('icircles',arrayShape.mk());
  let ecircles = this.set('ecircles',arrayShape.mk());
  this.segs = [];
  let ipnt = Point.mk(0.5*d,0.25*d);
  let pnts = this.pointsToShow;//pointsOnCircle(67,0.8*d);
 // let pnts = this.pointsOnCircle(7,0.8*d);
  //this.addPointToSchedule(ipnt);
  this.addPointsToSchedule(pnts,0);
  //this.pointsToShow = pnts;
  return;
  let td = this.timeDiff(ipnt);
  let sel;
  if (td < 0) {
    this.addHpath(ipnt.y);
    sel = {tm:-td,dir:'V',pnt:ipnt};
  } else {
    this.addVpath(ipnt.x);
    sel = {tm:td,dir:'H',pnt:ipnt};
  }
  schedule.push(sel);
    
  //this.addHpath(ipnt.y);
  //this.addVpath(ipnt.x);
 
  this.callIfDefined('afterInitialize');

 
}

export {rs};

