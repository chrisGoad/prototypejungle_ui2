
import {rs as generatorP} from '/instances/part2_0_49.mjs';

import {rs as basicP} from '/generators/basics.mjs';

let rs = basicP.instantiate();
let a= generatorP.instantiate();
let b=generatorP.instantiate();
let c=generatorP.instantiate();
let d=generatorP.instantiate();
//let rs = containerShape.mk();
rs.setName('part2_0_49c');

let levels = 9;
let numSteps =  200;
let numISteps = 20;
levels = 2;
//levels = 3;
//topLevels = 6;

rs.initialize = function () {

  a.partParams.levels = 1;
  b.partParams.levels = 2;
  c.partParams.levels = 3;
  d.partParams.levels = 4;
  a.saveAnimation = 0;
  b.saveAnimation = 0;
  c.saveAnimation = 0;
  d.saveAnimation = 0;
  d.chopOffEnd = 100;
  a.numSteps = b.numSteps = c.numSteps = d.numSteps = numSteps;
  a.numISteps = b.numISteps = c.numISteps = d.numIsteps =numISteps;
  let dim = 80;
  this.set('a',a);
  this.set('b',b);
  this.set('c',c);
  this.set('d',d);
  a.moveto(Point.mk(-dim,-dim));
  b.moveto(Point.mk(dim,-dim));
  c.moveto(Point.mk(-dim,dim));
  d.moveto(Point.mk(dim,dim));
  debugger;
  d.initialize();
  b.initialize();
  c.initialize();
  a.initialize();
}

rs.oneStep = function (bvl) {
  a.oneStep(bvl);
  b.oneStep(bvl);
  c.oneStep(bvl);
  d.oneStep(bvl);
}
 
export {rs};


