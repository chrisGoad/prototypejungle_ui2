
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_32');

let iv = 1;
let rng = 255;
let kind ='randomSteps';
let nr = 9;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    let nm = ('c'+i);
    initS[nm] = {value:iv};
    ps[nm] = {kind,step:5,min:0,max:rng,interval:1,steps:0.5};
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
let pstate = {pspace,cstate:initState};


rs.oneStep = function () {
  debugger;
//  this.resetShapes();
//  for (let i=0;i<10;i++) {
    this.timeStep(pstate);
    let cstate = pstate.cstate;
    let r = cstate.c0.value;
    let g = cstate.c1.value;
    let b = cstate.c2.value;
   // let aa = setA(cstate);
    let fill =`rgb(${r},${g},${b})`;
    let c = this.circle;
    c.fill = fill;
    c.update();
    draw.refresh();
	 setTimeout(() => this.oneStep(),40)
}

let dim = 400;
rs.initialize = function () {
  debugger;
  this.circleP = circlePP.instantiate();
  let crc = this.circleP.instantiate();
  crc.dimension = 10;
  crc.fill = 'white';//Math.random()<0.5?'blue':'blue';
  this.set('circle',crc);
//  crc.update();
 // draw.refresh();
  
}

//rs.addToArray(strokeWidths,.1,levels);
export {rs};


