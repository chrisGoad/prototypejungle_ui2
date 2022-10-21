debugger;
import {rs as generatorP} from './generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_2');
let levels = 8;
levels = 7;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

rs.qspa = [];
let eps = Math.floor(Math.random()*5)*.05;
//rs.qspa.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
rs.qspa.push({Case:4,vertexNum:0,pcs:[.5-eps,1.5-eps,2.5+0.5*eps,3.5-eps],frs:[.3,0.6]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.5-eps,1.5-eps,2.5+.5*eps,3.5-eps],frs:[.3,0.6]});
rs.qspa.push({Case:7,pcs:[0.4,1.4,2.6,3.4]});

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  //let wp = Math.floor(Math.random()*3);
  let lev = prt.where.length;
  let wp = lev%3;
  let qsp = this.qspa[wp];

  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


