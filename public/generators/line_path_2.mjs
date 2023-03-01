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
// compute the side, and the point which a long vector in direction dir emanating from p will hit
rs.hitSide = function (p,dir,fromSide) {
  let {ht,sides} = this;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  let lvec = vec.times(10*ht);
  let seg = LineSegment.mk(p,p.plus(lvec));
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
  return {toSide,toP,vec}
}

rs.addPath = function (params) {
  //let {fromSide,fromP,dir,name,startAtStep} = params;
  let {fromSide,fromP,toSide,toP,dir,vec,name,startAtStep} = params;
  let {sides,ht,pstate,vel} = this;
  let {pspace,cstate} = pstate;
  //let hs = this.hitSide(fromP,dir,fromSide);
  //let {toSide,toP,vec} =hs;
  debugger;
  if (!toP) {
    return;
  }
  let dist = toP.distance(fromP);
  pspace[name] ={kind:'sweep',step:vel,min:0,max:dist/vel,interval:1,once:1,startAtStep};
  cstate[name] = {value:0,fromP,toP,fromSide,toSide,vec,dir};
  cstate[name] = {value:0,fromP,toP,vec,dir};
}

rs.addPathPair = function (params) {
  let {sides,ht,pstate,segs,lines,lineLength:ll,stepsSoFar:ssf,vel,lineP} = this;
 debugger;
 /*
 let dist0;
  if (dir0 || dir1) {
    let hit0 = this.hitSide(p,dir0);
    let {toSide,toP,vec} =hit0;
    dist0 = fromP.distance(toP);
     let hit1 = this.hitSide(p,dir1);
    let {toSide,toP,vec} =hit1;
    dist1 = fromP.distance(toP);  
  }  */
  let delay = ll/vel;
  let sas0 = ssf;
  let sas1=Math.floor(ssf+delay);
  let params0 = Object.assign({},params);
  let params1 = Object.assign({},params);
  let segCount = segs.length;
  let nm0 = 'p'+2*segCount;
  let nm1 = 'p'+(2*segCount+1);
  params0.name = nm0;
  params1.name = nm1;
  params0.startAtStep = sas0;
  params1.startAtStep = sas1;
  this.addPath(params0);
  this.addPath(params1);
  let seg = LineSegment.mk(Point.mk(0,0),Point.mk(0,0));
  seg.active = 1;
  segs.push(seg);
  let line = lineP.instantiate().show();
  lines.push(line);
    
}  

