import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addFlowMethods} from '/mlib/flows.mjs';	


let rs = basicP.instantiate();

//let rs = basicP.instantiate();
addPathMethods(rs);
addFlowMethods(rs);

//import {rs as generatorP} from '/generators/part2_0.mjs';/
//let rs = generatorP.instantiate();


//import {rs as generatorP} from '/generators/flows_0.mjs';

//let rs = generatorP.instantiate();

rs.setName('flows_0_4');


rs.pstate = {pspace:{},cstate:{}};


let ht= rs.ht = 100;
let wd = rs.wd = 100;
let hht = rs.hht = 0.5*ht;
let hwd = rs.hwd = 0.5*wd;
let nr = 32;
nr = 8;
//nr=48;
let numRows = rs.numRows = nr;
let numCols = rs.numCols = nr;


let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.2*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.buildGrid = function () {
  let {rectP,numRows,numCols,ht,wd,hht,hwd,rects,deltaX,deltaY} = this;
 
  const addGon = (p)=> {
    let qg = this.mkQuadrantGon((0.8*wd)/numCols);
    qg.polygon.moveto(p);
  }
  // column major order
  let lx = - (0.5*(wd-deltaX));
  let ly = - (0.5*(ht-deltaY));
  for (let i=0;i<numRows;i++) {
    let x = i*deltaX +lx;
    for (let j=0;j<numCols;j++) {
       let y = j*deltaY+ly;
       let p = Point.mk(x,y);
       addGon(p);
    }
  }
}
      
 

rs.initProtos = function () {
  let {deltaX,deltaY} = this;
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP['stroke-width'] = 0;
  polygonP.fill = 'white';
  
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

rs.adjustPolyFun = function (va,t,i,j) {
  debugger;
  let {quads,numCols,qdim} = this;
  let idx = i*numCols +j;
  let qg = quads[idx]
  let gon = qg.polygon;
  let [r,g,b,ulx,uly,urx,ury,lrx,lry,llx,lly] = va;
  let clr = `rgb(${r},${g},${b})`;
  let ul = Point.mk(ulx,uly);
  let ur = Point.mk(urx,ury);
  let lr = Point.mk(lrx,lry);
  let ll = Point.mk(llx,lly);
  this.adjustQuadrantGon(qg,qdim,ul,ur,lr,ll);
 /* let c = gon.corners;
  c[0].copyto(ul);
  c[1].copyto(ur);
  c[2].copyto(lr);
  c[3].copyto(ll);*/
  gon.fill=clr;
  gon.update();
}
    
 
rs.setFromTraces = function (n) {
  let {rt,gt,bt,ulxt,ulyt,urxt,uryt,lrxt,lryt,llxt,llyt} = this;
  this.setFromTraceArray(n,[rt,gt,bt,ulxt,ulyt,urxt,uryt,lrxt,lryt,llxt,llyt],
                           [this.toLeftCfn,this.toRightCfn,this.downCfn,this.downCfn,this.upCfn,this.toRightCfn,this.toLeftCfn,this.toRightCfn,this.downCfn,this.toLeftCfn,this.upCfn],
                           this.adjustPolyFun);
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
  this.qdim = 0.5*deltaX;
  let polygon = this.set('polygons',arrayShape.mk());
  this.quads = [];
  this.addFrame();
  this.initProtos();
  this.buildGrid();
//  return;
  let numSteps = this.numSteps = cycles * 1* numRows;
  let numFrames = this.numFrames = (cycles+2) *1* numRows;
  let toBlack = numSteps - blackSteps;

//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

  let sr = 10; //subrange
  sr = 5; //subrange
  let dsr = 0.1 *deltaX;
  dsr = 0.05 *deltaX;
  let iv = 0;
  let wiv = 0;
  let ssf = 0.04; //substepfactor
  let dssf = 0.05; //substepfactor
  let mi =0; //minintensity
  let lwd= 0;
  let hgd= deltaX*0.6;;
  this.addWpath('r',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('ulx',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('uly',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('urx',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('ury',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('lrx',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('lry',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('llx',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  this.addWpath('lly',dsr,dssf,lwd,hgd,wiv,'forStroke',1);
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  let ulxt =this.ulxt = [];
  let ulyt =this.ulyt = [];
  let urxt =this.urxt = [];
  let uryt =this.uryt = [];
  let lrxt =this.lrxt = [];
  let lryt =this.lryt = [];
  let llxt =this.llxt = [];
  let llyt =this.llyt = [];
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushTrace(ulxt,'ulx',numFrames);
  this.pushTrace(ulyt,'uly',numFrames);
  this.pushTrace(urxt,'urx',numFrames);
  this.pushTrace(uryt,'ury',numFrames);
  this.pushTrace(lrxt,'lrx',numFrames);
  this.pushTrace(lryt,'lry',numFrames);
  this.pushTrace(llxt,'llx',numFrames);
  this.pushTrace(llyt,'lly',numFrames);
  debugger;
  for (let i=toBlack;i<numFrames;i++) {
    rt[i].value = 0;
    gt[i].value = 0;
    bt[i].value = 0;
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