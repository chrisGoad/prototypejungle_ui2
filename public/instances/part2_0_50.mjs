
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_50');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
levels = 4;
//topLevels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};
//const addPath = function (ws) {
const addPath = function (n) {
 // let ws = this.whereString(w);
  let ws = 'lev'+n;
  let wsdir = ws+'_dir';
  let wsrad = ws+'_rad';
  let sdir  = wsdir+'_sub';
  let srad = wsrad+'_sub';
  let d = 0.1;
  pspace[sdir] = {kind:'random',step:0.1*d,min:-d,max:d};
  pspace[srad] = {kind:'random',step:0.1*d,min:-d,max:d};
  initState[sdir] = {value:0};
  initState[srad] = {value:0};
  pspace[wsdir] = {kind:'randomWalkScalar',subComponent:sdir,min:-Math.PI,max:Math.PI,wrap:1};
  pspace[wsrad] = {kind:'randomWalkScalar',subComponent:srad,min:0,max:.3};
  initState[wsdir] = {value:0};
  initState[wsrad] = {value:0};
};

for (let i=0;i<levels;i++) {
  addPath(i);
}
  
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let lev = prt.where.length;
  let olev = lev%2;
  let quad = ln === 4;
  let {pstate} = this;
  let {cstate} = pstate;
  let dirnm = ('lev'+lev)+'_dir';
  let radnm = ('lev'+lev)+'_rad';
  let dir = cstate[dirnm].value;
  let rad = cstate[radnm].value;
  rad = lev < (levels-2)?0:.2;
  let crs = {Case:9,direction:dir,radius:rad,pcs:[.5,1.5,2.5,3.5]};
  return crs;
  }
 

rs.numSteps = 100;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});


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

rs.computeFills();


rs.saveAnimation = 0;
rs.numSteps = 1000;
rs.numIStepss = 60;


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


