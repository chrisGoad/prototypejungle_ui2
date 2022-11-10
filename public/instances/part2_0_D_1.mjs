
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_1');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:2,vertexNum:0,pcs:[0.6,2.2]};

rs.afterInitialize =function ()  {
  this.displayTitle('Partition 3');
  this.displayPc(0);
  this.displayPc(1);
}

export {rs};


