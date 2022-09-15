
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_14');
let levels = 6;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//levels++;
rs.splitParams = {ornt:'h',	fr0:0.5,fr1:0.5,fr2:0.5};
rs.partSplitParams = function (qd) {
  let {width:wd} = this;
  let lv = qd.where.length;
  let rs;
  if (1 || (lv ===(levels-1))) {
    debugger;
   // let cx = qd.rectangle.corner.x;
    let cx = qd.polygon.left();
    let fr0 = 0.2*Math.sqrt((cx + 0.5*wd)/wd);
    let fr2 = 0.5 - 0.4*fr0;
        console.log('lv',lv,'cx',cx,'fr0',fr0,'fr2',fr2);

   let ornt = Math.random() < 0.5?'h':'v'; 
    rs = {ornt,fr0:0.5,fr1:0.5,fr2};
  } else {
    rs = this.splitParams;
  }
  return this.quad2part(rs);
}
rs.partParams.mangle = {lengthen:.25,twist:.05*Math.PI}


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,50);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.1,20);

export {rs};


