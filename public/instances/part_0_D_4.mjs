

import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();
rs.setName('part_0_D_4');
rs.partParams.rectangular = 1;
//rs.partParams.levels = 1;
let wd = rs.width;
let dir = 0.25*Math.PI;
let c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
//rs.partParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,fr0:.3,fr1:.4,fr2:0.5,fr3:0.6}};
//rs.quadParams = {chance:1,levels:levels,polygonal:1};
//let strokeWidths = rs.quadParams.strokeWidths = [];*/

//rs.computeExponentials(strokeWidths,10,0.05,.9);

rs.partSplitParams = function (qd) {
  debugger;
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.minDimension();
  let rd = 0.25*Math.PI;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*.2));
   return {center:rp,fr0:.6,fr1:.3,fr2:0.4,fr3:0.5};
}

//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitialize = function () {
 debugger;
  let {textP} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('fr',1,Point.mk(6*ff-hwd,-(hwd+ff)));
  addT('Q',0,Point.mk(3*ff-hwd,-5*ff));
  addT('fr',3,Point.mk(0.0*ff,hwd+ff));
  addT('fr',0,Point.mk(-(hwd+1.5*ff),-2*ff));
  addT('Q',2,Point.mk(-5*ff,hwd-5.5*ff));
  addT('Q',3,Point.mk(5*ff,hwd-5.5*ff));
  //addT('fr',3,Point.mk(-5*ff,-0.0*ff));
  //addT('fr',5,Point.mk(0*ff,1*ff));
  addT('Q',1,Point.mk(4*ff,-5*ff));
  addT('fr',2,Point.mk(hwd+1.5*ff,-2*ff));
}

export {rs};

      

