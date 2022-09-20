

import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();
rs.setName('part_0_D_9');
rs.partParams.rectangular = 1;
rs.partParams.levels = 1;
let wd = rs.width;
//let dir = 0.25*Math.PI;
//et c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
//rs.partParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,fr0:.3,fr1:.4,fr2:0.5,fr3:0.6}};
rs.quadSplitParams = {Case:3,fr0:.4,fr1:.4,fr2:0.4,fr3:0.4,fr4:0.7,fr5:0.3,p4stop:0};
rs.triSplitParams = {Case:1,vertexNum:0,fr0:0.3,fr1:0.3};
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length;
  let rs = (ln === 3)?this.triSplitParams:this.quadSplitParams;
  let lev = prt.where.length;
  console.log('lev',lev,'len',ln);
  if ((lev === 1)&&(ln === 3)) {
    debugger;
  }
  return rs;
}
//rs.computeExponentials(strokeWidths,10,0.05,.9);

rs.partSplitParamss = function (qd) {
  
   return {Case:3,fr0:.4,fr1:.4,fr2:0.4,fr3:0.4,fr4:0.7,fr5:0.3};
}

//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitialize = function () {
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  this.addT('fr',1,Point.mk(8*ff-hwd,-(hwd+ff)));
  this.addT('Case',3,Point.mk(0*ff,-(hwd+3*ff)));
 // this.addT('P',1,Point.mk(3*ff-hwd,-5*ff));
  this.addT('fr',3,Point.mk(1.50*ff,hwd+ff));
  //this.addT('fr',4,Point.mk(4.0*ff,-2*ff));
  this.addT('fr',0,Point.mk(-(hwd+1.5*ff),1.8*ff));
  //this.addT('fr',5,Point.mk(-4*ff,1.8*ff));
 // this.addT('P',0,Point.mk(-8*ff,hwd-4.5*ff));
 // this.addT('P',3,Point.mk(8*ff,hwd-4.5*ff));
  //this.addT('fr',3,Point.mk(-5*ff,-0.0*ff));
  //this.addT('fr',5,Point.mk(0*ff,1*ff));
  //this.addT('P',2,Point.mk(8*ff,-5*ff));
  //this.addT('P',4,Point.mk(0*ff,0*ff));
  this.addT('fr',2,Point.mk(hwd+1.5*ff,-2*ff));
}

export {rs};

      

