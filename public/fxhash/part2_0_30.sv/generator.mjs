debugger;
console.log('importing part2_0.mjs');
//let rs = function (mods,item) {
let rs = function (item,mods) {
debugger;
let {addBasis,addPartMethods,addPart2_0Methods} = mods;
//import {rs as generatorP} from './generators/part2_0.mjs';

//let rs = core.vars.generatorP.instantiate();
//let rs = generatorP.instantiate();
addBasis(item,mods);
addPartMethods(item,mods);
addPart2_0Methods(item,mods);
item.setName('part2_0_2');
let levels = 8;
levels = 6;
levels = 4;
item.partParams.levels = levels;
item.partParams.rectangular = 1;
//item.partParams.displayProbability = .2;

item.qspa = [];
//let eps = .1+Math.floor(Math.random()*4)*.1;
let eps = .1+Math.floor(fxrand()*4)*.1;
//let eps1 = .1+Math.floor(Math.random()*4)*.1;
let eps1 = .1+Math.floor(fxrand()*4)*.1;
console.log('eps',eps,'eps1',eps1);
//item.qspa.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
item.qspa.push({Case:4,vertexNum:0,pcs:[.5-eps,1.5-eps,2.5+0.5*eps,3.5-eps],frs:[.3,0.6]});
item.qspa.push({Case:6,vertexNum:0,pcs:[0.5-eps1,1.5-eps1,2.5+.5*eps1,3.5-eps1],frs:[.3,0.6]});
item.qspa.push({Case:7,pcs:[0.4,1.4,2.6,3.4]});

item.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

item.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  //let wp = Math.floor(Math.random()*3);
  let lev = prt.where.length;
  let wp = lev%3;
  let qsp = this.qspa[wp];

  let item = (ln === 3)?this.triSplitParams1:qsp;
  return item;
}

let visibles = item.partParams.visibles = [];
item.addToArray(visibles,1,20);

let strokeWidths = item.partParams.strokeWidths = [];
item.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

}
//item.addToArray(strokeWidths,.1,levels);
export {rs};


