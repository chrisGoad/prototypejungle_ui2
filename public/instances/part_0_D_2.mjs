
import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_D_2');

rs.partParams.rectangular = 0;
rs.splitParams = {Case:2,vertexNum:0,fr0:0.2,fr1:0.8,fr2:0.2,fr3:.8};
rs.splitParams ={Case:3,vertexNum:0,fr0:0.2,fr1:0.8,fr2:0.5,fr3:0.5}
rs.afterInitialize =function ()  {
debugger;
  let {textP,width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
    addT('Case ',2,Point.mk(0*ff,-(hwd+3*ff)));

  addT('P',1,Point.mk(2*ff,hwd-5.5*ff));
  addT('P',4,Point.mk(-4*ff,hwd-7.5*ff));
  addT('P',0,Point.mk(-0*ff,-7.5*ff));
  addT('fr',1,Point.mk(-3.5*ff,-6*ff));
  addT('fr',2,Point.mk(3.5*ff,-6*ff));
  addT('fr',0,Point.mk(-9.5*ff,6*ff));
  addT('fr',3,Point.mk(-6*ff,11*ff));
  addT('P',3,Point.mk(-8*ff,8.5*ff));
 // addT('fr',1,Point.mk(8*ff,hwd+1*ff));
}

export {rs};


