
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_7');

rs.partParams.rectangular = 0;
let sp = rs.partParams.splitParams = {Case:2,vertexNum:0,pcs:[.4,1.4,2.2,2.4]};

rs.afterInitialize =function ()  {
  let ff = (this.width)*0.05;
    let topP = this.shapes[0].fromGeom;

  this.displayTitle('Partition 2');
  this.displayPc(0,Point.mk(-2,-0));
  this.displayPc(1,Point.mk(7,-0));
 // let n2 = topP.pc2point(2+(1-sp.pc0));
 // this.addT('pcccc',2,n2);
  this.displayPc(2,Point.mk(-6,4));
  this.displayPc(3,Point.mk(-6,4));
 // this.addT('fr',5,Point.mk(-4*ff,1.8*ff));
 // this.addT('fr',4,Point.mk(4.0*ff,-2*ff));


}

export {rs};


