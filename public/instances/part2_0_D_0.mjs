
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_0');

rs.partParams.rectangular = 0;
//rs.partParams.splitParams = {Case:1,vertexNum:3,pc0:0.6,pc1:1.3};
rs.partParams.splitParams = {Case:1,vertexNum:0,pcs:[0.6,1.3]};

rs.afterInitialize =function ()  {
debugger;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  
  this.displayTitle('Partition 1');
  this.displayPc(0,Point.mk(-1,-0));
  this.displayPc(1,Point.mk(7,-0));
 /* this.addT('Part2_T',1,Point.mk(0*ff,-(hwd+3*ff)));
  //this.addT('P',0,Point.mk(-1*ff,hwd-5.5*ff));
  //this.addT('P',1,Point.mk(-0*ff,-4.5*ff));
  this.addT('fr',1,Point.mk(4.5*ff,-4*ff));
  this.addT('fr',0,Point.mk(-5.5*ff,-2*ff));*/
}

export {rs};


