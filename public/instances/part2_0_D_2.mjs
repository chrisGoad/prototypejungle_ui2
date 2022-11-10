
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_2');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:4,pcs:[.4,1.4,2.4,3.4],frs:[0.3,0.7]};

rs.afterInitialize =function ()  {
  let ff = (this.width)*0.05;
  this.displayTitle('Partition 5');
  this.displayPc(0);
  this.displayPc(1);
  this.displayPc(2);
  this.displayPc(3);
  debugger;
  this.addT('fr',4,Point.mk(-4*ff,1.8*ff));
  this.addT('fr',5,Point.mk(4.0*ff,-2*ff));


}

export {rs};


