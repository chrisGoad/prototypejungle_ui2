//import {rs as rectanglePP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';

//import {rs as generatorP} from '/generators/step_arrays.mjs';

import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addPathInParts} from '/mlib/path_in_parts.mjs';
let rs = basicP.instantiate();
addPathMethods(rs);
addPathInParts(rs);

let wd = 1500;
rs.setName('step_ring_0');
let topParams = {width:wd,height:wd,framePadding:.1*wd,frameStroke:'white',frameStrokeWidth:1,saveAnimation:1}
Object.assign(rs,topParams);


rs.pstate = {pspace:{},cstate:{}}

rs.arrayLen = 3;

rs.numCycles = 3;
rs.duration = 30;
rs.pauseDuration = 0;
rs.gridDim = 20;
rs.numSpokes = 32;
rs.radiusArray = [10,20,30,10,10,10];
rs.sepArray = [15,10,10,10,10,10];

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
  pspace[nm] = {kind:'sweepFixedDur',dur,min:10,max:15};
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
    


rs.updateRings = function () {
  let {numSpokes:ns,radiusArray,rings,projectTo} = this;
  let nr = radiusArray.length;
  let deltaA = (2*Math.PI)/ns;
  for (let i=0;i<nr;i++) {
    let d = this.nthRingDist(i);
    let ring = rings[i];
    let dim = 2*radiusArray[i];
    for (let j=0;j<ns;j++) {
      let a = deltaA*j;
      let vec = Point.mk(Math.cos(a),Math.sin(a));
      let ln = 1;
      if (projectTo) {
        let lnp = projectTo.length;
        let lvec = vec.times(3);
        let vecseg = LineSegment.mk(Point.mk(0,0),lvec);
        for (let k=0;k<lnp;k++) {
          let pseg = projectTo[k];
          let ints = vecseg.intersect(pseg);
          if (ints&&(typeof ints === 'object')) {
            ln = ints.length();
            debugger;
            break;
          }
        }
      }
      let avec = vec.times(ln*d);
      let crc = ring[j];
      crc.moveto(avec);
      crc.dimension = dim;
      crc.update();
    }
  }
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
  return this.randomSeqOb({props,ln:arrayLen,lb:5,ub:80,numCycles});
}

rs.initialize = function () {
   debugger;
   let sq = this.regsegs(4);
   this.sq = sq;
   this.initProtos();
   this.addFrame();
   this.buildRings();
   this.updateRings()
 this.loopingSeqOb(this.buildSeqOb);
}
    
      



rs.updateState = function () {
  let {stepsSoFar:ssf,names,radiusArray,sepArray,sq}  = this;
  //debugger;
  this.projectTo = (this.cycle)%2?undefined:sq;
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

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


