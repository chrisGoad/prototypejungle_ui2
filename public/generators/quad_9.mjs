
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_9');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
let quadParams = {chance:1,levels:8};

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP.fill = 'black';
  this.rectP['stroke-width'] =.05;
}

  
rs.displayCell = function (qd) {
  let {shapes,rectP} = this;
  let rect = qd.rectangle;
  let rs = rect.toShape(rectP,1);
  let  lnw = qd.where.length;
  let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = strokew;
  shapes.push(rs);
}


rs.computeSplitParams = function (qd) {
  let c = qd.rectangle.center();
  let {x,y} = c;
  let ornt = Math.random()<0.5?'h':'v';
  return [ornt,0.5,0.5,0.2];
}

rs.initialize = function () {
  let {width:wd,height:ht} = this;
  this.addFrame();
  this.initProtos();
  this.strokeWidths = this.computeExponentials(quadParams.levels,0.1,0.9);
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd);
}	

export {rs};

      

