
import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_2');
let levels = 3;
rs.quadParams = {levels};
//rs.quadParams.circleScale = 0.25;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

rs.quadParams.manglee = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}
rs.quadParams.chance = 0.95;
rs.quadParams.chance = 0.7;

rs.quadFill = function (qd) {
  let rb= Math.random() > 0.5;
  let v = Math.floor(255*Math.random());
  let b = `rgb(${v},${v},${v})`;
  let r = `rgb(${v},0,0)`;
  return rb?r:b;
}
let strokeWidths = rs.quadParams.strokeWidths = [];

rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.14,.9);

let strokes = rs.quadParams.strokes = [];
rs.addToArray(strokes,'black',levels);

rs.quadSplitParams = function (qd) {
   //let v = 0.7;
   debugger;
   if (0 && this.sp) {
     return this.sp;
   }
   //return {ornt:'v',fr0:.6,fr1:.3,fr2:.3,fr3:.6,fr4:.3,fr5:.2};
  // return {ornt:'v',fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v};
  let v = {low:.4,high:.6};
   v = {low:.3,high:.7};
   //v= 0.4;
   let rs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
   //let rs = this.randomizeFrom({ornt:['h','v'],fr0:{low:.2,high:.8},fr1:{low:.2,high:.8},fr2:{low:.2,high:.8},fr3:{low:.2,high:.8},fr4:{low:.2,high:.8},fr5:{low:.2,high:.8}});
   this.sp = rs;
   rs = this.randomizeFrom({ornt:['h','v'],fr0:.4,fr1:.4,fr2:.4,fr3:.6,fr4:0.4,fr5:.3});
   //console.log('ornt',rs.ornt,'fr0',rs.fr0);
   console.log('rs',rs);
  return rs;
}
/*
fr0: 0.5669432372599208
fr1: 0.49575153861842747
fr2: 0.38641189948959437
fr3: 0.6256200601229618
fr4: 0.3272879105749005
fr5: 0.3696640457077124
ornt: "v"
*/
export {rs};

      

