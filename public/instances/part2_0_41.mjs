
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_13');
let levels = 10;
levels = 5;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

const mkQp0 = function (dv) {
  return {Case:4,vertexNum:0,pcs:[0.4,1.5,2.5,3.5],frs:[.5,0.5]};
}

const mkQp = function (dv) {
  return {Case:4,vertexNum:0,pcs:[0.5-dv,1.5-dv,2.5+dv,3.5],frs:[.5-dv,0.5+dv]};
}
let inc =0.01;
let theQps = [mkQp0()];
const addQp = function () {
  theQps.push(inc*theQps.length);
}

for (let i=0;i<100;i++) {
  addQp();
}
let byWhere = {};
byWhere['P0'] = mkQp0();
byWhere['P1'] = mkQp();
byWhere['P2'] = mkQp(.2);
byWhere['P3'] = mkQp(.3);
byWhere['P0_P0'] = mkQp(.1);

/*
rs.qspa0 = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa0.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa0.push({Case:4,vertexNum:0,pcs:[0.5,1.5,2.5,3.5],frs:[.5,0.5]});
rs.qspa0.push({Case:4,vertexNum:0,pcs:[0.4,1.5,2.5,3.5],frs:[.5,0.5]});
rs.qspa0.push({Case:6,vertexNum:0,pcs:[0.5,1.5,2.5,3.5],frs:[.5,0.5]});
rs.qspa0.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

rs.qspa1 = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa1.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa1.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.4,0.6]});
rs.qspa1.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.4,0.6]});
rs.qspa1.push({Case:6,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.4,0.6]});
rs.qspa1.push({Case:7,pcs:[0.4,1.4,2.6,3.4]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});


rs.qspa2 = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa2.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa2.push({Case:4,vertexNum:0,pcs:[0.3,1.3,2.7,3.3],frs:[.3,0.7]});
rs.qspa2.push({Case:6,vertexNum:0,pcs:[0.3,1.4,2.7,3.3],frs:[.3,0.7]});
rs.qspa2.push({Case:7,pcs:[0.3,1.3,2.7,3.3]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

rs.qspa3 = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa3.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa3.push({Case:4,vertexNum:0,pcs:[0.2,1.2,2.9,3.2],frs:[.2,0.8]});
rs.qspa3.push({Case:6,vertexNum:0,pcs:[0.2,1.2,2.8,3.2],frs:[.8,0.8]});
rs.qspa3.push({Case:7,pcs:[0.2,1.2,2.8,3.2]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

*/
let whereSum = function (wh) {
  let ws = 0;
  wh.forEach((v) => {
    debugger;
    let wnum = v[0].substring(1);
    let n = Number(wnum);
    ws=ws+n;
});
   return ws;
}

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
  let ws = this.whereString(where);
  let wsum = whereSum(where);
  
  let lev = where.length;
  let qp;
  if (lev === 0) {
    qp = {Case:7,pcs:[0.5,1.5,2.5,3.5]}
  } else {
    let idx = Math.floor(4*Math.random());
    //qp = theQps[lev%4];
    debugger;
    qp = theQps[wsum];
  //  qp = byWhere[ws];
   }
   return qp;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


