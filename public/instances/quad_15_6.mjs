
import {rs as generatorP} from '/generators/quad_15.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_15_6');
let levels = 4;
rs.quadParams.levels = levels;



let visibles = rs.quadParams.visibles = [];
rs.addToArray(visibles,1,levels);
rs.addToArray(visibles,1,levels);

//rs.quadParams.mangle = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}

let strokeWidths = rs.quadParams.strokeWidths = [];
rs.computeExponentials(strokeWidths,rs.quadParams.levels,0.0,.7);

rs.quadStroke = function (qd) { 
  return 'white';
  return Math.random() > 0.5?'rgb(150,150,250)':'rgb(250,150,150)';
}


rs.fillsByWhere = {};

rs.quadFill = function (qd) { 
   debugger;
   let fbw = this.fillsByWhere;
   let wn = this.whereName(qd.where);
   let fill;
   if (fbw[wn]) {
     fill = fbw[wn];
   } else {
     const shade = ()=> Math.floor(255*Math.random());
     let v = shade();
     fill = `rgb(${v},${v},${v})`;
     fbw[wn] = fill;
   } 
   return fill;
   
}
	

let stepper = rs.mkStepper();
debugger;
stepper.min = 0;
stepper.max = 6*Math.PI;
stepper.stepSize  = 0.03*Math.PI;
debugger;
stepper.init(1);
rs.offCenter = 0.3;

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
let dir = 0;
rs.quadSplitParams = function (qd) {
  let pgon = qd.polygon;

 let c = pgon.center();
  let d = pgon.minDimension();
  let rd = dir;
  //let rd = (Math.random()>0.5?0.25:0.5)*Math.PI;
  //2*Math.PI*Math.random();
  let rp = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*this.offCenter));
   return {center:rp,pfr0:.5,pfr1:.5,pfr2:0.5,pfr3:0.5};
   
}

rs.numSteps =67;
rs.ns = 0;
rs.oneStep = function () {
  debugger;
  draw.saveFrame(this.ns)
  stepper.step(0);
  dir = stepper.ar[0];

  this.resetShapes();
  this.ns = this.ns + 1;
  if (this.ns < this.numSteps) {
    setTimeout(() => this.oneStep(),50);
  }

}

    
export {rs};

      

