
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_41');
let levels = 10;
levels = 5;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;


let mineps = -.2;
let maxeps = .2;

let kind ='randomSteps';
kind ='randomValue';
kind ='sweep';
let nr = 9;
nr = 1;
let sp = 1.5;
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
      ps[rnm0] = {kind,step:.04*sp,min:mineps,max:maxeps,interval:1,steps:0.5};
      initS[rnm1] = {value:mineps+Math.floor(Math.random()*(maxeps-mineps)),theta:0};
      ps[rnm1] = {kind,step:.035*sp,min:mineps,max:maxeps,interval:1,steps:0.5};
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
rs.theFills10 = {P1:'rgb(0,0,20)',P0:'rgb(100,100,100)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};
rs.theFills12 = {P0:'rgb(0,0,0)',P1:'rgb(100,100,100)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};
rs.partFill = function (prt) {
  let where = prt.where;
  let lev = where.length;
  let nm,pnm;
  if (lev >= (levels+0)) {
    nm = this.partName(prt);
    pnm = where[0][0];
    debugger;

    let fill = (pnm==='P0')||(pnm==='P1')?this.theFills10[nm]:this.theFills12[nm];
    return fill;
  }
}

let wass ={};


let aws = rs.allWheres(levels,4);
let cidx = 0;
let qqps = [10,12,10,12,4];
console.log('aws',aws);
let buildAssignments = function () {
  aws.forEach((ws) => {
   // console.log('ws',ws);
    let idx = 2+Math.floor(11*Math.random());
    //wass[ws[0]] =2+cidx;
    let w1 = ws[1].length?ws[1]:[4];
    let vl = qqps[w1[0]];
    wass[ws[0]] = vl; // 3 5 6 7 8 9 10! 11 12!
    cidx=(cidx ===10)?0:cidx+1;
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
    return {Case:2,vertexNum:0,pcs:[0.5+eps0,2.5-eps1]};
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
  let idx = ws?wass[ws]:4;
  let wsum = whereSum(where);
 // console.log('wsum',wsum);
  let qp;
  let cln = 12-2;
  if (lev < (levels-1)) {
    qp = {Case:7,pcs:[0.5,1.5,2.5,3.5]}
  //  qp = mkCase(idx,this.eps0,this.eps1);
    debugger;
  } else {
    qp = mkCase(idx,this.eps0,this.eps1);
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
rs.numISteps = 10;
rs.saveAnimation = 1;
rs.stepInterval = 100;

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


