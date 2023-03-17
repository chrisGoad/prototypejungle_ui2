/* a path through an n-dimensional space can be partly specified by an object {start:<state>,a0:v0,a1:v1...} where each v* has the form {step:<number>,interval:<integer>,min:<number>,max:<number>),
and a state has the form {ia0:<number>,a1:<number>,a2:<number>,...,time:<number>}. Call this a pathSpace,  Actual paths can be computed in many ways. 
For example, a random walk would involve each component changing its value by step or -step (randomly chosen) at each interval.  Sweep would involve sweeping values up until max is reached, and then
down again.*/ 

let rs = function (item) {

item.angularDistance = function (a0,a1) {
  let min = Infinity;
  for (let i =-1;i<=1;i++) {
    let nv = Math.abs((a1+i*2*Math.PI)-a0);
    if (nv < min) {
     min = nv;
    }
  }
  //console.log('a1',a1,'a0',a0,'absdiff',Math.abs(a1-a0),'min', min);
  return min;
}
   
item.randomNextStateValue = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let {step,min,max} = pspc;
  let csc =  cstate[component];
  let {value:cv,wrap,biasTowards,biasBy} = csc;
  let nvp = cv+step;
  let nvm = cv-step;
  let value;
  if (nvm <= min) {
    nvm = wrap?max-(min-nvm):nvp;
  }
  if (nvp > max) {
      nvp = wrap?min+(nvp-max):nvm;
  }
  if (biasBy) {
    let mdiff = this.angularDistance(nvm,biasTowards);
    let pdiff = this.angularDistance(nvp,biasTowards);
    let wtc = mdiff <  pdiff?nvm:nvp;
    value = Math.random()<biasBy?wtc:Math.random()<0.5?nvm:nvp;
  } else {
    value = Math.random() < 0.5?nvm:nvp;
  }
  return value;
}

item.randomNextState = function (pspace,cstate,component) {
  let csc =  cstate[component];
  let value = this.randomNextStateValue(pspace,cstate,component);
  csc.value = value;
}

  
  
  /*
  let sum = 0;
  h.forEach((v) => {sum+=v});
  csc.average = sum/ln;
  console.log('average',csc.average);
  csc.value = value;
}*/
item.randomWalk2dNextState = function (pspace,cstate,component) {
   let csc = cstate[component];
   let {movingTarget:mvt,numDirections:numDirs} = csc;
   let csp = pspace[component];
   let dirsp = pspace[csp.directionComponent];
   let {max,min} = dirsp;
   let dirr = max-min;
   let dirst = cstate[csp.directionComponent];
   let dirv = dirst.value;
   let fr = (dirv-min)/dirr;
   let frd = Math.floor(fr*numDirs)/numDirs;
   let dir=numDirs?min+frd*dirr:dirv;
   let {goTowards,biasBy,stepLength:stpl,pos} = csc;
   let npos;
   let tm = cstate.time;
   csc.lastPos = csc.pos;
   let done = csc.done;
   if ((!mvt) && (csc.pos.distance(goTowards) < stpl)) {
     npos = goTowards.copy();
     csc.pos = npos;
     done= csc.done = 1;
   } else {
     let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(stpl);
     npos = vec.plus(pos);
   }
   if (!done) {
    csc.pos = npos;
    let nvec = goTowards.difference(npos);
    let nangle = Math.atan2(nvec.y,nvec.x);
    dirst.biasTowards = nangle;
    dirst.biasBy  = biasBy;
  }
}


