import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addAnimateMethods} from '/mlib/animate0.mjs';

let rs = basicP.instantiate();
addAnimateMethods(rs);
addDropMethods(rs);
rs.numSteps = 150;

rs.saveAnimation =1;
rs.noShapes =1;
//rs.saveState = 0;

rs.setName('moving_drop_0');
let ht= 1000;
let topParams = {width:ht,height:ht,framePadding:0.1*ht,frameStroke:'rgb(2,2,2)',sqdim:0.14*ht,sqoff:0.14*ht,sqfill:'rgba(30,30,60)'}
Object.assign(rs,topParams);

//let dropRect = Rectangle.mkCentered(Point.mk(2*ht,ht));
let dropRect = Rectangle.mkCentered(Point.mk(ht,ht));
rs.dropParams = {dropTries:150,scale:0.5,maxDrops:5000,radius:50,oneD:dropRect}

rs.duplicateDrops = function () {
  let {drops}= this;
  let ndrops = [];
  let ln = drops.length;
  for (let i=0;i<ln;i++) {
    let d = drops[i];
    let cnt = d.center;
    let r = d.radius;
    let ld = {center:cnt.plus(Point.mk(-0.5*ht,0)),radius:r,isDisk:1};
    let rd = {center:cnt.plus(Point.mk(0.5*ht,0)),radius:r,isDisk:1};
    ndrops.push(ld);
    ndrops.push(rd);
  }
  this.drops = ndrops;
}
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP.stroke = 'white';
  circleP['stroke-width'] =0;
  let circleP2 = this.circleP2 = circlePP.instantiate();
  circleP2.fill = 'white';
  circleP2.stroke = 'white';
  circleP2['stroke-width'] =0;
  let rectP = this.rectP = rectPP.instantiate();
  rectP.fill = 'black';
  rectP.stroke = 'white';
  rectP['stroke-width'] = 0;
  let rectP2= this.rectP2 = rectPP.instantiate();
  rectP2.fill = 'white';
  rectP2.fill = 'transparent';
  rectP2.fill = 'white';
  rectP2.stroke = 'white';
  rectP2['stroke-width'] = 0;
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 1;; 
}

let numSquaresToDrop=0;
let numSquaresDropped=0;
rs.generateDrop= function (p) {
  //debugger;
  let lft = (p.x < 0);
  let cSizes = [5,10];
 // cSizes = [10,20];
  let rSizes = [500];
  const randomSize = (sizeArray) => {
    let ln = sizeArray.length;
    let idx = Math.floor(ln * Math.random())
    return sizeArray[idx];
  }
  let tp;
  if (0 && (numSquaresDropped < numSquaresToDrop)) {
     tp  = (Math.random() < 1) ?'rect':'circle';
     if (tp === 'rect') {
       numSquaresDropped++;
     }
  } else {
    tp = 'circle';
  }
  let sz = randomSize(tp === 'rect'?rSizes:cSizes);
  let geom,shp;
  if (tp === 'rect') {
    geom = Rectangle.mk(Point.mk(-0.5*sz,-0.5*sz),Point.mk(sz,sz));
    geom.isSolid  = 1;
    shp = geom.toShape(lft?this.rectP:this.rectP2);
  } else {
    geom = Circle.mk(0.25*sz);
    geom.isDisk =1;
   // shp = geom.toShape(lft?this.circleP2:this.circleP);
    shp = geom.toShape(this.circleP);
  }
  

  return {geometries:[geom],shapes:[shp]}
}

rs.boxParams = function (efr) {
  let {bbw} = this;
  let hht = 0.5*ht;
  let mhht = -hht;
  let bbleft = mhht;// - 0.5 * bbw;
  let bbright = hht;// + 0.5 * bbw;
  let bbdelta = bbright - bbleft;
  let lft = efr <= 0.5;
  let mid = (0.5 < efr) && (efr <= 1);
  let rt = efr > 1;
  let lftp = 0.25 * bbdelta;
  let rtp = 0.75*bbdelta;
 
  let din = efr*bbdelta;//distance in
  let dtg = (1.5-efr)*bbdelta;
  let cbbx,bbwd;// center bb, bb wd
  if (lft) {
    cbbx  = bbleft + 0.5*din;
    bbwd = din;
  } 
  if (mid) {
    cbbx = bbleft + lftp  +  (efr-0.5)*bbdelta;
    bbwd = bbw;
  }
  if (rt) {
    debugger;
    cbbx = bbright - 0.5*dtg;
    bbwd = dtg;
  }
 return {pos:cbbx,width:bbwd}
}


