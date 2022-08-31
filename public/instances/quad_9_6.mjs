
import {rs as generatorP} from '/generators/quad_9.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_9_6');
let levels = 7;
rs.quadParams.levels = levels;
//levels++;
rs.splitParams = {ornt:'h',	fr0:0.5,fr1:0.5,fr2:0.5};
rs.quadSplitParams = function (qd) {
  let {width:wd} = this;
  let lv = qd.where.length;
  let rs;
  if (1 || (lv ===(levels-1))) {
    debugger;
   // let cx = qd.rectangle.corner.x;
    let cx = qd.polygon.left();
    let fr0 = Math.sqrt((cx + 0.5*wd)/wd);
    let fr2 = 0.5 - 0.4*fr0;
        console.log('lv',lv,'cx',cx,'fr0',fr0,'fr2',fr2);

   let ornt = Math.random() < 0.5?'h':'v'; 
    rs = {ornt,fr0:0.5,fr1:0.5,fr2};
  } else {
    rs = this.splitParams;
  }
  return rs;
}
rs.quadParams.mangle = {lengthen:.25,twist:.05*Math.PI}


let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,levels);

export {rs};


