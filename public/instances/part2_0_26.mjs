
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_26');

rs.partParams.levels =7;// 8;
rs.partParams.rectangular = 1;
let eps = 0.05;
let tsp = {Case:2,pcs:[.5+eps,1.5+eps,2.25+eps,2.75+eps],stops:[0,0,0,0]};
let qsp = {Case:12,vertexNum:0,pcs:[.5+eps,1.5+eps,2.5+eps,3.5+eps],stops:[0,0,0,0]};

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


