
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();
debugger;
rs.setName('part2_0_37');
let levels = 10;
levels = 3;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

let rkind = 'randomSteps';
let kind = 'sweep';
let rng = 0.25;

let initState = {a:{value:0},b:{value:0}};

let pspace = {a:{kind,step:.015,min:-rng,max:rng,interval:1,steps:0.5},b:{kind,step:.013,min:-rng,max:rng,interval:1,steps:0.5}};
let pstate = {pspace,cstate:initState};

rs.addFillComponent = function (st,ps,ws) {
  ps[ws+'_r'] = {kind:rkind,step:1,min:0,max:255,interval:1,steps:0.5};
  st[ws+'_r'] = {value:Math.floor(Math.random()*255)};
 // st[ws+'_r'] = {value:100};
  ps[ws+'_g'] = {kind:rkind,step:1,min:0,max:255,interval:1,steps:0.5};
  //st[ws+'_g'] = {value:200}; 
  st[ws+'_g'] = {value:Math.floor(Math.random()*128)};

  ps[ws+'_b'] = {kind:rkind,step:1,min:0,max:255,interval:1,steps:0.5};
    st[ws+'_b'] = {value:Math.floor(Math.random()*255)};

 // st[ws+'_b'] = {value:100};
}
let aws = rs.allWheres(levels,5);

aws.forEach((wv) => rs.addFillComponent(initState,pspace,wv[0]));

let copyInit = rs.deepCopy(initState);
/*
let iprops = Object.getOwnPropertyNames(initState);
let copyInit = {};
iprops.forEach((pr) => {
  let v = initState[pr].value;
  copyInit[pr] = {value:v};
});

rs.interpolateStates= function (ist,fst,fr) { 
  debugger;
  let intr = {};
  let iprops = Object.getOwnPropertyNames(initState);
  iprops.forEach((pr) => {
    let ivo = ist[pr];
    let fvo = fst[pr];
    if (ivo&&fvo) {
      let iv = ivo.value;
      let fv = fvo.value;
      let intv = iv + fr*(fv-iv);
      intr[pr]={value:intv};
    } else {
      debugger;
    }
  });
  debugger;
  return intr;
}
*/
  

debugger;
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
let saveAnimation = 1;
rs.oneStep = function () {
  //rs.numSteps = rs.numSteps+1;
  let ns = this.numSteps;
//  if (this.numSteps++ > 300) {
  if (this.numSteps++ > 150) {
   if (saveAnimation) {
     debugger;
     let nf = 10;
     let fs = pstate.cstate;
     pstate.cstate = initState;
     for (let i=1;i<=nf;i++) {
       this.resetShapes();
       pstate.cstate = this.interpolateStates(fs,copyInit,i/nf);
       draw.saveFrame(ns+i-2);
     }
   }
   return;
  }
  if (ns&&saveAnimation) { // for some reason, the first frame is corrupted
     
    draw.saveFrame(ns-1);
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
rs.computeExponentials({dest:strokeWidths,n:20,root:0.8,factor:.7});
//rs.computeExponentials({dest:strokeWidths,n:20,root:0,factor:.7});

rs.partParams.stroke = 'rgb(100,80,100)';
rs.partFill = function (prt) {
  let ns = this.numSteps;
  let ws = this.whereString(prt.where)
  let wsr = ws+'_r';
  let r = pstate.cstate[wsr];
  let wsg = ws+'_g';
  let g = pstate.cstate[wsg];
  let wsb = ws+'_b';
  let b = pstate.cstate[wsb];
  if (r) {
   // console.log('ws',ws,'v',v);
    let rv = r.value;
    let gv = g.value;
    let bv = b.value;
    if (0&& (ns > 199)) {
      debugger;
      let rdv = rv - 100;
      let gdv = gv - 100;
      let bdv = bv - 100;
      let fc = ns>400?0:0.005*(400-ns);
      rv = 100 + fc*rdv;
      gv = 80 + fc*gdv;
      bv = 100 + fc*bdv;
    }
    //let fill = `rgb(${rv},${gv*1},${bv})`;
   // let fill = `rgb(${rv},${Math.floor(0.8*gv)},${rv})`;
    let fill = `rgb(${rv},${rv},100)`;
    return fill;
  }
}
  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


