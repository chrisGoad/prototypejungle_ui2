
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_31');

let rng = 200;
let kind ='randomSteps';
let nr = 9;
//nr = 2;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    for (let j=0;j<n;j++) {
      let nm = ('a'+i)+j;
      initS[nm] = {value:Math.floor(Math.random()*rng)};
      ps[nm] = {kind,step:5,min:1,max:rng,interval:1,steps:0.5};
    }
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

const setAA = function (cstate) {
  let aa = [];
  const addA = function (n) {
     let nm = 'a'+n;
     let vl = cstate[nm].value;
     aa.push(vl);
  }
  for (let i=0;i<nr;i++) {
    addA(i);
  }
 
  console.log('aa',aa);
  return aa;

 }
 
rs.updateState = function () {
  let cstate = this.pstate.cstate;
  for (let i=0;i<nr;i++) {
    for (let j=0;j<nr;j++) {
      let snm = ('a'+i)+j;
      let cnm = ('c'+i)+j;
      let c = this[cnm]
      let v = cstate[snm].value;
      c.dimension = v;
      c.update();
    }
  }
  draw.refresh();
}

rs.numSteps = 100;
rs.numISteps = 20;
rs.saveAnimation = 1;


let dim = 400;
rs.initialize = function () {
  debugger;
  this.circleP = circlePP.instantiate();
  this.shapes = this.set('shapes',arrayShape.mk());
  const addCirc = (p,i,j) => {
    let crc = this.circleP.instantiate();
    let nm = ('a'+i)+j;
    let dimv = initState[nm];
    if (!dimv) {
      debugger;
    }
    crc.dimension = dimv.value;
    crc.fill = 'white';//Math.random()<0.5?'blue':'blue';
    this.set(('c'+i)+j,crc);
    crc.moveto(p);
  }
  for (let i=0;i<nr;i++) {
    for (let j=0;j<nr;j++) {
      let hi = (nr-1)/2;
      let p = Point.mk(dim*(i-hi),dim*(j-hi));
      addCirc(p,i,j);
    }
  }
}

export {rs};