item.randomWalkScalarNextState = function (pspace,cstate,component) {
     let csc = cstate[component];
   let {reverse} = csc;
   if (csc.aboveBoundCount === undefined) {
     csc.aboveBoundCount = 0;
   }
  
   let csp = pspace[component];
   let {min,max,up,wrap} = csp;
   let subState = cstate[csp.subComponent];
   let subV = subState.value;
   //let subV = subState.average;
   //let subV = subState.steadyV;
   //console.log('subV',subV);
   let subVP = subV > 0;
   let th = 0.01;
   let tooSmall = false;// subVP?subV<th:subV>-0.1;
   if (tooSmall) {
    subV = subVP?th:-th;
   }
   //let subv=down?-subValue:subValue;
   let {value} = csc;
   let tm = cstate.time;
   csc.lastVal = value;
   //let nvalh = value + subv;
   //let nvall = value - subv;
   let nval;
   let eps = 0.0;
   if (value > max) {
       if (wrap) {
         nval = (min + (value-max));
       } else {
         nval = max-eps;//nvall;
         reverse = subVP?1:0;
       }
   } else if (value < min) {
     if (wrap) {
         nval = max - (min-value);
       } else {
         nval = min+eps;
         reverse = subVP?0:1;
       }
   } else {
     nval = reverse?value-subV:value+subV;
   }
   csc.reverse  = reverse;
   csc.value = nval;
}
   
 
item.addWpath = function (nm,subRange,substepfactor,min,max,initVal,prop,val) {
  let {pstate} = this;
  let {cstate,pspace} = pstate;
  let snm = 'sub'+nm;
  let d = subRange;
  let ssf = substepfactor;
  let pssub= {kind:'random',step:ssf*d,min:-d,max:d,forStrokee:1};
  if (prop) {
    pssub[prop] = val;
  }
  pspace[snm] = pssub;
  cstate[snm] = {value:0};

  let ps = {kind:'randomWalkScalar',subComponent:snm,min,max};
  if (prop) {
    ps[prop] = val;
  }
  pspace[nm] = ps;
  cstate[nm] = {value:initVal};

};
  
   

item.randomValueNextState = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let {step,min,max} = pspc;
  let delta = max-min;
  let nv = min + Math.random()*delta;
  let csc =  cstate[component];
  csc.value =nv;
}


//item.sinusoidVal = function (sv,ev,step,cstep) {
item.sinusoidVal = function (sv,ev,vel,cstep) {
  let down = ev<sv;
  let delta = Math.abs(ev-sv);
  //let steps = delta/step;
  let steps = Math.ceil(delta/vel);
  
  let fr = cstep/steps;
  let nvl = down?sv - fr*delta:sv+fr*delta;
  
  let phase = (Math.PI)*(cstep/steps) - Math.PI/2; 
  let nvn =  (1+ Math.sin(phase))/2;
  let nv = down?sv - nvn*delta:sv+nvn*delta;
  return {nosin:nvl,sin:nv};
}

item.adjustSweepToNewStep = function (pstate,component,nstep) {
  let {pspace} = pstate;
  let pspc = pspace[component];
  let csc = pstate.cstate[component];
  let {cstep} = csc;
  let {min,max,step} = pspc;
  let delta = max-min;
  let nsteps = delta/nstep;
  let steps = delta/step;
  let fr = cstep/steps;
  let ncstep = Math.floor(fr * nsteps);
  pspc.step = nstep;
  csc.cstep = ncstep;
}

item.sweepNextState = function (pspace,cstate,component) {
  let {stepsSoFar:ssf} = this;
  if (ssf > 0) {
    debugger;
  }
  if (component === 'spin') {
    debugger;
  }
  let pspc = pspace[component];
  let {sinusoidal,min,max,vel,bounce,startDown,once,startAtStep:sas} = pspc;
  if (sas) {
    //console.log('sas',sas);
  }
  if (sas === 198) {
    debugger;
  }
  let csc = cstate[component];
  let {cycleCount} = csc;
  let {cstep,down,value,sv,ev} = csc;
  if (sas) {
    if  (ssf < sas) {
      //console.log('c',component,'ssf',ssf,'value',value);
      return;
    } else if (component == 'v17') {
       
      console.log('C',component,'sas',sas,'ssf',ssf,'value',value);
    }
  }
   if (down === undefined) {
    down = csc.down = startDown;
  }  
  if (cstep === undefined) {
    cstep = csc.cstep = 0;
    sv  = csc.sv = value;
    ev = csc.ev = down?min:max;
  }
  //let nvls = this.sinusoidVal(sv,ev,step,cstep);
  let nvls = this.sinusoidVal(sv,ev,vel,cstep);
  let {nosin,sin} = nvls;
 
  //console.log('nv',nv,'down',down,'sv',sv,'ev',ev,'step',step,'cstep',cstep);
  let up = !down;
  let atCycleEnd=0;
  //if ((nv >= max) && up) {
 
  if (((nosin+.000001) >= max) && up) {
    if (once) {
      csc.done = 1;
      this.callIfDefined('atCycleEnd',component);
      return;
    }
    if (cycleCount) {
      csc.cycleCount++;
    } else {
      csc.cycleCount = 1;
    }
    if (bounce) {
      csc.sv = max;
      csc.ev = min;
      csc.down = 1;
    } else {
      csc.sv = min;
      csc.ev = max;
      csc.value = min;
      atCycleEnd = 1;
    }
    csc.cstep = 0;
 // } else if ((nv <= min) && down){
  } else if (((nosin-.000001) <= min) && down){
     if (once) {
       csc.done = 1;
       return;
     }
     if (cycleCount) {
      csc.cycleCount++;
    } else {
      csc.cycleCount = 1;
    }
    csc.sv = min;
    csc.ev = max;
    csc.down = 0;
    csc.cstep = 0;
    csc.value = min;
    atCycleEnd = 1;
  } else {
    csc.cstep++;
  }
  if (!atCycleEnd) {
    csc.value = sinusoidal?sin:nosin;
  }
 // csc.value = nosin;
}    


