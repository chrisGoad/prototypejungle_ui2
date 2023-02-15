import {rs as generatorP} from '/generators/reflected_path_0.mjs';

let rs = generatorP.instantiate();

rs.setName('reflected_path_0_2');

debugger;
rs.setTopParams = function () {
  debugger;
  let ht = 100;
  let d = 0.5*ht;
  let vel = 1;
  let cycleTime = Math.floor(ht/vel)
  this.setSides(d);
  let topParams = {ht,d,width:ht,height:ht,framePadding:.0*ht,frameStroke:'white',frameStrokeWidth:1,numPaths:6,theta:-0.2 *Math.PI,vel,
  cycleTime,numSteps:10*cycleTime,noNewPaths:8*cycleTime,lineLength:20,addPathInterval:30,fromOneSide:0,gap:0	}
  Object.assign(this,topParams);
}

rs.setTopParams();

export {rs};


