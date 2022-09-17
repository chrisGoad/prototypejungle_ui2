
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_22');
let levels = 7;
rs.partParams.levels = levels;
let w0 = {where:[[0,0,0],[0,0,1],[0,0,0]]};
console.log('w',w0,'lv',rs.levelOf(w0));
rs.partParams.rectangular = 1;
rs.splitParams = {ornt:'h',	fr0:0.5,fr1:0.5,fr2:0.5};
rs.partSplitParams = function (qd) {
  let sp = this.splitParams;
  
  let {where} = qd;
  console.log('where',where);
  let wln = where.length;
  let stop;
  if (wln >1) {
   let wh0 = where[wln-2][0];
   let wh1 = where[wln-2][0];
   console.log('wh0',wh0,'wh1',wh1);
   if (wh0 === 'P0')  {
     return;
   }
  }
 
  let rrs = this.quad2part(sp);
 // rrs.P0.stop = stop;
 // rrs.P1.stop = stop;
  return rrs;
}

let strokeWidths = rs.partParams.strokeWidths = []
rs.computeExponentials(strokeWidths,20,0.15,1);
rs.partManglee = function (qd) {
  let {width:wd} = this;
 let lvln = qd.where.length;
 let h = qd.where[lvln - 1];
  let lv = this.levelOf(qd);
 // console.log('lv',lv,'lvln',lvln)
  let rs;
  if (1 || (0 &&(lv ===levels) && !h[2]) || ((lv = levels+1) && h[2])) {
    debugger;
    //et cx = qd.rectangle.corner.x;
    let cx = qd.polygon.left();
    let fr0 = Math.sqrt((cx + 0.5*wd)/wd);
    let lengthen  = 1 - fr0;
   // lengthen = 0.2;
    let twist = fr0*.05*Math.PI
        console.log('lv',lv,'cx',cx,'fr0',fr0,'lengthen',lengthen,'twist',twist);

    rs = {lengthen,twist};
  } else {
    rs = {lengthen:1,twist:0}
  }
  return rs;
}
	

rs.partVisible = function (prt) {
  return 1;
  let lv = this.levelOf(prt);
  let levels = this.partParams.levels;
  return (lv === levels) && this.isInner(prt);
}
/*
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels);
rs.addToArray(visibles,1,20);
*/

export {rs};


