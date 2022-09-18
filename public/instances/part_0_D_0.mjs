
import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_D_0');

rs.partParams.rectangular = 0;
rs.splitParams = {Case:1,vertexNum:0,fr0:0.6,fr1:.3};

rs.afterInitialize =function ()  {
debugger;
  let {textP,width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('Case ',1,Point.mk(0*ff,-(hwd+3*ff)));
  addT('P',1,Point.mk(-1*ff,hwd-5.5*ff));
  addT('P',0,Point.mk(-2*ff,-2.5*ff));
  addT('fr',0,Point.mk(4.5*ff,-4*ff));
}

export {rs};


