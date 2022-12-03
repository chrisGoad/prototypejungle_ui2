
import {rs as generatorP} from '/instances/part2_0_49.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_49b');

let levels = 9;
levels = 2;
//levels = 3;
//topLevels = 6;

rs.partParams.levels = levels;
rs.computeFills = function () {
  const rshade =() => Math.floor(Math.random()*255);
  let aw = this.allWheres(this.partParams.levels,5);
  let af = {};
  
  aw.forEach((w) => {
    let r = rshade();
    let g = rshade();
    let b = rshade();
    let wn = w[0];
    let rcolor = `rgb(${r},${r},${r})`;
    af[wn] = rcolor;
  });
  this.colors = af;
  debugger;
}

rs.computeFills();




rs.saveAnimation = 1;
rs.numSteps = 500;
rs.numISteps = 60;


  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


