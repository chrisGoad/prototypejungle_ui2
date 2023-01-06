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

rs.setName('flows_0_6');


rs.pstate = {pspace:{},cstate:{}};


let ht= rs.ht = 100;
let wd = rs.wd = 100;
let hht = rs.hht = 0.5*ht;
let hwd = rs.hwd = 0.5*wd;
let nr = 32;
nr=24;
//nr=4;
let numRows = rs.numRows = nr;
let numCols = rs.numCols = nr;


let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:1.5*ht,frameStrokee:'white',frameStrokeWidth:1}
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


rs.buildGrid = function () {
  let {numRows,numCols,height:ht,width:wd,deltaX,deltaY,points} = this;
  // column major order
  let lx = - (0.5*(wd-deltaX));
  let ly = - (0.5*(ht-deltaY));
  for (let i=0;i<numCols;i++) {
    let x0 = i*deltaX +lx;
    for (let j=0;j<numRows;j++) {
       let y0 = j*deltaY+ly;
       let p0 = Point.mk(x0,y0);
       p0.i = i;
       p0.j = j;
       points.push(p0);
    }
  }
}

rs.addLines = function () {
  let {numRows,numCols,lines,points,lineP} = this;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let pOidx = i*numRows+j;
      let pRidx = (i+1)*numRows+j;
      let pUidx = i*numRows+j+1;
      let pO = points[pOidx];
      let pR,pU,line;
      if (i < (numCols-1)) {
        pR = points[pRidx];
        line = lineP.instantiate();
        //line.setEnds(pO,pR);
        line.end0 = pO;
        line.end1 = pR;
        lines.push(line);
        pO.hline = line;
      }
      if (j < (numRows-1)) {
        pU = points[pUidx];
        line = lineP.instantiate();
        //line.setEnds(pO,pU);
        line.end0 = pO;
        line.end1 = pU;
        lines.push(line);
        pO.vline = line;
      }         
    }
  }
}    
 

