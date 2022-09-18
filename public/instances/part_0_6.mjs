
import {rs as generatorP} from '/generators/part_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part_0_6');
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.quadParams.circleScale = 0.25;



let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

rs.partParams.manglee = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}
rs.partParams.chance = 0.95;
rs.partParams.chance = 0.7;
rs.partParams.chance = 1;

rs.partFill = function (qd) {
  let rb= Math.random() > 0.5;
  let v = Math.floor(255*Math.random());
  let b = `rgb(${v},${v},${v})`;
  let r = `rgb(${v},0,0)`;
  return rb?r:b;
}
let strokeWidths = rs.partParams.strokeWidths = [];

//rs.computeExponentials(strokeWidths,20,0,.9);
rs.computeExponentials(strokeWidths,20,0.14,.9);

let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'white',levels);

rs.partSplitParams = function (qd) {
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
   let rs = this.randomizeFrom({Case:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
   //let rs = this.randomizeFrom({ornt:['h','v'],fr0:{low:.2,high:.8},fr1:{low:.2,high:.8},fr2:{low:.2,high:.8},fr3:{low:.2,high:.8},fr4:{low:.2,high:.8},fr5:{low:.2,high:.8}});
   this.sp = rs;
   rs = this.randomizeFrom({Case:[4,6],fr0:.4,fr1:.4,fr2:.4,fr3:.6,fr4:0.4,fr5:.3});
   rs = this.randomizeFrom({Case:[4,6],fr0:.4,fr1:.5,fr2:.4,fr3:.5,fr4:0.4,fr5:.3});

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

      

