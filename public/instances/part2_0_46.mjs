
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_46');
let levels = 3;
rs.frameStrokee = 'white';
rs.framePadding = .05*rs.width;
let kind = 'sweep';
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//let initState = {sw:{value:-.4},pc0:{value:-.5},pc1:{value:-.5},pc2:{value:-.5},pc3:{value:-.5}};
let initState = {dir:{value:.1},pc3:{value:0},pc4:{value:0},pc4r:{value:0},pc7:{value:0},pc10:{value:0}};
//initState = {speedup:{value:1}}
let step9 = 0.02*(200/183)*Math.PI;

let bounce  = 1;
let sinusoidal = 0;
let step = 0.02
let step3 = step;
let step4 = step;
let step7 = step;
let step10 = step;
let minpc = -.5;
let maxpc = .5;
let minpc10 = -.5;
let maxpc10 = .5;
let minpc4 = 0;
let maxpc4 = 50;
//let minpc7 = -.5;
let minpc7 = 0;
let maxpc7 = .95;
let pspace = {
  dir:{kind,step:step9,min:0,max:2*Math.PI,interval:1,steps:0.5,bounce:1},
  pc3:{kind,step:step3,min:minpc,max:maxpc,interval:1,steps:0.5,bounce,sinusoidal},
  pc4:{kind,step:step4,min:minpc4,max:maxpc4,interval:1,steps:0.5,bounce:0,sinusoidal:0},
  pc4r:{kind,step:step4,min:maxpc4,max:minpc4,interval:1,steps:0.5,bounce:0,sinusoidal:0},
  pc7:{kind,step:step7,min:minpc7,max:maxpc7,interval:1,steps:0.5,bounce:1,sinusoidal:1},
  pc10:{kind,step:step10,min:minpc10,max:maxpc10,interval:1,steps:0.5,bounce:0,sinusoidal:0},
};

rs.numSteps = 200;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

const genCase = function (n,cstate) {
  let pc,rs;
  if ((n===3)||(n===30)) {
    pc = n===3?cstate.pc3.value:-cstate.pc3.value;
    rs = {Case:3,pcs:[.5+pc,1.5+pc,2.5+pc,3.5+pc]}
  }
  if (n===10) {
    pc = cstate.pc10.value;
    rs = {Case:10,pcs:[.5+pc,1.5+pc,2.5+pc,3.5+pc],ips:[{x:.3,y:.3},{x:.7,y:.7}]} 
  }
  if ((n===4)||(n===40)) {
 // debugger;
    pc = (n===4)?cstate.pc4.value:-cstate.pc4.value;
    let ipc = Math.floor(pc);
    let cs = (ipc%2===0)?4:6;
    let fpc = pc -ipc -.5;
    console.log('pc4',pc,'fpc',fpc,'cs',cs);
    rs = {Case:cs,pcs:[.5+fpc,1.5+fpc,2.5+fpc,3.5+fpc],frs:[0.3,0.7]}
  }
  if (n===7) {
 // debugger;
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

//let casesByWhereString = {P0_P0:9,P0_P2:9,P0_P1:9,P0_P3:9,P1_P0:7,P1_P1:7,P1_P2:7,P1_P3:7,
 //  P2_P0:4,P2_P1:4,P2_P2:40,P2_P3:40,P3_P0:3,P3_P1:3,P3_P1:3,P3_P2:30,P3_P3:30};
   
let casesByWhereString = {P0_P0:9,P0_P2:9,P0_P1:9,P0_P3:9,P1_P0:7,P1_P1:7,P1_P2:7,P1_P3:7,
   P2_P0:9,P2_P1:9,P2_P2:9,P2_P3:9,P3_P0:7,P3_P1:7,P3_P1:7,P3_P2:7,P3_P3:7};


const randomColor = function () {
  let r=Math.floor(Math.random()*255);
  let g=Math.floor(Math.random()*255);
  let b=Math.floor(Math.random()*255);
  return 'black';
  return `rgb(${r},${g},${b})`;
}



let fillByWhereString = {P0_P0_P0:randomColor(),P0_P2:randomColor(),P0_P1:randomColor(),P0_P3:randomColor(),P1_P0:randomColor(),P1_P1:randomColor(),P1_P2:randomColor(),P1_P3:randomColor(),
   P2_P0:randomColor(),P2_P1:randomColor(),P2_P2:randomColor(),P2_P3:randomColor(),P3_P0:randomColor(),P3_P1:randomColor(),P3_P1:randomColor(),P3_P2:randomColor(),P3_P3:randomColor()};


let colorSw = 183;
 colorSw = 91;
rs.genFills = function () {
    let {pstate} = this;
    let {cstate} = pstate;
    let {time} = cstate;
    if (time === 183) {
      debugger;
    }
    let sqc0 = time <= colorSw?'red':'yellow';
    let sqc1 = time <= colorSw?'blue':'magenta';
  	let aw = rs.allWheres(levels,4);
    let faw = aw.filter((w) => {
      let w1 = w[1];
      return w1.length === 3;
    });
    faw.forEach((w) => {
      let w1 = w[1];
      if (w1.length === 3) {
        fillByWhereString[w[0]] = randomColor();
      } else {
        fillByWhereString[w[0]] = 'transparent';
      }});
      fillByWhereString['P1_P2_P3'] = sqc0;
      fillByWhereString['P1_P1_P3'] = sqc0;
      fillByWhereString['P1_P0_P3'] = sqc0;
      fillByWhereString['P1_P3_P3'] = sqc0;
      fillByWhereString['P3_P2_P3'] = sqc1;
      fillByWhereString['P3_P1_P3'] = sqc1;
      fillByWhereString['P3_P0_P3'] = sqc1;
      fillByWhereString['P3_P3_P3'] = sqc1;

}


rs.updateState = function () {
  this.genFills();

  this.resetShapes();
}

rs.partFill= function (prt) {
	  let ws = this.whereString(prt.where);
  let fill = fillByWhereString[ws];
  return fill;
}
  
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
  if (lev<2) {
     return {Case:9,direction:0,radius:0,pcs:[.5,1.5,2.5,3.5]};
  }
  let csn = casesByWhereString[ws];
  if (csn) {
    return genCase(csn,cstate);
  }
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
rs.numSteps = 3000;
rs.numSteps = 100;
rs.numSteps = 2*colorSw+8;
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


