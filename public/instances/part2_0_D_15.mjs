
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_15');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:13,frs:[0.5]};

rs.afterInitialize =function ()  {
debugger;
  this.displayTitle('Part2 Q C 13 C 0');
}

export {rs};


