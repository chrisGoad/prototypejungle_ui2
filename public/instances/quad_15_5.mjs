
import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_5');
let levels = 6;
rs.quadParams.levels = levels;
//rs.quadParams.circleScale = 0.25;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.2,.9);

rs.quadStroke = function (qd) {
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}


let aminv = 20;
let amaxv = 80;
let astep  = 10;

let ar = [aminv,aminv];
let maxIndex = ar.length-1;
const stepArray = function (index) {
  if (index>maxIndex) {
    return 0;
  }
  let v = ar[index];
  let nv = v + astep;
  if (nv > amaxv) {
    for (let i=index;i<=maxIndex;i++) {
      ar[i] = aminv;
    }
    return 0;
   }
  
   if (stepArray(index+1)) {
     return 0;
   } 
   ar[index] = nv;
   for (let i=index+1;i<=maxIndex;i++) {
      ar[i] = aminv;
   }
   return 1;
 }
 
 
let qdp = {ornt:'v',fr0:0.2,fr1:0.2,fr2:0.2,fr3:0.2,fr4:0.2,fr5:0.2};
let whichToStep = [[0,2,4],[1,3,5]];
whichToStep = [[0,1,2],[3,4,5]];
ar = [];
let wln = whichToStep.length;
for (let i=0;i<wln;i++) {
  ar.push(aminv);
}
let randomQP = 0;
rs.stepQuadParams = function () {
  debugger;
  if (randomQP) {
    let v = [0.2,0.8];
    		v = {low:0.2,high:0.8};
    qdp = this.randomizeFrom({ornt:['h','h'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
    return qdp;
  }
  let ln = whichToStep.length;
  stepArray(0);
  for (let i=0;i<ln;i++) {
    let wts = whichToStep[i];
    wts.forEach((idx) => {
      let frnm = 'fr'+wts[i];
      let av = ar[i];
      qdp[frnm] = 0.01*av;
     });
  }
 }
 
 /*
 let cqdpv = 0.2;
  let qdp = initQdp(cqdpv);

 rs.stepAllQuadParams = () => {
   cqdpv = cqdpv + qfrstep;
   qdp = initQdp(cqdpv);
 }
 */
rs.quadSplitParams = function (qd) {
   return qdp;
   let wd = this.width;
   let hwd = 0.5*wd;
   let pgon = qd.polygon;
   let lft = pgon.left();
   let fr = (lft + hwd) / wd;
  // console.log('fr',fr);
   let fr0 = 0.3+fr * 2 * 0.6;
    //  console.log('fr0',fr0);

   if (1 && this.sp) {
     return this.sp;
   }
   //return {ornt:'v',fr0:.6,fr1:.3,fr2:.3,fr3:.6,fr4:.3,fr5:.2};
  // return {ornt:'v',fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v};
  let v = {low:.4,high:.6};
   v = {low:-.5,high:1.5};
   v = {low:.2,high:.8};
   //v= 0.4;
   //lrs = this.randomizeFrom({ornt:['h','h'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
      this.sp = rs;
   console.log('rs',JSON.stringify(rs));

   
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
rs.oneStep = function () {
 //alert('one step');
 /* debugger;
  console.log('ar',JSON.stringify(ar));
  stepArray(0);
  return;*/
  this.shapes.remove();
  this.set('shapes',arrayShape.mk());
  this.sp = undefined;
  this.initialize();
  draw.refresh();
     console.log('qdp',JSON.stringify(qdp));
  debugger;
  
  this.stepQuadParams();

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

      

