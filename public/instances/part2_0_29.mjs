
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_29');
let levels = 10;
levels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;
//let qsp = {Case:13,frs:[0.5]}

rs.qspa = [];
rs.qspa.push({Case:13,frs:[0.5]});
//rs.qspa.push({Case:13,frs:[0.2,0.4,0.6,0.7]});
//rs.qspa.push( {Case:7,pcs:[.4,1.4,2.4,3.4]});
let eps = .0;
rs.qspa.push( {Case:7,pcs:[.5-eps,1.5-eps,2.5-eps,3.5-eps]});

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  let lev = prt.where.length;
  
  if ((lev>1)&&(Math.random()  < 0.0)) {
 // if (0) {
    return;
  }
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*3);
  wp = lev%2;
 let qsp = this.qspa[wp];
  wp = lev%3;
  qsp = this.qspa[wp===1?1:0];
  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.2,factor:.7});

rs.partFill = function (prt) {
   let mn = 50;
   let mx = 250;
   let d = mx-mn;
   let r = mn+Math.floor(Math.random()*d);
   let g = mn+Math.floor(Math.random()*d);
   let b = mn+Math.floor(Math.random()*d);
   let fill;
   if (Math.random() < 0.5) {
     fill = 'rgba(250,0,0,.80)';
   }  else {
        fill = 'rgba(0,0,250,.80)';
   }
   fill = `rgba(${r},${g},${b},.2)`;
   return fill;
}

rs.adjustProtos = function (prt)  {
  this.polygonP.stroke = 'rgb(0,0,50)';
}
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


