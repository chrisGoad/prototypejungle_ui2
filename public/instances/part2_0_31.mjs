
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_31');
debugger;

rs.framePadding = .15*rs.width;
//rs.frameStroke = 'white'
let rng = 200;
let rmin = 100;
let rmax = 250;
let gmin = 100;
let gmax = 250;
let bmin = 100;
let bmax = 250;
let brng = 250;
let kind ='randomSteps';
let nr = 9;
let wd = 400;
let dim = wd;
Object.assign(rs,{width:wd,height:wd,frameStrokeWidth:4,framePadding:.15*wd,frameStrokee:'white'});

//nr = 2;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    for (let j=0;j<n;j++) {
      let nm = ('a'+i)+j;
      let rnm = nm+'_r';
      let gnm = nm+'_g';
      let bnm = nm+'_b';
      initS[nm] = {value:Math.floor(Math.random()*rng)};
      ps[nm] = {kind,step:5,min:1,max:rng,interval:1,steps:0.5};
       initS[rnm] = {value:rmin+Math.floor(Math.random()*(rmax-rmin))};
      ps[rnm] = {kind,step:5,min:rmin,max:rmax,interval:1,steps:0.5};
      initS[gnm] = {value:gmin+Math.floor(Math.random()*(gmax-gmin))};
      ps[gnm] = {kind,step:5,min:rmin,max:rmax,interval:1,steps:0.5};
       initS[bnm] = {value:bmin+Math.floor(Math.random()*(bmax-bmin))};
      ps[bnm] = {kind,step:5,min:bmin,max:bmax,interval:1,steps:0.5};
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
      let c = this[cnm];
      let rnm = snm+'_r';
      let gnm = snm+'_g';
      let bnm = snm+'_b';
      let v = cstate[snm].value;
      let r = cstate[rnm].value;
      let g = 0;//cstate[gnm].value;
      let b = cstate[bnm].value;
      c.dimension = v/nr;
      c.fill = `rgb(${r},${g},${b})`;
      console.log('fill', c.fill);
      c.update();
    }
  }
  draw.refresh();
}

rs.numSteps = 100;
rs.numISteps = 20;
rs.saveAnimation = 1;


rs.initialize = function () {
  debugger;
  this.addFrame();
  this.circleP = circlePP.instantiate();
  this.shapes = this.set('shapes',arrayShape.mk());
  const addCirc = (p,i,j) => {
    let crc = this.circleP.instantiate();
    let nm = ('a'+i)+j;
    let dimv = initState[nm];
    if (!dimv) {
      debugger;
    }
    crc.dimension = dimv.value/nr;
    crc.fill = Math.random()<0.5?'blue':'red';//'red';
    this.set(('c'+i)+j,crc);
    crc.moveto(p);
  }
  for (let i=0;i<nr;i++) {
    for (let j=0;j<nr;j++) {
      let hi = (nr-1)/2;
      let p = Point.mk(dim*(i-hi)/nr,dim*(j-hi)/nr);
      addCirc(p,i,j);
    }
  }
}


export {rs};


