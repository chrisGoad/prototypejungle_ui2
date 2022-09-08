
import {rs as generatorP} from '/generators/quad_0.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_6');
let levels = 5;
rs.quadParams.levels = levels;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.2,.9);

rs.quadStroke = function (qd) { 
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


let qdp = {ornt:'v',fr0:0.2,fr1:0.2,fr2:0.2,fr3:0.2,fr4:0.2,fr5:0.2};
let whichToStep = [[0,2,4],[1,3,5]];
 //whichToStep = [[0,2],[1,3,4,5]];
//whichToStep = [[0,1,2],[3,4,5]];

rs.quadSplitParams = function (qd) {
   return qdp;
}
rs.oneStep = function () {
  this.resetShapes();
  this.stepQuadParams({quadParams:qdp,stepper,whichToStep});
  setTimeout(() => this.oneStep(),50);

}

    
export {rs};

      

