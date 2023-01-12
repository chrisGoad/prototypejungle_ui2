import {rs as linePP} from '/shape/line.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addFlowMethods} from '/mlib/flows.mjs';	



let rs = basicP.instantiate();

//let rs = basicP.instantiate();
addPathMethods(rs);
addFlowMethods(rs);


//import {rs as generatorP} from '/generators/flows_0.mjs';

//let rs = generatorP.instantiate();

rs.setName('flows_0_7');


rs.pstate = {pspace:{},cstate:{}};


let ht= rs.ht = 100;
let wd = rs.wd = 100;
let hht = rs.hht = 0.5*ht;
let hwd = rs.hwd = 0.5*wd;
let nr = 32;
nr=24;
//nr=16;
let numRows = rs.numRows = nr;
let numCols = rs.numCols = nr;


let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:1.5*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);



rs.addPolygon = function (pnts) {
  let {polygonP,gons}= this;
  let idx =i*numCols+j;
  let polygon = polygonP.instantiate();
  polygon.corners = pnts;
  gons.push(polygon);
 
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

rs.scalePoints = function (a,s) {
  let avg = Point.mk(0,0);
  a.forEach((p) => {
    avg = avg.plus(p);
  });
  let ln = a.length;
  let cnt = avg.times(1/ln);
  let npa= [];
  a.forEach((p) => {
   let np=cnt.plus(p.difference(cnt).times(s));
   np.clr = p.clr;
   npa.push(np);
  });
  return npa;
}
  
rs.gonPoints = function (i,j) {
  let {points} = this;
  let pLLidx = i*numRows+j;
  let pLRidx = (i+1)*numRows+j;
  let pULidx = i*numRows+j+1;
  let pURidx = (i+1)*numRows+j+1;
  let pLL = points[pLLidx];
  let pLR = points[pLRidx];
  let pUL = points[pULidx];
  let pUR = points[pURidx];
  let a = [pLL,pLR,pUR,pUL];
  let sc = pLL.sc;
  let sp = this.scalePoints(a,sc);
  return sp;
}

rs.addGons = function () {
  let {numRows,numCols,gons,points,polygonP} = this;
  debugger;
  for (let i=0;i<numCols-1;i++) {
    for (let j=0;j<numRows-1;j++) {
      let gon = polygonP.instantiate();
      let pnts = this.gonPoints(i,j);
      gon.corners = pnts;
      gons.push(gon);
    }
  }
}    
 
rs.adjustGons = function () {
    let {numRows,numCols,gons,points} = this;
   for (let i=0;i<numCols-1;i++) {
    for (let j=0;j<numRows-1;j++) {
      let idx = i*(numCols-1) + j;
      let gon = gons[idx];
      
      if (!gon) {
        debugger;
      }
      let pnts = this.gonPoints(i,j);
        let clr = pnts[0].clr;
      debugger;
      gon.corners = pnts;
      gon.fill = clr;
      gon.update();
      gon.draw();
    }
  }
}
rs.initProtos = function () {
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP['stroke-width'] = 0;
  polygonP.stroke = 'white';
  polygonP.fill = 'red';
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
  let {gons,numCols} = this;
  let idx = i*numCols +j;
  let gon = gons[idx];
  let clr = `rgb(${r},${g},${b})`;
 /* let rb = r>150?1:0;
  let gb= g>150?1:0;
  let bb = b>150?1:0;
  clr = (rb+gb+bb)%3?'white':'black';*/
  rect.fill = clr;
  rect.update();
}

rs.recordGridHistory = function (va,t,i,j) {
  let {gridHistory:grh,numCols,points} = this;
    let [r,g,b,dx,dy,sc] = va;
debugger;
  let ln =grh.length;
    let idx = i*numCols +j;
  let cgs;
  if (t > 0) {
    if (t>5) {
       debugger;
    }
    let lg = grh[t-1]
    let cellv = lg[idx];
    let lx = cellv[6];
    let ly = cellv[7];
    va.push(lx + dx);
    va.push(ly + dy);
  } else {
    let op =  points[idx]
    va.push(op.x);
    va.push(op.y);
  }
  if (t >30) {
  // console.log('t',t,'ln',ln,'idx',idx,'i',i,'j',j,'r',r,'g',g,'b',b,'sc',sc);
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
 // debugger;
  let idx = i*numCols +j;
  //let Ridx = (i+1)*numCols +j;
  //let Uidx = (i+1)*numCols +j+1;
 // let pO = points[idx];
  
  let [r,g,b,dx,dy,sc,x,y] = va;
  let rf = Math.floor(r);
  let gf = Math.floor(g);
  let bf = Math.floor(b);
  let clr = `rgb(${rf},${gf},${bf})`;
  let d = Point.mk(dx,dy);
  let p = points[idx];
 // debugger;
  p.clr = clr;
  p.sc = sc;
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

rs.traceProps = ['r','g','b','dx','dy','sc'];

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
                            [this.toRightCfn,this.toRightCfn,this.toRightCfn,this.downCfn,this.upCfn,this.toRightCfn],
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
  let ogons =this.set('ogons',containerShape.mk());
  ogons.set('gons',arrayShape.mk());
  this.gons = ogons.gons;
  this.points = [];
  this.addFrame();
  this.initProtos();
  this.buildGrid();
  this.addGons();
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
  let dss = 0.01 *deltaX;
  let iv = 0;
  let wiv = 100;
  let ssf = 0.04; //substepfactor
  let dssf = 0.05; //substepfactor
  let mi =100; //minintensity
  let hgd = .9* deltaX;
  let lwd= -hgd;
  let lws = 0.05 * deltaX;
  let hgs = .2* deltaX;
  this.addWpath('r',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,wiv,'forStroke',1);
  this.addWpath('dx',dsr,dssf,lwd,hgd,iv,'forStroke',1);
  this.addWpath('dy',dsr,dssf,lws,hgs,.075,'forStroke',1);
  this.addWpath('sc',dss,dssf,lws,hgs,.075,'forStroke',1);
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
  let {stepsSoFar:ssf,ogons,gons,points,numSteps,frameDelta,traceB,pstate,gridHistory,numCols,numRows} = this;
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
  this.adjustGons();
  /*lines.forEach((line) => {
    let e0 = line.end0;
    line.stroke = e0.clr;
    line.update();
    line.draw();
  });*/
 // return;
  let avgpnt = this.sumpnts.times(1/(this.numpnts));
 // console.log('avgpnt',avgpnt.x,avgpnt.y);
  debugger;
  ogons.moveto(avgpnt.times(-1)); 
}

rs.timeStep = () => {};


export {rs}