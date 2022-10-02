
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_13');
let levels = 10;
levels = 8;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

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

rs.partSplitParams = function (prt) {
  let {polygon:pgon} = prt;
  let {qspa0,qspa1,qspa2,qspa3} = this;
  let cnt = pgon.center();
  let inQ0 = (cnt.x < 0) && (cnt.y < 0);
  let inQ1 = (cnt.x > 0) && (cnt.y < 0);
  let inQ2 = (cnt.x < 0) && (cnt.y > 0);
  let inQ3 = (cnt.x > 0) && (cnt.y > 0);
  let ln = pgon.corners.length;
  let lev = prt.where.length;
  let qsp;
  if (lev === 0) {
    qsp = qspa0[0];
  } else {
    let wp = (lev % 3)+1;
    if (inQ0) {
       qsp = qspa0[wp];
    } else if (inQ1) {
       qsp = qspa1[wp];
    } else if (inQ2) {
       qsp = qspa2[wp];
    } else {
       qsp = qspa3[wp];
    }
  }
  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


