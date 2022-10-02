
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_16');
let levels = 4;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;



let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.2,factor:.9});

rs.partStroke = function (qd) { 
  return 'white';
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}

let stepper = rs.mkStepper();
stepper.init(2);


stepper.min = 2;
stepper.max = 98;
stepper.stepSize  = 2;
/*
for (let i=0;i<45;i++) {
  console.log(i,'ar',JSON.stringify(stepper.ar));
  stepper.step(0);
}
*/


let qdp = {Case:6,pcs:[0.2,1.2,2.2,3.2],frs:[0.2,0.2]};
let whichToStep = [[0,2,4],[1,3,5]];
 //whichToStep = [[0,2],[1,3,4,5]];
//whichToStep = [[0,1,2],[3,4,5]];

rs.partSplitParams = function (qd) {
   return qdp;
}
rs.oneStep = function () {
  this.resetShapes();
  this.stepQuadParams({quadParams:qdp,stepper,whichToStep});
  setTimeout(() => this.oneStep(),50);

}

    
export {rs};

      

