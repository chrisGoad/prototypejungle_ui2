import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('crosshatch_0');
//let initState = {};
rs.pstate = {pspace:{},cstate:{}};


let ht= 100;
let hht = 0.5*ht;
//let numLines = rs.numLines = 200;
let numLines = rs.numLines = 160;

rs.buildCrosshatch = function () {
  let {lineP,vlines,hlines} = this;
  let delta = ht/numLines;
  const addLine = (lines,e0,e1)=> {
    let line = lineP.instantiate();
    line.setEnds(e0,e1);
    lines.push(line);
  }
  for (let i=0;i<numLines;i++) {
    let x = i*delta - hht;
    let e0 = Point.mk(x,-hht);
    let e1 = Point.mk(x,hht);
    addLine(vlines,e0,e1);
  }
  for (let i=0;i<numLines;i++) {
    let y = i*delta - hht;
    let e0 = Point.mk(-hht,y);
    let e1 = Point.mk(hht,y);
    addLine(hlines,e0,e1);
  }
}
let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


rs.initProtos = function () {
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
  
}  


rs.scaleStroke = function (shp,fc) {
  let {r,g,b} = shp;
  const scale = (v,fc) => {
    return Math.floor(fc*v);
  }
  let rs = scale(r,fc);
  let gs = scale(g,fc);
  let bs = scale(b,fc);
  let clr=`rgb(${rs},${gs},${bs})`;
  shp.stroke = clr;
}
rs.setFromTraces = function (n) {
  let {vlines,hlines,rt,gt,bt} = this;
  for (let i=0;i<numLines;i++) {
    let rtv = rt[i+n].value;
    let gtv = gt[i+n].value;
    let btv = bt[i+n].value;
    let clr = `rgb(${rtv},${gtv},${btv})`;
    let vline = vlines[i];
    vline.stroke = clr;
    vline.update();
    let hline = hlines[i];
    hline.stroke = clr;
    hline.update();
  }
}


rs.setFromTraces = function (n) {
  let {vlines,hlines,rt,gt,bt,swv,swh,numSteps,startFade,numLines} = this;
  debugger;
  let sc =1;
    if (n > startFade)  {
    //  sc = 1- (n-startFade)/(numSteps-startFade);
  }
  console.log('sc',sc);
  let oldSchool = 0;
  let inwards = 1;
  let hnl = oldSchool?numLines:numLines/2;
  for (let i=0;i<hnl;i++) {
  
    let swvi = swv[i+n];
    let swhi = swh[i+n];
    let rti = rt[i+n];
    let gti = gt[i+n];
    let bti = bt[i+n];
    let swvv  = swvi?swvi.value:0;
    let swvh  = swhi?swhi.value:0;
    let rtv = rti?rti.value:0;
    let gtv = gti?gti.value:0;
    let btv = bti?bti.value:0;
    let clr = `rgb(${sc*rtv},${sc*gtv},${sc*btv})`;
   // clr = 'rgb(255,255,255)'
    if (oldSchool) {
      let hline = hlines[i];
      hline.stroke = clr;
      let vline = vlines[i];
      vline.stroke = clr;
      hline.update();
      vline.update();
      continue;
    }
    let vline0 = vlines[inwards?hnl-i-1:i];
    vline0.stroke = clr;
   // vline0['stroke-width'] = swvv;
    vline0.update();
   // let vline1 = vlines[numLines-i-1];
    let vline1 = vlines[inwards?hnl+i:numLines-i-1];
    vline1.stroke = clr;
   // vline1['stroke-width'] = swvv;
    vline1.update();
    //let hline0 = hlines[i];
    let hline0 = hlines[inwards?hnl-i-1:i];
    hline0.stroke = clr;
   // hline0['stroke-width'] = swvh;
    hline0.update();
  //  let hline1 = hlines[numLines-i-1];
    let hline1 = hlines[inwards?hnl+i:numLines-i-1];
   // hline1['stroke-width'] = swvh;
    hline1.stroke = clr;
    hline1.update();
  }
}
    
//item.addWpath = function (nm,subRange,min,max,initVal,prop,val) {

rs.afterInitialize = function () {
  this.addWpath('strokeWH',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('strokeWV',.01,0,.2,0.025,'forStroke',1);
    this.addWpath('b',sr,100,250,iv,'forStroke',1);

  //this.addWpath('r',2,100,250,0.025,'forStroke',1);
  let sr = 1; //subrange
  let iv = 0;
 // this.addWpath('r',5,100,250,0.025,'forStroke',1);
  this.addWpath('r',sr,100,250,iv,'forStroke',1);
 // this.addWpath('g',5,100,250,0.025,'forStroke',1);
  this.addWpath('g',sr,100,250,iv,'forStroke',1);
  //this.addWpath('b',5,100,250,0.025,'forStroke',1);
  this.addWpath('b',sr,100,250,iv,'forStroke',1);
  let rt = this.computeTrace('r',20);
  debugger;
}

rs.pushBlacks = function () {
  let {vlines,hlines,rt,gt,bt} = this;
  for (let i=0;i<numLines/2;i++) {
    rt.push({value:0});
    gt.push({value:0});
    bt.push({value:0});
  }
}


rs.cycles = 5;
rs.initialize = function () {
  debugger;
  let {cycles,numLines} = this;
  let numSteps = this.numSteps = (cycles+1) * (numLines/2);
  let numFrames = this.numFrames = numSteps+numLines;
  this.startFade = numSteps -numLines;
  this.initProtos();
  this.addFrame();
  let vlines = this.set('vlines',arrayShape.mk());
  let hlines = this.set('hlines',arrayShape.mk());
  this.buildCrosshatch();
  let wsr = 0.01;
  let wssf = 0.04;
  let maxw = .2;
  let minw  = 0.02;
  this.addWpath('strokeWH',wsr,wssf,minw,maxw,0.025,'forStroke',1);
  this.addWpath('strokeWV',wsr,wssf,minw,maxw,0.025,'forStroke',1);
    //this.addWpath('b',wsr,wssf,mi,250,iv,'forStroke',1);

  let sr = 10; //subrange
  let iv = 0;
  let ssf = 0.04; //substepfactor
  let mi = 0; //minintensity
  this.addWpath('r',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('g',sr,ssf,mi,250,iv,'forStroke',1);
  this.addWpath('b',sr,ssf,mi,250,iv,'forStroke',1);
 /* this.addWpath('strokeWH',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('strokeWV',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('r',5,100,250,0.025,'forStroke',1);
  this.addWpath('g',5,100,250,0.025,'forStroke',1);
  this.addWpath('b',5,100,250,0.025,'forStroke',1);*/
  let rt =this.rt = [];
  let gt =this.gt = [];
  let bt =this.bt = [];
  let swv =this.swv = [];
  let swh=this.swh = [];
  this.pushBlacks();
  this.pushTrace(rt,'r',numFrames);
  this.pushTrace(gt,'g',numFrames);
  this.pushTrace(bt,'b',numFrames);
  this.pushTrace(swv,'strokeWV',numFrames);
  this.pushTrace(swh,'strokeWH',numFrames);
  debugger;
    this.pushBlacks();
  this.numSteps =(this.numSteps)+2*numLines;
  debugger;
 // this.setFromTraces(0);
 rs.cFrame = (this.numSteps)/2;
}


//rs.cFrame = 0;
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

//rs.numSteps = 627-(rs.numISteps);

//rs.numSteps = Math.floor(627/sfc);
export {rs}