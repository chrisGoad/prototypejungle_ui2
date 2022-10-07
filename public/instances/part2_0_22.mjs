
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_22');
debugger;
let levels = 7;
//levels = 8;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

const genPartP = function (d) {
  return {Case:3,pcs:[.5-d,1.5-d,2.5-d,3.5-d],frs:[.5-d,.5+d]};
}
let visibles = rs.partParams.visibles = [];
//rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
//rs.quadParams.mangle = {'lengthen':5,'twist':0.05*Math.PI};
let levSwitch = 2;
rs.partSplitParams = function (qd) {
  debugger;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let level = qd.where.length;
  let pgon = qd.polygon;
  let c = pgon.center();
  let dist = c.length();
  let fr = dist/(Math.SQRT2 * hwd);
  if  (0 && (level <= levSwitch)) {
    return genPartP(0);
  }
  return genPartP(0.2*fr);

}

rs.adjustProtos = function () {
  this.polygonP['stroke-width'] = 0.1;
}
export {rs};


