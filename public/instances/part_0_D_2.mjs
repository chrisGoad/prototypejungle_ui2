
import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_D_2');

rs.partParams.rectangular = 0;
rs.partParams.levels = 1;
let stops = 0;
let stops2 = 0;
rs.partParams.splitParams ={Case:2,vertexNum:0,fr0:0.2,fr1:0.8,fr2:0.5,fr3:0.5,p0stop:stops2,p1stop:stops,p2stop:stops,p3stop:stops};
let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,20,.4,.5);
rs.afterInitialize =function ()  {
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  this.addT('Case',2,Point.mk(0*ff,-(hwd+3*ff)));

  //this.addT('P',1,Point.mk(2*ff,hwd-5.5*ff));
  //this.addT('P',4,Point.mk(-4*ff,hwd-7.5*ff));
  //this.addT('P',0,Point.mk(-0*ff,-7.5*ff));
  this.addT('fr',2,Point.mk(-6.5*ff,-0*ff));
  this.addT('fr',3,Point.mk(6.5*ff,-0*ff));
  this.addT('fr',0,Point.mk(6*ff,11*ff));
  this.addT('fr',1,Point.mk(-6*ff,11*ff));
  //this.addT('P',3,Point.mk(-8*ff,8.5*ff));
 // this.addT('fr',1,Point.mk(8*ff,hwd+1*ff));
}

export {rs};


