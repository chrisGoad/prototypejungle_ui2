
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_30');
let levels = 8;
levels = 2;
debugger;
let initState = {a:{value:0},b:{value:0},c:{value:0},levels:{value:0},csf:{value:0.1}};
let rng = 0.25;
let pspace = {a:{step:.015,min:-rng,max:rng,interval:1},b:{step:.013,min:-rng,max:rng,interval:1},c:{step:.011,min:-rng,max:rng,interval:1},
              levels:{min:1,max:3,step:1,interval:150},csf:{step:0.02,min:0.05,max:0.4,interval:1}};
let pstate = {pathKind:'sweep',pspace,cstate:initState};
let doWhatt = function (cstate) {
  console.log('cstate.a',cstate.a.value,'b',cstate.b.value);
  debugger;
}

//rs.timeSteps(pstate,30,doWhat);


rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

rs.qspa = [];
let eps0 = 0.1;
let eps1 = 0.1;
let eps2 = 0.1;
let mkqp46 = function (eps,cs) {
  return {Case:cs,vertexNum:0,pcs:[0.5-eps,1.5-eps,2.5+eps,3.5-eps],frs:[.5-2*eps,0.5+eps]};
}
let mkqp7 = function (eps) {
  return {Case:7,pcs:[0.5-eps,1.5-eps,2.5+eps,3.5-eps]};
}

let mkqspa = function () {
  debugger;
  let qspa = [];
  qspa.push(mkqp46(eps0,6));
  qspa.push(mkqp46(eps1,6));
  qspa.push(mkqp7(eps2));
  return qspa;
}

rs.qspa = mkqspa();



/*
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.5-eps0,1.5-eps0,2.5+eps0,3.5-eps0],frs:[.5-2*eps0,0.5+eps0]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.5-eps1,1.5-eps1,2.5+eps1,3.5-eps1],frs:[.5-2*eps1,0.5+eps1]});
rs.qspa.push({Case:7,pcs:[0.5-eps2,1.5-eps2,2.5+eps2,3.5-eps2]});
*/
console.log('qspa',rs.qspa);

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*3);
      let lev = prt.where.length;
  wp = lev%3;
  let qsp = this.qspa[wp];

  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'black',20);
//rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
rs.computeExponentials({dest:strokeWidths,n:20,root:4,factor:.7});

let csf = 0.3;
const setEps = function (cstate) {
  eps0 = cstate.a.value;
  eps1 = cstate.b.value;
  eps2 = cstate.c.value;
  csf = cstate.csf.value;
  console.log('cstate a',cstate.a.value,'b',cstate.b.value,'c',cstate.c.value,'csf',csf);
 }
// rs.timeSteps(pstate,30,function (cstate) ={doWhat(this );

rs.oneStep = function () {
  debugger;
  this.resetShapes();
//  for (let i=0;i<10;i++) {
    this.timeStep(pstate);
    let cstate = pstate.cstate;
    setEps(cstate);
    this.qspa = mkqspa();
    console.log('levels',cstate.levels.value);
    //rs.partParams.levels = cstate.levels;
    //this.partParams.levels = cstate.levels.value;

  //}
 setTimeout(() => this.oneStep(),40)
}
rs.afterInitialize = function () {
 this.oneStep();
}

rs.afterDisplayCell = function (prt) {
  console.log('CSF',csf);
  let crc = this.circleP.instantiate();
  let pgon =  prt.polygon;
  let dim = pgon.minDimension();
  crc.dimension = csf*dim;
  crc.dimension = 0.2*dim;
  crc.fill = 'white';//Math.random()<0.5?'blue':'blue';
  this.shapes.push(crc);
  let cnt = pgon.center();
  crc.moveto(cnt);
}

rs.partFill = function (prt) {
  return 'gray';
}
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


