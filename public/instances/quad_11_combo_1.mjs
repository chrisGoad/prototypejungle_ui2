import {rs as generatorP} from '/generators/quad_11.mjs';

import {rs as addPointGenMethods} from '/mlib/pointGen.mjs';
import {rs as basicP} from '/generators/basics.mjs';

let rs = basicP.instantiate();

addPointGenMethods(rs);
rs.setName('quad_11_combo_1');



let quads = rs.set('quads',arrayShape.mk());
for (let i=0;i<7;i++) {
 quads.push(generatorP.instantiate());
}

let wd = quads[0].width;

let pnts = rs.ringPoints({radius:wd,numRings:2,ringSeparation:0.5*wd,numPointsPerRing:6});

const ringPointsToPolygons = function (pnts) {
  let ppr = 0.5*(pnts.length);
  let rs = [];
  for (let i=0;i<ppr;i++) {
    let p0 = pnts[i].copy();
    let p1 = pnts[(i+1)%ppr].copy();
    let p2 = pnts[ppr + (i+1)%ppr].copy();
    let p3 = pnts[ppr + i].copy();
    let corners = arrayShape.mk([p0,p1,p2,p3]);
    let pgon = Polygon.mk(corners)
    rs.push(pgon);
  }
  return rs;
}
debugger;
    
let pgons = ringPointsToPolygons(pnts);
  
  
rs.initialize = function () {
  debugger;
   quads[0].initProtos();
   let polygonP = quads[0].polygonP;
  let pgonshs =  this.set('pgons',arrayShape.mk());
  pgons.forEach((pgon) => {
    let pgonsh = pgon.toShape(polygonP);
    pgonsh['stroke-width'] = .1;
    pgonsh.fill = 'rgb(0,0,50)';
    pgonshs.push(pgonsh);
  });
  const addQuad = (qdIdx,pgIdx,offc) => {
    let qd = quads[qdIdx];
    let pgon = pgons[pgIdx];
    qd.initialPolygon = pgon;
    qd.quadParams.levels = 7;
    qd.offCenter = offc;
    qd.initialize();
   }
  addQuad(0,4,0);
  addQuad(1,5,0);//.075);
  addQuad(2,0,0);//.13);
  addQuad(3,1,0);//.2);
  addQuad(4,2,0.0);//75);
  addQuad(5,3,0)//.13);
  quads[6].levels = 7;
  quads[6].initialize();
  //return;
 
  
     
/*  p2.initialize();
  p1.moveto(Point.mk(0,-mv));
  p2.moveto(Point.mk(0,mv));*/
}
export {rs};