rs.initProtos = function () {
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .6;
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

rs.recordGridHistory = function (va,t,i,j) {
  let {gridHistory:grh,numCols,points} = this;
    let [r,g,b,dx,dy] = va;

  let ln =grh.length;
    let idx = i*numCols +j;
  let cgs;
  if (t > 0) {
    if (t>5) {
       debugger;
    }
    let lg = grh[t-1]
    let cellv = lg[idx];
    let lx = cellv[5];
    let ly = cellv[6];
    va.push(lx + dx);
    va.push(ly + dy);
  } else {
    let op =  points[idx]
    va.push(op.x);
    va.push(op.y);
  }
  if (t >30) {
  // console.log('t',t,'ln',ln,'idx',idx,'i',i,'j',j,'r',r,'g',g,'b',b);
   if (r===0) {
     debugger;
   }
  }
  if (t>=ln) {

   cgs = [];
   grh.push(cgs);
  } else {
    cgs = grh[t];
  }
  cgs.push(va);
}
  
rs.adjustPointFun = function (va,t,i,j) {
  let {numCols,points} = this;
  debugger;
  let idx = i*numCols +j;
  //let Ridx = (i+1)*numCols +j;
  //let Uidx = (i+1)*numCols +j+1;
 // let pO = points[idx];
  
  let [r,g,b,dx,dy,x,y] = va;
  let rf = Math.floor(r);
  let gf = Math.floor(g);
  let bf = Math.floor(b);
  let clr = `rgb(${rf},${gf},${bf})`;
  let d = Point.mk(dx,dy);
  let p = points[idx];
  p.clr = clr;
  p.x = x;
  p.y = y;
  //p.copyto(p.plus(d));
  this.sumpnts = this.sumpnts.plus(p);
    this.numpnts++;
}
    
 
rs.setFromTracess = function (n) {
  let {rt,gt,bt,dxt,dyt} = this;
  this.setFromTraceArray(n,[rt,gt,bt,dxt,dyt],
    //                       [this.toLeftCfn,this.toRightCfn,this.downCfn,this.downCfn,this.upCfn],
                           [this.toRightCfn,this.toRightCfn,this.toRightCfn,this.downCfn,this.upCfn],
                           this.adjustPointFun);
  this.draw();
}

rs.traceProps = ['r','g','b','dx','dy'];

rs.setFromTraces = function (n) {
  let {traceProps,traceB} = this;
  let traces = [];
  //debugger;
  traceProps.forEach((p) => traces.push(traceB[p]));
  //let {r,g,b,dx,dy} = this.traceB;
  if (n === 31) {
  //  debugger;
  }
 //this.setFromTraceArray(n,[r,g,b,dx,dy],
  this.setFromTraceArray(n,traces,
                           //[this.toLeftCfn,this.toRightCfn,this.downCfn,this.downCfn,this.upCfn],
                            [this.toRightCfn,this.toRightCfn,this.toRightCfn,this.downCfn,this.upCfn],
                       //   this.adjustPointFun);
                          this.recordGridHistory);
  this.draw();
}


//rs.cycles = 32;
rs.cycles = 16;
rs.cycles = 12;
rs.cycles = 8;
//rs.cycles = 2;
rs.blackSteps = 0;
rs.frameDelta = 120;
rs.frameDelta = 0;


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
  this.points = [];
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  this.addLines();
  let fc = 2;
  let fci = 1;
  let numSteps = this.numSteps = cycles * fc* numRows;
  let numFrames = this.numFrames = (cycles+4) *fc* numRows;
  let numIframes = this.numIframes = fci* numRows;
  let toBlack = numSteps - blackSteps;

//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) 
  let sr = 10; //subrange
  sr = 5; //subrange
  let dsr = 0.05 *deltaX;
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
 debugger;
  let traceB = this.traceB =this.recordTraceBundle(numFrames);
  //numSteps = this.numSteps = this.traceBundleTraceLength(traceB);
  let gridHistory =this.gridHistory = [];
  debugger;
  for (let tm=0;tm<numSteps;tm++) {
    this.setFromTraces(tm);
  }
  let iState = gridHistory[0];
  let fState = gridHistory[numSteps-1];
  debugger;
  let interp = this.interpolateBetweenGridStates(fState,iState,numIframes);
  gridHistory = this.gridHistory = gridHistory.concat(interp);
  this.numSteps = this.gridHistory.length;
  debugger;
  return;
  for (let i=toBlack;i<numFrames;i++) {
    traces.r[i].value = 0;
    traces.g[i].value = 0;
    traces.b[i].value = 0;
  }
}

/* let maintTraceB = this.traceB =this.recordTraceBundle(numFrames);
  this.firstState = this.firstTraceBundleState(mainTraceB);
  this.lastState = this.lastTraceBundleState(mainTraceB);
  let iTraceB = this.interpolateStates(this.lastState,this.firstState,numIframes);
  let traceB = this.traceB = this.concatTraceBundles(mainTraceB,iTraceB);*/

rs.firstFrame = 1;
rs.updateState = function () {

  //let {cFrame,numSteps,wentBack,stepsSoFar:ssf,rt,firstState,pstate,frameDelta,olines,lines} = this;
  let {stepsSoFar:ssf,olines,lines,points,numSteps,frameDelta,traceB,pstate,gridHistory,numCols,numRows} = this;
  //debugger;
  console.log('ssf',ssf);
  this.sumpnts = Point.mk(0,0);
  this.numpnts = 0;
  let cgrid = gridHistory[ssf];
  if (!cgrid) {
    debugger;
    return;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx = i*numCols+j;
      let va = cgrid[idx];
      this.adjustPointFun(va,ssf,i,j);
    }
  }
  
  lines.forEach((line) => {
    let e0 = line.end0;
    line.stroke = e0.clr;
    line.update();
    line.draw();
  });
 // return;
  let avgpnt = this.sumpnts.times(1/(this.numpnts));
 // console.log('avgpnt',avgpnt.x,avgpnt.y);
  olines.moveto(avgpnt.times(-1)); 
}

rs.timeStep = () => {};


export {rs}