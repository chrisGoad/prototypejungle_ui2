
import {rs as generatorP} from '/instances/part2_0_41.mjs';

let rs = generatorP.instantiate();

debugger;
rs.setName('part2_0_41a');
let levels = 5;
//levels = 4;
//levels = 1;

rs.theFills10 = {P1:'rgb(0,0,0)',P0:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};
rs.theFills12 = {P0:'rgb(0,0,0)',P1:'rgb(0,0,250)',P2:'black',P3:'rgb(0,0,0)',P4:'rgb(0,0,0)',P5:'rgb(0,0,0)'};

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
rs.partParams.stroke = 'white';
//rs.altps = [4,6,7,8]; 
rs.quadCases = [7,8,9]; 
let minStep = 0.02;
let maxStep = 0.04;
let sp = 1.5;
let kind = 'sweep';
debugger;
rs.buildPspaceElement = function () {
  return {kind,step:(minStep+Math.random()*(maxStep-minStep))*sp,min:this.mineps,max:this.maxeps,interval:1,steps:0.5};
}
let pspace = rs.buildWhereMap({},rs.buildPspaceElement);

rs.qcMap = rs.buildWhereMap({},rs.qcRandomVal);

//rs.setAltps();
rs.numSteps = 300;
rs.saveAnimation = 1;

export {rs};