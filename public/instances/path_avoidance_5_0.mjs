import {rs as generatorP} from '/generators/path_avoidance_5.mjs';

let rs = generatorP.instantiate();

rs.setName('path_avoidance_5_0');

addPathMethods(rs);

let ht = rs.ht= 100;
let d=0.5*ht;
let fade = 1;
let topParams = {width:rs.ht,height:rs.ht,framePadding:1*ht,frameStrokee:'white',frameStrokeWidth:1}

Object.assign(rs,topParams);
rs.numH = 2;

rs.ngaps = function (x) {
  let g0 = -x-2*d;
  let g1 = x;
  let g2 = -x;
  let g3 = x+ 2*d;
  return [g0,g1,g2,g3];
}

rs.pgaps = function (x) {
  let g0 = x-2*d;
  let g1 = -x;
  let g2 = x;
  let g3 = 2*d -x;
  return [g0,g1,g2,g3];
}

rs.zgaps = function () {
  let g0 = -2*d;
  let g1 = 0;
  let g2 = 2*d;
  return [g0,g1,g2];
}

rs.gap = 5;
rs.gap = 9;
rs.gap = 15;

rs.numV = 8; //on each side
rs.numV = 32; //on each side
//rs.numV = 4;
rs.addLines = function (x,up) {
  debugger;
  let {gap,lineP,linesUp,linesDown,lineDataUp,lineDataDown} = this;
  let upColor = 'red';
  let downColor = 'blue';
  downColor = 'white';
  upColor = 'white';
  let tgap = 2*gap;
  //let tgap = gap;
  let gaps,zc;
  if  (x<0) {
    gaps = this.ngaps(x);
  } else if (x>0) {
    gaps = this.pgaps(x);
  } else {
    gaps = this.zgaps();
    zc = 1;
  }
  let [g0,g1,g2,g3,g4] = gaps;
  let L0e0 = Point.mk(x,-2*d);
  let L0e1 = Point.mk(x,g0-gap);
  let L1e0 = Point.mk(x,g0+gap);
  let L1e1 = Point.mk(x,g1-gap);
  let L2e0 = Point.mk(x,g1+gap);
  let L2e1 = Point.mk(x,g2-gap); 
 let L3e0 = Point.mk(x,g2+gap);
  let L3e1 = Point.mk(x,g3-gap); 
  let L4e0 = Point.mk(x,g3+gap);
  let L4e1 = Point.mk(x,2*d); 
  const addLine = (e0,e1,outside) => {
    if (e0.distance(e1) > (outside?gap:tgap)) {
      let line = lineP.instantiate();
      line.stroke = up?upColor:downColor;
      line.setEnds(e0,e1);
      let lineDat = {line,e0,e1};
      if (up) {
        lineDataUp.push(lineDat);
      } else {
        lineDataDown.push(lineDat);
      }
      line.show();
      if (up) {
        linesUp.push(line);
      } else {
        linesDown.push(line);
      }
      line.update();

    } 
  }
  addLine(L0e0,L0e1,1);
  addLine(L1e0,L1e1,0);
  addLine(L2e0,L2e1,0);
  if (!zc) {
    addLine(L3e0,L3e1,0);
    addLine(L4e0,L4e1,1);
  }
}

rs.addAllLines = function () {
  let {numV} = this;
  let delta = d/numV;
  let hdelta = 0.5*delta;
  for (let i=0;i<numV;i++) {
    this.addLines(-i*delta);
  }
  for (let i=1;i<numV;i++) {
    this.addLines(i*delta);
  }
   for (let i=0;i<numV;i++) {
    this.addLines(-hdelta-i*delta,1);
  }
  for (let i=0;i<numV;i++) {
    this.addLines(hdelta+i*delta,1);
  }
}

rs.adjustLine = function (ld,y) {
  let {line,e0,e1} = ld;
  let ae0y = y+e0.y;
  let ae1y = y+e1.y;
  if (ae0y > ae1y) {
    debugger;
  }
  if ((ae0y >d) && (ae1y > d)) {
    line.hide();
  } else if ((ae1y < -d) && (ae1y < -d)) {
    line.hide();
  } else {
    ae1y = Math.min(ae1y,d);
    ae0y = Math.max(ae0y,-d);
    let ae0 = Point.mk(e0.x,ae0y);
    let ae1 = Point.mk(e1.x,ae1y);
    line.show();
    line.setEnds(ae0,ae1);
  }
  line.update();
}

