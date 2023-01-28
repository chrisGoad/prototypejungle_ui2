import {rs as generatorP} from '/generators/path_avoidance_6.mjs';

let rs = generatorP.instantiate();

rs.setName('path_avoidance_6_0');


let ht = rs.ht= 400;
debugger;
rs.setTopParams();

let vel=rs.vel=2;
rs.numSteps = 2.4*Math.floor(ht/vel);
rs.numSteps = 2*Math.floor(ht/vel);
let cycleTime = rs.cycleTime = Math.floor(rs.ht/vel); 
rs.numSteps = cycleTime+1;
rs.numSteps = 2*cycleTime;
rs.chopOffBeginning =0;
rs.saveAnimation = 1;

export {rs};


