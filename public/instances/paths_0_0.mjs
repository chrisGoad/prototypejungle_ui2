
import {rs as rectPP} from '/shape/rectangle.mjs';

import {rs as generatorP} from '/generators/paths_0.mjs';


let rs = generatorP.instantiate();

rs.setName('paths_0_0');
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

rs.initProtos = function () {
 
  let rectP = this.rectP = rectPP.instantiate();
  rectP['stroke-width'] = .2;
  rectP.stroke = 'white';
  
}  


rs.addApath = function (nm,shape,min,max,od,horizontal) {
  let scl = 1.1;
  debugger;
  //this.addPath({nm,min:-scl*hht,max:scl*hht,width:this.rwd,height:this.rht,od,shape:this.rectP,horizontal,skind:'rectangle'});
  //this.addPath({nm,min:min,max:max,width:this.rwd,height:this.rht,od,shape:this.rectP,horizontal,skind:'rectangle'});
  this.addPath({nm,min:min,max:max,width:this.rwd,height:this.rht,od,shape,horizontal});
}


rs.beforeUpdateState = function (nm) {
  let {pstate,stepsSoFar:ssf,numAdds} = this;
  if (Math.random()  <0.2) {
    let od = (ht*Math.random())-hht;
    let shape = this.rectP.instantiate();
    this.shapes.push(shape);
    this.addApath('a'+numAdds,shape,-hht,hht,od);
    this.numAdds++;
  }
}
rs.rwd = 5;
rs.rht = 25;
rs.updateStateOf = function (nm) {
  let {pstate,rwd,rht} = this;
  let {cstate,pspace} = pstate;
  let v = cstate[nm].value;
  
 
  debugger;
  let ps = pspace[nm];
  let {shape,min,max,od,horizontal} = ps;
     let fr =(v-min)/(max-min);

  if (v >= max) {
  //  shape.hide();
  }
  shape.width = (1-fr)*rwd;
  shape.height = (1-fr)*rht;
  let pos = horizontal?Point.mk(v,od):Point.mk(od,v);
  console.log('v',v,'pos',pos.x,pos.y);
  shape.moveto(pos);
  shape.update();
}
rs.stepInterval = 0;
rs.saveAnimation = 1;
rs.numISteps = 100;

//rs.numSteps = 627-(rs.numISteps);
rs.numSteps = 313;
//rs.numSteps = Math.floor(627/sfc);
export {rs}