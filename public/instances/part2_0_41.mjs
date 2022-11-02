
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_41');
let levels = 10;
levels = 4;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;


let mineps = -.2;
let maxeps = .2;

let kind ='randomSteps';
kind ='randomValue';
kind ='sweep';
let nr = 9;
nr = 1;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    for (let j=0;j<n;j++) {
      let rnm0 = 'eps0';
      let rnm1 = 'eps1';
      let xnm = ('x'+i)+j;
      let ynm = ('y'+i)+j;
      initS[rnm0] = {value:mineps+Math.floor(Math.random()*(maxeps-mineps)),theta:0};
      ps[rnm0] = {kind,step:.05,min:mineps,max:maxeps,interval:1,steps:0.5};
      initS[rnm1] = {value:mineps+Math.floor(Math.random()*(maxeps-mineps)),theta:0};
      ps[rnm1] = {kind,step:.02,min:mineps,max:maxeps,interval:1,steps:0.5};
  /*     initS[xnm] = {value:minx+Math.floor(Math.random()*(maxx-minx)),theta:0};
      ps[xnm] = {kind,step:.5,min:minx,max:maxx,interval:1,steps:0.5};
       //initS[ynm] = {value:miny+Math.floor(Math.random()*(maxy-miny)),theta:0};
       initS[ynm] = {value:0,theta:0};
      ps[ynm] = {kind,step:.7,min:miny,max:maxy,interval:1,steps:0.5}; */
    }
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);

let {initState,pspace} = bem;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};
let whereSum = function (wh) {
  let ws = 0;
  wh.forEach((v) => {
    let wnum = v[0].substring(1);
    let n = Number(wnum);
    ws=ws+n;
});
   return ws;
}

rs.theFills = {P0:'rgb(255,0,0)',P1:'rgb(200,200,0)',P2:'rgb(0,255,0)',P3:'rgb(0,255,255)',P4:'rgb(0,0,255)',P5:'rgb(100,100,100)'};
rs.partFilll = function (prt) {
debugger;
  let where = prt.where;
  let lev = where.length;
  if (lev >= (levels+0)) {
    let nm = this.partName(prt);
    let fill = this.theFills[nm];
    return fill;
  }
}

let wass ={};


let aws = rs.allWhereStrings(levels,4);
console.log('aws',aws);
let buildAssignments = function () {
  aws.forEach((ws) => {
   // console.log('ws',ws);
    wass[ws] = 2+Math.floor(11*Math.random());
  });
}
buildAssignments();
console.log('wass',wass);




function mkCase(n,eps0,eps1) {
  let cs;
  const mkPcs = function () {
    return [.5-eps0,1.5-eps1,2.5-eps1,3.5-eps0]
  }
  if (n===2) {
    return {Case:2,vertexNum:0,pcs:[0.5+eps,2.5-eps1]};
  }
  if (n===3) {
    return {Case:3,pcs:mkPcs()};
  } 
  if (n===4) {
    return {Case:4,pcs:mkPcs(),frs:[0.3,0.7]};
  }
  if (n===5) {
    return {Case:5,pcs:mkPcs(),frs:[0.3,0.7]};
  } 
  if (n===6) {
    return {Case:6,pcs:mkPcs(),frs:[.3,0.7]};
  } 
  if (n===7) {
    return {Case:7,pcs:mkPcs()};
  } 
  if (n===8) {
    return {Case:8,pcs:mkPcs()};
  } 
  if (n===9) {
    return {Case:9,direction:-0.25*Math.PI,radius:0.2,pcs:mkPcs()};
  } 
  if (n===10) {
    return {Case:10,pcs:mkPcs(),ips:[{x:.3,y:.3},{x:.7,y:.7}]};
  } 
  if (n===11) {
    return {Case:11,pcs:mkPcs()};
  } 
  if (n===12) {
    return {Case:12,pcs:mkPcs()};
  } 
}

rs.eps0 = 0;
rs.eps1 = 0;
rs.partSplitParams = function (prt) {
  let {polygon:pgon} = prt;
  let {qspa0,qspa1,qspa2,qspa3} = this;
  let cnt = pgon.center();
  let inQ0 = (cnt.x < 0) && (cnt.y < 0);
  let inQ1 = (cnt.x > 0) && (cnt.y < 0);
  let inQ2 = (cnt.x < 0) && (cnt.y > 0);
  let inQ3 = (cnt.x > 0) && (cnt.y > 0);
  let ln = pgon.corners.length;
  let where = prt.where;
  let lev = where.length;
  let ws = this.whereString(where);
  let idx = wass[ws];
  let wsum = whereSum(where);
 // console.log('wsum',wsum);
  debugger;
  let qp;
  let cln = 12-2;
  if (0|| (lev <3)) {
    qp = {Case:7,pcs:[0.5,1.5,2.5,3.5]}
  } else {
  //  let idx = Math.floor(cln*Math.random());
    //qp = theQps[lev%4];
    debugger;
  //  qp = theQps[wsum];
   // qp = cases[idx];
    let eps = Math.random()*0.0;
    qp = mkCase(idx+2,this.eps0,this.eps1);
   // qp = cases[12];
  //  qp = byWhere[ws];
   }
   return qp;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});



rs.updateState = function () {
  debugger;
  let cstate = this.pstate.cstate;
  let eps0 = cstate.eps0.value;
  let eps1 = cstate.eps1.value;
 // console.log('eps',eps);
  rs.eps0 = eps0;
  rs.eps1 = eps1;
  this.resetShapes();

}

rs.numSteps = 100;
rs.numISteps = 0;
rs.saveAnimation = 0;
rs.stepInterval = 40;

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


