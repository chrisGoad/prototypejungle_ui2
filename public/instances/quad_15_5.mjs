
import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_5');
let levels = 4;
rs.quadParams.levels = levels;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.2,.9);

rs.quadStroke = function (qd) {
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}

rs.arMin = 10;
rs.arMax = 90;
rs.arStep  = 10;

rs.stepInit = function (n) {
  let ar = [];
  for (let i=0;i<n;i++) {
    ar[i] = this.arMin;
   }
  this.arMaxIndex = n-1;
}

rs.stepArray = function (index) {
  let {ar,arMin,arMax,arStep,arMaxIndex} = this;
  if (!ar) {
    ar = rs.ar = [arMin,arMax];
    rs.armaxIndex = ar.length-1;
  }
  if (index>arMaxIndex) {
    return 0;
  }
  let v = ar[index];
  let nv = v + arStep;
  if (nv > arMax) {
    for (let i=index;i<=arMaxIndex;i++) {
      ar[i] = arMin;
    }
    return 0;
   }
   if (this.stepArray(index+1)) {
     return 0;
   } 
   ar[index] = nv;
   for (let i=index+1;i<=arMaxIndex;i++) {
      ar[i] = arMin;
   }
   return 1;
 }
 
 
let qdp = {ornt:'v',fr0:0.2,fr1:0.2,fr2:0.2,fr3:0.2,fr4:0.2,fr5:0.2};
let whichToStep = [[0,2,4],[1,3,5]];
//whichToStep = [[0,1,2],[3,4,5]];
let wln = whichToStep.length;
rs.stepInit(2);

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
  this.stepArray(0);
  console.log(JSON.stringify(this.ar));
  for (let i=0;i<ln;i++) {
    let wts = whichToStep[i];
    wts.forEach((idx) => {
      let frnm = 'fr'+wts[i];
      let av = this.ar[i];
      qdp[frnm] = 0.01*av;
     });
  }
 }
 
rs.quadSplitParams = function (qd) {
   return qdp;
}
rs.oneStep = function () {
  this.shapes.remove();
  this.set('shapes',arrayShape.mk());
  this.sp = undefined;
  this.initialize();
  draw.refresh();
     console.log('qdp',JSON.stringify(qdp));
  debugger;
  
  this.stepQuadParams();

}

export {rs};

      

