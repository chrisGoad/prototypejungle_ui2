
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
rs.step = 1;
rs.strokeWV = 0;
rs.strokeWH = 0;
rs.initProtos = function () {
 
  let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
  
}  

rs.addWpath = function (nm) {
  let {pstate} = this;
  let {cstate,pspace} = pstate;
  let snm = 'sub'+nm;
  let d = 0.01;
  pspace[snm] = {kind:'random',step:0.1*d,min:-d,max:d,forStroke:1};
  cstate[snm] = {value:0};
  pspace[nm] = {kind:'randomWalkScalar',subComponent:snm,min:0,max:.2,forStroke:1};
  cstate[nm] = {value:.025};
};

rs.addApath = function (nm,shape,min,max,horizontal,upOrLeft) {
  let scl = 1.1;
  //this.addPath({nm,min:-scl*hht,max:scl*hht,width:this.rwd,height:this.rht,od,shape:this.rectP,horizontal,skind:'rectangle'});
  debugger;
  this.addPath({nm,min,max,shape,horizontal,upOrLeft});
}

rs.addOnePath = function (nm,min,max,horizontal,upOrLeft) {
    let {shapes,strokeWV,strokeWH,lineP} = this;
    let shape = lineP.instantiate();
    shape['stroke-width'] = Math.max(0.004,1*(horizontal?strokeWH:strokeWV));
    console.log('strokeWH',strokeWH,'strokeWV',strokeWV);
    debugger;
    let e0 = horizontal?Point.mk(0,-hht):Point.mk(-hht,0);
    let e1 = horizontal?Point.mk(0,hht):Point.mk(hht,0);
    shape.setEnds(e0,e1);
    shapes.push(shape);
    this.addApath(nm+(horizontal?'h':'v')+(upOrLeft?'uol':'norm'),shape,-hht,hht,horizontal,upOrLeft);
 }

rs.beforeUpdateState = function (nm) {
  let {pstate,stepsSoFar:ssf,numAdds,lineP,shapes} = this;
  let {cstate,pspace} = pstate;

  if (Math.random()  <1) {
    //let horizontal =Math.random()<0.5;
    //let upOrLeft = Math.random()<0.5;
        /*let shape = lineP.instantiate();
        shape['stroke-width'] = cstrokeW;
        let e0 = horizontal?Point.mk(0,-hht):Point.mk(-hht,0);
        let e1 = horizontal?Point.mk(0,hht):Point.mk(hht,0);
        shape.setEnds(e0,e1);
        shapes.push(shape);*/
  this.addOnePath('a'+numAdds,-hht,hht,0,0);
    this.addOnePath('a'+numAdds,-hht,hht,0,1);
    this.addOnePath('a'+numAdds,-hht,hht,1,0);
    this.addOnePath('a'+numAdds,-hht,hht,1,1);
    this.numAdds++;
  }
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
    }
    debugger;
    return;
  }
  let ow = ps.upOrLeft;
  if (v >= ps. max) {
    shape.hide();
  }
  let uv = ow?max-hht-v:v;
    //console.log('v',v,'uv',uv);

  let pos = horizontal?Point.mk(uv,0):Point.mk(0,uv);
  shape.moveto(pos);
  shape.update();
}

rs.afterInitialize = function () {
  this.addWpath('strokeWH');
  this.addWpath('strokeWV');
}

rs.stepInterval = 60;
rs.saveAnimation = 0;

//rs.numSteps = 627-(rs.numISteps);
rs.numSteps = 10000;
//rs.numSteps = Math.floor(627/sfc);
export {rs}