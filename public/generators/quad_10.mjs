import {rs as polygonPP} from '/shape/polygon.mjs';

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addQuadMethods} from '/mlib/quadTree.mjs';	

let rs = basicP.instantiate();
addQuadMethods(rs);
rs.setName('quad_10');

let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.1*wd}
Object.assign(rs,topParams);
rs.quadParams = {chance:1,levels:8,rectangular:1};

rs.initProtos = function () {
  this.rectP =  rectPP.instantiate();
  this.rectP.stroke = 'white';
   this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP['stroke-width'] = 0.05;
}

rs.quadFill = function (qd) { 
   const shade = ()=> Math.floor(40*Math.random());
   let v = shade();
   let fill = `rgb(${v},${v},${v})`;
   return fill;
}
 
rs.quadSplitParams = function (qd) {
  let {where} = qd;
  let lnw = where.length;
  let v = {low:0.2,high:0.8}
  let vv = {low:0.6,high:0.6}
  let o = 'h';
  if (lnw===0) {
    return {ornt:'h',fr0:0.5,fr1:0.5,fr2:0.5};
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
         return this.randomizeFrom({ornt:['h','v'],fr0:.5,fr1:.5,fr2:.5});
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
  //let c = qd.rectangle.center();
  let c = qd.polygon.center();
  let {x,y} = c;
  let ornt = Math.random()<0.5?'h':'v';
  return this.randomizeFrom({ornt:['h','v'],fr0:.5,fr1:v,fr2:v});
}

export {rs};

      

