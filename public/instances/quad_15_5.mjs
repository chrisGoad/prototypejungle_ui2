
import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_5');
let levels = 2;
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

let stepper = rs.mkStepper();
stepper.init(2);


stepper.min = 10;
stepper.max = 90;
stepper.stepSize  = 2;

let qdp = {ornt:'v',fr0:0.2,fr1:0.2,fr2:0.2,fr3:0.2,fr4:0.2,fr5:0.2};
let whichToStep = [[0,2,4],[1,3,5]];
//whichToStep = [[0,1,2],[3,4,5]];
let wln = whichToStep.length;

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
  stepper.step(0);
  console.log(JSON.stringify(this.ar));
  for (let i=0;i<ln;i++) {
    let wts = whichToStep[i];
    wts.forEach((idx) => {
      let frnm = 'fr'+wts[i];
      let av = stepper.ar[i];
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
  setTimeout(() => this.oneStep(),100);

}

    
export {rs};

      

