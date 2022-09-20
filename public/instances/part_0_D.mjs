

import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();
rs.setName('part_0_D');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStroke:undefined}
Object.assign(rs,topParams);
rs.partParams.levels = 1;

/*
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:0.4,fr1:0.4,fr2:0.4,fr3:0.4,fr4:0.4,fr5:0.3}};
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:0.1,fr1:0.2,fr2:0.3,fr3:0.4,fr4:0.6,fr5:0.7}};
const cfr = function (n) {
  return .4 + 0.01*n;
}
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:cfr(0),fr1:cfr(1),fr2:cfr(2),fr3:.4,fr4:.6,fr5:cfr(5)}};
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:.4,fr1:.4,fr2:.4,fr3:.4,fr4:.6,fr5:.4}};
console.log('qp',rs.quadParams);
let strokeWidths = rs.quadParams.strokeWidths = [];
debugger;
//rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.8,.7);
rs.computeExponentials(strokeWidths,10,.5,.7);
*/
rs.adjustProtos = function () {
  this.polygonP['stroke-width'] =  .4;
  this.textP["font-size"] = "6";
}

rs.addT = function (rt,n,p) {
  debugger;
  let color = (rt==='P')?'black':'white';   
  this.addText(this.textP,rt,n,p,color);
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,100);
let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,2,100);

rs.theFills = {P0:'rgb(255,0,0)',P1:'rgb(200,200,0)',P2:'rgb(0,255,0)',P3:'rgb(0,255,255)',P4:'rgb(0,0,255)',P5:'rgb(100,100,100)'};
rs.partFill = function (prt) {
  let nm = this.partName(prt);
  let fill = this.theFills[nm];
  if (fill) {
    return fill;
  }
}
 
rs.showLabelsV = function () {
 debugger;
  let {textP} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('fr',0,Point.mk(8*ff-hwd,-(hwd+ff)));
  addT('Q',0,Point.mk(3*ff-hwd,-3*ff));
  addT('fr',1,Point.mk( 2.5*ff,hwd+ff));
  addT('fr',2,Point.mk(-(hwd+ff),2*ff));
  addT('Q',2,Point.mk(-4*ff,hwd-5.5*ff));
  addT('Q',3,Point.mk(6*ff,hwd-4.5*ff));
  addT('fr',3,Point.mk(-2*ff,-2.5*ff));
  addT('fr',4,Point.mk(1.5*ff,.5*ff));
  addT('Q',1,Point.mk(4*ff,-4*ff));
  addT('fr',5,Point.mk(hwd+ff,-2*ff));
}


rs.showLabelsH = function () {
 debugger;
  let {textP} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('fr',2,Point.mk(8*ff-hwd,-(hwd+ff)));
  addT('Q',0,Point.mk(3*ff-hwd,-5*ff));
  addT('fr',4,Point.mk( -4.5*ff,hwd+ff));
  addT('fr',0,Point.mk(-(hwd+ff),2*ff));
  addT('Q',2,Point.mk(-5*ff,hwd-5.5*ff));
  addT('Q',3,Point.mk(5*ff,hwd-5.5*ff));
  addT('fr',3,Point.mk(-5*ff,-0.0*ff));
  addT('fr',5,Point.mk(0*ff,1*ff));
  addT('Q',1,Point.mk(4*ff,-5*ff));
  addT('fr',1,Point.mk(hwd+ff,-2*ff));
}


rs.showLabelsC = function () {
 debugger;
  let {textP} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addT = (rt,n,p) => {
    this.addText(textP,rt,n,p);
  }
  addT('fr',0,Point.mk(6*ff-hwd,-(hwd+ff)));
  addT('Q',0,Point.mk(3*ff-hwd,-5*ff));
  addT('fr',2,Point.mk(0.0*ff,hwd+ff));
  addT('fr',3,Point.mk(-(hwd+1.5*ff),-2*ff));
  addT('Q',2,Point.mk(-5*ff,hwd-5.5*ff));
  addT('Q',3,Point.mk(5*ff,hwd-5.5*ff));
  //addT('fr',3,Point.mk(-5*ff,-0.0*ff));
  //addT('fr',5,Point.mk(0*ff,1*ff));
  addT('Q',1,Point.mk(4*ff,-5*ff));
  addT('fr',1,Point.mk(hwd+1.5*ff,-2*ff));
}

export {rs};

      

