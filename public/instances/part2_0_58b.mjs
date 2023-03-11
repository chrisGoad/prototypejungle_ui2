
import {rs as generatorP} from '/instances/part2_0_58.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_58b');

let levels = 9;
levels = 1;
//levels = 7;
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
    let rcolor = `rgb(${r},${g},${b})`;
    af[wn] = rcolor;
    //af[wn] = 'transparent';
  });
  this.colors = af;
  debugger;
}

rs.partStroke = function () {
 return 'white';
}

rs.computeFills();



rs.duration = 20;//duration of one path
rs.pauseDuration = 4;
rs.numCycles = 8;
rs.saveAnimation = 1;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.saveAnimation = 1;

for (let i=0;i<4;i++) {
  rs.addPath('q',i);
}
for (let i=0;i<4;i++) {
  rs.addPath('o',i);
}

for (let i=0;i<2;i++) {
  rs.addPath('t',i);
}
debugger;

rs.buildSeqOb = function () {
  let {pstate,numCycles} = this;
  let {pspace} = pstate;
  let props = Object.getOwnPropertyNames(pspace);
  return this.randomSeqOb({props,lb:-0.4,ub:0.4,numCycles:numCycles-1});
}


rs.loopingSeqOb(rs.buildSeqOb);

rs.updateState();

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


