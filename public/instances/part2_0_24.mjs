
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_24');
let levels = 8;
levels = 7;
levels = 5;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

const genPartP = function (d) {
  //let d = id+0.1*(Math.random()-.5);
  return {Case:3,pcs:[.5-d,1.5-d,2.5-d,3.5-d],frs:[.5-d,.5+d]};
}

let triPartP = {Case:2,pcs:[.5,1.5,2.3,2.7]};
let visibles = rs.partParams.visibles = [];
//rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});
//rs.quadParams.mangle = {'lengthen':5,'twist':0.05*Math.PI};
let levSwitch = 2;
rs.partStroke = function (prt) {
   let where = prt.where;
   debugger;
   let qd = prt.polygon.corners.length === 4;
   let mid = this.allValuesEqual(where,'P0');
   let tri = prt.where.length === 4;
  return qd?'white':'blue';
}
rs.partStrokeWidth = function (prt) {
   let where = prt.where;
   let qd = prt.polygon.corners.length === 4;
   debugger;
   let mid = this.allValuesEqual(where,'P0');
   let tri = prt.where.length === 4;
  return qd?.2:.1;
}
rs.partFilll = function (prt) {
  //debugger
  let qd = prt.polygon.corners.length === 4;
  if (qd) {
     let levs = prt.where.length;
     if (levs === 0) {
       return 'rgba(250,0,0,0.2)';
     } else if (levs === levels) {
        return 'rgba(250,250,0,1)';
     } else {

       if (levs%2) {
         return 'rgba(0,0,250,0.5)';
       } else {
         return 'rgba(250,0,0,0.5)';
       }
     }
  }
  return 'rgba(0,0,0,0)';
}
rs.partSplitParams = function (prt) {
  //debugger;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let level = prt.where.length;
  let pgon = prt.polygon;
  let tri = pgon.corners.length === 3;
  if (tri) {
    return triPartP;
  }
  let c = pgon.center();
  let dist = c.length();
  let fr = dist/(Math.SQRT2 * hwd);
  return genPartP(0);
  return genPartP(0.2*fr);

}

rs.adjustProtos = function () {
  this.polygonP['stroke-width'] = 0.1;
}
export {rs};


