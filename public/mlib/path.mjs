/* a path through an n-dimensional space can be partly specified by an object {start:<state>,a0:v0,a1:v1...} where each v* has the form {step:<number>,interval:<integer>,min:<number>,max:<number>),
and a state has the form {ia0:<number>,a1:<number>,a2:<number>,...,time:<number>}. Call this a pathSpace,  Actual paths can be computed in many ways. 
For example, a random walk would involve each component changing its value by step or -step (randomly chosen) at each interval.  Sweep would involve sweeping values up until max is reached, and then
down again.*/ 

rs = function (item) [

item.randomNextState = function (pspace,cstate,component) {
  let pspc = pspace[component];
  let {step,min,max} = pspc;
  let cv =  cstate[component];
  let nvp = cv+step;
  let nvm = cv-step;
  if (nvm <= min) {
    return nvp;
  }
  if (nvp > max) {
     return nvm;
  }
  return Math.random() < 0.5?nvm:nvp;
}

item.timeStep = function (pspace,cstate) {
   let ct = cstate.time;
   Object.getOwnPropertyNames(pspace);
   
   