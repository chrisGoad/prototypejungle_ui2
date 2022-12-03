
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_52');
let levels = 10;
levels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;
//let qsp = {Case:13,frs:[0.5]}

let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};
const addPath = function (nm) {
  let snm = 'sub_'+nm;
  let d = 0.01;
  pspace[snm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[snm] = {value:0};
  pspace[nm] = {kind:'randomWalkScalar',subComponent:snm,min:-.2,max:.2,wrap:0};
  initState[nm] = {value:0};

};

addPath('case13');
for (let i=0;i<5;i++) {
  addPath('case7_'+i);
}

rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

/*
rs.qspa = [];
const rr = () => .2*(Math.random()-.5);
rs.qspa.push({Case:13,frs:[0.5+rr()]});
//rs.qspa.push({Case:13,frs:[0.2,0.4,0.6,0.7]});
//rs.qspa.push( {Case:7,pcs:[.4,1.4,2.4,3.4]});
rs.qspa.push( {Case:7,pcs:[.5+rr(),1.5+rr(),2.5+rr(),3.5+rr()]});
*/
//rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
   let lev = prt.where.length;
  let wp = lev%3;
  let {pstate} = this;
  let {cstate} = pstate;
  const val7 = (n) =>  cstate['case7_'+n].value;
  let qsp;
  if (wp === 1) {
    qsp = {Case:13,frs:[0.5+cstate['case13'].value]};
  } else {
    qsp = {Case:7,pcs:[.5+val7(0),1.5+val7(1),2.5+val7(2),3.5+val7(3)]};
  }
  return qsp;
  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

rs.numSteps = 200;
rs.numISteps = 50;
rs.saveAnimation = 1;
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


