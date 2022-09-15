
import {rs as generatorP} from '/instances/part_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_D_M0');

rs.quad2part = function (params) { 
  let {iornt,fr0,fr1,fr2,fr3,fr4,fr5} = params;
  let ornt = iornt?iornt:'h';
  let oornt = ornt === 'h'?'v':'h';
  let p0p = {Case:2,ornt:oornt,fr0:fr2,fr1:1-fr3};
  let p1p = {Case:2,ornt:oornt,fr0:fr4,fr1:fr5};
  let tp = {Case:2,ornt:ornt,fr0:fr0,fr1:fr1};
  let rs = {TOP:tp,P0:p0p,P1:p1p}
  debugger;
  return rs;
}
let quadParams = {fr0:0.4,fr1:.4,fr2:.4,fr3:.3,fr4:.7,fr5:.6}
  
rs.partParams.rectangular = 1;
rs.splitParams = {TOP:{Case:2,vertexNum:0,fr0:0.7,fr1:0.7},P0:{Case:2,ornt:'v',vertexNum:0,fr0:0.45,fr1:0.65},P1:{Case:2,ornt:'v',vertexNum:0,fr0:0.45,fr1:0.65}};
rs.splitParams = rs.quad2part(quadParams);

rs.partParams.levels = 1;

rs.partSplitParams = function (prt) {
  let levs = prt.where.length;
  console.log('levs',levs);
 // if (levs<2) {
    return this.splitParams;
 // }
}
rs.afterInitialize =function ()  {
debugger;
  let {textP,width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('P',1,Point.mk(-1*ff,hwd-5.5*ff));
  addT('P',0,Point.mk(1*ff,-2.5*ff));
  addT('fr',0,Point.mk(-4.5*ff,-4*ff));
  addT('fr',1,Point.mk(8*ff,hwd+1*ff));
}

export {rs};


