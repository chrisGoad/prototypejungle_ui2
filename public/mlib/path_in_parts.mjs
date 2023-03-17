const rs =function (rs) {

rs.cycle = 0;
rs.whereInCycle = 0;
rs.stepsSoFar = 0;
rs.randomObject = function (params) {
  let {lb,ub,props} = params;
  let delta = ub-lb;
  let iob = {};
  props.forEach( (prop) => {
    iob[prop] =lb+Math.random()*delta;
  });
  return iob;
}

rs.randomArray = function (params) {
  let {lb,ub,ln} = params;
  let delta = ub-lb;
  let ra = [];
  for (let i=0;i<ln;i++) {
    ra.push(lb+Math.random()*delta);
  }
  return ra;
}

rs.randomArrays = function (params) {
  let {lb,ub,props,ln} = params;
  let delta = ub-lb;
  let iob = {};
  props.forEach( (prop) => {
    let ra = this.randomArray(params);
    iob[prop] =ra;
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

rs.randomArraySeqOb = function (params) {
  let {numCycles,props} = params;
  let oseq = [];
  for (let i=0;i<numCycles;i++) {
    oseq.push(this.randomArrays(params));
  }
  return oseq;
}



rs.loopingSeqOb = function (fn) {
  let {duration:dur,pauseDuration:pd,numCycles} = this;
  let SeqOb = fn.call(this);
  debugger;
  //{props,lb:-0.4,ub:0.4,numCycles:numCycles-1});
  let Ob0 = SeqOb[0];
  SeqOb.push(Ob0);
  this.SeqOb = SeqOb;
  let cycleL = dur + pd;
  this.numSteps = (numCycles-1) * cycleL;
  this.numSteps = numCycles * cycleL;
  this.cycleL = cycleL;
}

rs.initializeConstants = function () {
  let {duration:dur,pauseDuration:pd} = this;
  this.stepsSoFar = 0;
  this.cycle = 0;
  this.whereInCycle = 0;
  this.cycleL = dur+pd;
}
rs.enterNewPart = function () {
  let {stepsSoFar:ssf,numSteps,pstate,duration:dur,pauseDuration:pd,SeqOb} = this;
  let {cstate,pspace} = pstate;
  let ns = this.numSteps;
  let cycleL = dur + pd;
  let cycle = Math.floor(ssf/cycleL);
  let wic = ssf%cycleL;
  this.cycle = cycle;
  this.whereInCycle = wic;
  if (wic === 0) {  
   // debugger;  
    let props = Object.getOwnPropertyNames(pspace);
    props.forEach((prop) => {
      let psc = pspace[prop];
      let ivls = SeqOb[cycle];
      let fvls = SeqOb[cycle+1];
      let ivl = ivls[prop];
      if (!fvls) {
        debugger;
      }
      let fvl = fvls[prop]
      psc.min=ivl;
      psc.max=fvl;
      psc.done =0;
      let cs = cstate[prop];
      cs.value = ivl;
      cs.start = ssf;
      cs.done=0;
    });
  }
}

}

export {rs};