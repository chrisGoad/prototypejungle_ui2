import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_3');
let levels = 9;
//levels = 8;

rs.partParams.levels = levels;
rs.partParams.rectangular = 0;

rs.qspa = [];
let stops0 = [0,1,0,0];
stops0 = [];
let stops1 = [2];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,stops:stops0});
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.3,pc1:1.3,pc2:2.7,pc3:3.3,stops:stops0});
rs.qspa.push({Case:3,vertexNum:0,pc0:0.45,pc1:1.45,pc2:2.55,pc3:3.45,stops:stops0});
rs.qspa.push({Case:4,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,fr0:.3,fr1:0.6,stops:stops0});
rs.qspa.push({Case:6,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,fr0:.3,fr1:0.6,stops:stops0});
rs.qspa.push({Case:7,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,stops:stops0});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,stops:stops[0]});

rs.triSplitParams1 = {Case:1,vertexNum:0,pc0:0.3,pc1:1.3,stopss:stops0};
rs.wps = [0,0,0,2,3,2,3,2,3,2];
rs.wps = [0,0,0,1,3,1,3,1,3,1];
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*4);
      let lev = prt.where.length;
  wp = this.wps[lev];
  //wp = lev%3;
  let qsp = this.qspa[wp];
  let tsp = this.triSplitParams1;
  //tsp = null;
  let rs = (ln === 3)?tsp:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,20,0.4,.7);

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};

