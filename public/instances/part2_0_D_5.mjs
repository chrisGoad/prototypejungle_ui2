
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_5');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:8,pcs:[.4,1.4,2.4]};

rs.afterInitialize =function ()  {
  let ff = (this.width)*0.05;
    let topP = this.shapes[0].fromGeom;

  this.displayTitle('Part2 Q C 8 C 0');
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


