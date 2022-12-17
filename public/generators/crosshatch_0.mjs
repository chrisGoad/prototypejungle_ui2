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
let numLines = 200;

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
    

rs.afterInitialize = function () {
  this.addWpath('strokeWH',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('strokeWV',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('r',5,100,250,0.025,'forStroke',1);
  this.addWpath('g',5,100,250,0.025,'forStroke',1);
  this.addWpath('b',5,100,250,0.025,'forStroke',1);
  let rt = this.computeTrace('r',20);
  debugger;
}


rs.initialize = function () {
  debugger;
  this.initProtos();
  this.addFrame();
  let vlines = this.set('vlines',arrayShape.mk());
  let hlines = this.set('hlines',arrayShape.mk());
  this.buildCrosshatch();
  this.addWpath('strokeWH',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('strokeWV',.01,0,.2,0.025,'forStroke',1);
  this.addWpath('r',5,100,250,0.025,'forStroke',1);
  this.addWpath('g',5,100,250,0.025,'forStroke',1);
  this.addWpath('b',5,100,250,0.025,'forStroke',1);
  let rt =this.rt = this.computeTrace('r',200);
  let gt = this.gt = this.computeTrace('g',200);
  let bt = this.bt =this.computeTrace('b',200);
  debugger;
  this.setFromTraces(0);
}

rs.stepInterval = 60;
rs.saveAnimation = 1;

//rs.numSteps = 627-(rs.numISteps);
rs.startFade = 450;
rs.startFade = 530;
rs.numSteps = 600;
//rs.numSteps = Math.floor(627/sfc);
export {rs}