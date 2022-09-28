

import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();
rs.setName('part2_0_9');

let wd = 100;
let levels = 8;
//levels = 4;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.1,factor:.8});
//rs.quadParams.mangle = {'lengthen':.2,'twist':0.0*Math.PI};

rs.partSplitParams = function (qd) {
  let lv = qd.where.length;
  let cquad = !(lv%2);
  if (cquad) {
    let dir;
    let pgon = qd.polygon;
    let c = pgon.center();
    let d = pgon.minDimension();
    //let rd = 0.25*Math.PI;
    dir = Math.random() * Math.PI;
    
    //let rp = c.plus(Point.mk(Math.cos(dir),Math.sin(dir)).times(d*0.2));
    ///let crs = {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
    let crs = {Case:9,direction:dir,radius:0.2,pcs:[.5,1.5,2.5,3.5]};
    this.cdir = dir;
    return crs;
  }
  let v0 = {low:.3,high:.7}
  let v1 = {low:1.3,high:1.7}
  let v2 = {low:2.3,high:2.7}
  let v3 = {low:3.3,high:3.7}
  let pcs = this.randomizeArrayFrom([v0,v1,v2,v3]);
  let frs = this.randomizeArrayFrom([v0,v0]);
  let Case = Math.random()<0.5?4:6;
  let sp = {Case,pcs,frs};
  this.qdp = sp;
  return sp;
}

export {rs};

      

