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
  let phase = (Math.PI)*(cstep/steps) - Math.PI/2; 
  let nvn =  (1+ Math.sin(phase))/2;
  let nv = down?sv - nvn*delta:sv+nvn*delta;
  return nv;
}

item.sweepNextState = function (pspace,cstate,component) {
 debugger;
  let pspc = pspace[component];
  let {jerky,min,max,step} = pspc;
  let csc = cstate[component];
  let {cstep,down,value,sv,ev} = csc;
  if (cstep === undefined) {
    cstep = csc.cstep = 0;
    sv  = csc.sv = value;
    ev = csc.ev = max;
  }
  let nv = this.sinusoidVal(sv,ev,step,cstep);
  console.log('nv',nv,'down',down,'sv',sv,'ev',ev,'step',step,'cstep',cstep);
  let up = !down;
  if ((nv >= max) && up) {
    csc.sv = max;
    csc.ev = min;
    csc.down = 1;
    csc.cstep = 0;
  } else if ((nv <= min) && down){
    csc.sv = min;
    csc.ev = max;
    csc.down = 0;
    csc.cstep = 0;
  } else {
    csc.cstep++;
  }
  csc.value = nv;
}    
   

item.randomStepsNextState = function (pspace,cstate,component) {
  debugger;
  let pspc = pspace[component];
  let csc = cstate[component];
  let down = csc.goingDown;
  let jerky = pspc.jerky; //jerky acceleration
  let up = !down
  let {step,min,max,steps} = pspc;
  let delta = max-min;
  let stg = 1 + Math.floor(steps*Math.random()*(delta/step));
  let stepsToGo = csc.stepsToGo;
  let cv = csc.value;

  if (stepsToGo === undefined) {
    stepsToGo = csc.stepsToGo = stg;
    csc.lengthOfLeg = stg;
    csc.distToGo = Math.min(stg*step,max-cv);
    csc.legStart = cv;
  }
  let switchDir = stepsToGo <=0;
  //console.log('down',down,'stepsToGo',stepsToGo,'stg',stg);
  let nv = down?cv-step:cv+step;
  //let nvm = cv-step;  
  let lol = csc.lengthOfLeg;
  let lst = csc.legStart;
  let dtg = down?-csc.distToGo:csc.distToGo;
  let phase = (Math.PI)*(lol-stepsToGo)/lol - Math.PI/2; 
  let nvn = Math.sin(phase);
    console.log('jerky',jerky,'stg',stepsToGo,'lol',lol,'up',up,'phase',phase/(Math.PI/2),'nvn',nvn);
   if (!jerky) {
     nv = lst + (nvn+1)*0.5*dtg;
   }
   //nvm = csc.legStart + nvn*dtg;  
  //nvp = nvm;
  if ((nv < min)||(down && switchDir)) {
    down = csc.goingDown = 0;
    csc.stepsToGo = stg;
    csc.lengthOfLeg = stg;
    csc.distToGo = Math.min(stg*step,max-cv);
    csc.legStart = cv;

  } else if ((nv > max) || (up && switchDir)) {
     down = csc.goingDown = 1;
     csc.stepsToGo = stg;
     csc.lengthOfLeg = stg;
     csc.distToGo = Math.min(stg*step,cv-min);
     csc.legStart = cv;

  } else {
    csc.stepsToGo = csc.stepsToGo - 1
  }
  csc.value=nv;//down?nvm:nvp;
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
