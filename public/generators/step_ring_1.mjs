//import {rs as rectanglePP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';

//import {rs as generatorP} from '/generators/step_arrays.mjs';

import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/animate0.mjs';	
import {rs as addPathInParts} from '/mlib/path_in_parts.mjs';
let rs = basicP.instantiate();
addPathMethods(rs);
//addPathInParts(rs);

let wd = 300;
rs.setName('step_ring_1');
let topParams = {width:wd,height:wd,framePadding:.1*wd,frameStroke:'white',frameStrokeWidth:1,saveAnimation:1,numSteps:1000}
Object.assign(rs,topParams);


rs.pstate = {pspace:{},cstate:{}}

rs.arrayLen = 3;

rs.numCycles = 6;
rs.duration = 30;
rs.pauseDuration = 10;

rs.gridDim = 20;

rs.nvs = function (a,v,n) {
  for (let i=0;i<n;i++) {
    a.push(v);
  }
}

rs.numSpokes = 50;
rs.polysides = 3;
rs.radiusArray = [10,20,30,10,10,10];
let ra = rs.radiusArray = [];
rs.nvs(ra,1,1);

rs.nvs(ra,4,5);
let sa = rs.sepArray = [];
rs.nvs(sa,20,4);
rs.nvs(sa,20,2);
rs.nvs(sa,40,2);
rs.radiusFactor = 1.2;
rs.sepArray = [10,10,10,20,20,35,128];
rs.projectArray = [9,8,7,6,5,4,3];
rs.projectArray  =[3,4,5,6,7,0];

let spa =rs.spinArray = [];
rs.nvs(spa,0,7);
let spb = 0.5;
rs.spinSpeedArray = [spb*7,spb*6,spb*5,spb*4,spb*3,spb*2,spb];
rs.nthRingDist = function (n) { //to the outside of the  nth ring
  let {radiusArray,sepArray} = this;
  let dsf = 0;
  let r;
  for (let i=0;i<=n;i++) {
    r = radiusArray[i];
    let s = sepArray[i];
    dsf = dsf + s + 2*r;
  }
  return dsf - r;
}


rs.addPath = function (nm) {
  let {pstate,names} = this;
  let {pspace,cstate} = pstate;
  let dur = this.duration;
  names.push(nm);
  pspace[nm] = {kind:'sweepFixedDur',dur,min:.01,max:.02,sinusoidal:1};// min and max are overridden in enterNewPart
  cstate[nm] = {value:0,start:0};
};

rs.buildRings = function () {
  let {numSpokes,radiusArray,sepArray,circleP} = this;
  
  let circles = this.set('circles',arrayShape.mk());
  let rings = this.rings = [];
  this.names =[];
  let nr = radiusArray.length;
  for (let i=0;i<nr;i++) {
    let ring = [];
    this.addPath('r_'+i);
    this.addPath('s_'+i);
    rings.push(ring);
    for (let j=0;j<numSpokes;j++) {
      let crc = circleP.instantiate();
      ring.push(crc);
      circles.push(crc);
    }
  }
}


rs.regsegs = function (n) { //a polygon as an array of LineSegments
  let pnts = [];
  let segs = [];
  let deltaA = (2*Math.PI)/n;
  let ia = deltaA/2;
  ia = -Math.PI/2;
  for (let j=0;j<n;j++) {
    let a = ia + deltaA*j;
    let vec = Point.mk(Math.cos(a),Math.sin(a));
    pnts.push(vec);
  }
  for (let j=0;j<n;j++) {
    let p0= pnts[j];
    let p1 = pnts[(j+1)%n];
    let sg = LineSegment.mk(p0,p1);
    segs.push(sg);
  }
  return segs;
}
   
// write a javascript program, that given a ray of length 2 originating at the origin, and a polygon centered on the  origin, with outer radius 1,
// returns the point at which the ray intersects the polygon  

rs.projects = [];

rs.buildProjects = function (n) {
  let {projects} = this;
  projects.push(null);
  projects.push(null);
  projects.push(null);
  for (let i=3;i<n;i++) {
    projects.push(this.regsegs(i));
  }
}

