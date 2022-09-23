
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_2');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:4,vertexNum:0,pc0:.2,pc1:1.2,pc2:2.2,pc3:3.2,fr0:.3,fr1:.4};

rs.afterInitialize =function ()  {
  this.displayTitle('Part2 Q C 1 C 0');
  this.displayPc(0);
  this.displayPc(1);
  this.displayPc(2);
  this.displayPc(3);
}

export {rs};


