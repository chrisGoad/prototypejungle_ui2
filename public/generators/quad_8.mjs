
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_8');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
let quadParams = {chance:1,levels:8, alwaysSplitBefore:3};

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
  shapes.push(rs);
}


rs.computeSplitParams = function (qd) {
  let {rectangle:rect} = qd;
  let cnt = rect.center();
  let {corner} = rect;
  let {x,y} = cnt;
  let {width:wd} = this;
  let fr = x/wd;
  let bfr = (0.9*fr)+0.45;
  let jf = 0.00;
  return ['h',bfr),bfr),bfr];
}

rs.initialize = function () {
  let {width:wd,height:ht} = this;
  this.addFrame();
  this.initProtos();
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd);
}	

export {rs};

      

