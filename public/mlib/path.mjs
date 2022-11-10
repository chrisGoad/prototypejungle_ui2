/* a path through an n-dimensional space can be partly specified by an object {start:<state>,a0:v0,a1:v1...} where each v* has the form {step:<number>,interval:<integer>,min:<number>,max:<number>),
and a state has the form {ia0:<number>,a1:<number>,a2:<number>,...,time:<number>}. Call this a pathSpace,  Actual paths can be computed in many ways. 
For example, a random walk would involve each component changing its value by step or -step (randomly chosen) at each interval.  Sweep would involve sweeping values up until max is reached, and then
down again.*/ 

let rs = function (item) {

item.randomNextState = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let {step,min,max} = pspc;
  let csc =  cstate[component];
  let cv = csc.value;
  let nvp = cv+step;
  let nvm = cv-step;
  if (nvm <= min) {
    csc.value = nvp;
    return;
  }
  if (nvp > max) {
      csc.value = nvm;
     return;
  }
  csc.value = Math.random() < 0.5?nvm:nvp;
}


item.randomValueNextState = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let {step,min,max} = pspc;
  let delta = max-min;
  let nv = min + Math.random()*delta;
  let csc =  cstate[component];
  csc.value =nv;
}


item.sinusoidVal = function (sv,ev,step,cstep) {
  let down = ev<sv;
  let delta = Math.abs(ev-sv);
  let steps = delta/step;
  
  let fr = cstep/steps;
  let nvl = down?sv - fr*delta:sv+fr*delta;
  
  let phase = (Math.PI)*(cstep/steps) - Math.PI/2; 
  let nvn =  (1+ Math.sin(phase))/2;
  let nv = down?sv - nvn*delta:sv+nvn*delta;
  return {nosin:nvl,sin:nv};
}

item.adjustSweepToNewStep = function (pstate,component,nstep) {
  debugger;
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
// debugger;
  let pspc = pspace[component];
  let {jerky,min,max,step} = pspc;
  let csc = cstate[component];
  let {cstep,down,value,sv,ev} = csc;
    
  if (cstep === undefined) {
    cstep = csc.cstep = 0;
    sv  = csc.sv = value;
    ev = csc.ev = max;
  }
  let nvls = this.sinusoidVal(sv,ev,step,cstep);
  let {nosin,sin} = nvls;
  //console.log('nv',nv,'down',down,'sv',sv,'ev',ev,'step',step,'cstep',cstep);
  let up = !down;
  //if ((nv >= max) && up) {
  if ((nosin >= max) && up) {
    csc.sv = max;
    csc.ev = min;
    csc.down = 1;
    csc.cstep = 0;
 // } else if ((nv <= min) && down){
  } else if ((nosin <= min) && down){
    csc.sv = min;
    csc.ev = max;
    csc.down = 0;
    csc.cstep = 0;
  } else {
    csc.cstep++;
  }
  //csc.value = sin;
  csc.value = nosin;
}    
   

item.randomStepsNextState = function (pspace,cstate,component) {
 // debugger;
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

item.nextState = function (pathKind,pspace,cstate,component) {
//debugger;
  let csc = cstate[component];
  if (csc.paused) {
    return;
  }
  if (pathKind === 'random') {
    this.randomNextState(pspace,cstate,component);
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
}
  
item.timeStep = function (pstate) {
  //debugger;
  let {pspace,cstate}= pstate;
  let ct = cstate.time?cstate.time:0;
  let props = Object.getOwnPropertyNames(pspace);
 // let ns = {};
  props.forEach((component) => {
   let cc = pspace[component];
   let iv = cc.interval;
   let kind = cc.kind;
   //let cs = cstate[component];
   if (ct%iv === 0) {
    // this.nextState(pathKind,pspace,cstate,component);
     this.nextState(kind,pspace,cstate,component);
   } else {
 //    ns[component] = cv;
   }
  });
  cstate.time = ct+1;

 // pstate.cstate = ns;
}


item.interpolateStates= function (ist,fst,fr) { 
  debugger;
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
  debugger;
  let i = this.iStepsSoFar;
  if (i===0) {
   console.log('interpFrom',this.interpFrom,'interpTo',this.interpTo);
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
 // debugger;
  if (this.paused) {
    return;
  }

  let ns = this.stepsSoFar;
       console.log('ns',ns,'tns',this.numSteps);

  if  (this.stepsSoFar++ > (this.numSteps-this.chopOffEnd)) {
    if (this.numISteps) {
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
  this.timeStep(this.pstate);
  if (!one) {
    setTimeout(() => this.oneStep(),this.stepInterval);
  }
}
 
       
}  
   
export {rs};