item.sweepFixedDurNextState = function (pspace,cstate,component) {
  debugger;
  let {stepsSoFar:ssf} = this;
  let pspc = pspace[component];
  let {min,max,dur} = pspc;
  let cs = cstate[component];
  let {start} = cs;
  let fr = (ssf-start)/dur;
  if (fr > 1) {
    cs.done = 1;
    return;
  }
  let delta = max-min;
  let v=min+fr*delta;
  cs.value = v;
}
  
     
    

item.randomStepsNextState = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let csc = cstate[component];
  let {cstep,down,value,sv,ev} = csc;
  
  let jerky = pspc.jerky; //jerky acceleration
  let up = !down
  let {step,min,max,steps} = pspc;
  let delta = max-min;
  let cv = csc.value;
  let nsteps = 1 + Math.floor(steps*Math.random()*(delta/step));

  if (cstep === undefined) {
    cstep = csc.cstep = 0;
    sv  = csc.sv = value;
    ev = csc.ev = Math.min(max,sv + nsteps*step);
  }
  let dist = Math.abs(ev-sv);
  let nvls = this.sinusoidVal(sv,ev,step,cstep);
  let {nosin,sin} = nvls;
  //console.log('nv',nv,'down',down,'sv',sv,'ev',ev,'step',step,'cstep',cstep);
  let switchDir = cstep >= dist/step; 
  if (down && ((nosin<= min) || switchDir)) {
    down = csc.down = 0;
    csc.sv = cv;
    csc.ev = Math.min(max,sv + nsteps*step);
    csc.cstep = 0;
  } else if (up && ((nosin >= max) || switchDir)) {
     down = csc.down = 1;
     csc.sv = cv;
     csc.ev = Math.max(min,sv - nsteps*step);
     csc.cstep = 0;
  } else {
    csc.cstep++;
  }
  csc.value=sin;//down?nvm:nvp;
}

item.nextTable = {'random':'randomNextState','randomWalk':'randomWalk2dNextState','randomWalkScalar':'randomWalkScalarNextState',
                  'randomValue':'randomValueNextState','randomSteps':'randomStepsdNextState','sweep':'sweepNextState',
                  'sweepFixedDur':'sweepFixedDurNextState','interpolate':'interpolateNextState'};
                  
                  
item.nextState = function (pathKind,pspace,cstate,component) {
  let csc = cstate[component];
  if (csc.paused) {
    return;
  }
  let fnnm = this.nextTable[pathKind];
  let fn =this[fnnm];
  fn.call(this,pspace,cstate,component);
}



