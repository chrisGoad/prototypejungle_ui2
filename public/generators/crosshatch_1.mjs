import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('crosshatch_1');

rs.pstate = {pspace:{},cstate:{}};


let ht= 100;
let hht = 0.5*ht;
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



rs.setFromTraces = function (n) {
  let {vlines,hlines,rt,gt,bt,swv,swh,numSteps,startFade,numLines} = this;
  debugger;

  let oldSchool = 0;
  let inwards = 1;
  let hnl = oldSchool?numLines:numLines/2;
  const valueOf= (a,n) => {
    let av= a[n];
    return av?av.value:0;
  }
  for (let i=0;i<hnl;i++) {
    let rtv = valueOf(rt,i+n);
    let gtv = valueOf(gt,i+n);
    let btv = valueOf(bt,i+n);
    let clr = `rgb(${rtv},${gtv},${btv})`;
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
    vline0.update();
    let vline1 = vlines[inwards?hnl+i:numLines-i-1];
    vline1.stroke = clr;
    vline1.update();
    let hline0 = hlines[inwards?hnl-i-1:i];
    hline0.stroke = clr;
    hline0.update();
    let hline1 = hlines[inwards?hnl+i:numLines-i-1];
    hline1.stroke = clr;
    hline1.update();
  }
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
  this.initProtos();
  this.addFrame();
  let vlines = this.set('vlines',arrayShape.mk());
  let hlines = this.set('hlines',arrayShape.mk());
  this.buildCrosshatch();
 

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
  let swv =this.swv = [];
  let swh=this.swh = [];
  this.pushBlacks();
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