
import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_1');
let levels = 7;
rs.quadParams.levels = levels;
//rs.quadParams.circleScale = 0.25;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

rs.quadParams.manglee = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:rs.quadParams.levels,root:0.2,factor:.9});

rs.quadStroke = function (qd) {
  debugger;
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}

rs.quadSplitParams = function (qd) {
   //let v = 0.7;
   debugger;
   let wd = this.width;
   let hwd = 0.5*wd;
   let pgon = qd.polygon;
   let lft = pgon.left();
   let fr = (lft + hwd) / wd;
   console.log('fr',fr);
   let fr0 = 0.3+fr * 2 * 0.6;
      console.log('fr0',fr0);

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
   return rs;

   this.sp = rs;
   rs = this.randomizeFrom({ornt:['h','h'],fr0:{low:.6,high:.6},fr1:.2,fr2:.2,fr3:.6,fr4:0.3,fr5:.2});
  // return rs;
   fr0 = 0.8
   rs = this.randomizeFrom({ornt:['h','h'],fr0:fr0,fr1:.2,fr2:.2,fr3:.6,fr4:0.3,fr5:.2});
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

      

