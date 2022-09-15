
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_15');
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.splitParams = {ornt:'h',	fr0:0.5,fr1:0.5,fr2:0.2};
rs.partSplitParams = function (qd) {
  rs = this.splitParams;
  return this.quad2part(rs);
}
rs.partMangle = function (qd) {
  let {width:wd} = this;
  let lv = qd.where.length;
  let rs;
  if (0 || (lv ===levels)) {
    debugger;
    //et cx = qd.rectangle.corner.x;
    let cx = qd.polygon.left();
    let fr0 = Math.sqrt((cx + 0.5*wd)/wd);
    let lengthen  = 1 - 1*fr0;
    let twist = fr0*.05*Math.PI
        console.log('lv',lv,'cx',cx,'fr0',fr0,'lengthen',lengthen,'twist',twist);

    rs = {lengthen,twist};
  } else {
    rs = {lengthen:1,twist:0}
  }
  return rs;
}


let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,20);

export {rs};


