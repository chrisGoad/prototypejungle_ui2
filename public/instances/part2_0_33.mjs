
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_33');
let wd = 500;
let topParams = {width:wd,height:wd,framePadding:0,frameStroke:'white'}
Object.assign(rs,topParams);
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
    ps[nm] = {kind,step:5,min:50,max:rng,interval:1,steps:0.5};
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
let pstate = {pspace,cstate:initState};


rs.oneStep = function () {
  debugger;
   let hwd = 0.5*wd;
//  this.resetShapes();
//  for (let i=0;i<10;i++) {
    this.timeStep(pstate);
    let cstate = pstate.cstate;
    let dir0 = 0.1*cstate.c0.value;
    let v0 = 0.1*cstate.c1.value;
    let dim0 = cstate.c2.value;
   /*  let r1 = cstate.c3.value;
    let g1 = cstate.c4.value;
    let b1= cstate.c5.value;
       let r2 = cstate.c6.value;
    let g2 = cstate.c7.value;
    let b2= cstate.c8.value; */
   // let aa = setA(cstate);
/*    let fill0 =`rgb(${r0},${r0},${b0})`;
    let fill1 =`rgb(${r1},${g1},${b1})`;
    let fill2 =`rgb(${r2},${b2},${b2})`;*/
    let c0 = this.circle0;
    c0.dimension = 0.2*dim0;
    let tr0 = c0.getTranslation();
    let cs = Math.cos(dir0);
    let sn = Math.sin(dir0);
    let vec0 = Point.mk(cs,sn).times(v0);
       let np = tr0.plus(vec0);
    if ((np.x  > hwd) || (np.x < -hwd)) {
       dir0 = Math.PI - dir0;
       cstate.value = 10*dir0;
    }
    if ((np.y > hwd) || (np.y < -hwd)) {
       dir0 =- dir0;
       cstate.value = 10*dir0;
    }
    let ln = this.lineP.instantiate();
    ln['stroke-width'] =  0.02*dim0;
    ln.setEnds(tr0,np);
    this.shapes.push(ln);
    vec0 = Point.mk(Math.cos(dir0),Math.sin(dir0)).times(v0);

  
     np = tr0.plus(vec0);
    c0.moveto(np);
    
   // c0.fill = fill0;
    c0.update();
 /*   let c1 = this.circle1;
    c1.fill = fill1;
    c1.update();
    let c2 = this.circle2;
    c2.fill = fill2;
    c2.update();*/
    draw.refresh();
	 setTimeout(() => this.oneStep(),40)
}

let dim = 40;
let dist = 60;
rs.initialize = function () {
  debugger;
   let shapes = this.set('shapes',arrayShape.mk());
  this.addFrame();
  this.circleP = circlePP.instantiate();
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = 1;
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
  //this.set('circle1',crc1);
 // this.set('circle2',crc2);
  //crc0.moveto(Point.mk(-dist,0));
  //crc2.moveto(Point.mk(dist,0));
//  crc.update();
 // draw.refresh();
  
}

//rs.addToArray(strokeWidths,.1,levels);
export {rs};


