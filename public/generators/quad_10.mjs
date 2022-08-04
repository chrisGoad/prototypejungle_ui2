
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_10');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
let quadParams = {chance:1,levels:8};

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
}

rs.computeFill = function (qd) { 
   const shade = ()=> Math.floor(40*Math.random());
   let v = shade();
   let fill = `rgb(${v},${v},${v})`;
   return fill;
}
  
rs.displayCell = function (qd) {
  let {shapes,rectP} = this;
  let rect = qd.rectangle;
  let rs = rect.toShape(rectP,1);
  let  lnw = qd.where.length;
  let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = strokew;
  rs.fill = this.computeFill(qd);
  shapes.push(rs);
}

rs.computeSplitParams = function (qd) {
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
    }  else if (fw === 'LR')  {
       if (lnw===1) {                
         return ['h',0.5,0.5,0.5];
       } else {
         let sw = where[1];
         if (sw === 'UL') {
           if (lnw >5) {
             return;
            }
         } else if ((sw === 'UR') ||(sw === 'LL')) {
           if (lnw >6) {
             return;
           }
         }
       } 
     }       
  }
  let c = qd.rectangle.center();
  let {x,y} = c;
  let ornt = Math.random()<0.5?'h':'v';
  return [ornt,0.5,0.5,0.3];
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

      