rs.updateState = function () {
  let {stepsSoFar:ssf,numSteps,shapesC,bbw,blackBar0,blackBar1,positions,drops} = this;
  let {shapes} = shapesC;
  //debugger;
  this.placeShapes();
  let fr = (ssf/numSteps);
  let fr1 = (ssf/numSteps+(2/3))%1;
  let efr0 = 1.5*fr;
  let efr1 = 1.5*fr1;

  let x = (0.5-fr)*ht;
  let hht = 0.5*ht;
  let mhht = -hht;
 
  let bx0p = this.boxParams(efr0);
  let bx1p = this.boxParams(efr1);
  //let cbb0x = bxp0.pos;
  //let bb0wd = bxp0.width;
  //let hbbwd0 = 0.5*bbwd;
  blackBar0.width = bx0p.width;
  blackBar0.update();
    blackBar0.moveto(Point.mk(bx0p.pos,0));
 blackBar1.width = bx1p.width;
  blackBar1.update();
    blackBar1.moveto(Point.mk(bx1p.pos,0));
  let ln = drops.length;
  for (let i=0;i<ln;i++) {
    let sh = shapes[i];
    let d = drops[i];
    if (sh.placed) {
      let tr= sh.getTranslation();
      let trx = tr.x;
      let ax = x+trx;
      let hbx0wd = 0.5*(bx0p.width);
      let bx0pos = bx0p.pos;
      let hbx1wd = 0.5*(bx1p.width);
      let bx1pos = bx1p.pos;
      if ((((bx0pos - hbx0wd) <ax)&&(ax < (bx0pos + hbx0wd))) || (((bx1pos - hbx1wd) <ax)&&(ax < (bx1pos + hbx1wd)))) {
        sh.fill = 'white';
      } else {
        sh.fill = 'black';
      }
      if ((mhht<ax)&&(ax<hht)) {
        sh.show();
      } else {
      sh.hide();
      }
      sh.update();
    }
   // debugger;
  };
  
 
  let pos = Point.mk(x,0);
  shapesC.moveto(pos)
  
}

rs.installShapes = function () {
 let {drops,shapesC,circleP,stepsSoFar:ssf,numSteps } = this;
  let {shapes} = shapesC;
  debugger;
  let fr = ssf/numSteps;
  let x = (0.5-fr)*ht;
  let ln = drops.length;
  for (let i=0;i<ln;i++) {
   let d = drops[i];
   let sh = circleP.instantiate();
   sh.dimension = 2*(d.radius);
   //sh.moveto(d.center);
   shapes.push(sh);
 }
}

rs.placeShapes = function () {
  let {drops,shapesC,stepsSoFar:ssf,numSteps } = this;
  let {shapes} = shapesC;
  let fr = ssf/numSteps;
  let dx = (0.5-fr)*ht;
  let ln = drops.length;
  let hht = 0.5*ht;
  let mhht = -hht;
  let zp = Point.mk(-dx,0);
  for (let i=0;i<ln;i++) {
    let d = drops[i];
    let s = shapes[i];
    let cnt = d.center;
    let {x,y} = cnt;
    let ax = 1*(x+dx);
    if ((mhht<ax) && (ax < hht)) {
      s.moveto(cnt);
      s.show();
      s.placed = 1;
    } else {
      s.moveto(zp);
      s.hide();
      s.placed  = 0
    }
    s.update();
  }
}

   

rs.bbw = 500;
rs.initialize = function () {
  this.initProtos();
  let {dropParams,bbw} = this;
  debugger;
  this.addFrame();
  //this.addRectangle({width:0.5*ht,height:ht,position:Point.mk(-0.25*ht,0),stroke_width:0,fill:'rgb(0,0,0)'});
  this.addRectangle({width:ht,height:ht,position:Point.mk(0,0),stroke_width:0,fill:'rgb(255,255,255)'});
  let blackBar0 = this.rectP.instantiate();
  let blackBar1 = this.rectP.instantiate();
  //blackBar.fill = 'yellow';
  blackBar0.width = bbw;
  blackBar0.height = ht;
  this.set('blackBar0',blackBar0);
   blackBar1.width = bbw;
  blackBar1.height = ht;
  this.set('blackBar1',blackBar1);
  this.generateDrops(dropParams);
  this.duplicateDrops();
  this.installShapes();
  this.shapesC.moveto(Point.mk(0.5*ht,0));
  //this.installCircleDrops(drops,circleP);
}


export {rs};



