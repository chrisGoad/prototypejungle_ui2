
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_2');
let levels = 10;
levels = 8;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

rs.qspa = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa.push({Case:4,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,fr0:.3,fr1:0.6});
rs.qspa.push({Case:6,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,fr0:.3,fr1:0.6});
rs.qspa.push({Case:7,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

rs.triSplitParams1 = {Case:1,vertexNum:0,pc0:0.3,pc1:1.3};

rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*3);
      let lev = prt.where.length;
  wp = lev%3;
  let qsp = this.qspa[wp];

  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,20,0.4,.7);

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


