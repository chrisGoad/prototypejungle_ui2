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


item.sweepNextState = function (pspace,cstate,component) {
 // debugger;
  let pspc = pspace[component];
  let csc = cstate[component];
  let down = csc.goingDown;
  let {step,min,max} = pspc;
  let cv = csc.value;
  let nvp = cv+step;
  let nvm = cv-step;
  if (nvm < min) {
    down = csc.goingDown = 0;
  }
  if (nvp > max) {
     down = csc.goingDown = 1;
  }
  csc.value=down?nvm:nvp;
}


item.randomStepsNextState = function (pspace,cstate,component) {
 // debugger;
  let pspc = pspace[component];
  let csc = cstate[component];
  let down = csc.goingDown;
  let up = !down
  let {step,min,max,steps} = pspc;
  let delta = max-min;
  let stg = 1 + Math.floor(steps*Math.random()*(delta/step));
  let stepsToGo = csc.stepsToGo;
  if (stepsToGo === undefined) {
    stepsToGo = csc.stepsToGo = stg;
  }
  let switchDir = stepsToGo <=0;
  console.log('down',down,'stepsToGo',stepsToGo,'stg',stg);
  let cv = csc.value;
  let nvp = cv+step;
  let nvm = cv-step;    
  if ((nvm < min)||(down && switchDir)) {
    down = csc.goingDown = 0;
    csc.stepsToGo = stg;
  } else if ((nvp > max) || (up && switchDir)) {
     down = csc.goingDown = 1;
     csc.stepsToGo = stg;
  } else {
    csc.stepsToGo = csc.stepsToGo - 1
  }
  csc.value=down?nvm:nvp;
}

item.nextState = function (pathKind,pspace,cstate,component) {
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

item.timeSteps = function (pstate,n,doWhat) {
  for (let i=0;i<n;i++) {
    let {cstate} = pstate;
    doWhat(cstate);
    this.timeStep(pstate);
  }
}
    
       
}  
   
export {rs};
