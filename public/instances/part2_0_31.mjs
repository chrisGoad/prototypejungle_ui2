
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_31');

let initState = {a:{value:0},b:{value:0},c:{value:0},levels:{value:0},csf:{value:0.1}};
let rng = 0.25;
let pspace = {a:{step:.015,min:-rng,max:rng,interval:1,steps:0.5},b:{step:.013,min:-rng,max:rng,interval:1,steps:0.5},c:{step:.011,min:-rng,max:rng,interval:1,steps:0.5},
              levels:{min:1,max:3,step:1,interval:150,steps:0.5},csf:{step:0.05,min:0.05,max:14,interval:1,steps:0.5}};
let pstate = {pathKind:'randomSteps',pspace,cstate:initState};
let doWhatt = function (cstate) {
  console.log('cstate.a',cstate.a.value,'b',cstate.b.value);
  debugger;
}

//rs.timeSteps(pstate,30,doWhat);

const setEps = function (cstate) {
  eps0 = cstate.a.value;
  eps1 = cstate.b.value;
  eps2 = cstate.c.value;
  csf = cstate.csf.value;
  console.log('cstate a',cstate.a.value,'b',cstate.b.value,'c',cstate.c.value,'csf',csf);
 }
// rs.timeSteps(pstate,30,function (cstate) ={doWhat(this );

rs.oneStep = function () {
  debugger;
  this.resetShapes();
//  for (let i=0;i<10;i++) {
    this.timeStep(pstate);
    let cstate = pstate.cstate;
    setEps(cstate);
    this.qspa = mkqspa();
    console.log('levels',cstate.levels.value);
    //let strokeWidths = rs.partParams.strokeWidths = [];
   // rs.computeExponentials({dest:strokeWidths,n:20,root:csf,factor:.7});

    //rs.partParams.levels = cstate.levels;
    //this.partParams.levels = cstate.levels.value;

  //}
 setTimeout(() => this.oneStep(),40)
 //setTimeout(() => this.oneStep(),40)
}
rs.initialize = function () {
  this.circleP = circlePP.instantiate();
  this.shapes = this.set('shapes',arrayShape.mk());
  const addCirc = (p) => {
    let crc = this.circleP.instantiate();
    crc.dimension = 10;
    crc.fill = 'white';//Math.random()<0.5?'blue':'blue';
    this.shapes.push(crc);
    crc.moveto(p);
  }
  addCirc(Point.mk(-200,0));
  addCirc(Point.mk(0,0));
  addCirc(Point.mk(200,0));
  
 //this.oneStep();
}

//rs.addToArray(strokeWidths,.1,levels);
export {rs};


