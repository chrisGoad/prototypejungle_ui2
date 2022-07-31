
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_9');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
//let quadParams = {chance:0.1,levels:7, alwaysSplitBefore:3};
let quadParams = {chance:0.97,levels:6, alwaysSplitBefore:7};
//let quadParams = {chance:97,levels:4, alwaysSplitBefore:3};

rs.initProtos = function () {
  this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP['stroke-width'] =.15; 
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
  this.rectP['stroke-width'] =.05;
}

rs.computeFill = function () { 
   const shade = ()=> Math.floor(40*Math.random());
   let v = shade();
   let fill = `rgb(${v},${v},${v})`;
 // return 'rgb(0,0,100)';
   return fill;
}


rs.displayCellAsRectangle = function (qd) {
  debugger;
  let {shapes,rectP} = this;
  let rect = qd.rectangle;
  //let rs = rect.toShape(rectP,0.8);
  let rs = rect.toShape(rectP,1);
  rs.fill = this.computeFill();
  shapes.push(rs);
}


rs.displayCellAsCircle = function (qd) {
  debugger;
  let {shapes,circleP} = this;
  let rect = qd.rectangle;
  let rs = rect.toCircleShape(circleP,0.8);
  rs.fill = this.computeFill();
  shapes.push(rs);
}

rs.displayCell = function (qd) {
  this.displayCellAsRectangle(qd);
}

rs.computeSplitParams = function (qd) {
debugger;
  let {where} = qd;
  let lnw = where.length;
  if (lnw===0) {
    return ['h',0.5,0.5,0.5];
  }
  if (lnw) {
    let fw =  where[0];
  
    if (fw === 'UL') {
      if (lnw >= 4) {
        return;
      }
    } else if ((fw === 'UR') ||  (fw === 'LL')) {
      if (lnw >= 5) {
        return;
      }
     }  
  }
  let jf = 0.0;
  let c = qd.rectangle.center();
  let {x,y} = c;
 // let ornt = (x<0)?'h':'v';
  let ornt = Math.random()<0.5?'h':'v';
  const jiggle = (v) => v + jf * (Math.random() -0.5);
  //return ['h',jiggle(0.45),jiggle(0.45),jiggle(0.3)];
  return [ornt,jiggle(0.5),jiggle(0.5),jiggle(0.3)];
  return ['h',jiggle(0.45),jiggle(0.45),jiggle(0.3)];
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

      