rs.adjustLines = function (y) {
 // debugger;
  let {lineDataDown,lineDataUp} = this;
  let lnd = lineDataDown.length;
  for (let i = 0;i<lnd;i++) {
    let ld = lineDataDown[i];
    if (i ===1) {
      debugger;
    }
   this.adjustLine(ld,y);
  };
  lineDataUp.forEach((ld) => {
   this.adjustLine(ld,-y);
  });
}
 
   



  
 let initState = {time:0};
  let pspace = {};
rs.pstate = {pspace,cstate:initState}
let stepH = 1;
let stepV = 1.01;
let minH = -d;
let maxH = d;



rs.addHpaths = function () {
  debugger;
  let nm0 = 'h0';
  let nm1 = 'h1';
  pspace[nm0] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:0};
  initState[nm0] = {value:minH,y:0};
  pspace[nm1] ={kind:'sweep',step:stepH,min:minH,max:maxH,interval:1,once:0};
  initState[nm1] = {value:minH,y:0};
}


rs.updateStateOfH= function (n){
 // debugger;
  let {stepsSoFar:ssf} = this;
  let nm = 'h'+n;
    let stt = Math.floor(1.0*(ht/stepH));
  let {hTravelers,pstate} = this;
  let {pspace,cstate} = pstate;
  let cs = cstate[nm];
  let {value:iv,done,y} = cs;
 // let v = (n===0)?iv: -5-iv;
  let v = (n===0)?iv: -iv;
  let pos = Point.mk(v,y);
  let tr = hTravelers[n];
  /*if (((ssf>stt)&&(n===0))||((ssf <= stt)&&(n===1))) {
    tr.hide();
  } else {*/
    tr.show();
    tr.moveto(pos);
  //}
  tr.update();
}


let vStep=5;

rs.updateState = function () {
  //debugger;
  let {stepsSoFar:ssf,numSteps,cycleTime,lines} = this;
  console.log('ssf',ssf);
  //this.updateStateOfH(0);
  //this.updateStateOfH(1);
  let step = stepV*ssf-1-d;
  console.log('step',step);
 // if (ssf < 2*cycleTime) {
   // this.adjustLines(stepV*ssf-2-d);
    this.adjustLines(step);
  /*}  else { 
    this.adjustLines(stepV*(ssf-2*cycleTime)-2-d);
  }*/

}
  
  
rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'white';
  circleP['stroke-width'] = 0;
  circleP.dimension =0.1*this.ht;
  let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP.fill = 'blue';
  polygonP.fill = 'transparent';
  circleP.dimension =0.1*this.ht;
    let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = 0.5;
}  


rs.numSteps = 2.4*Math.floor(ht/stepH);
rs.numSteps = 2*Math.floor(ht/stepH);
let cycleTime = rs.cycleTime = Math.floor(ht/stepH); 
rs.numSteps = cycleTime+1;
//rs.numSteps = 3*cycleTime+2;
rs.chopOffBeginning =0;
rs.saveAnimation = 1;
rs.initialize = function () {
  debugger;
  let {numH,numV} = this;
 this.setBackgroundColor('black');

  this.initProtos();
  this.addFrame();
  let hTtravelers = this.set('hTravelers',arrayShape.mk());

  this.set('linesUp',arrayShape.mk());
  this.set('linesDown',arrayShape.mk());
  let lineDataUp = this.lineDataUp = [];
  let lineDataDown = this.lineDataDown = [];
  this.addAllLines();
  return;
 // this.adjustLines(-2-d);  
  let gond = 0.1*this.ht;
  let gon0 = this.polygonP.instantiate();
  gon0.corners  = [Point.mk(-gond,0),Point.mk(0,gond),Point.mk(gond,0),Point.mk(0,-gond)];
  hTtravelers.push(gon0);
  let gon1 = this.polygonP.instantiate();
  gon1.corners  = [Point.mk(-gond,0),Point.mk(0,gond),Point.mk(gond,0),Point.mk(0,-gond)];
  hTtravelers.push(gon1); 
  this.addHpaths();
  
}

export {rs};


