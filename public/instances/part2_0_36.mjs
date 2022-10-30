
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_36');
let levels = 8;
levels = 2;
debugger;
/*const  buildStatePs = function (n,m) {
  let st = {};
  for (let i = 0;i<n;i++) {
    for (let j = 0;j<n;j++) {
      let nm = ('a'+i)+j;
         st[nm] = {value:0};
 */     
//let kind = 'randomSteps';
let kind = 'sweep';
let initState = {};
let rng = 0.25;
let pspace = {};
let aws = rs.allWhereStrings(levels,4);
aws.forEach((ws) => {
  pspace[ws] = {smooth:1,kind,step:.015,min:-rng,max:rng,interval:1,steps:0.5};
  initState[ws] = {value:0}
});
let pstate = {pspace,cstate:initState};
debugger;
let doWhatt = function (cstate) {
  console.log('cstate.a',cstate.a.value,'b',cstate.b.value);
  debugger;
}

//rs.timeSteps(pstate,30,doWhat);


rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

let mkqp = function (eps,cs) {
  return {Case:6,vertexNum:0,pcs:[0.5-eps,1.5-eps,2.5+eps,3.5-eps],frs:[.5-2*eps,0.5+eps]};
}



/*
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.5-eps0,1.5-eps0,2.5+eps0,3.5-eps0],frs:[.5-2*eps0,0.5+eps0]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.5-eps1,1.5-eps1,2.5+eps1,3.5-eps1],frs:[.5-2*eps1,0.5+eps1]});
rs.qspa.push({Case:7,pcs:[0.5-eps2,1.5-eps2,2.5+eps2,3.5-eps2]});
*/

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  debugger;
  let ws = this.whereString(prt.where);
  if (ws === '') {
   ws = 'top';
  }
  let vc = pstate.cstate[ws];
  if (vc) {
  debugger;
    let v = vc.value;
    let qsp = mkqp(v);
    return qsp;
 // debugger;
  } else {
    return mkqp(0);
  }
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'black',20);
//rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
rs.computeExponentials({dest:strokeWidths,n:20,root:.4,factor:.7});

rs.oneStep = function () {
  debugger;
  this.resetShapes();
  this.timeStep(pstate);
 setTimeout(() => this.oneStep(),40)
}
rs.afterInitialize = function () {
 this.oneStep();
}

rs.afterDisplayCell = function (prt) {
 // console.log('CSF',csf);
  let crc = this.circleP.instantiate();
  let pgon =  prt.polygon;
  let dim = pgon.minDimension();
 // crc.dimension = csf*dim;
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


