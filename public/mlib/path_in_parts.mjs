const rs =function (rs) {


rs.enterNewPart = function () {
  debugger;
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