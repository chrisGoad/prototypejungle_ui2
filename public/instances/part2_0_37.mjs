
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_37');
let levels = 10;
levels = 3;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

//let kind = 'randomSteps';
let kind = 'sweep';
let rng = 0.25;

let initState = {a:{value:0},b:{value:0}};
let pspace = {a:{kind,step:.015,min:-rng,max:rng,interval:1,steps:0.5},b:{kind,step:.013,min:-rng,max:rng,interval:1,steps:0.5}};
let pstate = {pspace,cstate:initState};

let mkqspa = function (a,b){
  let qspa = [];
  qspa.push({Case:13,frs:[0.5+a]});
  qspa.push( {Case:7,pcs:[.5+b,1.5+b,2.5+b,3.5+b]});
  return qspa;
}

rs.partSplitParams = function (prt) {
  let cst = pstate.cstate;
  let a = cst.a.value;
  let b = cst.b.value;
  let qspa = mkqspa(a,b);
  let lev = prt.where.length;
  let wp = lev%3;
 let qsp = qspa[wp===1?1:0];
  return qsp;
}

rs.numSteps = 0;
rs.oneStep = function () {
  debugger;
  //rs.numSteps = rs.numSteps+1;
  if (rs.numSteps++ > 20000) {
   return;
  }
  this.resetShapes();
  this.timeStep(pstate);
 setTimeout(() => this.oneStep(),40)
}
rs.afterInitialize = function () {
 this.oneStep();
}
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


