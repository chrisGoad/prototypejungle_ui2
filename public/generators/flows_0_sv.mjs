import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('flows_0');


rs.pstate = {pspace:{},cstate:{}};


let ht= rs.ht = 100;
let wd = rs.wd = 100;
let hht = rs.hht = 0.5*ht;
let hwd = rs.hwd = 0.5*wd;
let nr = 32;
let numRows = rs.numRows = nr;
let numCols = rs.numCols = nr;


let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);

rs.buildGrid = function () {
  let {rectP,numRows,numCols,ht,wd,hht,hwd,rects,deltaX,deltaY} = this;
 
  const addRect = (p)=> {
    let rect = rectP.instantiate();
    rects.push(rect);
    rect.moveto(p);
  }
  // column major order
  for (let i=0;i<numRows;i++) {
    let x = i*deltaX - hwd;
    for (let j=0;j<numCols;j++) {
       let y = j*deltaY - hht;
       let p = Point.mk(x,y);
       addRect(p);
    }
  }
}
      
 

rs.initProtos = function () {
  let {deltaX,deltaY} = this;
  let rectP = this.rectP = rectPP.instantiate();
  rectP['stroke-width'] = 0;
  let sc = 0.8;
  rectP.width = sc*deltaX;
  rectP.height = sc*deltaY;
  rectP.fill = 'white';
  
}  



rs.setFromTrace = function (n,tr,cfn,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx = cfn.call(this,i,j);
      let vm = tr[n+idx];
      let v = vm?vm.value:0;
      ifn.call(this,v,i,j);
    }
  }
}

rs.setFrom3Traces = function (n,tr0,tr1,tr2,cfn0,cfn1,cfn2,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  const valueOf = (a,i) => {
    let vm = a[i];
    return vm?vm.value:0;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx0 = cfn0.call(this,i,j);
      let idx1 = cfn1.call(this,i,j);
      let idx2 = cfn2.call(this,i,j);
      let v0 = valueOf(tr0,n+idx0);
      let v1 = valueOf(tr1,n+idx1);
      let v2 = valueOf(tr2,n+idx2);
      ifn.call(this,v0,v1,v2,i,j);
    }
  }
}

rs.upCfn = function (i,j) {
  return j;
}

rs.downCfn = function (i,j) {
  let {numRows} = this;
  return numRows-j;
}
rs.toLeftCfn = function (i,j) {
  return i;
}
rs.toRightCfn = function (i,j) {
  let {numCols} = this;
  return numCols - i;
}

rs.greyIfn = function (v,i,j) {
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  let fv = Math.floor(v);
  let clr = `rgb(${v},${v},${v})`;
  rect.fill = clr;
  rect.update();
}

rs.wIfn = function (v,i,j) {
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  rect.width = v;
  rect.update();
}
rs.hIfn = function (v,i,j) {
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  rect.height = v;
  rect.update();
}



rs.fillIfn = function (r,g,b,i,j) {
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  let clr;
  let rb = r>150?1:0;
  let gb= g>150?1:0;
  let bb = b>150?1:0;
  clr = (rb+gb+bb)%2?'white':'black';
 /* if (r>150) {
    if (g>150) {
      if (b>150) {
        clr = 'blue';
      } else {
        clr = 'red';
      }
    } else {
      clr = 'green';
    }
  } else {
    clr = 'yellow'
  }*
  let res = 80;
  let fr = Math.floor(r/res)*res;
  let fg = Math.floor(g/res)*res;
  let fb = Math.floor(b/res)*res;
 /* let fr = r<150?100:250;
  let fg = g<150?100:250;
  let fb = b<150?100:250;
  //let fr = Math.floor(r);
  //let fg = Math.floor(g);
  //let fb = Math.floor(b);*/
  //clr = `rgb(${fr},${fg},${fb})`;
  rect.fill = clr;
  rect.update();
}
    
  //  rs.setFromTrace = function (n,cfn,ifn) { //cfn = choice funtion; ifn = installation function

rs.setFromTraces = function (n) {
  let {rt} = this;
  this.setFromTrace(rt,n,this.downCfn,this.greyIfn);
}

rs.setFromTraces = function (n) {
  let {rt,gt,bt,wt,htt} = this;
  this.setFrom3Traces(n,rt,gt,bt,this.downCfn,this.upCfn,this.toRightCfn,this.fillIfn);
    this.setFromTrace(n,wt,this.toLeftCfn,this.wIfn);
    this.setFromTrace(n,htt,this.toRightCfn,this.hIfn);

}

rs.initialize = function () {
  debugger;
    let {numRows,numCols,ht,wd,cycles} = this;

  let deltaX = this.deltaX = wd/numCols;
  let deltaY = this.deltaY = ht/numRows;
  let rects = this.set('rects',arrayShape.mk());
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  let numSteps = this.numSteps = cycles * numRows;
  let numFrames = this.numFrames = (cycles+2) * numRows;
  this.toBlack = numSteps - 20;
  this.afterInitialize();
}	

rs.cycles = 32;
rs.cycles = 16;
rs.startStep =rs.numRows ;
rs.toBlack = rs.numSteps  - 2;
rs.saveAnimation = 1;
rs.afterInitialize = function () {
    let {numRows,numCols,ht,wd,cycles,deltaX,deltaY,numSteps,numFrames,toBlack} = this;


//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

  let sr = 10; //subrange
  let dsr = 0.1 *deltaX;
  let iv = 0;
  let wiv = 0.4*deltaX;
  let ssf = 0.04; //substepfactor
  let dssf = 0.05; //substepfactor
  let mi = 100; //minintensity
  let md= deltaX*0.1;; //minintensity
  this.addWpath('r',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('w',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  this.addWpath('h',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  let wt =this.wt = [];
  let htt =this.htt = [];
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushTrace(wt,'w',numFrames);
  this.pushTrace(htt,'h',numFrames);
  debugger;
  for (let i=toBlack;i<numFrames;i++) {
    wt[i].value = 0;
    htt[i].value = 0;
  }
  //this.stepsSoFar = this.startStep;
 //rs.cFrame = (this.numSteps)/2;
}


rs.frameDelta = 50;
rs.stepsSoFar = 0;

rs.updateState = function () {
  let {cFrame,numSteps,wentBack,stepsSoFar:ssf,rt,firstState,pstate,frameDelta} = this;
  let fr = (ssf+frameDelta)%numSteps;
  if (fr === 2) {
    debugger;
  }
  this.setFromTraces(fr);
  
}

rs.timeStep = () => {};


rs.stepInterval = 30;
rs.saveAnimation = 1;
export {rs}