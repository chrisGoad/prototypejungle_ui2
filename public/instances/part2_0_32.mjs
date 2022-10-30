
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_32');

let iv = 254;
let rng = 255;
let kind ='randomSteps';
//let kind ='sweep';
//let nr = 9;
let nr = 1;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    let nm = ('c'+i);
    initS[nm] = {value:iv};
    ps[nm] = {kind,step:3,min:50,max:rng,interval:1,steps:0.5};
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
let pstate = {pspace,cstate:initState};

let nineCs = nr === 9;

rs.ssf = 0;
rs.oneStep = function () {
  debugger;
  rs.ssf = rs.ssf+1;
  if (rs.ssf>2000) {
    return;
  }
//  this.resetShapes();
//  for (let i=0;i<10;i++) {
    this.timeStep(pstate);
    let cstate = pstate.cstate;
    let r0 = cstate.c0.value;
    if (nineCs) {let g0 = cstate.c1.value;
      let b0 = cstate.c2.value;
       let r1 = cstate.c3.value;
      let g1 = cstate.c4.value;
      let b1= cstate.c5.value;
         let r2 = cstate.c6.value;
      let g2 = cstate.c7.value;
      let b2= cstate.c8.value;
    }
   // let aa = setA(cstate);
    let fill0,fill1,fill2;
    if (nineCs) {
      fill0 =`rgb(${r0},${r0},${b0})`;
      fill1 =`rgb(${r1},${g1},${b1})`;
      fill2 =`rgb(${r2},${b2},${b2})`;
    }  else {
      fill0 =`rgb(${r0},${r0},${r0})`;
    }

    let c0 = this.circle0;
    c0.fill = fill0;
    c0.update();
    if (nineCs) {
      let c1 = this.circle1;
      c1.fill = fill1;
      c1.update();
      let c2 = this.circle2;
      c2.fill = fill2;
      c2.update();
    }
    draw.refresh();
	 setTimeout(() => this.oneStep(),40)
}

let dim = 40;
let dist = 60;
rs.initialize = function () {
  debugger;
  this.circleP = circlePP.instantiate();
  let crc0 = this.circleP.instantiate();
  let crc1 = this.circleP.instantiate();
  let crc2 = this.circleP.instantiate();
  crc0.dimension = dim;
  crc1.dimension = dim;
  crc2.dimension = dim;
  crc0.fill = 'white';//Math.random()<0.5?'blue':'blue';
  crc1.fill = 'white';//Math.random()<0.5?'blue':'blue';
  crc2.fill = 'white';//Math.random()<0.5?'blue':'blue';
  this.set('circle0',crc0);
  this.set('circle1',crc1);
  this.set('circle2',crc2);
  crc0.moveto(Point.mk(-dist,0));
  crc2.moveto(Point.mk(dist,0));
//  crc.update();
 // draw.refresh();
  
}

//rs.addToArray(strokeWidths,.1,levels);
export {rs};


