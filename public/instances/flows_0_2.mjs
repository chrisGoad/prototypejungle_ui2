import {rs as rectPP} from '/shape/rectangle.mjs';


import {rs as generatorP} from '/generators/flows_0.mjs';

let rs = generatorP.instantiate();

rs.setName('flows_0_2');


rs.pstate = {pspace:{},cstate:{}};


let ht= rs.ht = 100;
let wd = rs.wd = 100;
let hht = rs.hht = 0.5*ht;
let hwd = rs.hwd = 0.5*wd;
let nr = 32;
//nr=48;
let numRows = rs.numRows = nr;
let numCols = rs.numCols = nr;


let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.2*ht,frameStrokee:'white',frameStrokeWidth:1}
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

rs.wIfn = function (va,i,j) {
  let [v0,v1] = va;
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  rect.width = (v0+v1)/2;
  rect.update();
}
rs.hIfn = function (va,i,j) {
  let [v0,v1] = va;
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  rect.height = (v0+v1)/2;
  rect.update();
}



rs.fillIfn = function (va,i,j) {
  let [r,g,b] = va;
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  rect.fill =  `rgb(${r},${g},${b})`;
  return;
  let rb = r>150?1:0;
  let gb= g>150?1:0;
  let bb = b>150?1:0;
  let clr = (rb+gb+bb)%3?'white':'white';
  rect.fill = clr;
  rect.update();
}
    
 
rs.setFromTraces = function (n) {
  let {rt,gt,bt,wt0,wt1,htt0,htt1} = this;
  this.setFromTraceArray(n,[rt,gt,bt],[this.downCfn,this.upCfn,this.toRightCfn],this.fillIfn);
  this.setFromTraceArray(n,[wt0,wt1],[this.downCfn,this.upCfn],this.wIfn);
  this.setFromTraceArray(n,[htt0,htt1],[this.toRightCfn,this.toLeftCfn],this.hIfn);

}


rs.cycles = 32;
rs.cycles = 16;
rs.saveAnimation = 1;
rs.blackSteps = 10;
rs.frameDelta = 100;
//rs.frameDelta = 0;

rs.stepInterval = 30;
rs.saveAnimation = 1;

rs.initialize = function () {
  debugger;
    let {numRows,numCols,ht,wd,cycles,blackSteps} = this;

  let deltaX = this.deltaX = wd/numCols;
  let deltaY = this.deltaY = ht/numRows;
  let rects = this.set('rects',arrayShape.mk());
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  let numSteps = this.numSteps = cycles * numRows;
  let numFrames = this.numFrames = (cycles+2) * numRows;
  let toBlack = numSteps - blackSteps;

//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

  let sr = 10; //subrange
  sr = 5; //subrange
  let dsr = 0.1 *deltaX;
  dsr = 0.05 *deltaX;
  let iv = 0;
  let wiv = 0.4*deltaX;
  wiv = 0;
  let ssf = 0.04; //substepfactor
  let dssf = 0.05; //substepfactor
  dssf = 0.1; //substepfactor
  let mi = 100; //minintensity
  let md= deltaX*0.1;; //minintensity
  this.addWpath('r',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('w0',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  this.addWpath('w1',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  this.addWpath('h0',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  this.addWpath('h1',dsr,dssf,md,0.8*deltaX,wiv,'forStroke',1);
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  let wt0 =this.wt0 = [];
  let wt1 =this.wt1 = [];
  let htt0 =this.htt0 = [];
  let htt1 =this.htt1 = [];
  let numZeros = numRows;
  this.pushValNtimes(wt0,{value:0},numZeros);
  this.pushValNtimes(wt1,{value:0},numZeros);
  this.pushValNtimes(htt0,{value:0},numZeros);
  this.pushValNtimes(htt1,{value:0},numZeros);
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushTrace(wt0,'w0',numFrames-numZeros);
  this.pushTrace(wt1,'w1',numFrames-numZeros);
  this.pushTrace(htt0,'h0',numFrames-numZeros);
  this.pushTrace(htt1,'h1',numFrames-numZeros);
  debugger;
  for (let i=toBlack;i<numFrames;i++) {
    wt0[i].value = 0;
    wt1[i].value = 0;
    htt0[i].value = 0;
    htt1[i].value = 0;
  }
}



rs.updateState = function () {
  let {cFrame,numSteps,wentBack,stepsSoFar:ssf,rt,firstState,pstate,frameDelta} = this;
  let fr = (ssf+frameDelta)%numSteps;
  if (fr === 2) {
    debugger;
  }
  this.setFromTraces(fr);
  
}

rs.timeStep = () => {};


export {rs}