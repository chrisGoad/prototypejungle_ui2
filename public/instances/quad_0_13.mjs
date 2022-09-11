
import {rs as generatorP} from '/generators/quad_0.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';

let rs = generatorP.instantiate();


rs.setName('quad_0_13');
let levels = 5;
rs.quadParams.mangle = {lengthen:5.5,twist:.05*Math.PI};
rs.quadParams.emitLineSegs =1;

rs.quadParams.levels = levels;
levels++;
rs.splitParams = {fr0:0.5,fr1:0.5,fr2:0.2};
rs.quadSplitParams = function (qd) {
  let ornt = Math.random() < 0.5?'h':'v';
  let rs = this.splitParams;
  rs.ornt = ornt;
  return rs;
}

addDropMethods(rs);

rs.generateDrop = function (seg) {
  debugger;
  let c = seg.center();
  let ln = seg.length();
  if (Math.random() < 0.0) {
    let crc = Circle.mk(0.5*ln)
    let shp = crc.toShape(this.circleP);
    return {geometries:[crc],shapes:[shp]};
  }
  let {end0,end1} = seg;
  let nend0 = end0.difference(c).times(0.5);
  let nend1 = end1.difference(c).times(0.5);
  let nseg = LineSegment.mk(nend0,nend1);
  let shp = nseg.toShape(this.lineP,1);
  return {geometries:[nseg],shapes:[shp]};
}

rs.dropParams = {dropTries:150,maxDrops:5000,dropOnLineSegs:1,numIntersections:2};

export {rs};


