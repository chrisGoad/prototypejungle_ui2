

import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_0_1');

let wd = 100;
let levels = 8;

rs.quadParams.levels = levels;
let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,20,0.1,.8);
//rs.quadParams.mangle = {'lengthen':.2,'twist':0.0*Math.PI};

rs.quadSplitParams = function (qd) {
  let lv = qd.where.length;
  let cquad = !(lv%2);
  if (cquad) {
    let dir;
    if (0 && this.cdir) {
      dir = this.cdir;
    }
    let pgon = qd.polygon;
    let c = pgon.center();
    let d = pgon.minDimension();
    //let rd = 0.25*Math.PI;
    dir = Math.random() * Math.PI;
    let rp = c.plus(Point.mk(Math.cos(dir),Math.sin(dir)).times(d*0.2));
    let crs = {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
    this.cdir = dir;
    return crs;
  }
  if (0 && this.qdp) {
    return this.qdp;
  }
  let v = {low:.3,high:.7};
  let prs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});

  this.qdp = prs;
  return prs;
}

export {rs};

      

