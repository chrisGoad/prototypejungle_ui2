import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('paths_0');



rs.addPath = function (params) {
 //  let {nm,min,max,wd,ht,ln,od,shape,horizontal,skind} = params;
   let {nm,min,max,od,shape,horizontal,upOrLeft} = params;
   let {pstate,shapes,rectP,lineP,step} = this;
  let {cstate,pspace} = pstate;

  cstate[nm] = {value:min};
  /*let shape;
  if (skind === 'rectangle') {
     shape =  rectP.instantiate();
  ///rect.fill = horizontal?'rgba(250,0,0,.5)':'rgba(0,0,250,0.5)';
     shape.width = wd;
     shape.height = ht;
  } else if (skind === 'line') {
     shape =  lineP.instantiate();
  ///rect.fill = horizontal?'rgba(250,0,0,.5)':'rgba(0,0,250,0.5)';
    let hln = 0.5*ln;
    let e0 = horizontal?Point.mk(0,-hln):Point.mk(-hln,0);
    let e1 = horizontal?Point.mk(0,hln):Point.mk(hln,0);
    shape.setEnds(e0,e1);
  }
  shapes.push(shape);*/
  pspace[nm] = {kind:'sweep',step:step,min:min,max:max,once:1,horizontal,shape,od,upOrLeft};
}


rs.numAdds = 0;


rs.updateState = function (nm) {
  this.callIfDefined('beforeUpdateState');
  let {pstate,stepsSoFar:ssf} = this;
 /* if (Math.random()  <0.2) {
    let od = (ht*Math.random())-hht;
    this.addApath('a'+numAdds,od);
    this.numAdds++;
  }*/
  let {cstate,pspace} = pstate;
  let pnms = Object.getOwnPropertyNames(pspace);
  if (ssf === 32) {
    debugger;
  }
  pnms.forEach((nm) => {
    this.updateStateOf(nm);
  });
}
    
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP.dimension = 1;
  circleP['stroke-width'] = 0;
  
  let rectP = this.rectP = rectPP.instantiate();
  rectP['stroke-width'] = .2;
  rectP.stroke = 'white';
  
   let lineP = this.lineP = linePP.instantiate();
  lineP['stroke-width'] = .2;
  lineP.stroke = 'white';
}  

//rs.addPath = function (nm,min,max,wd,ht,od,rectP,horizontal) {

rs.initialize = function () {
  debugger;
  this.initProtos();
  this.addFrame();
  let shapes = this.set('shapes',arrayShape.mk());
  let scl = 0.8;
  //this.addPath('a',Point.mk(-scl*hht,0),Point.mk(scl*hht,0),10,this.lineP);
  this.callIfDefined('afterInitialize');
  
}


rs.saveAnimation = 0;
rs.numSteps = 1263;
rs.numSteps = 626;
export {rs}