
import {rs as basicP} from '/generators/basics.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
let wd = 200;
Object.assign(rs,{width:wd,height:wd,framePadding:.1,frameStroke:'white'});

addPathMethods(rs);
rs.rectangular = 1;
rs.setName('part2_0_39');

let minr = 45;
let maxr = 50;

let minx = -10.1;
let maxx = 10.1;

let miny = -5;
let maxy = 5;
let kind ='randomSteps';
kind ='randomValue';
kind ='sweep';
let nr = 9;
nr = 1;
const buildEm = function (n) {
  let initS = {};
  let ps = {};
  for (let i=0;i<n;i++) {
    for (let j=0;j<n;j++) {
      let rnm = ('r'+i)+j;
      let xnm = ('x'+i)+j;
      let ynm = ('y'+i)+j;
      initS[rnm] = {value:minr+Math.floor(Math.random()*(maxr-minr)),theta:0};
      ps[rnm] = {kind,step:.05,min:minr,max:maxr,interval:1,steps:0.5};
       initS[xnm] = {value:minx+Math.floor(Math.random()*(maxx-minx)),theta:0};
      ps[xnm] = {kind,step:.5,min:minx,max:maxx,interval:1,steps:0.5};
       //initS[ynm] = {value:miny+Math.floor(Math.random()*(maxy-miny)),theta:0};
       initS[ynm] = {value:0,theta:0};
      ps[ynm] = {kind,step:.7,min:miny,max:maxy,interval:1,steps:0.5};
    }
  }
  return {initState:initS,pspace:ps}
}  
let bem = buildEm(nr);
let {initState,pspace} = bem;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

 
rs.updateState = function () {
  debugger;
  let cstate = this.pstate.cstate;
  for (let i=0;i<nr;i++) {
    for (let j=0;j<nr;j++) {
      let rnm = ('r'+i)+j;
      let xnm = ('x'+i)+j;
      let ynm = ('y'+i)+j;
      let cnm = ('c'+i)+j;
      let c = this[cnm]
      let cs = cstate[rnm];
      let xs = cstate[xnm];
      let ys = cstate[ynm];
      let r = cs.value;
      let x = xs.value;
      x = cs.cx;
      let y = ys.value;
      //y = 0;
      console.log('r',r);
      let vel = .2;
      let {theta,opos,lastPos} = cs;
      let pos = Point.mk(r*Math.cos(theta),r*Math.sin(theta));
      let cpos = Point.mk(x,y);
      cs.theta = cs.theta+vel;
     // let npos = pos.plus(cpos.plus(opos))
      let npos = cpos.plus(opos)
      c.moveto(npos);
      c.update();
      if (lastPos) {
        let line = this.lineP.instantiate();
        line.setEnds(lastPos,npos);
        this.shapes.push(line);
        line.update();
      }
      cs.cx = (x>93.5)?-93.5:x+5;
      cs.lastPos = npos;

    }
  }
  draw.refresh();
}

rs.numSteps = 1000;
rs.numISteps = 20;
rs.saveAnimation = 0;
rs.stepInterval = 40;


let dim = 100;
rs.initialize = function () {
  debugger;
  this.circleP = circlePP.instantiate();
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke= 'white';
  lineP['stroke-width'] = .3;
  this.shapes = this.set('shapes',arrayShape.mk());
  this.addFrame();
  const addCirc = (p,i,j) => {
    let crc = this.circleP.instantiate();
    let nm = ('a'+i)+j;
    /*
    let dimv = initState[nm];
    if (!dimv) {
      debugger;
    }
    crc.dimension = dimv.value;
    */
    crc.dimension = 4;
    crc.fill = 'white';//Math.random()<0.5?'blue':'blue';
    this.set(('c'+i)+j,crc);
    crc.moveto(p);
    let cv = initState[('r'+i)+j];
    cv.cx =-100;
    cv.opos = p;
  }
  for (let i=0;i<nr;i++) {
    for (let j=0;j<nr;j++) {
      let hi = (nr-1)/2;
      let p = Point.mk(dim*(i-hi),dim*(j-hi));
      addCirc(p,i,j);
    }
  }
}

export {rs};


