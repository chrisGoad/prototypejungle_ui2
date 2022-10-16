
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_18');

rs.partParams.levels =8;// 8;
rs.partParams.rectangular = 1;
let qsp = {Case:11,pcs:[.6,1.5,2.4],stops:[0,0,0,0]};
let tsp = {Case:2,vertexNum:0,pcs:[.5,1.5,2.2,2.8],stops:[0,0,0,0]};
0
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  
  return (ln===3)?tsp:qsp;
}

rs.partFillL = function (prt) {
 return 'rgba(200,200,200,0.2)';
}

rs.afterDisplayCell = function (prt) {
  let crc = this.circleP.instantiate()
  crc.dimension = 0.5;
  crc.fill = 'white';
  this.shapes.push(crc);
}

rs.partStrokee = function (prt) {
 return Math.random()<0.5?'rgb(250,200,200)':'rgb(200,200,250)';
}
let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:.4,factor:.7});


export {rs};