item.nextStatee = function (pathKind,pspace,cstate,component) {
  let csc = cstate[component];
  if (csc.paused) {
    return;
  }
  if (pathKind === 'random') {
    this.randomNextState(pspace,cstate,component);
  }
   if ((pathKind === 'randomWalk')||(pathKind === 'randomWalk2d')) {
    this.randomWalk2dNextState(pspace,cstate,component);
  }
  if (pathKind === 'randomWalkScalar') {
    this.randomWalkScalarNextState(pspace,cstate,component);
  }
  if (pathKind === 'randomValue') {
    this.randomValueNextState(pspace,cstate,component);
  }
  if (pathKind === 'randomSteps') {
    this.randomStepsNextState(pspace,cstate,component);
  }
  if (pathKind === 'sweep') {
    this.sweepNextState(pspace,cstate,component);
  } 
  if (pathKind === 'sweepFixedDur') {
    this.sweepFixedDurNextState(pspace,cstate,component);
  } 
  if (pathKind === 'interpolate') {
    this.interpolateNextState(pspace,cstate,component);
  }
}

item.stepComponent = function (nm,forTrace) { // stv = subtracevalue
  let {stepsSoFar:ssf,iStart,iSteps,iTarget}= this;
  let interpolating = iStart&&(ssf>=iStart);
  let {pspace,cstate}= this.pstate;
  let cst = cstate[nm];
  if (!cst) {
    debugger;
  }
  if (cst.done) {
    return;
  }
  let cc = pspace[nm];
  let subc = cc.subComponent;
  if (forTrace&&subc&&(!interpolating)) {
    this.stepComponent(subc);
  }
  let iv = cc.interval;
  let kind = interpolating?'interpolate':cc.kind;
  if ((!iv) || (ssf%iv === 0)) {
    this.nextState(kind,pspace,cstate,nm);
  }
}


item.interpolateComponent = function (nm,iState,fState,fr) { // stv = subtracevalue
  let {pspace,cstate}= this.pstate;
  let ival = iState[nm].value;
  let fval = fState[nm].value;
  let cval = ival+fr*(fval-ival);
  cstate[nm].value = cval;
}
item.timeStep = function (pstate) {
  if (!pstate) {
    return;
  }
  let {pspace,cstate}= pstate;
  let ct = cstate.time?cstate.time:0;
  let props = Object.getOwnPropertyNames(pspace);
  props.forEach((component) => this.stepComponent(component));
  cstate.time = ct+1;
}


item.interpolateStates= function (ist,fst,fr) { 
  let intr = {};
  let iprops = Object.getOwnPropertyNames(ist);
  iprops.forEach((pr) => {
    let ivo = ist[pr];
    let fvo = fst[pr];
    if (ivo&&fvo) {
      let iv = ivo.value;
      let fv = fvo.value;
      let intv = iv + fr*(fv-iv);
      intr[pr]={value:intv};
    }
  });
  return intr;
}

  

item.timeSteps = function (pstate,n,doWhat) {
  for (let i=0;i<n;i++) {
    let {cstate} = pstate;
    doWhat(cstate);
    this.timeStep(pstate);
  }
}



item.stepsSoFar = 0;
item.numSteps = 150;
item.saveAnimation = 0;
item.iStepsSoFar = 0;
item.numISteps = 0;
item.chopOffBeginning = 0; // in steps
item.chopOffEnd = 0; // in steps
item.interpFrom;
item.interpTo;
item.stepInterval = 40;
item.oneInterpolationStep = function () {
  let i = this.iStepsSoFar;
  if (i===0) {
  // console.log('interpFrom',this.interpFrom,'interpTo',this.interpTo);
  }
  this.iStepsSoFar++;
   if (this.updateState) {
    this.updateState();
  } else {
    this.resetShapes();
  }
  this.pstate.cstate = this.interpolateStates(this.interpFrom,this.interpTo,i/this.numISteps);
  if (this.saveAnimation) {
    draw.saveFrame(this.numSteps+this.iStepsSoFar-2);
  }
  if (i < this.numISteps) {
     setTimeout(() => this.oneInterpolationStep(),this.stepInterval);
  }

}
item.oneStep = function (one) {
  //debugger;
  if (this.paused) {
    return;
  }
  this.callIfDefined('initAudio');
  let ns = this.stepsSoFar;
       //console.log('ns',ns,'tns',this.numSteps);
  //this.stepsSoFar++;
  if  (this.stepsSoFar >= (this.numSteps-this.chopOffEnd)) {
    if (this.numISteps) {
      debugger;
      this.iStepsSoFar = 0;
      this.interpFrom = this.deepCopy(this.pstate.cstate);
      this.interpTo = this.copyOfInitState;
      this.oneInterpolationStep();
    }
  
    return;
  }
  if (ns&&this.saveAnimation&&(ns>this.chopOffBeginning)) { // for some reason, the first frame is corrupted 
    draw.saveFrame(ns-Math.max(this.chopOffBeginning+1,1));
  }
  if (this.updateState) {
    this.updateState();
  } else {
    this.resetShapes();
  }
  debugger;
  this.timeStep(this.pstate);
    this.stepsSoFar++;

  if (!one) {
    setTimeout(() => this.oneStep(),this.stepInterval);
  }
}

