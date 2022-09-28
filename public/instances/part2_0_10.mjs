

//import {rs as generatorP} from '/instances/part2_0_D.mjs';
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();
rs.setName('part2_0_10');
rs.partParams.rectangular = 1;
rs.partParams.levels = 6;
let wd = rs.width;
let dir = 0.25*Math.PI;
let c = Point.mk(Math.cos(dir),Math.sin(dir)).times(wd*0.2);
//rs.partParams = {chance:1,levels:levels,polygonal:1,splitParams:{center:c,fr0:.3,fr1:.4,fr2:0.5,fr3:0.6}};
//rs.quadParams = {chance:1,levels:levels,polygonal:1};
let strokeWidths = rs.partParams.strokeWidths = [];
debugger;
//rs.addToArray(strokeWidths,.00010,10);
rs.computeExponentials({dest:strokeWidths,n:10,factor:0.5,root:.5});

rs.partSplitParams = function (qd) {
  
   return {Case:5,pcs:[.4,1.4,2.4,3.4],frs:[0.3,0.7]};
}

rs.partFilll = function (qd) {
  let low = 0;
  let high = 200;
  let rng = {low,high};
  let r = Math.floor(this.randomBetween(rng));
  let g = Math.floor(this.randomBetween(rng));
  let b = Math.floor(this.randomBetween(rng));
  return `rgba(${r},${g},${b},.2)`;
}
//rs.adjustProtos = function () {this.showLabelsV()};
rs.afterInitializee = function () {
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  this.addT('fr',1,Point.mk(8*ff-hwd,-(hwd+ff)));
  this.addT('Case ',5,Point.mk(0*ff,-(hwd+3*ff)));
  //this.addT('P',0,Point.mk(3*ff-hwd,-5*ff));
  this.addT('fr',3,Point.mk(1.50*ff,hwd+ff));
  this.addT('fr',4,Point.mk(0.0*ff,-3*ff));
  this.addT('fr',0,Point.mk(-(hwd+1.5*ff),1.8*ff));
  this.addT('fr',5,Point.mk(0*ff,2.8*ff));
  //this.addT('P',2,Point.mk(-5*ff,hwd-5.5*ff));
  //this.addT('P',3,Point.mk(5*ff,hwd-5.5*ff));
  //this.addT('fr',3,Point.mk(-5*ff,-0.0*ff));
  //this.addT('fr',5,Point.mk(0*ff,1*ff));
  //this.addT('P',1,Point.mk(4*ff,-5*ff));
  this.addT('fr',2,Point.mk(hwd+1.5*ff,-2*ff));
}

export {rs};

      

