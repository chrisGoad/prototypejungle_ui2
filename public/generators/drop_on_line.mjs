import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
//import {rs as oneDf}  from '/mlib/oneDf.mjs';

debugger;
let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_on_line');
let ht= 3200;
let topParams = {width:ht,height:ht,framePadding:0.2*ht,frameStroke:'white'}
Object.assign(rs,topParams);

let dropParams = {dropTries:150,numIntersections:1}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'rgba(100,100,100,0.3)';
  circleP.stroke = 'black';
  circleP['stroke-width'] = 10;
}  

let lnLen = 3400;
rs.generateDrop= function (oneD) {
  debugger;
  let p = oneD.value;
  let fr = (2*p.length())/lnLen;
  //let crc = Circle.mk(.01*ln);
  //let crc = Circle.mk(5+(1-fr)*20);
  let crc = Circle.mk(10);
  let crcs = crc.toShape(this.circleP,1);
  let ornt = oneD.part.ornt;
  //let fill = (ornt === 'h')?'rgba(0,0,255,0.5)':'rgba(255,0,0,0.5)';
  let v=200;
  let fill = (ornt === 'h')?`rgba(${v},${v},${v},0.2)`:`rgba(${v},${v},${v},0.2)`;
  crcs.fill = fill;
  return {geometries:[crc],shapes:[crcs]}; 
 }

rs.initialize = function () {
  debugger;
  this.setBackgroundColor('white');
  //this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  let hln = 0.5*lnLen;
  let sline = oneDf.mk();
  let mv = 0.5*lnLen;
  const mkVline = (x) => {
    let top=-mv;
    let bot = -top;
    let p0 = Point.mk(x,top);
    let p1 = Point.mk(x,bot);  
    let vline = oneDf.mkStraight(p0,p1);
    vline.ornt = 'v';
    return vline;
  }
  const mkHline = (y) => {
    let left=-mv;
    let right = -left;
    let p0 = Point.mk(left,y);
    let p1 = Point.mk(right,y);  
    let hline = oneDf.mkStraight(p0,p1);
    hline.ornt = 'h';
    return hline;
  }
  let lines = [];
  for (let i=-9;i<10;i++) {
    let x = 80*i;
    lines.push(mkVline(x));
  }
   for (let i=-9;i<10;i++) {
    let y = 80*i;
    lines.push(mkHline(y));
  }
  
  sline.mixin(lines);
  dropParams.oneD = sline;
  let vs = [];
  for (let i=0;i<10;i++)  {
    let v = sline.randomPoint();
    vs.push(v);
  }
    let drops =  this.generateDrops(dropParams);

}

export {rs};

