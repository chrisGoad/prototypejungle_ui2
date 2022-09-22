
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_1');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:1,vertexNum:0,pc0:0.6,pc1:2.2};

rs.showPc = function (n) {
  debugger;
  let topP = this.shapes[0].fromGeom;
  let pc = rs.partParams.splitParams['pc'+n];
  let fpc = Math.floor(pc);
  let ps = topP.pc2point(pc);
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  let sdisp = 1.2*ff;
  let disp;
  if (fpc===0) {
    disp = Point.mk(-sdisp,0);
  } else if (fpc ===1) {
    disp = Point.mk(0,-sdisp);
   } else if (fpc ===2) {
    disp = Point.mk(sdisp,0);
   } else if (fpc ===3) {
    disp = Point.mk(0,sdisp);
   }
  this.addT('pc',n,ps.plus(disp));
}

rs.afterInitialize =function ()  {
debugger;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  let disp = 1.2*ff;
  let pxdisp = Point.mk(disp,0);
  let nxdisp = Point.mk(-disp,0);

  let geom0 = this.shapes[0].fromGeom;
  let ps0 = geom0.pc2point(sp.pc0);
  let ps1 = geom0.pc2point(sp.pc1);
  this.addT('Part2_T',1,Point.mk(0*ff,-(hwd+3*ff)));
  //this.addT('P',0,Point.mk(-1*ff,hwd-5.5*ff));
  //this.addT('P',1,Point.mk(-0*ff,-4.5*ff));
 // this.addT('fr',1,Point.mk(4.5*ff,-4*ff));
  //this.addT('fr',0,Point.mk(-5.5*ff,-2*ff));
  //this.addT('pc',0,ps0.plus(nxdisp));
  this.showPc(0);
  this.addT('fr',1,ps1.plus(pxdisp));
}

export {rs};


