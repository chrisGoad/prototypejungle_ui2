
import {rs as generatorP} from '/instances/part2_0_49.mjs';

import {rs as basicP} from '/generators/basics.mjs';

let rs = basicP.instantiate();
let a= generatorP.instantiate();
let b=generatorP.instantiate();
let c=generatorP.instantiate();
//let rs = containerShape.mk();
rs.setName('part2_0_49c');

let levels = 9;
let numSteps =  100;
let numISteps = 0;
levels = 2;
//levels = 3;
//topLevels = 6;

rs.initialize = function () {

  a.partParams.levels = 1;
  b.partParams.levels = 2;
  c.partParams.levels = 3;
  a.saveAnimation = 1;
  b.saveAnimation = 0;
  c.saveAnimation = 0;
  a.numSteps = b.numSteps = c.numSteps = numSteps;
  a.numISteps = b.numISteps = c.numISteps = numISteps;
  let dim = 150;
  this.set('a',a);
  this.set('b',b);
  this.set('c',c);
  a.moveto(Point.mk(-dim,0));
  c.moveto(Point.mk(dim,0));
  debugger;
  a.initialize();
  b.initialize();
  c.initialize();
}

rs.oneStep = function (bvl) {
  a.oneStep(bvl);
  b.oneStep(bvl);
  c.oneStep(bvl);
}
 
export {rs};


