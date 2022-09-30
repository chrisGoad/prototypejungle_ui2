
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_15');
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.circleScale = 0.25;



let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

rs.partParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:12,root:0.2,factor:.9});


rs.partStroke = function (qd) {
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}

rs.partSplitParams = function (qd) {
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

   //return {ornt:'v',fr0:.6,fr1:.3,fr2:.3,fr3:.6,fr4:.3,fr5:.2};
  // return {ornt:'v',fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v};
  let v = {low:.4,high:.6};
   v = {low:.3,high:.7};
   //v= 0.4;
   let Case = this.randomAmong([7,8]);
   let pcs0 = this.randomizeArrayFrom([v,v,v,v]);
   let pcs = [pcs0[0],pcs0[0]+1,pcs0[0]+2,pcs0[0]+3];
   let frs = this.randomizeArrayFrom([v,v]);
   let rs = {Case,pcs,frs};
   //let rs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
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

      