item.pushTrace = function (a,component,n) {
  let {cstate}= this.pstate;
  let cstc = cstate[component];
  //let trace = [];
  for (let i=0;i<n;i++) {
    let cv = this.deepCopy(cstc);
    a.push(cv);
    //let stv = subtrace?subtrace[i]:undefined;
   // this.stepComponent(component,stv);
    this.stepComponent(component,1);
  }
  return a;
}


item.recordTraceBundle = function (n) {
  let {cstate,pspace}= this.pstate;
  let props = Object.getOwnPropertyNames(pspace);
  let traceB = {};
  props.forEach((nm) => {
    let ctr = []
    traceB[nm] = ctr;
    this.pushTrace(ctr,nm,n);
  });
  return traceB;
}

item.nthTraceBundleState = function (traceB,n) {
  let {cstate,pspace}= this.pstate;
  let props = Object.getOwnPropertyNames(pspace);
  let state = {};
  props.forEach((nm) => {
    let tr = traceB[nm][n];
    state[nm] = this.deepCopy(tr);
  });
  return state;
}

item.traceBundleTraceLength = function (traceB) {
  let {cstate,pspace}= this.pstate;
  let props = Object.getOwnPropertyNames(pspace);
  let aTrace = traceB[props[0]];
  let ln = aTrace.length;
  return ln;
}
 
item.firstTraceBundleState = function (traceB) {
  return this.nthTraceBundleState(traceB,0);
}

item.lastTraceBundleState = function (traceB) {
debugger;
  let ln = this.traceBundleTraceLength(traceB);
  return this.nthTraceBundleState(traceB,ln-1);
}

item.concatTraceBundles = function (trb0,trb1) {
  let {cstate,pspace}= this.pstate;
  let props = Object.getOwnPropertyNames(pspace);
  let ctrb = {};
  props.forEach((nm) => {
    let ctr0 = trb0[nm];
    let ctr1 = trb1[nm];
    ctrb[nm] = ctr0.concat(ctr1);
  });
  return ctrb;
}
  
  
item.interpolateStates = function (iState,fState,fr) {
 
  let rState = [];
  let ln = iState.length;
  for (let i=0;i<ln;i++){
    let ival = iState[i];
    let fval = fState[i];
    let rval = ival + fr*(fval-ival);
    rState.push(rval);
  };
  return rState;
}
item.interpolateGridState1 = function (iState,fState,fr) {
  let rState = [];
  let ln = iState.length;
  for (let idx=0;idx<ln;idx++) {
    let cellIstate = iState[idx];
    let cellFstate = fState[idx];
    let cellRstate = this.interpolateStates(cellIstate,cellFstate,fr);
    rState.push(cellRstate);
  }
  return rState;
}
item.interpolateBetweenGridStates = function (iState,fState,n) {
  let ga = [iState];
  for (let i=1;i<=n;i++) {
    let fr = i/n;
    let cs = this.interpolateGridState1(iState,fState,fr);
    ga.push(cs);
  }
  return ga;
}
  

      
/*

item.interpolateStates = function (iState,fState,n) {
  debugger;
  let {cstate,pspace}= this.pstate;
  let props = Object.getOwnPropertyNames(pspace);
  let traces = {};
  props.forEach((nm) => {
    let ctr = []
    traces[nm] = ctr;
    this.interpolateTrace(ctr,nm,iState,fState,n);
  });
  return traces;
}
    */   
}  
   
export {rs};
