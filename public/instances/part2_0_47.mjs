
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_47');
let levels = 3;
rs.frameStrokee = 'white';
rs.framePadding = .05*rs.width;
let kind = 'sweep';
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//let initState = {sw:{value:-.4},pc0:{value:-.5},pc1:{value:-.5},pc2:{value:-.5},pc3:{value:-.5}};
let initState = {dir:{value:0},pc3:{value:0},pc4:{value:0},pc7:{value:.4}};
//initState = {speedup:{value:1}}
let step9 = 0.05*Math.PI;

let bounce  = 0;
let sinusoidal = 0;
let step3 = 0.01;
let step4 = 0.01;
let step7 = 0.01;
let minpc = -.5;
let maxpc = .5;
let minpc4 = 0;
let maxpc4 = 50;
let minpc7 = 0;
let maxpc7 = 50;
let pspace = {
  dir:{kind,step:step9,min:0,max:2*Math.PI,interval:1,steps:0.5},
  pc3:{kind,step:step3,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
  pc4:{kind,step:step4,min:minpc4,max:maxpc4,interval:1,steps:0.5,bounce:0,sinusoidal:0},
  pc7:{kind,step:step7,min:minpc7,max:maxpc7,interval:1,steps:0.5,bounce:0,sinusoidal:0},
};

rs.numSteps = 200;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

const genCase = function (n,cstate) {
  let pc,rs;
  if (n===3) {
    pc = cstate.pc3.value;
    rs = {Case:3,pcs:[.5+pc,1.5+pc,2.5+pc,3.5+pc]}
  }
  if (n===4) {
  debugger;
    pc = cstate.pc4.value;
    let ipc = Math.floor(pc);
    let cs = (ipc%2===0)?4:6;
    let fpc = pc -ipc -.5;
    console.log('pc4',pc,'fpc',fpc,'cs',cs);
    rs = {Case:cs,pcs:[.5+fpc,1.5+fpc,2.5+fpc,3.5+fpc],frs:[0.3,0.7]}
  }
  if (n===7) {
  debugger;
    pc = cstate.pc7.value;
    let ipc = Math.floor(pc);
    let cs = (ipc%2===0)?7:7;
    let fpc = pc -ipc -.5;
    console.log('pc7',pc,'fpc',fpc,'cs',cs);
    rs = {Case:cs,pcs:[.5+fpc,1.5+fpc,2.5+fpc,3.5+fpc],frs:[0.3,0.7]}
  }
  if (n===9) {
    let dir = cstate.dir.value;
    let radius = .2;
    rs = {Case:9,direction:dir,radius,pcs:[.5,1.5,2.5,3.5]}  
  }
  return rs;
}

let casesByWhereString = {P0_P0:3,P0_P2:9,P0_P1:4,P1_P0:7,P1_P1:7,P1_P2:7,P1_P3:7};

rs.partSplitParams = function (prt) {
  let {pstate} = this;
  let {cstate} = pstate;
  let {where} = prt;
  let lev = where.length;
  let ws = this.whereString(where);
   console.log('ws',ws);
  let pc3 = cstate.pc3.value;
  let dir = lev<2?0:cstate.dir.value;
 // let dir = 0.1 * Math.PI;
  let radius = lev<2?0:.2;
 
  return genCase(7,cstate);
 // {Case:3,pcs:[.5+pc3,1.5+pc3,2.5+pc3,3.5+pc3]}
}
/*
  let ln = prt.polygon.corners.length;
  let {pstate} = this;
  let {cstate} = pstate;
  let dir = cstate.dir.value;
  let {width:wd} = this;
  let pgon = qd.polygon;
  let minx = pgon.left();
  let c = pgon.center();
  let fr0 = Math.sqrt((minx + 0.5*wd)/wd);
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  let radius = 2*fr0*this.offCenter
   return {Case:3,pcs:[.4,1.4,2.4,3.4]}
   return {Case:9,direction:rd,radius,pcs:[.5,1.5,2.5,3.5]};
}
  let qp = {Case:3,pcs:[0.5+eps0,1.5+eps1,2.5+eps3,3.5+eps3]};
 // let rs = (ln === 3)?this.triSplitParams:qp;
  let rs = (ln === 3)?null:qp;
  //let lev = prt.where.length;
  return rs;
}
*/

//let visibles = rs.partParams.visibles = [];
//rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.8});


rs.saveAnimation = 1;
rs.chopOffBeginning = 1;
 rs.stepInterval = 40;
let ist=rs.numISteps = 0;

rs.numSteps = 101-ist;
rs.numSteps = 300;
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


