
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_4');
let levels = 10;
levels = 9;
//levels = 3;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.quadSplitParams = {Case:3,vertexNum:0,fr0:0.4,fr1:0.4,fr2:.6,fr3:0.4};
rs.triSplitParams2 =  {Case:2,vertexNum:1,fr0:0.2,fr1:0.8,fr2:0.5,fr3:0.5,p1stop:1,p2stop:1,p3stop:10};
rs.partSplitParams = function (prt) {
//debugger;
  let ln = prt.polygon.corners.length;
  let rs;
  if (ln === 3) {
    rs = this.triSplitParams2;
  } else {
    rs =Object.assign({},this.quadSplitParams);
    let v = .0;//0.0*Math.random();
    rs.fr2 = 0.5+v;
    rs.fr3 = 0.5-v;
  }
 // let rs = (ln === 3)?(Math.random()<0.7?this.triSplitParams1:this.triSplitParams2):this.quadSplitParams
  //let rs = (ln === 3)?null:this.quadSplitParams
  //let lev = prt.where.length;
 //rs. vertexNum = lev%2; 
  return rs;
}

rs.partFill = function (prt) {
  let ln = prt.polygon.corners.length;
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
rs.computeExponentials({dest:strokeWidths,n:20,root:0.34,factor:.9});
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


