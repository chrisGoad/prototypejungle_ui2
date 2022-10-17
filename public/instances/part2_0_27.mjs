
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_27');
let levels = 10;
levels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;
//let qsp = {Case:13,frs:[0.5]}

rs.qspa = [];
rs.qspa.push({Case:13,frs:[0.5]});
//rs.qspa.push({Case:13,frs:[0.2,0.4,0.6,0.7]});
//rs.qspa.push( {Case:7,pcs:[.4,1.4,2.4,3.4]});
rs.qspa.push( {Case:7,pcs:[.5,1.5,2.5,3.5]});

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
 // if (Math.random()  < 0.1) {
  if (0) {
    return;
  }
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*3);
      let lev = prt.where.length;
  wp = lev%3;
 let qsp = this.qspa[wp===1?1:0];

  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


