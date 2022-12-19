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
let numRows = rs.numRows = 64;
let numCols = rs.numCols = 64;


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
  rectP.fill = 'red';
  
}  



rs.setFromTrace = function (n,cfn,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  debugger;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx = cfn.call(this,i,j);
      let vm = tr[n+idx];
      let v = vm?vm.value:0;
      ifn.call(this,v,i,j);
    }
  }
}

rs.setFrom3Traces = function (ntr0,tr1,tr3,cfn0,cfn1,cfn2,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  debugger;
  const valueOf = (a,i) => {
    let vm = a[i];
    return vm?vm.value:0;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx0 = cfn0(this,i,j);
      let idx1 = cfn1(this,i,j);
      let idx2 = cfn2(this,i,j);
      let vm = tr[n+idx];
      let v0 = valueOf(tr0,n+idx0);
      let v1 = valueOf(tr1,n+idx0);
      let v2 = valueOf(tr2,n+idx0);
      ifn(this,v0,v1,v2,i,j);
    }
  }
}

rs.upCfn = function (i,j) {
  return j;
}

rs.greyIfn = function (v,i,j) {
  let {rects,numCols} = this;
  let idx = i*numCols +j;
  let rect = rects[idx];
  let clr = `rgb(${v},${v},${v})`;
  rect.fill = clrf;
}
    
  //  rs.setFromTrace = function (n,cfn,ifn) { //cfn = choice funtion; ifn = installation function

rs.setFromTraces = function (n) {
  let {rt} = this;
  this.setFromTrace(n,this.upCfn,this.greyIfn);
}


rs.cycles = 5;
rs.initialize = function () {
  debugger;
    let {numRows,numCols,ht,wd,cycles} = this;

  let deltaX = this.deltaX = wd/numCols;
  let deltaY = this.deltaY = ht/numRows;
  let rects = this.set('rects',arrayShape.mk());
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  let numSteps = this.numSteps = (cycles+1) * numRows;
  
 

//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

  let sr = 10; //subrange
  let iv = 0;
  let ssf = 0.04; //substepfactor
  let mi = 0; //minintensity
  this.addWpath('r',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,iv,'forStroke',1);
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushBlacks();
  this.numSteps =(this.numSteps)+2*numLines;
 rs.cFrame = (this.numSteps)/2;
}


rs.cFrame = 0;
rs.stepsSoFar = 0;


rs.updateState = function () {
  let {cFrame,numSteps,wentBack} = this;
  this.setFromTraces(cFrame);
  cFrame++;
  if (cFrame>=numSteps-80) {
    cFrame = 0;
    rs.wentBack =1;
  } 
  if (wentBack && (cFrame === (numSteps/2)+2)) {
    this.stepsSoFar = numSteps+1;
  }
  this.cFrame = cFrame;
}

rs.timeStep = () => {};


rs.stepInterval = 60;
rs.saveAnimation = 1;
export {rs}