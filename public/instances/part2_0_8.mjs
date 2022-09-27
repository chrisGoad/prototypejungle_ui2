
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_8');
let levels = 7;
//levels = 3;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//levels++;
let sp = rs.partParams.splitParams = {Case:8,	pcs:[0.5,1.5,2.5]};

rs.partSplitParams = function (prt) {
  
  if ((prt.where.length < 3) || (Math.random() < .8)) {
    return sp;
  }
}


rs.computeFill = function () { 
   const shade = ()=> Math.floor(255*Math.random());
   let v = shade();
   let fill = `rgb(${v},0,${v})`;
   return fill;
}
//rs.afterDisplayCell = function (prt) {
rs.displayCell = function (prt) {
  let {polygon:pgon} = prt;
  if (prt.P0) {
    return;
  }
  debugger;
  let center = pgon.center();
  let left = pgon.left();
  let rad = center.x - left;
  let crc = this.circleP.instantiate().show();
  crc.dimension = 1.4*rad;
  crc.moveto(center);
  crc.fill = this.computeFill();
  crc.stroke = 'white';
  crc['stroke-width'] = 0.2;// 0.5 is interesting
  this.shapes.push(crc);
}

let visibles = rs.partParams.visibles = [];
//rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,50);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.addToArray(strokeWidths,.05,20);

export {rs};
