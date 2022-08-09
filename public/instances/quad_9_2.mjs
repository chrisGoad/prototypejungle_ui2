
import {rs as generatorP} from '/generators/quad_9.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_9_2');
let levels = 8;
rs.quadParams.levels = levels;
levels++;
rs.fr0 = 0.5;
rs.fr1 = 0.5;
rs.fr2 = 0.2;

let mangles = rs.mangles = [];
rs.addToArray(mangles,1,levels);

let visibles = rs.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);
let lengthenings = rs.lengthenings = [];
rs.addToArray(lengthenings,1.5,levels);
let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
rs.addToArray(twists,0.05*Math.PI,levels);


export {rs};


