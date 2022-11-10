

import {rs as generatorP} from '/instances/part2_0_D.mjs';
//import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();
rs.setName('part2_0_D_11');
rs.partParams.rectangular = 1;
rs.partParams.levels = 1;
let wd = rs.width;
let dir = 0.25*Math.PI;
let c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
//rs.partParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,fr0:.3,fr1:.4,fr2:0.5,fr3:0.6}};
//rs.quadParams = {chance:1,levels:levels,polygonal:1};
//let strokeWidths = rs.partParams.strokeWidths = [];

//rs.computeExponentials(strokeWidths,10,0.05,.9);

rs.partParams.splitParams =  {Case:5,pcs:[.4,1.4,2.4,3.4],frs:[0.3,0.7]};
rs.partSplitParamss = function (qd) {
  
   return {Case:5,pcs:[.4,1.4,2.4,3.4],frs:[0.3,0.7]};
}

//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitialize = function () {
  debugger;
   let ff = (this.width)*0.05;
  this.displayTitle('Partition 7');
  this.displayPc(0);
  this.displayPc(1);
  this.displayPc(2);
  this.displayPc(3);
  this.addT('fr',5,Point.mk(-4*ff,1.8*ff));
  this.addT('fr',4,Point.mk(4.0*ff,-2*ff));
}

export {rs};

      

