
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_49');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
//levels = 3;
//topLevels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};
const addPath = function (kind,n) {
  let snm = kind+'pcsub'+n;
  let nm = kind+'pc'+n;
  let d = 0.01;
  pspace[snm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[snm] = {value:0};
  pspace[nm] = {kind:'randomWalkScalar',subComponent:snm,min:-.4,max:.4};
  initState[nm] = {value:0};
};

for (let i=0;i<4;i++) {
  addPath('q',i);
}
for (let i=0;i<4;i++) {
  addPath('o',i);
}

for (let i=0;i<2;i++) {
  addPath('t',i);
}

rs.numSteps = 1000;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let lev = prt.where.length;
  let olev = lev%2;
  let quad = ln === 4;
  if (ln === 4) {
 //   debugger;
  }
  let {pstate} = this;
  let {cstate} = pstate;
  const vl = (nm) => cstate[nm].value;
  //console.log('qpcs',qpc0,qpc1,qpc2,qpc3);
  let p;
  if (quad) {
    if (olev) {
      p = {Case:3,pcs:[0.5+vl('opc0'),1.5+vl('opc1'),2.5+vl('opc2'),3.5+vl('opc3')]};
    } else {
      p = {Case:3,pcs:[0.5+vl('qpc0'),1.5+vl('qpc1'),2.5+vl('qpc2'),3.5+vl('qpc3')]};
    }
  } else {
    p = {Case:1,pcs:[0.5+vl('tpc0'),1.5+vl('tpc0')]};
  }
  return p;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

rs.updateStatee= function () {
 //debugger;
  let ssf = this.stepsSoFar;
  let pastIntro = ssf >= introSteps;

  let ns = this.numSteps;
  let hns = 0.5*ns;
  let fr = ssf<hns?ssf/hns:1-(ssf-hns)/hns;
  levelsToShow = pastIntro? Math.floor(1 + (levels-1)*fr):levels;
  console.log('levels',levels);
  this.partParams.levels = levels;

  this.resetShapes();
}

rs.partVisible  = function (prt) {
  //debugger;
  let w = prt.where;
  let ln = w.length;
  if (ln === 0) {
    return 0;
  }
  let p0 = w[0][0];
  if (p0 === 'P0') {
    return 1;
  }
  return 0;
}

rs.computeFills = function () {
  const rshade =() => Math.floor(Math.random()*255);
  let aw = this.allWheres(this.partParams.levels,5);
  let af = {};
  
  aw.forEach((w) => {
    let r = rshade();
    let g = rshade();
    let b = rshade();
    let wn = w[0];
    let rcolor = `rgb(${r},${0},${b})`;
    af[wn] = rcolor;
  });
  this.colors = af;
  //debugger;
}

rs.computeFills();


rs.partFill  = function (prt) {
  //debugger;
  let w = prt.where;
  let ln = w.length;
  if (ln < 1) {
    return 'black';
  }
  let ws = this.whereString(w);
  let clr = this.colors[ws];
  return clr;
}

rs.saveAnimation = 1;
rs.numSteps = 500;
rs.numISteps = 60;


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


