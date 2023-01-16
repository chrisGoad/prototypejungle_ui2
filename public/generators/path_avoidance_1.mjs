import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
//import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
debugger;
rs.setName('path_avoidance_0');
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

rs.addHpath = function (n,stt) {
  debugger;
  let nm = 'h'+n;
  pspace[nm] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:1,startAtStep:stt};
  initState[nm] = {value:minH,y:0};
}


rs.addVpath = function (n,iv,x,stt) {
  debugger;
  let nm = 'v'+n;
  pspace[nm] ={kind:'sweep',step:stepV,min:minV,max:maxV,interval:1,once:1,startAtStep:stt};
  initState[nm] = {value:iv,x};
}    

rs.addPaths  = function () {
  let {numV,numH,leftGaps,rightGaps} = this;
  this.addHpath(0,0);
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
}


rs.updateStateOfH= function (n){
  debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {hTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:v,done,y} = cs;
  let pos = Point.mk(v,y);
  let tr = hTravelers[n];
  if (((ssf>stt)&&(n===0))||((ssf <= stt)&&(n===1))) {
    tr.hide();
  } else {
    tr.show();
    tr.moveto(pos);
  }
  tr.update();
}

rs.updateStateOfV= function (nn){
  debugger;
  let {tvTravelers,bvTravelers,stepsSoFar:ssf,numV,leftGaps,rightGaps} = this;
  let ns = Math.floor(ht/stepV);
  let fr = (ssf-1)/ns;
  let ileftGap = leftGaps[nn];
  let leftGap = Math.min(maxV,Math.max(minV,ileftGap + 2*fr*maxV)); 
  let irightGap = rightGaps[nn];
  let rightGap = Math.min(maxV,Math.max(minV,irightGap + 2*fr*maxV));
  let gap = 5;
  let tltop = minV;
  let tlbot = leftGap-gap;
  let tlmid = 0.5*(tltop + tlbot);
  let tlht = tlbot - tltop;
  let bltop = leftGap + gap;
  let blbot = maxV;
  let blmid = 0.5*(bltop + blbot);
  let blht = blbot - bltop;
  let x = minV + (nn/numV) * ht;
  let tlpos = Point.mk(x,tlmid);
 /* let ttr = tvTravelers[nn];
  ttr.moveto(tlpos);
  ttr.height = tlht;
  ttr.update();
  let blpos = Point.mk(x,blmid);
  let btr = bvTravelers[nn];
  btr.moveto(blpos);
  btr.height = blht;
  btr.update();*/
  
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
 /* if (ssf > ns) {
    if (nn< numV) {
      ttr.hide();
      btr.hide();
    } else {
      //console.log('ssf',ssf,'x',x,'v',v);
      ttr.show();
      btr.show();
    }
  }
 
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
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hTtravelers = this.set('hTravelers',arrayShape.mk());
  for (let i=0;i<numH;i++) {
   let crc = this.circleP.instantiate();
   hTtravelers.push(crc)
  }
  this.leftGaps=[];
  this.rightGaps=[];
  let tvTravelers = this.set('tvTravelers',arrayShape.mk());
  let bvTravelers = this.set('bvTravelers',arrayShape.mk());
  let mvTravelers = this.set('mvTravelers',arrayShape.mk());
  for (let i=0;i<numV;i++) {
   let trect= this.rectP.instantiate();
   let brect= this.rectP.instantiate();
   tvTravelers.push(trect);
   bvTravelers.push(brect);
   //mvTtravelers.push(rect);
  }
  this.addPaths();
  
}

export {rs};


