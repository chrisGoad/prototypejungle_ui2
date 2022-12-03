
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_51');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
//levels = 4;
//topLevels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};
//const addPath = function (ws) {
const addPath = function (n) {
 // let ws = this.whereString(w);
  let enm = 'ep'+n;
  let esnm = 'ses'+n;
   let onm = 'op'+n;
  let osnm = 'sos'+n;
    debugger;

  let d = 0.01;
  pspace[esnm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[esnm] = {value:0};
   pspace[osnm] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[osnm] = {value:0};
  pspace[enm] = {kind:'randomWalkScalar',subComponent:esnm,min:-.2,max:.2,wrap:0};
  pspace[onm] = {kind:'randomWalkScalar',subComponent:osnm,min:-.2,max:.2,wrap:0};
  initState[enm] = {value:0};
  initState[onm] = {value:0};

};

for (let i=0;i<6;i++) {
  addPath(i);
}
  
rs.partSplitParams = function (prt) {
  debugger;
  let ln = prt.polygon.corners.length;
  let w = prt.where;
  let lev = w.length;
  let ws = this.whereString(w);
  let olev = lev%2;
  let quad = ln === 4;
  let {pstate} = this;
  let {cstate} = pstate;
  let cs = lev === 0?4:this.cases[ws];
  let oddlev = lev%2;
  let crs;
  if (oddlev) {
    crs = {Case:cs,pcs:[.5+cstate['op'+0].value,1.5+cstate['op'+1].value,2.5+cstate['op'+2].value,3.5+cstate['op'+3].value],
             frs:[.5+cstate['op'+4].value,.5+cstate['op'+5].value]};
  } else {
    crs = {Case:cs,pcs:[.5+cstate['ep'+0].value,1.5+cstate['ep'+1].value,2.5+cstate['ep'+2].value,3.5+cstate['ep'+3].value],
                   frs:[.5+cstate['ep'+4].value,.5+cstate['ep'+5].value]};
  }
  return crs;
  }
 

rs.numSteps = 200;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});


rs.cases = {};

rs.computeCases = function () {
  let aw = this.allWheres(this.partParams.levels,7);
  debugger;
  let cases = this.cases;
  aw.forEach((w) => {
    let wn = w[0]
    cases[wn] = Math.random()<.5?4:6;
  });
}

rs.computeCases();


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
  debugger;
}


rs.partFill  = function (prt) {
  debugger;
  let w = prt.where;
  let ln = w.length;
  if (ln < 1) {
    return 'black';
  }
  let ws = this.whereString(w);
  let clr = this.colors[ws];
  return clr;
}

rs.computeFills();


rs.saveAnimation = 1;
rs.numSteps = 200;
rs.numISteps = 60;


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