rs.atCycleEndd = function (nm) {
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
rs.updateStateOfSeg = function (n){
  let {stepsSoFar:ssf,segs,lines,part0tm,turnBlack} = this;
  let seg = segs[n];
  if (ssf>-3) {
    debugger;
  }
  if (!seg.active) {
    return;
  }
  let line = lines[n];
  let i1=n*2;
  let i0=n*2+1;
  let e1nm  = 'p'+i1; // the leading end
  let e0nm = 'p'+i0;// the trailing end;
  let {pstate} = this;
  let {pspace,cstate} = pstate;  
  let cs0 = cstate[e0nm];
  let cs1 = cstate[e1nm];
  if ((cs0.done) && (cs1.done)) {
    seg.active = 0;
    line.hide();
    line.update();
    return;
  }
  let {fromP,vec,value:vl0} = cs0;
  let {value:vl1} = cs1;
  let e0 = fromP.plus(vec.times(vl0));
  let e1 = fromP.plus(vec.times(vl1));
  seg.end0 = e0;
  seg.end1 = e1;
  if ((ssf>part0tm)&& (line.length()>5)&& turnBlack) {
    line.stroke='black';
  }
  line.setEnds(e0,e1);
  line.update();
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
  let av = 0;//alsways visible
  this.updateShownPoints(ai);
  let nts = 0;
  pts.forEach((p) => {
    if (av || (p.showMe&&(!p.hideMe))) {
      nts++;
    }
  });
  let cl = pcircles.length;
  pcircles.forEach( (c) => {
   c.hide();
  });
  
  if (nts > cl) {
    let nn = nts-cl;
    //for (let j=0;j<nn;j++) {
    for (let j=0;j<nn;j++) {
      let crc = pcircleP.instantiate();
      pcircles.push(crc);
    }
  }
  let cp=0;
  pts.forEach( (p) => {
    if (av || (p.showMe&&(!p.hideMe))) {
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

rs.addPathsTo = function (p,dir0,dir1) {
 let {stepsSoFar:ssf,vel} = this;
 debugger;
 let rdir0 = dir0+Math.PI;
 let rdir1 = dir1+Math.PI;
 let hit0 = this.hitSide(p,rdir0);
 let {toSide:toSide0,toP:toP0,vec:vec0} =hit0;
 let hit1 = this.hitSide(p,rdir1);
 let {toSide:toSide1,toP:toP1,vec:vec1} =hit1;
 let dist0 = p.distance(toP0);
 let dist1 = p.distance(toP1);
 let params0= {fromP:toP0,toP:p,dir:rdir0,vec:vec0.times(-1)};
 let params1 = {fromP:toP1,toP:p,dir:rdir1,vec:vec1.times(-1)};
 if (dist1 > dist0) {
   params1.startAtStep = (dist1-dist0)/vel + ssf;
 } else {
   params0.startAtStep =(dist0-dist1)/vel + ssf;
 }
 this.addPathPair(params0);
 this.addPathPair(params1);
}


rs.scheduleForPoint= function (p,dir0,dir1) {
 let {stepsSoFar:ssf,vel,schedule} = this;
 debugger;
 let rdir0 = dir0+Math.PI;
 let rdir1 = dir1+Math.PI;
 let hit0 = this.hitSide(p,rdir0);
 let ohit0 = this.hitSide(p,dir0);
 let {toSide:toSide0,toP:toP0,vec:vec0} =hit0;
 let {toP:otoP0} =ohit0;
 let hit1 = this.hitSide(p,rdir1);
 let ohit1 = this.hitSide(p,dir1);
 let {toSide:toSide1,toP:toP1,vec:vec1} =hit1;
 let {toP:otoP1} =ohit1;

 let dist0 = p.distance(toP0);
 let dist1 = p.distance(toP1);
 let sched0= {fromP:toP0,toP:otoP0,dir:rdir0,vec:vec0.times(-1)};
 let sched1 = {fromP:toP1,toP:otoP1,dir:rdir1,vec:vec1.times(-1)};
 if (dist1 > dist0) {
   sched0.startStep = Math.floor((dist1-dist0)/vel + ssf);
   sched1.startStep = ssf+1;
 } else {
   sched1.startStep = Math.floor((dist0-dist1)/vel + ssf);
   sched0.startStep = ssf+1;
 }
 schedule.push(sched0);
 schedule.push(sched1);
 //this.addPathPair(params0);
 //this.addPathPair(params1);
}

rs .addVpath = function (x) {
  let {d} = this;
  let opnt = Point.mk(x,-d);
  this.addPathPair({fromSide:1,fromP:opnt,dir:0.5*Math.PI});
}



rs .addVpath = function (x) {
  let {d} = this;
  let opnt = Point.mk(x,-d);
  this.addPaths({fromSide:1,fromP:opnt,dir:0.5*Math.PI});
}

rs.addVpathM = function (x) {
  let {d} = this;
  let opnt = Point.mk(x,d);
  this.addPathPair({fromSide:3,fromP:opnt,dir:-0.5*Math.PI});
}



rs .addHpath = function (y) {
  let {d} = this;
  let opnt = Point.mk(-d,y);
  this.addPathPair({fromSide:0,fromP:opnt,dir:0});
}


rs.addHpathM = function (y) {
  let {d} = this;
  let opnt = Point.mk(d,y);
  this.addPathPair({fromSide:2,fromP:opnt,dir:Math.PI});
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
  debugger;
  let ln = segs.length;
  for (let i=0;i<ln;i++) {
    this.updateStateOfSeg(i);
  }
  schedule.forEach( (sel) => {
    let {startStep:ss} = sel;
    if (ssf === ss) {
      debugger;
      this.addPathPair(sel);
    }
    
  });
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

rs.addPointToSchedule = function (pnt,dir) {
 debugger;
 if (pd) {
   this.addPathsTo(pnt,0,0.5*Math.PI);
 }  else {
   this.addPathsTo(pnt,Math.PI,1.5*Math.PI);
 }
}
     

rs.addPointToSchedulee = function (pnt,pd,itm) {
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

rs.addPointsToSchedule = function (pnts) {
  let ln = pnts.length;
  for (let i=0;i<ln;i++) {
    let p = pnts[i] 
    //this.addPointToSchedule(p,Math.random()<0.5,itm);//i%2);
    let ada = Math.random()*2*Math.PI;//i%2?0:Math.PI;
    this.scheduleForPoint(p,0+ada,0.5*Math.PI+ada);
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

