
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_4');
let levels = 10;
levels = 9;
levels = 4;


rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.4,1.4,2.6,3.4]};
rs.quadSplitParams = {Case:3,vertexNum:0,pcs:[0.5,1.5,2.5,3.5]};

rs.triSplitParams2 =  {Case:2,vertexNum:0,pcs:[0.2,1.8,2.5,3.5],stops:[1,0,1]};
let tsp = {Case:2,vertexNum:0,pcs:[.5,1.5,2.2,2.8],stops:[1,0,0,0]};

rs.partSplitParams = function (prt) {
//debugger;
  let ln = prt.polygon.corners.length;
  let rs;
  if (ln === 3) {
    //rs = this.triSplitParams2;
    rs = tsp;
  } else {
    rs =Object.assign({},this.quadSplitParams);
    let v = .0;//0.0*Math.random();
    rs.pcs[2] = 2.5+v;
    rs.pcs[3] = 3.5-v;
  }
 // let rs = (ln === 3)?(Math.random()<0.7?this.triSplitParams1:this.triSplitParams2):this.quadSplitParams
  //let rs = (ln === 3)?null:this.quadSplitParams
  //let lev = prt.where.length;
 //rs. vertexNum = lev%2; 
  return rs;
}

rs.partFill = function (prt) {
  let ln = prt.polygon.corners.length;
  return (ln===3)?'rgba(250,0,0,.2)':'rgba(0,0,250,.2)';
  
  let lev = prt.where.length;
  let rs;
  if (0 && (lev>(levels-2))&&(ln === 4 )) {
    let v = Math.floor(Math.random()*250);
   // rs = Math.random()<0.5?'rgb(0,0,250)':'rgb(250,0,0)';
    rs = Math.random()<0.5?`rgb(0,0,${v})`:`rgb(${v},0,0)`;
    console.log('fill',rs);
  }
  
  return rs;
}

//let visibles = rs.partParams.visibles = [0,0,0,1,0,0,0];
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);
//rs.addToArray(visibles,1,levels);
//let lengthenings = rs.lengthenings = [];
//s.addToArray(lengthenings,.5,levels);
//let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
//rs.addToArray(twists,0.05*Math.PI,levels);
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
rs.computeExponentials({dest:strokeWidths,n:20,factor:0.7,root:.9});
rs.partStrokeWidth = function (prt) {
  let quadp = 1;
  let lev = prt.where.length;
  //let levHigh = lev > 7;
  let levHigh = lev > 70;
  let pln = prt.polygon.corners.length;
  let quad = pln === 4;
  let prnt = prt.parent;
  if (prnt) {
  //  debugger;
    let  pln = prnt.polygon.corners.length;
    quadp = pln === 4;
  }
  //let rs = (((quad&&quadp)|| levHigh)?1:.1)*strokeWidths[lev];
  //let rs = (((quad&&quadp)|| levHigh)?1:.01)*strokeWidths[lev];
  let rs = (((quad&&quadp)|| levHigh)?1:1)*strokeWidths[lev];
  console.log('lev',lev,'quad',quad,'rs',rs);
  return rs;
}
  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


