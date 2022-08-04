
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_7');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
let quadParams = {chance:.97,levels:8, alwaysSplitBefore:3};

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP.fill =  'black';
  this.rectP['stroke-width'] =.05;
}


rs.displayCell = function (qd) {
  let {shapes,rectP} = this;
  let rect = qd.rectangle;
  let rs = rect.toShape(rectP,1);
  shapes.push(rs);
}


rs.computeSplitParams = function (qd) {
  let jf = 0.1;
  const jiggle = (v) => v + jf * (Math.random() -0.5);
  return ['h',jiggle(0.5),jiggle(0.5),jiggle(0.3)];
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

      

