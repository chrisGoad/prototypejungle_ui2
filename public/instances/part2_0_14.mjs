
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_14');
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//levels++;
rs.splitParams = {Case:7,	pcs:[0.5,0.5,0.5]};
rs.partSplitParams = function (qd) {
  let {width:wd} = this;
  let lv = qd.where.length;
  let rs;
  if (1 || (lv ===(levels-1))) {
    debugger;
   // let cx = qd.rectangle.corner.x;
    let cx = qd.polygon.left();
    let pc0 = Math.sqrt((cx + 0.5*wd)/wd);
    let pc2 = 0.5 - 0.4*pc0;
        console.log('lv',lv,'cx',cx,'pc0',pc0,'pc2',pc2);

   let ornt = Math.random() < 0.5?7:8; 
    rs = {Case:ornt,pc0:0.5,pc1:1.5,pc2:2+pc2,pc3:3+pc2};
  } else {
    rs = this.splitParams;
  }
  return rs;
}
rs.partParams.mangle = {lengthen:.25,twist:.05*Math.PI}


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,50);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,20);

export {rs};