rs.ringPositions =[];
rs.degreeToRadian = Math.PI/180;
rs.updateRings = function () {
  let {spinArray,numSpokes:ns,radiusArray,rings,cycle,cycleL,whereInCycle:wic,radiusFactor:rf,projects,projectArray,ringPositions:rp,degreeToRadian:d2r} = this;
  debugger;
  let nr = radiusArray.length;
  let deltaA = (2*Math.PI)/ns;
  for (let i=0;i<nr;i++) {
    let pftr = [];//positions for this ring
    rp.push(pftr);
    let spin = spinArray[i]*d2r;
    let d = this.nthRingDist(i);
    let ring = rings[i];
    let dim = 2*radiusArray[i];
    let pindx = projectArray[i];
    let  projectTo = projects[pindx];
    for (let j=0;j<ns;j++) {
      let a = spin+deltaA*j;
      let vec = Point.mk(Math.cos(a),Math.sin(a));
      let ivec = Point.mk(Math.cos(a+spin),Math.sin(a+spin));
      let ln = 1;
      if (projectTo) {
        let lnp = projectTo.length;
        let lvec = ivec.times(3);
        let vecseg = LineSegment.mk(Point.mk(0,0),lvec);
        for (let k=0;k<lnp;k++) {
          let pseg = projectTo[k];
          let ints = vecseg.intersect(pseg);
          if (ints&&(typeof ints === 'object')) {
            ln = ints.length();
            //debugger;
            break;
          }
        }
      }
      let fr = 1;//cycle%2?1-wic/cycleL:wic/cycleL; 
      let fc = 1+  (ln-1)*fr;
      //let fc = 1+  (ln-1)*fr;
      if ((i===0)&&(j==3)&&(cycle<2)) {
        console.log('cycle',cycle,'wic',wic,'ln',ln,'fr',fr,'fc',fc);
      }
     // let avec = vec.times((ln-1)*fc*d);
      let avec = vec.times(fc*d);
      let r=Math.floor(fr*255);
      let b=Math.floor((1-fr)*255);
      let clr = `rgba(${r},255,${b},0.5)`;
       //       console.log('cycle',cycle,'wic',wic,'ln',ln,'fr',fr,'fc',fc,'clr',clr);

      let crc = ring[j];
      crc.fill = clr;
      crc.moveto(avec);
      pftr.push(avec);
      crc.dimension = rf*dim;
      crc.update();
    }
  }
  debugger;
}

rs.sslns = [];

rs.twist = 10;
rs.computeSpokeSegLengths = function () {
  let {ringPositions:rp,sslns,numSpokes:ns} = this;
  let nr = rp.length;
  let twsf = 0; //twist so far
  let tln = 0
  for (let i=0;i<nr-1;i++) {
    let trps = rp[i];
    let nrps = rp[i+1];
    let ip = trps[twsf%ns];
    let twsf = twsf + twist;
    let fp = nrps[twsf%ns];
    let ln = fp.distance(fp);
    sslns.plus(ln);
    tln = tln+ln;
  }
  this.spokeLength = tln;
}
    
    
  


rs.initProtos = function () {
	this.circleP = circlePP.instantiate();
	this.circleP.fill = 'rgba(255,255,255,.5)';
 
	this.circleP['stroke-width'] = 0;
} 

      
rs.buildSeqOb = function () {
  let {pstate,numCycles,arrayLen} = this;
  let {pspace} = pstate;
  let props = Object.getOwnPropertyNames(pspace);
  return this.randomSeqOb({props,ln:arrayLen,lb:1,ub:10,numCycles});
  //return this.randomSeqOb({props,ln:arrayLen,lb:40,ub:80,numCycles});
}

rs.initialize = function () {
   debugger;
 //  this.initializeConstants();
   let sq = this.regsegs(this.polysides);
   this.projectTo = sq;
   this.initProtos();
   this.addFrame();
   this.buildProjects(12);
   this.buildRings();
   this.updateRings()
 //this.loopingSeqOb(this.buildSeqOb);
}
    
      



rs.updateState = function () {
  let {stepsSoFar:ssf,names,radiusArray,sepArray,sq}  = this;
  debugger;
  //this.projectTo = (this.cycle)%2?undefined:sq;
  let nr = radiusArray.length;
  this.enterNewPart();
  let {pstate} = this;
  let {cstate} = pstate;
  //let props = Object.getOwnPropertyNames(cstate);
  let cnt =0;
  for (let i=0;i<nr;i++) {
    let r = cstate['r_'+i].value;
    let s = cstate['s_'+i].value;
    radiusArray[i] = r;
    //sepArray[i] = s;
  }    
  this.updateRings();
    
 }


rs.updateState = function () {
  let {stepsSoFar:ssf,spinArray:spa,spinSpeedArray:sspa}  = this;
  debugger;
  let ln = spa.length;
  for (let i=0;i<ln;i++) {
    let csp = spa[i];
    let ss = sspa[i];
    let nsp = csp + ss;
    spa[i]=nsp;
  }
  this.updateRings();
    
 }

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


