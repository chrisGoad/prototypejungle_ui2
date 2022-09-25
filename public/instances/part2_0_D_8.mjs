
import {rs as generatorP} from '/instances/part2_0_D.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_D_8');

rs.partParams.rectangular = 1;
let sp = rs.partParams.splitParams = {Case:9,pc0:.4,pc1:1.4,pc2:2.4,pc3:3.4};


rs.partSplitParams = function (qd) {
  let pgon = qd.polygon;
  let c = pgon.center();
  let d = pgon.minDimension();
  let rd = (c.x>0?-0.25:-0.25)*Math.PI;
  let center = c.plus(Point.mk(Math.cos(rd),Math.sin(rd)).times(d*0.2));
  let rs = {Case:9,center,pc0:.4,pc1:1.4,pc2:2.4,pc3:3.4};  
   return rs;
}
rs.afterInitialize =function ()  {
  this.displayTitle('Part2 Q C 9 C 0');
  this.displayPc(0);
  this.displayPc(1);
  this.displayPc(2);
  this.displayPc(3);
 

}

export {rs};


