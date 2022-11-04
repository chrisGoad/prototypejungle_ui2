
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_30');
let levels = 8;
levels = 5;
levels = 3;
debugger;

let kind = 'randomSteps';
let initState = {a:{value:0},b:{value:0},c:{value:0},levels:{value:0},csf:{value:0.1}};
rs.copyOfInitState = rs.deepCopy(initState);

let rng = 0.25;
let pspace = {a:{kind,step:.015,min:-rng,max:rng,interval:1,steps:0.5},b:{kind,step:.013,min:-rng,max:rng,interval:1,steps:0.5},c:{kind,step:.011,min:-rng,max:rng,interval:1,steps:0.5},
              levels:{kind,min:1,max:3,step:1,interval:150,steps:0.5},csf:{kind,step:0.05,min:0.05,max:14,interval:1,steps:0.5}};
rs.pstate = {pathKind:'randomValue',pspace,cstate:initState};


//rs.timeSteps(pstate,30,doWhat);


rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

let mkQsp6 = function (eps) {
   return {Case:6,vertexNum:0,pcs:[0.5-eps,1.5-eps,2.5+eps,3.5-eps],frs:[.5-2*eps,0.5+eps]};
}




rs.partSplitParams = function (prt) {
   let cstate  = this.pstate.cstate;
      let lev = prt.where.length;
  let w = lev%3;
  let qsp;
  if (w === 0) {
    qsp = mkQsp6(cstate.a.value);
  } else  if (w === 1) {
    qsp = mkQsp6(cstate.b.value);
  } else   if (w === 2) {
    qsp = mkQsp6(cstate.c.value);
  }  
  return qsp;
 
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'black',20);
//rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
rs.computeExponentials({dest:strokeWidths,n:20,root:.4,factor:.7});
rs.numSteps = 150;
rs.numSteps = 100;
rs.numSteps = 300;
rs.numISteps = 12;
rs.saveAnimation = 1;
rs.stepInterval = 200;

rs.afterInitialize = function () {
 this.oneStep();
}

rs.afterDisplayCell = function (prt) {
  let crc = this.circleP.instantiate();
  let pgon =  prt.polygon;
  let dim = pgon.minDimension();
  crc.dimension = 0.2*dim;
  crc.fill = 'black';//Math.random()<0.5?'blue':'blue';
  this.shapes.push(crc);
  let cnt = pgon.center();
  crc.moveto(cnt);
}

rs.partFill = function (prt) {
  return 'gray';
}
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


