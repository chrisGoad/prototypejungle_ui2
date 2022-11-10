
import {rs as generatorP} from '/instances/part2_0_D.mjs';
//import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_5');

rs.partParams.rectangular = 1;
rs.partParams.levels = 1;
let sp = rs.partParams.splitParams = {Case:8,pcs:[.4,1.4,2.4]};
//let sp = rs.partParams.splitParams = {Case:8,pcs:[.5,1.5,2.6]};

rs.afterInitialize =function ()  {
  let ff = (this.width)*0.05;
    let topP = this.shapes[0].fromGeom;

  this.displayTitle('Partition 9');
  this.displayPc(0);
  this.displayPc(1);
 // let n2 = topP.pc2point(2+(1-sp.pc0));
 // this.addT('pcccc',2,n2);
  this.displayPc(2);
  //this.displayPc(3);
 // this.addT('fr',5,Point.mk(-4*ff,1.8*ff));
 // this.addT('fr',4,Point.mk(4.0*ff,-2*ff));


}

export {rs};


