

import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();
rs.setName('quad_15_7');

let wd = 100;
let levels = 1;
let topParams = {width:wd,height:wd,framePadding:0.2*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:0.4,fr1:0.4,fr2:0.4,fr3:0.4,fr4:0.4,fr5:0.3}};
rs.quadParams = {chance:1,levels:levels,polygonal:1,splitParams:{ornt:'v',fr0:0.1,fr1:0.2,fr2:0.3,fr3:0.4,fr4:0.6,fr5:0.7}};
rs.adjustProtos = function () {
  this.polygonP['stroke-width'] =  .4;
  this.textP["font-size"] = "6";
}

rs.afterInitialize = function () {
 debugger;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  const addText = (n,p) => {
    let nm = 'txt'+n;
    let theText = 'fr'+n;
    let txt = this.textP.instantiate();
    txt.text = theText,
    this.set(nm,txt);
    txt.moveto(p);
    return txt;
  }
  addText(0,Point.mk(2*ff-hwd,-(hwd+ff)));
  addText(1,Point.mk(hwd - 3.5*ff,hwd+ff));
  addText(2,Point.mk(-(hwd+ff),hwd-5.5*ff));
  addText(3,Point.mk(-1*ff,-2*ff));
  /*
  let txt1 = this.textP.instantiate();
  txt1.text = "fr1";
  this.set('txt1',txt1);
  txt1.moveto(Point.mk(2*ff-hwd,-(hwd+ff)));
  txt1.moveto(Point.mk(2*ff-hwd,-(hwd+ff)));
  
  let txt2 = this.textP.instantiate();
  txt2.text = "fr2";
  this.set('txt2',txt2);
  txt2.moveto(Point.mk(2*ff-hwd,(hwd+ff)));
  
  let txt2 = this.textP.instantiate();
  txt3.text = "fr3";
  this.set('txt3',txt3);
  txt3.moveto(Point.mk(2*ff-hwd,-(hwd+ff)));
  
  let txt4 = this.textP.instantiate();
  txt4.text = "fr4";
  this.set('txt4',txt4);
  txt4.moveto(Point.mk(2*ff-hwd,-(hwd+ff)));
  txt5.text = "fr5";
  this.set('txt5',txt5);
  txt5.moveto(Point.mk(2*ff-hwd,-(hwd+ff)));
  */
}


export {rs};

      

