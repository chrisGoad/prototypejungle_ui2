
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_13');

let wd = 100;
let hwd = 0.5*wd;
let topParams = {width:wd,height:wd,framePadding:0.1*wd,frameStrokee:'white',lengthenings:undefined,twists:undefined,emitLineSegs:undefined}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:7};
rs.quadParams = {chance:1,levels:2};

rs.orect = Rectangle.mk(Point.mk(-hwd,-hwd),Point.mk(wd,wd));

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP.fill = 'black';
  this.rectP['stroke-width'] =.05;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP.fill = 'black';
  this.lineP['stroke-width'] =.1;
  this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP['stroke-width'] =.05;
}

rs.mangleRectangle = function (rect,ln,tw) {
//debugger;
  let orect = this.orect; 
  let sides = rect.labeledSides();
  let {left,right,top,bottom} = sides;
  //let ln = 1.2;
  //let tw = 0.1*Math.PI;
  let lleft = orect.intersectLineSegment(left.lengthen(ln).twist(tw));
  let lright = orect.intersectLineSegment(right.lengthen(ln).twist(tw));
  let ltop = orect.intersectLineSegment(top.lengthen(ln).twist(tw));
  let lbottom = orect.intersectLineSegment(bottom.lengthen(ln).twist(tw));
  let rs = [lleft,lright,ltop,lbottom];
  return rs;
}
  
  /*
rs.displayCell = function (qd) {
  let {shapes,rectP,lineP} = this;
  let rect = qd.rectangle;
  let rs = rect.toShape(rectP,1);
  let  lnw = qd.where.length;
  let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = strokew;
  shapes.push(rs);
}

*/
rs.quadVisible = function (qd) {
  let {visibles} = this;
  if (!visibles) {
    return 1;
  }
  let lv = qd.where.length;
  return visibles[lv];
}

rs.displayCell = function (qd,toSegs) {
  let {shapes,lineSegs,lineP,mangles,lengthenings,twists,strokeWidths} = this;
  let vs = this.quadVisible(qd);
  if (!vs) {
    return;
  }
  let rect = qd.rectangle; 
  let lv = qd.where.length;
  let mng = mangles?mangles[lv]:0;
  let mangled;
  if (mng) {  
    let ln = lengthenings?lengthenings[lv]:1;
    let tw = twists?twists[lv]:0;
 // let mangled =(wh > 0)?this.mangleRectangle(rect,ln,tw):[rect];
    mangled = this.mangleRectangle(rect,ln,tw);
 //   proto = lineP;
  } else {
    mangled = rect.sides();
 //   proto = rectP;
  }
  mangled.forEach((seg) => {
     if (toSegs) {
      lineSegs.push(seg);
      return;
    }
    let segs = seg.toShape(lineP);
    let  lnw = qd.where.length;
    let strokew = strokeWidths[lnw];
    segs['stroke-width'] = strokew;
    shapes.push(segs);
  });
}

rs.fr0 = 0.5;
rs.fr1 = 0.4;
rs.fr2 = 0.2;
rs.computeSplitParams = function (qd) {
  let {fr0,fr1,fr2} = this;
  let c = qd.rectangle.center();
  let {x,y} = c;
  let ornt = Math.random()<0?'h':'v';
  return [ornt,fr0,fr1,fr2];
}

rs.addToArray = function (a,v,n) {
  for (let i=0;i<n;i++) {
    a.push(v);
  }
}

rs.initialize = function () {
  let {width:wd,height:ht,quadParams,emitLineSegs,dropParams} = this;
  debugger;
 // this.setBackgroundColor('white');
 // this.addRectangle({width:wd,height:wd,fill:'gray'});
  
  //position:Point.mk(-qht,-qht),stroke_width:0,fill:'rgb(255,0,0)'});

  this.addFrame();
  this.initProtos();
  if (!this.strokeWidths) {
    this.strokeWidths = this.computeExponentials(quadParams.levels,0.1,0.9);
  }
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd = {rectangle:r};
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd,emitLineSegs);
  if (emitLineSegs) {
    this.generateDrops(dropParams);
  }

}	

export {rs};

      

