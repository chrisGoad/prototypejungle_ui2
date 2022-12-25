import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_3');
let levels = 9;
levels = 7;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

rs.qspa = [];
let stops0 = [0,1,0,0];
stops0 = [];
let stops1 = [2];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4,stops:stops0});
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.3,pc1:1.3,pc2:2.7,pc3:3.3,stops:stops0});
rs.qspa.push({Case:3,vertexNum:0,pcs:[0.45,1.45,2.55,3.45],stops:stops0});
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6],stops:stops0});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6],stops:stops0});
rs.qspa.push({Case:7,pcs:[0.4,1.4,2.6,3.4],stops:stops0});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pcs:[0.4,1.4,2.6,3.4],stops:stops0});

rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3],stopss:stops0};
rs.wps = [0,0,0,2,3,2,3,2,3,2];
rs.wps = [0,0,0,1,3,1,3,1,3,1];
rs.partSplitParams = function (prt) {
  let ln = prt.polygon.corners.length
  let wp = Math.floor(Math.random()*4);
      let lev = prt.where.length;
  wp = this.wps[lev];
  //wp = lev%3;
  let qsp = this.qspa[wp];
  let tsp = this.triSplitParams1;
  //tsp = null;
  let rs = (ln === 3)?tsp:qsp;
  return rs;
}

rs.firstNvaluesEqual = function (a,n,v) {
  let ln = a.length;
  if (ln < n) {
    return false;
  }
   // debugger;

  for (let i=0;i<n;i++) {
    let cv = a[i][0];
    if (cv !== v) {
      return false;
    }
  }
  return true;
}

rs.partFill = function (prt) {
   let lev = prt.where.length;
   let fnv =this.firstNvaluesEqual(prt.where,3,'P0')
   if (fnv) {
     if (lev === 3) {
       this.portal = prt.polygon;
       debugger;
     }
     return 'black';
   }
   return 'rgb(50,50,50)';
}

rs.partStroke = function (prt) {
   let lev = prt.where.length;
   let fnv =this.firstNvaluesEqual(prt.where,3,'P0')
   if (fnv) {
     return 'transparent';
   }
   return 'white';
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);
//rs.addToArray(visibles,1,levels);

let strokeWidths = rs.partParams.strokeWidths = [];
//rs.computeExponentials({dest:strokeWidths,n:4,factor:0.7,root:.4});
rs.computeExponentials({dest:strokeWidths,n:20,factor:0.7,root:.4});

//rs.adjustProtos = function () {
rs.addCircle = function (p) {
   let crc = this.circleP.instantiate();
  crc.dimension=Math.random()*0.4;;
  crc.fill = 'white';
  crc.moveto(p);
  this.circles.push(crc);

}
rs.afterInitialize = function () {
  debugger;
  let {portal} = this;
  this.set('circles',arrayShape.mk());
  let pc = portal.contains(Point.mk(0,0));
  for (let i = 0;i<100;i++) {
    let dim = 40;
    let x = (Math.random()-0.5)*dim;
    let y = (Math.random()-0.5)*dim;
    let p = Point.mk(x,y);
    if (portal.contains(p)) {
      this.addCircle(p);
    }
  }
  
}
//rs.addToArray(strokeWidths,.1,levels);
export {rs};

