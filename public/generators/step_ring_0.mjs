//import {rs as rectanglePP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';

//import {rs as generatorP} from '/generators/step_arrays.mjs';

import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
import {rs as addPathInParts} from '/mlib/path_in_parts.mjs';
let rs = basicP.instantiate();
addPathMethods(rs);
addPathInParts(rs);


rs.setName('step_ring_0');
rs.framePadding = .2*(rs.width);


rs.pstate = {pspace:{},cstate:{}}

rs.arrayLen = 3;

rs.numCycles = 20;
rs.duration = 10;
rs.pauseDuration = 30;
rs.gridDim = 20;
rs.numSpokes = 5;
rs.radiusArray = [10,20,30];
rs.sepArray = [10,10,10];

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
  let {pstate} = this;
  let {pspace,cstate} = pstate;
  let dur = this.duration;
  pspace[nm] = {kind:'sweepFixedDur',dur,min:10,max:15};
  cstate[nm] = {value:0,start:0};
};

rs.buildRings = function () {
  let {numSpokes,radiusArray,sepArray,circleP} = this;
  let circles = this.set('circles',arrayShape.mk());
  let rings = this.rings = [];
  let nr = radiusArray.length;
  for (let i=0;i<nr;i++) {
    let ring = [];
    let nm = 'r_'+i;
    this.addPath(nm);
    rings.push(ring);
    for (let j=0;j<numSpokes;j++) {
      let crc = circleP.instantiate();
      ring.push(crc);
      circles.push(crc);
    }
  }
}


rs.updateRings = function () {
  let {numSpokes:ns,radiusArray,rings} = this;
  let nr = radiusArray.length;
  let deltaA = (2*Math.PI)/ns;
  for (let i=0;i<nr;i++) {
    let d = this.nthRingDist(i);
    let ring = rings[i];
    let dim = 2*radiusArray[i];
    for (let j=0;j<ns;j++) {
      let a = deltaA*j;
      let vec = Point.mk(Math.cos(a),Math.sin(a)).times(d);
      let crc = ring[j];
      crc.moveto(vec);
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

rs.initialize = function () {
   debugger;

   this.initProtos();
   this.buildRings();
   this.updateRings()
 //  this.loopingSeqOb(this.buildSeqOb);
}
    
      
      
rs.buildSeqOb = function () {
  let {pstate,numCycles,arrayLen} = this;
  let {pspace} = pstate;
  let props = Object.getOwnPropertyNames(pspace);
  return this.randomSeqOb({props,ln:arrayLen,lb:1,ub:10,numCycles});
}



rs.updateState = function () {
  let {stepsSoFar:ssf,names,grid}  = this;
  //debugger;
  this.enterNewPart();
  let {pstate} = this;
  let {cstate} = pstate;
  //let props = Object.getOwnPropertyNames(cstate);
  let cnt =0;
  names.forEach( (nm) => {
    let rnm = 'r'+nm;
    let gnm = 'g'+nm;
    let bnm = 'b'+nm;
    let wnm = 'w'+nm;
        let hnm = 'h'+nm;

    let wnm0 = 'w_0_0';
    let hnm0 = 'h_0_0';
    
    let wnm1 = 'w_0_1';
    let hnm1 = 'h_0_1';
    debugger;
    cnt++;
    let w,h;
    if (cnt%2) {
      w = cstate[wnm0].value;
      h = cstate[hnm0].value;
    } else {
      w = cstate[wnm1].value;
      h = cstate[hnm1].value;
    }
 /*   let r = Math.floor(cstate[rnm].value);
    let g =  Math.floor(cstate[gnm].value);
    let b =  Math.floor(cstate[bnm].value);
    let clr = `rgb(${r},${g},${b})`;*/
    let sq = grid[nm];
    sq.width = w;
    sq.height = h;
  //  sq.fill = clr;
    sq.update();
    
  });

 }

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


