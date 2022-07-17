
import {rs as linePP} from '/shape/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicsP.instantiate();

addDropMethods(rs);
addRandomMethods(rs);
addSegsetMethods(rs);
addWebMethods(rs);
rs.setName('drop_on_top_6');
let ht = 160;
ht = 320;
ht = 640;
let nr = 100;
nr = 200;
nr = 70;
nr = 30;
//nr = 40;
let wd = ht;
let gv =60;
let topParams = {width:wd,height:ht,numRows:nr,numCols:nr,frameStroke:'white',framePadding:20,circleScale:.5,//};
 //initialDropColor:'rgb(200,200,255)',finalDropColor:'rgb(0,0,100,255)'};
 initialDropColor:'rgb(255,255,255)',finalDropColor:`rgb(${gv},${gv},${gv}`};
//let dropParams = {dropTries:100,maxDrops:4000}
let dropParams = {dropTries:100,maxDrops:10000};
//dropParams = {dropTries:0,maxDrops:0}
let  webParams = {webTries:1000,minConnectorLength:0,maxConnectorLength:2*(wd/nr)};

Object.assign(rs,topParams);


rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP.stroke = 'transparent';
  this.lineP.stroke = 'rgb(200,200,200)';
  this.lineP['stroke-width'] = 1.2; 
  this.circleP = circlePP.instantiate();
  this.circleP.fill = 'white';
  this.circleP['stroke-width'] = 0;
}  

//const interpolate = function (fr,domainL,domainH,rangeL,rangeH) {
const interpolate = function (fr,rangeL,rangeH) {
//  let fr = (cDomain-domainL)/(domainH-domainL);
  return rangeL + fr*(rangeH-rangeL);
}

//left and right are vertical segments
const mkAGrid = function (left,right,numCols,numRows) {
  let {end0:ll,end1:lh} = left;
  let {end0:rl,end1:rh} = right;
  let {x:lx,y:lly} = ll;
  let {y:lhy} = lh;
  let {x:rx,y:rly} = rl;
  let {y:rhy} = rh;
  let x = lx;
  let pnts = [];
  for (let i = 0;i<numCols;i++) {
    let xfr = i/(numCols-1);
    let ly = interpolate(xfr,lly,rly);
    let hy = interpolate(xfr,lhy,rhy);
    //let yi =Math.abs((hy-ly)/numCols);
    let yi =Math.abs((hy-ly)/numRows);
    
    for (let j = 0;j<numRows;j++) {
      let yfr = j/(numRows-1);
      let y = interpolate(yfr,ly,hy);
      pnts.push(Point.mk(x,y));
    }
    x = x+yi;
    console.log('x',x,'rx',rx);
    if (x > rx) {
      break;
    }
  }
  return pnts;
 }


let allSpots = [];

rs.initialDrop = function (side) {
  let {circleScale:cs,numRows:nr,numCols:nc,lineP} = this;
  let crca = [];
  let crcsa = [];
  let delta =40;
  debugger;
  let llseg = LineSegment.mk(Point.mk(-wd/2,-ht/8),Point.mk(-wd/2,ht/8));
  let lrseg = LineSegment.mk(Point.mk(0,-ht/2),Point.mk(0,ht/2));  
 // let mlseg = LineSegment.mk(Point.mk(-wd/4,-ht/2),Point.mk(-wd/4,ht/2));
  //let mrseg = LineSegment.mk(Point.mk(0,-ht/2),Point.mk(0,ht/2));
  //let rlseg = LineSegment.mk(Point.mk(0,-ht/2),Point.mk(wd/4-delta,ht/2));
 //let rlseg = LineSegment.mk(Point.mk(wd/4-delta,-ht/2),Point.mk(0,ht/2));
 // let rrseg = LineSegment.mk(Point.mk(wd/2,-ht/8),Point.mk(wd/2,ht/8));
  //let llsegs = llseg.toShape(lineP);
  let lrsegs = lrseg.toShape(lineP);
 // crcsa.push(llsegs);
 // crcsa.push(lrsegs); 
  //let mlsegs = mlseg.toShape(lineP);
  //let mrsegs = mrseg.toShape(lineP);
  crcsa.push(lrsegs);
 // crcsa.push(mrsegs);
  let lpnts = mkAGrid(llseg,lrseg,nc,nr);
  //lpnts = lpnts.filter( (p) => p.x < -wd/4-20);
  //let mpnts = mkAGrid(mlseg,mrseg,nc/2,nr);
  //let rpnts = mkAGrid(rlseg,rrseg,nr,nc);
 // rpnts = rpnts.filter( (p) => p.x > wd/4);

 // let pnts = mpnts.concat(lpnts,rpnts);
  //let pnts = mpnts.concat(lpnts);
  let {circleP,initialDropColor} = this;
  lpnts.forEach( (ip) => {
    let p = Point.mk(ip.x,ip.y);
    let crc = Circle.mk(p,4);
    let crcs = crc.toShape(circleP,cs);
    crcs.fill = initialDropColor;
    crca.push(crc);
    allSpots.push(crc);
    crcsa.push(crcs);
  });
  return {geometries:crca,shapes:crcsa};
 } 

/*
rs.initialDrop = function () {
  this.initialDrop0('left');
 // this.initialDrop0('right');
  return {geometries:crca,shapes:crcsa};

}*/
rs.segParams = function (np) {
  let r = Math.random();
 // let np = 4;
  let angle = (np === -1)?Math.PI/2:Math.floor(r*np)* (Math.PI/np)
  let length = 2;// + Math.floor(r*np)*4;
  return {angle,length};
} 	

  
rs.generateDrop = function (p) {
  if (0 ||  (p.x > 0)) {
    return;
  }
  let {initialDropColor,finalDropColor,circleScale:cs} = this;
  let crc = Circle.mk(4);
  let crcs = crc.toShape(this.circleP,cs);
  crcs.dropped = 1;
  crcs . fill = initialDropColor;
  return {geometries:[crc],shapes:[crcs]}
}

rs.reflect = function () {
  let {initialDropColor,finalDropColor,circleScale:cs,circleP,shapes} = this;
  debugger;
  allSpots.forEach ((sp) => {
    let {center:c,radius:r} = sp;
    let {x,y} = c;
    let nc = Point.mk(-x,y);
    let nsp = Circle.mk(nc,r);
    let crcs = nsp.toShape(circleP,cs);
  crcs . fill = initialDropColor;
   shapes.push(crcs);
    debugger;
  });
}


rs.reflect = function () {
  let {initialDropColor,finalDropColor,circleScale:cs,circleP,shapes} = this;
  debugger;
  shapes.forEach ((sh) => {
    let tr = sh.getTranslation();
    let crc = Circle.mk(4);
    let crcs = crc.toShape(circleP,cs);
    let {x,y} = tr;
    let ntr = Point.mk(-x,y);
    crcs.moveto(ntr);
    let dr = sh.dropped;
  crcs . fill = dr?finalDropColor:initialDropColor;
   shapes.push(crcs);
    debugger;
  });
}



rs.initialize = function () {
  this.initProtos();
  this.addFrame();
   this.generateDrops(dropParams);
  rs.reflect();
}

export {rs};



