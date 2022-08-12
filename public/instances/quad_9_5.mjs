
import {rs as generatorP} from '/generators/quad_9.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';



let rs = generatorP.instantiate();
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

rs.dropParams = {dropTries:150,maxDrops:5000,dropOnLineSegs:1,numIntersections:10};

rs.setName('quad_9_5');
let levels = 5;
rs.quadParams.levels = levels;
levels++;
rs.fr0 = 0.5;
rs.fr1 = 0.5;
rs.fr2 = 0.2;
rs.emitLineSegs = 1;
let mangles = rs.mangles = [];
rs.addToArray(mangles,1,levels);

let visibles = rs.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);
let lengthenings = rs.lengthenings = [];
rs.addToArray(lengthenings,.5,levels);
let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
rs.addToArray(twists,0.05*Math.PI,levels);
let strokeWidths = rs.strokeWidths = [];
//strokeWidths = rs.computeExponentials(quadParams.levels,0.1,0.9);
rs.addToArray(strokeWidths,.1,levels);

export {rs};


