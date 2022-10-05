
import {rs as generatorP} from '/generators/part2_0.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';	
import {rs as addDropMethods} from '/mlib/drop.mjs';

let rs = generatorP.instantiate();

addWebMethods(rs);
addDropMethods(rs);

rs.setName('part2_0_20');
//let  webParams = {webTries:1000,minConnectorLength:0,maxConnectorLength:2000};
let  webParams = {webTries:5000,minConnectorLength:0,maxConnectorLength:8};
let dropParams = {dropTries:150}

let levels = 4;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

rs.qspa = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
rs.qspa.push({Case:7,pcs:[0.4,1.4,2.6,3.4]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

/*
rs.qspa = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
//rs.qspa.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.3,1.3,2.7,3.3],frs:[.3,0.7]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.3,1.4,2.7,3.3],frs:[.3,0.7]});
rs.qspa.push({Case:7,pcs:[0.3,1.3,2.7,3.3]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
*/
rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  let {polygon:pgon} = prt;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ln = pgon.corners.length;
  let cnt = pgon.center();
  //let wp = Math.floor(Math.random()*3);
  let lev = prt.where.length;
  let Case = lev%2?4:6;
  let dist = cnt.length();
 // let div = 0.3*Math.abs(Math.max(cnt.x,cnt.y))/hwd;
  let div = (0.15*dist/hwd) + .01;
  console.log('div',div);
  let qsp = {Case,pcs:[0.5-div,1.5-div,2.5+div,3.5-div],frs:[0.5-div,0.5+div]}
  
  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}

rs.thePoints = [];
rs.afterDisplayCell = function (prt) {
  let crc = this.circleP.instantiate()
  crc.dimension = 0.4;
  crc.fill = 'blue';
  this.shapes.push(crc);
  let {polygon:pgon} = prt;
  let cnt = pgon.center();
  crc.moveto(cnt);
  this.thePoints.push(cnt);
}

rs.adjustProtos = function () {
  this.lineP['stroke-width'] = 0.1;
}
rs.initialDrop = function (){
  let {connectSegs} = this;
  return {geometries:connectSegs,shapes:[]}
}

rs.generateDrop= function (p) {
  let geom = Circle.mk(2);
  geom.isDisk =1;
  let shp = geom.toShape(this.circleP,0.1);
  return {geometries:[geom],shapes:[shp]};
}

rs.afterInitialize = function () {
  let {thePoints:points,lineP} = this;
  debugger;
  this.generateWeb(Object.assign(webParams,{points,lineP}));
   this.generateDrops(dropParams);
}
let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
//rs.computeExponentials({dest:strokeWidths,n:20,root:0.1,factor:.7});
rs.computeExponentials({dest:strokeWidths,n:20,root:0,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


