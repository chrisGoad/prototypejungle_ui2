
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as linePP} from '/shape/line.mjs';

import {rs as generatorP} from '/generators/paths_0.mjs';


let rs = generatorP.instantiate();

rs.setName('paths_0_1');
//let initState = {};


let ht= 100;
let hht = 0.5*ht;
rs.wb = 1; // white background
rs.clockwise = 0;
let ff = 1;
let topParams = {width:ht*ff,height:ht*ff,framePadding:.1*ht,frameStrokee:'white',frameStrokeWidth:1}
Object.assign(rs,topParams);


let initState = {};
let pspace = {};
rs.pstate = {pspace,cstate:initState};
rs.step = 0.5;
rs.strokeWV = 0;
rs.strokeWH = 0;
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
 
rs.addOnePath = function (inm,min,max,horizontal,upOrLeft) {
    let {shapes,strokeWV,strokeWH,r,g,b,lineP,stepsSoFar:ssf,numSteps,startFade,numAdds} = this;
    let shape = lineP.instantiate();
    shape['stroke-width'] = Math.max(0.04,(horizontal?strokeWH:strokeWV));
    shape.r = r;
    shape.g = g;
    shape.b = b;
    let clr=`rgb(${r},${g},${b})`;
    shape.stroke = clr;
    console.log('strokeWH',strokeWH,'strokeWV',strokeWV);
    let e0 = horizontal?Point.mk(0,-hht):Point.mk(-hht,0);
    let e1 = horizontal?Point.mk(0,hht):Point.mk(hht,0);
    shape.setEnds(e0,e1);
    shapes.push(shape);
    if (ssf>startFade) {
      let fc = 1 - (ssf - startFade)/(numSteps-startFade);
      shapes.forEach((shp) => this.scaleStroke(shp,fc));
    }
    let nm = inm+numAdds;
    this.addPath({nm,min,max,shape,horizontal,upOrLeft});
    this.numAdds++;

 }

rs.beforeUpdateState = function (nm) {
  let {pstate,stepsSoFar:ssf,numAdds,lineP,shapes} = this;
  let {cstate,pspace} = pstate;
  this.addOnePath('a',-hht,hht,0,0);
  this.addOnePath('a',-hht,hht,0,1);
  this.addOnePath('a',-hht,hht,1,0);
  this.addOnePath('a',-hht,hht,1,1);
}
rs.rwd = 5;
rs.rht = 25;
rs.updateStateOf = function (nm) {
  let {pstate,rwd,rht} = this;
  let {cstate,pspace} = pstate;
  let v = cstate[nm].value;
 // debugger;
  let ps = pspace[nm];
  let {shape,horizontal,max} = ps;

  if (ps.forStroke) {
    if (nm === 'strokeWH') {
      this.strokeWH = v;
    } else if (nm === 'strokeWV')  {
      this.strokeWV = v;
    } else if (nm === 'r')  {
      this.r = v;
    }else if (nm === 'g')  {
      this.g = v;
    }else if (nm === 'b')  {
      this.b = v;
    }
    return;
  }
  let ow = ps.upOrLeft;
  if (v >= ps. max) {
    shape.hide();
  }
  let uv = ow?max-hht-v:v;
  let pos = horizontal?Point.mk(uv,0):Point.mk(0,uv);
  shape.moveto(pos);
  shape.update();
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

rs.stepInterval = 60;
rs.saveAnimation = 1;

//rs.numSteps = 627-(rs.numISteps);
rs.startFade = 450;
rs.startFade = 530;
rs.numSteps = 600;
//rs.numSteps = Math.floor(627/sfc);
export {rs}