
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicsP.instantiate();

addDropMethods(rs);
//addRandomMethods(rs);
//addSegsetMethods(rs);
//addWebMethods(rs);
rs.setName('drop_on_top_7');
let ht = 160;
ht = 320;
ht = 640;
let nr = 100;
nr = 200;
nr = 70;
nr = 20;
//nr = 40;
let wd = 2*ht;
let gv =60;
let dv = 50;
let topParams = {width:wd,height:ht,numRows:nr,numCols:2*nr,frameStroke:'white',framePadding:0.1*ht,circleScale:1,circleSize:0.2,
 initialDropColor:[dv,dv,dv,0.5],middleDropColor:[255,255,255,1],finalDropColor:[dv,dv,dv,0.5],
 initialGridColor:[0,0,255,1],middleGridColor:[255,255,255,1],finalGridColor:[255,0,0,1]};
//let dropParams = {dropTries:100,maxDrops:4000}
let dropParams = {dropTries:100,maxDrops:10000,numIntersectionss:1};
//dropParams = {dropTries:0,maxDrops:0}

Object.assign(rs,topParams);



rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP.stroke = 'transparent';
  this.lineP.stroke = 'rgb(200,200,200)';
  this.lineP['stroke-width'] = .6; 
  this.circleP = circlePP.instantiate();
  this.circleP.fill = 'white';
  this.circleP['stroke-width'] = 0;
}  

//const interpolate = function (fr,domainL,domainH,rangeL,rangeH) {
const interpolate = function (fr,rangeL,rangeH) {
//  let fr = (cDomain-domainL)/(domainH-domainL);
  return rangeL + fr*(rangeH-rangeL);
}


rs.interpolateColor = function (fra,ic,fc) {
  let [ir,ig,ib,ia] = ic;
  let [fr,fg,fb,fa] = fc;
  let r = interpolate(fra,ir,fr);
  let g = interpolate(fra,ig,fg);
  let b = interpolate(fra,ib,fb);
  let a = interpolate(fra,ia,fa);
  let cl = `rgba(${r},${g},${b},${a})`;
  return cl;
}
//left and right are vertical segments
const mkAGrid = function (left,right,numCols,numRows) {
  let {end0:ll,end1:lh} = left;
  let {end0:rl,end1:rh} = right;
  let {x:lx,y:lly} = ll;
  let {y:lhy} = lh;
  let {x:hx,y:rly} = rl;
  let {y:rhy} = rh;
  let x = lx;
  let pnts = [];
  let xi =Math.abs((hx-lx)/numCols);

  for (let i = 0;i<=numCols;i++) {
    let xfr = i/(numCols-1);
    let ly = interpolate(xfr,lly,rly);
    let hy = interpolate(xfr,lhy,rhy);
    //let yi =Math.abs((hy-ly)/numCols);
    //let yi =Math.abs((hy-ly)/numRows);
   // let yi =Math.abs((hy-ly)/numRows);
    
    for (let j = 0;j<numRows;j++) {
      let yfr = j/(numRows-1);
      let y = interpolate(yfr,ly,hy);
      pnts.push(Point.mk(x,y));
    }
    x = x+xi;
  }
  return pnts;
 }



rs.initialDrop = function (side) {
  let {circleP,circleScale:cs,circleSize:csz,width:wd,height:ht,numRows:nr,numCols:nc,lineP,
  initialGridColor:ic,middleGridColor:mc,finalGridColor:fc} = this;
  let hwd = 0.5*wd;
  let crca = [];
  let crcsa = [];
  let delta = wd/nc;
  debugger;
  let lseg = LineSegment.mk(Point.mk(-wd/2,-ht/2),Point.mk(-wd/2,ht/2));
  let rseg = LineSegment.mk(Point.mk(wd/2,-ht/2),Point.mk(wd/2,ht/2));  
   let lsegs = lseg.toShape(lineP);
  let rsegs = rseg.toShape(lineP);
  crcsa.push(lsegs);
 crcsa.push(rsegs); 

  let pnts = mkAGrid(lseg,rseg,nc,nr);
 // let {circleP,initialDropColor} = this;
  let fr,cl;
  pnts.forEach( (ip) => {
    let {x,y} = ip;
    if (x < 0) {
      fr = (x+0.5*wd)/hwd;
      cl = this.interpolateColor(fr,ic,mc);
    } else {
      fr = x/hwd;
      cl = this.interpolateColor(fr,mc,fc);
    }
    let p = Point.mk(x,y);
 //   let crc = Circle.mk(p,4);
    let crc = Circle.mk(p,csz*delta);
    let crcs = crc.toShape(circleP,cs);
    crcs.fill = cl;
    crca.push(crc);
    crcsa.push(crcs);
  });
  return {geometries:crca,shapes:crcsa};
 } 

  
rs.generateDrop = function (p) {
  let {initialDropColor:ic,middleDropColor:mc,finalDropColor:fc,circleScale:cs,circleSize:csz,width:wd,numCols:nc} = this;
  debugger;
  let hwd = 0.5*wd;
  let delta = wd/nc;
  let {x,y} = p;
  let fr,cl;
  if (x < 0) {
    fr = (x+0.5*wd)/hwd;
    cl = this.interpolateColor(fr,ic,mc);
  } else {
    fr = x/hwd;
    cl = this.interpolateColor(fr,mc,fc);
  }
  let crc = Circle.mk(csz*delta);
  let crcs = crc.toShape(this.circleP,cs);
  crcs.dropped = 1;
  crcs . fill = cl;
  return {geometries:[crc],shapes:[crcs]}
}






rs.initialize = function () {
  this.initProtos();
  this.addFrame();
   this.generateDrops(dropParams);
}

export {rs};



