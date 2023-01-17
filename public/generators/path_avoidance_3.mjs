import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_3');
let ht = rs.ht= 100;
let topParams = {width:rs.ht,height:rs.ht,framePadding:.2*ht,frameStrokee:'white',frameStrokeWidth:1}

Object.assign(rs,topParams);
rs.numH = 2;
rs.numV = 16;
 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let stepH = 1;
let stepV = 1;
let minH = -0.5*ht;
let maxH = 0.5*ht;
let minV = -0.5*ht;
let maxV = 0.5*ht;
let yDelta =10;
let yMin = -0.5*ht;

rs.addHpaths = function () {
  debugger;
  let nm0 = 'h0';
  let nm1 = 'h1';
  pspace[nm0] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm0] = {value:minH,y:0};
  pspace[nm1] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1};
  initState[nm1] = {value:minH,y:0};
}


rs.addVpath = function (n,iv,x,stt) {
  debugger;
  let nm = 'v'+n;
  pspace[nm] ={kind:'sweep',step:stepV,min:minV,max:maxV,interval:1,once:1,startAtStep:stt};
  initState[nm] = {value:iv,x};
}    

rs.addPaths  = function () {
  let {numV,numH,leftGaps,rightGaps,topLeftGaps,topRightGaps} = this;
  this.addHpaths();
  let delta = 1/8;
 //delta = 1/2;
  let fr = 0;
  for (let i=0;i<numV;i++) {// left
    leftGaps.push(fr*minV);
    fr = fr + delta;
  }
  fr = 0;
  for (let i=numV-1;i>=0;i--) {// right
  //  rightGaps.push(fr*minV);
    rightGaps[i] = fr*minV;
    fr = fr + delta;
  }
  fr = 0;
  for (let i=0;i<numV;i++) {// left
    topLeftGaps.push(fr*minV);
    fr = fr + delta;
  }
  fr = 0;
  for (let i=numV-1;i>=0;i--) {// right
  //  rightGaps.push(fr*minV);
    topRightGaps[i] = fr*minV;
    fr = fr + delta;
  }
}


rs.updateStateOfH= function (n){
  //debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {hTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:iv,done,y} = cs;
  let v = (n===0)?iv: -5-iv;
  let pos = Point.mk(v,y);
  let tr = hTravelers[n];
  /*if (((ssf>stt)&&(n===0))||((ssf <= stt)&&(n===1))) {
    tr.hide();
  } else {*/
    tr.show();
    tr.moveto(pos);
  //}
  tr.update();
}

