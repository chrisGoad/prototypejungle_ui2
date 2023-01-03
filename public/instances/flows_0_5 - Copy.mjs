import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addFlowMethods} from '/mlib/flows.mjs';	



let rs = basicP.instantiate();

//let rs = basicP.instantiate();
addPathMethods(rs);
addFlowMethods(rs);


//import {rs as generatorP} from '/generators/flows_0.mjs';

//let rs = generatorP.instantiate();

rs.setName('flows_0_5');


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
let topParams = {width:ht*ff,height:ht*ff,framePadding:.6*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);



rs.addLine = function (p0,p1,i,j) {
  let {lineP,linesByOidx,linesByEidx,lines}= this;
  let idx =i*numCols+j;
  let line = lineP.instantiate();
  line.setEnds(p0,p1);
  line.oe0 = p0;
  line.oe1 = p1;
  lines.push(line);
  let lbo = linesByOidx[idx];
  let lbe = linesByEidx[idx];
  lbo.push(line);
  lbe.push(line);
}

rs.buildGrid = function () {
  let {rectP,numRows,numCols,ht,wd,hht,hwd,deltaX,deltaY} = this;
  // column major order
  let lx = - (0.5*(wd-deltaX));
  let ly = - (0.5*(ht-deltaY));
  for (let i=0;i<numRows;i++) {
    let x0 = i*deltaX +lx;
    let x1 = (i+1)*deltaX +lx;
    for (let j=0;j<numCols;j++) {
       let y0 = j*deltaY+ly;
       let y1 = (j+1)*deltaY+ly;
       let p0 = Point.mk(x0,y0);
       let pR = Point.mk(x1,y0);
       let pU = Point.mk(x0,y1);
       if (i < (numRows-1)) {
         this.addLine(p0,pR,i,j,'h');
       }
       if (j < (numCols-1)) {
         this.addLine(p0,pU,i,j,'v');
       }
    }
  }
}
      
 

rs.initProtos = function () {
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .4;
  lineP.stroke = 'white';
  
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
  clr = (rb+gb+bb)%3?'white':'black';
  rect.fill = clr;
  rect.update();
}

rs.adjustPointFun = function (va,i,j) {
  let {linesByOidx,linesByEidx,numCols} = this;
  let idx = i*numCols +j;
  let lbo = linesByOidx[idx];
  let lbe = linesByEidx[idx];
  
  let [r,g,b,dx,dy] = va;
  let rf = Math.floor(r);
  let gf = Math.floor(g);
  let bf = Math.floor(b);
  let clr = `rgb(${rf},${gf},${bf})`;
  let d = Point.mk(dx,dy);
  lbo.forEach((line) => {
    let ae0 = line.end0;
    //let e0 = line.oe0;
    let ne0 = ae0.plus(d);
    ae0.copyto(ne0);
    this.sumpnts = this.sumpnts.plus(ae0);
    this.numpnts++;
    //ae0.copyto(ne0);
    line.stroke = clr;
    line.update();
  });
   lbe.forEach((line) => {
     let ae1 = line.end1;
  // let e1 = line.oe1;
    let ne1 = ae1.plus(d);
    ae1.copyto(ne1);
    this.sumpnts = this.sumpnts.plus(ae1);
    this.numpnts++;
    line.stroke = clr;
    line.update();
  });
}
    
 
rs.setFromTraces = function (n) {
  let {rt,gt,bt,dxt,dyt} = this;
  this.setFromTraceArray(n,[rt,gt,bt,dxt,dyt],
                           [this.toLeftCfn,this.toRightCfn,this.downCfn,this.downCfn,this.upCfn],
                           this.adjustPointFun);
  this.draw();
}


//rs.cycles = 32;
rs.cycles = 16;
rs.cycles = 12;
rs.cycles = 48;
rs.blackSteps = 10;
rs.frameDelta = 60;


rs.stepInterval = 30;
rs.saveAnimation = 1;

rs.initialize = function () {
  debugger;
    let {numRows,numCols,ht,wd,cycles,blackSteps} = this;

  let deltaX = this.deltaX = wd/numCols;
  let deltaY = this.deltaY = ht/numRows;

  let olines =this.set('olines',containerShape.mk());
  olines.set('lines',arrayShape.mk());
  this.lines = olines.lines;
  let linesByOidx = this.linesByOidx = [];
  let linesByEidx = this.linesByEidx = [];
  for (let i=0;i<numRows*numCols;i++) {
    linesByOidx.push([]);
    linesByEidx.push([]);
  }
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  let fc = 2;
  let numSteps = this.numSteps = cycles * fc* numRows;
  let numFrames = this.numFrames = (cycles+2) *fc* numRows;
  let toBlack = numSteps - blackSteps;

//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

  let sr = 10; //subrange
  sr = 5; //subrange
  let dsr = 0.05 *deltaX;
  dsr = 0.5 *deltaX;
  dsr = 0.05 *deltaX;
  let iv = 0;
  let wiv = 100;
  let ssf = 0.04; //substepfactor
  let dssf = 0.05; //substepfactor
  let mi =100; //minintensity
  let hgd = .9* deltaX;
  let lwd= -hgd;
  this.addWpath('r',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('dx',dsr,dssf,lwd,hgd,iv,'forStroke',1);
  this.addWpath('dy',dsr,dssf,lwd,hgd,iv,'forStroke',1);
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  let dxt =this.dxt = [];
  let dyt =this.dyt = [];
 
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushTrace(dxt,'dx',numFrames);
  this.pushTrace(dyt,'dy',numFrames);
  return;
  debugger;
  for (let i=toBlack;i<numFrames;i++) {
    rt[i].value = 0;
    gt[i].value = 0;
    bt[i].value = 0;
  }
}



rs.updateState = function () {
  //let {cFrame,numSteps,wentBack,stepsSoFar:ssf,rt,firstState,pstate,frameDelta,olines} = this;
  let {stepsSoFar:ssf,olines,} = this;
  this.sumpnts = Point.mk(0,0);
  this.numpnts = 0;
  /*let fr = (ssf+frameDelta)%numSteps;
  if (fr === 2) {
    debugger;
  }*/
  this.setFromTraces(ssf);
  debugger;
  let avgpnt = this.sumpnts.times(1/(this.numpnts));
  console.log('avgpnt',avgpnt.x,avgpnt.y);
  olines.moveto(avgpnt.times(-1));
  
}

rs.timeStep = () => {};


export {rs}