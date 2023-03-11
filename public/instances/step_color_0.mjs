
import {rs as generatorP} from '/generators/part2_0.mjs';
import {rs as addPathInParts} from '/mlib/path_in_parts.mjs';

let rs = generatorP.instantiate();

addPathInParts(rs);

rs.setName('part2_0_58');
//rs.frameStroke = 'blue';
rs.framePadding = .2*(rs.width);
let levelsToShow = 1;
let levels = 9;
levels = 6;
levels = 2;
//levels = 3;
//topLevels = 6;
rs.duration = 20;//duration of one path
rs.pauseDuration = 4;
rs.numCycles = 4;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let initState = {};
//initState = {speedup:{value:1}}
let pspace = {};


/*

rs.randomObject = function (params) {
  let {lb,ub,props} = params;
  let delta = ub-lb;
  let iob = {};
  props.forEach( (prop) => {
    iob[prop] =lb+Math.random()*delta;
  });
  return iob;
}
rs.randomSeqOb = function (params) {
  let {numCycles,props} = params;
  let oseq = [];
  for (let i=0;i<numCycles;i++) {
    oseq.push(this.randomObject(params));
  }
  return oseq;
}


rs.loopingSeqOb = function (fn) {
  let {pstate,duration:dur,pauseDuration:pd,numCycles} = this;

  let {pspace} = pstate;
  debugger;
  let props = Object.getOwnPropertyNames(pspace);
  
  let SeqOb = this.randomSeqOb({props,lb:-0.4,ub:0.4,numCycles:numCycles-1});
  let Ob0 = SeqOb[0];
  SeqOb.push(Ob0);
  this.SeqOb = SeqOb;
  let cycleL = dur + pd;
  this.numSteps = numCycles * cycleL;
  this.cycleL = cycleL;
}

*/

rs.addPath = function (kind,n) {
  //let ss = this.SeqSeq;
  let dur = this.duration;
  //let nm = kind+'pc'+'_'+n;
  let nm = kind+'pc'+n;
  pspace[nm] = {kind:'sweepFixedDur',dur,min:0,max:0};
  initState[nm] = {value:0};
};


rs.pstate = {pspace,cstate:initState};

rs.partVisible = function () {
  return 1;
}
rs.partSplitParams = function (prt) {
 // debugger;
  let ln = prt.polygon.corners.length;
  let lev = prt.where.length;
  let olev = lev%2;
  let quad = ln === 4;
  if (ln === 4) {
 //   debugger;
  }
  let {pstate} = this;
  let {cstate} = pstate;
  const vl = (nm) =>{
    let vl = cstate[nm].value;
    return vl;
  }
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
// the same set of paths are reused at each turn of the cycle
rs.updateState= function () {
  debugger;
  this.enterNewPart();
  /*
  let {stepsSoFar:ssf,numSteps,pstate,duration:dur,pauseDuration:pd,SeqOb} = this;
  let {cstate,pspace} = pstate;
  let ns = this.numSteps;
  let cycleL = dur + pd;
  let cycle = Math.floor(ssf/cycleL);
  let wic = ssf%cycleL;
  this.cycle = cycle;
  this.whereInCycle = wic;
  if (wic === 0) {  
    debugger;  
    let props = Object.getOwnPropertyNames(pspace);
    props.forEach((prop) => {
      let psc = pspace[prop];
      let ivls = SeqOb[cycle];
      let fvls = SeqOb[cycle+1];
      let ivl = ivls[prop]
      let fvl = fvls[prop]
      psc.min=ivl;
      psc.max=fvls;
      psc.done =0;
      let cs = cstate[prop];
      cs.value = ivl;
      cs.start = ssf;
      cs.done=0;
    });
  }*/
  this.resetShapes();
}

rs.partVisiblee  = function (prt) {
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


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


