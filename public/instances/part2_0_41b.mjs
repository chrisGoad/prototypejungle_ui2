
import {rs as generatorP} from '/instances/part2_0_41.mjs';

let rs = generatorP.instantiate();

debugger;
rs.setName('part2_0_41b');
let levels = 5;
//levels = 4;
//levels = 1;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.partParams.stroke = 'white';
rs.quadCases = [10]; 

rs.qcMap = rs.buildWhereMap({},rs.qcRandomVal);

rs.numSteps = 300;
rs.saveAnimation = 1;

export {rs};