rs.updateStateOfV= function (nn){
  //debugger;
  let {tvTravelers,bvTravelers,mvTravelers,m2vTravelers,stepsSoFar:ssf,numV,leftGaps,rightGaps,topLeftGaps,topRightGaps,numSteps} = this;
  let ns = Math.floor(ht/stepV);
  let fr = (ssf-1)/ns;
  let frstart = 0.4;
  let tstart = fr>frstart;
  let pastStart = fr-frstart;
  if ((ssf>numSteps-2)&&(nn===7)) {
    debugger;
  }
  if (tstart) {
    //debugger;
  }
  let ileftGap = leftGaps[nn];
  let leftGap = Math.min(maxV,Math.max(minV,ileftGap + 2*fr*maxV)); 
  let irightGap = rightGaps[nn];
  let rightGap = Math.min(maxV,Math.max(minV,irightGap + 2*fr*maxV));
  
  let iTopleftGap = topLeftGaps[nn];
  let tfc = 1.7;
  let topLeftGap = Math.min(maxV,Math.max(minV,minV + iTopleftGap + tfc*pastStart*maxV)); 
  let iToprightGap = topRightGaps[nn];
  let topRightGap = Math.min(maxV,Math.max(minV,minV + iToprightGap + tfc*pastStart*maxV));
  let veryTopGap, topGap,botGap;
  if (tstart) {
     veryTopGap = (nn<=0.5*numV)?topLeftGap:topRightGap;
  } 
  if (leftGap > rightGap) {
    topGap = rightGap;
    botGap = leftGap;
  } else {
    topGap = leftGap;
    botGap = rightGap;
  }
  let gapd = botGap - topGap;
  let gap = 5;
  let threeGaps = (ssf>(numSteps-5)) ||  ( tstart && (veryTopGap > (minV - 4)) && (gapd > 2*gap));
  let twoGaps = (!threeGaps) && (gapd > 2*gap);
  let oneGap = !(twoGaps || threeGaps);
  let tltop = minV;
  let tlbot = threeGaps?veryTopGap-gap:topGap-gap;
 // let tlbot = topGap-gap;
  let tlmid = 0.5*(tltop + tlbot);
  let tlht = Math.max(0,tlbot - tltop);
  
  let mtop = threeGaps?veryTopGap+gap:topGap + gap;
  let mbot = threeGaps?topGap-gap:botGap-gap;
  let mmid = 0.5*(mtop + mbot);
  let mht =  Math.max(0,mbot - mtop);
  
  let m2top = topGap+gap;
  let m2bot = botGap - gap;
   let m2mid = 0.5*(m2top + m2bot);
  let m2ht =  Math.max(0,m2bot - m2top);
  
  let bltop = botGap + gap;
  let blbot = maxV;
  let blmid = 0.5*(bltop + blbot);
  let blht =  Math.max(0,blbot - bltop);
 
 let x = minV + (nn/numV) * ht;
  let tlpos = Point.mk(x,tlmid);
  let ttr = tvTravelers[nn];
  ttr.moveto(tlpos);
  ttr.height = Math.max(0,tlht);
  ttr.update();
  let mtr = mvTravelers[nn];
  let m2tr = m2vTravelers[nn];
  if (threeGaps) {
    let m2pos = Point.mk(x,m2mid);
    m2tr.moveto(m2pos);
    m2tr.height = Math.max(0,m2ht);
    m2tr.show();
    m2tr.update();
  } else {
    m2tr.hide();
  }
  if (twoGaps || threeGaps) {
    let mpos = Point.mk(x,mmid);
    mtr.moveto(mpos);
    mtr.height = Math.max(0,mht);
    mtr.show();
    mtr.update();
  }
  if (oneGap) {
    mtr.hide();
  }
  
  let blpos = Point.mk(x,blmid);
  let btr = bvTravelers[nn];
  btr.moveto(blpos);
  btr.height = Math.max(0,blht);
  btr.update();
  return;
  /*
  
   let trtop = minV;
  let trbot = rightGap-gap;
  let trmid = 0.5*(trtop + trbot);
  let trht = trbot - trtop;
  let brtop = rightGap + gap;
  let brbot = maxV;
  let brmid = 0.5*(brtop + brbot);
  let brht = brbot - brtop;
  //let x = minV + (nn/numV) * ht;
  let trpos = Point.mk(x,trmid);
  let ttr = tvTravelers[nn];
  ttr.moveto(trpos);
  ttr.height = trht;
  ttr.update();
  let brpos = Point.mk(x,brmid);
  let btr = bvTravelers[nn];
  btr.moveto(brpos);
  btr.height = brht;
  btr.update();
  return;
 /*
  let topy = ps.min;
  let boty = ps.max;
  let trht = Math.min(2*boty,Math.max(0,v-topy-gap));
  let brht = Math.min(2*boty,Math.max(0,boty -v -gap));
  let ttry = topy + 0.5*trht;
  let btry = boty - 0.5*brht;
  let ttrpos = Point.mk(x,ttry);
  let btrpos = Point.mk(x,btry);
  
  ttr.moveto(ttrpos);
  btr.moveto(btrpos);
  ttr.height = trht;
  ttr.update();
  btr.height = brht;
  btr.update();*/
}

rs.updateState = function () {
  let {stepsSoFar:ssf} = this;
  console.log('ssf',ssf);
  let {numH,numV} = this;
  this.updateStateOfH(0);
  this.updateStateOfH(1);
 // this.updateStateOfH(1);
  for (let i=0;i<numV;i++) {
//  for (let i=0;i<numV;i++) {
    this.updateStateOfV(i);
  }     
}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.025*this.ht;
    let rectP = this.rectP = rectPP.instantiate();
  rectP.fill = 'white';
  rectP['stroke-width'] = 0;
  rectP.width =0.01*this.ht;
}  


rs.numSteps = 2.4*Math.floor(ht/stepH);
rs.numSteps = 2*Math.floor(ht/stepH);
rs.numSteps = Math.floor(ht/stepH);
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hTtravelers = this.set('hTravelers',arrayShape.mk());
   let crc0 = this.circleP.instantiate();
   crc0.fill = 'blue';
   hTtravelers.push(crc0);
    let crc1 = this.circleP.instantiate();
   crc1.fill = 'red';
   hTtravelers.push(crc1)
  this.topGaps = [];
  this.leftGaps=[];
  this.topLeftGaps=[];
  this.rightGaps=[];
  this.topRightGaps=[];
  let tvTravelers = this.set('tvTravelers',arrayShape.mk());
  let bvTravelers = this.set('bvTravelers',arrayShape.mk());
  let mvTravelers = this.set('mvTravelers',arrayShape.mk());
  let m2vTravelers = this.set('m2vTravelers',arrayShape.mk());
  for (let i=0;i<numV;i++) {
   let trect= this.rectP.instantiate();
   let brect= this.rectP.instantiate();
   let mrect= this.rectP.instantiate();
   let m2rect= this.rectP.instantiate();
   tvTravelers.push(trect);
   bvTravelers.push(brect);
   mvTravelers.push(mrect);
   m2vTravelers.push(m2rect);
  }
  this.addPaths();
  
}

export {rs};


