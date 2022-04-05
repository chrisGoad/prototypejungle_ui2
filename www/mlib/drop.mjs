//active
//core.require('/mlib/animation.js','/mlib/basics.js','/mlib/boundeddRandomGrids.js','/shape/rectangle.js','/line/line.js',
//core.require(
//function (addAnimationMethods,addBasicMethods,addRandomMethods,rectanglePP,linePP) {
const rs = function (item) {

/* theory of operation. 
The DROP algoritm drops sets of line segments at random positions on the canvas. If a given segment set lands on top of another, it is thrown away.     The segsets method library is used to build sets of segments. Metal is a typical example.

Let rs be the generator object. Sets of line segments (and lines) are created by the method rs.genSegments. This method has the form: 

rs.genSegments = function (p) {
...
return [segs,shapes];
}

where p is a Point (the "anchor point"),   segs is an array of lineSegments, and lines an array of lines.  Elements of segs are added to the set of all segs dropped so far. As mentioned above, each time there is a new attempted drop, it is checked whether any of the new segs intersect any of those already dropped. If not, the drop succeeds, and the segs are added the already dropped array, and the lines are added to the set of lines to be displayed.  The relationship between segs and lines is up to the generator, but a typical case is where the ends of the lines are taken from the ends of the segs (so that they coincide, geometrically). A value of the form [segs:array(LineSegment),lines:array(Line)] is called a "segset" (even though lines are included as well as segs).

Parameters: dropTries sets how many unsuccessful drops are tolerated before the algorithm is terminated.





In fromEnds mode, segments are dropped in such a way as to extend an already existing tree. In this mode, illustrated by the dandelion, the current state consists of a tree of segments. Each segment in the tree is either interior, meaning that its end1 has been continued by one or more segments, or terminal, meaning that there is no continuing segment emerging from its end1. The end1 of such a segment is held in the array this.ends. 
*/
//core.require(function () {
//addBasicMethods(item);
//addRandomMethods(item);
let defaults = {maxDrops:Infinity,dropTries:5,maxLoops:Infinity};//,maxTriesPerEnd:20};
//defaults = {maxDrops:1000,dropTries:5,maxLoops:1000};

Object.assign(item,defaults);
/*adjustable parameters  */
//let topParams = 	{width:100,height:100,maxDrops:10,dropTries:5,maxLoops:100000,lineLength:10,backgroundColor:undefined,minSeparation:5,endLoops:20000,fromEnds:1,	onlyFromSeeds:0}

//Object.assign(item,topParams);

/* end */

/*for shapes */



// a "unit" has the form [[segs],[lines]] Seeds are starter units
item.genSingletonUnit =  function (lineP,p,direction,clr) {
  let {lineExt=0} = this;
	let seg = this.genOneSegment(p,direction);
	//let ln = this.genLine(seg.end0,seg.end1,sepNext);
	let ln = this.genLine(seg,lineP,lineExt);
  if (clr) {
		ln.stroke = clr;//'white';//clr;
  }
	return [[seg],[ln]];
}
// was genSegmentsFan
item.genFan = function (lineP,p,clr,params) {
	let thisCopy;
	if (params) {
		thisCopy = {};
		//debugger;
		for (let p in this) {
			let v = this[p];
			if (typeof v !== 'function') {
			 thisCopy[p] = v;
			}
		Object.assign(thisCopy,params);
		}
	} else {
		thisCopy = this;
	}
	let {width,height,sepNext,splitChance,splitAmount,
	     lineLength:len,directionChange:dc=0,randomDirectionChange:rdc=0,lineExt=0} = thisCopy;
  let angle;
	let rn = Math.random();
  if (typeof p.direction === 'number') {
   angle = p.direction +  dc + ((rn<0.5)?rdc:-rdc);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let hsa = 0.5 * splitAmount;
  let a0 = angle+splitAmount;
  let a1 = angle-splitAmount;
 // let a0 = angle+0.02 * Math.PI;
 // let a1 = angle-0.02 * Math.PI;
	//let len = 10;//2 + Math.floor(r*4)*4;
  if (Math.random() < splitChance ) {
		//debugger;
	  let seg0 = this.genSegment(p,len,a0,sepNext);
	  let seg1 = this.genSegment(p,len,a1,sepNext);
    p.isEnd = 1;
		let ln0 = this.genLine(seg0,lineP,lineExt);
		let ln1 = this.genLine(seg1,lineP,lineExt);
	  if (clr) {
		  ln0.stroke = clr;//'white';//clr;
		  ln1.stroke = clr;//'white';//clr;
    }
		return [[seg0,seg1],[ln0,ln1]];
  } else {
	  let seg = this.genSegment(p,len,angle,sepNext);
    p.isEnd = 1;
		let ln = this.genLine(seg,lineP,lineExt);
	//	let clr = `rgb(${r},${r},${r})`;
    if (clr) {
		  ln.stroke = clr;//'white';//clr;
    }
		return [[seg],[ln]];
  }

}


 // the following methods generate segsLines, which are used as the seeds of the drop operation. 
//item.ringSeeds = function (lineP,clr,icenter,outward=1,divergence=0) {
item.ringSeeds = function (lineP,clr,icenter,divergence=0,data) {
  //let {width,height,sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
  let {sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
	let center = icenter?icenter:Point.mk(0,0);
  let segs = [];
//  let numStarts = 16;
  let cangle = 0.5* Math.PI;
  let delta = (Math.PI*2)/numSeeds;
 // let radius = 0.2* 0.5 * height;
 // let len = 5;//2 + Math.floor(r*4)*4;
  //let zp = Point.mk(0,0);
	//debugger;
  for (let j=0;j<numSeeds;j++) {
    let ip = Point.mk(Math.cos(cangle),Math.sin(cangle)).times(radius);
		let p = ip.plus(center);
	//	let dir = outward?cangle+divergence:-cangle-divergence;
		let dir = cangle+divergence;
		let seg =  this.genSegment(p,len,dir,sepNext);
		let end = seg.end;
		if (data) {
			end.data = data;
		}
		end.spoke = j;
		end.seed = end;
		segs.push(seg); 
    cangle += delta;
  }
 // let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,lineExt)); 
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}
item.sideSeeds = function (lineP,clr,data,right) {
  let {width,height,sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
  let segs = [];
//  let numStarts = 16;
  let delta  = height/(numSeeds+1);
		let hw = width/2;
	let cy = delta-hw;
  for (let j=0;j<numSeeds;j++) {
    let ip = Point.mk(right?hw:-hw,cy);
	//	let dir = outward?cangle+divergence:-cangle-divergence;
		let seg =  this.genSegment(ip,len,right?Math.PI:0,sepNext);
		let end = seg.end;
		if (data) {
			send.data = data;
		}
		end.seed = end;
		segs.push(seg); 
    cy += delta;
  }
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}
item.leftSideSeeds = function (clr,data) {
	return this.sideSeeds(clr,data);
}
item.rightSideSeeds = function (clr,data) {
	return this.sideSeeds(clr,data,true);
}



item.randomSeeds = function (clr) {
  let {width,height,sepNext,numSeeds,ringRadius:radius,seedDirections,lineLength:len,lineExt=0} = this;
  let segs = [];
	let ld;
	if (seedDirections) {
	  ld = seedDirections.length;
	}
  for (let j=0;j<numSeeds;j++) {
    let ip = this.genRandomPoint();
		let angle;
		if (ld) {
			let ri = Math.floor(Math.random()*ld);
			angle = seedDirections[ri];
		} else {
			angle = 2*Math.random()*Math.PI;
		}
		let seg =  this.genSegment(ip,len,angle,sepNext);
		segs.push(seg); 
  }
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}





item.gridSeeds = function (lineP,clr) {
  let {width,height,sepNext,fanAngles,numSeedRows:numRows,numSeedCols:numCols,gridPadding:padding=0,lineExt=0} = this;
  let segs = [];//this.rectangleSegments(width,height);
	let lines = [];
 // let numCols = 4;
//  let numRows = 4;
 // let invx = width/(numCols+1);
 // let invy = height/(numRows+1);
  let iwidth = width - padding;
  let iheight = height - padding;
  let hwd = iwidth/2;
  let hht = iheight/2;
//  let ix = invx-hwd;
 // let iy = hht-invy;
//  let iy = hht;
  let angle0 = 0.5*Math.PI;
  let angle1 = -0.5*Math.PI;
  let len = 5;//2 + Math.floor(r*4)*4;
	let deltaX = this.deltaX = iwidth/numCols;
	let deltaY = this.deltaY = iheight/numRows;
	let ix = (-hwd) + 0.5*deltaX;
	let yv = (-hht) + 0.5*deltaY;
//	debugger;
  for (let j=0;j<numRows;j++) {
    let xv = ix;
		for (let i=0;i<numCols;i++) {
			let ip = Point.mk(xv,yv);
			if (this.genGridSegments) {
				let cell = {x:i,y:j};
				let SL = this.genGridSegments(cell,ip);
				if (SL) {
					segs.push(...SL[0]);
				  lines.push(...SL[1]);
				}
		  } else {
				fanAngles.forEach( (angle) => {
					let seg = this.genSegment(ip,len,angle,sepNext);
					segs.push(seg);
					lines.push(this.genLine(seg,lineP,lineExt));
				});
			}
			//ix += invx;
			xv += deltaX;

		}	 
    yv += deltaY;
    //iy -= invy;
  }
	if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  //let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
 // lines.forEach((ln) => ln.stroke = clr);//'white');
  return [segs,lines];
}





item.extendSegment = function (seg,ln) {

  let {end0,end1} = seg;
  let cnt= end0.plus(end1).times(0.5);
  let vec = end1.difference(end0);
  let len = vec.length();
  let nlen = ln+len;
  let hnvec = vec.times(nlen/(2*len));
  let e0 = cnt.difference(hnvec);
  let e1 = cnt.plus(hnvec);
  return LineSegment.mk(e0,e1);
}
  


item.genRandomPoint = function (rect) {
	//debugger;
  if (rect) {
    let {corner,extent} = rect;
    let lx = corner.x;
    let ly = corner.y;
    let x = Math.random() * extent.x + lx;
    let y = Math.random() * extent.y + ly;
    return Point.mk(x,y);
  }
  let {width,height} = this;
  let rx = (Math.random()-0.5) * width;
   let ry= (Math.random()-0.5) * height;
  return Point.mk(rx,ry);
}

// When in fromEnds mode, the segment has an "end" which is sepNext beyond end1, this end is where the next segment can be droppe
// normally sepNext is an invisible distance which prevents the detection of an intersection with the segment which is being continued.

item.genSegment = function (p,ln,angle,sepNext=0) {
  if (!p) {
    debugger;
  }
//item.genSegment = function (p,ln,angle,sep=0,sepNext=0,centered=1) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e0,e1,end,rs;
	e0 = p;
	p.isEnd = 1;
	end  = p.plus(vec.times(ln+sepNext));
	e1  =  p.plus(vec.times(ln));
	rs = LineSegment.mk(e0,e1);
	let g = p.generation;
	if (g === undefined) {
		g = 0;
		p.generation = 0;
	}
	rs.end = end;
	if (p.seed) {
		end.seed = p.seed;
	}
	end.generation = g+1;
	end.direction = angle;		
	rs.fromEnd = p;
  return rs;
}

item.insideCanvas = function (p) {
  let {width,height} = this;
	if ((!width)  || (!height)) {
		return true;
	}
  let hw = 0.5*width;  
  let hh = 0.5*height;  
  let {x,y} = p;
  return (-hw < x) && (x < hw) && (-hh < y) && (y < hh);
}


item.segmentIntersects = function (seg) {
  let {segments,width,height,exclusionZones,doNotCross,doNotExit} = this;
  let {end0,end1} = seg;
  if ((!this.insideCanvas(end0)) || (!this.insideCanvas(end1))) {
    return true;
  }
	if (exclusionZones) {
		let eln = exclusionZones.length;
		for (let i=0;i<eln;i++) {
			let zone = exclusionZones[i];
			if (zone.contains(end0) || zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotCross) {
		let eln = doNotCross.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotCross[i];
			if (zone.contains(end0) !== zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotExit) {
		let eln = doNotExit.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotExit[i];
			if ((!zone.contains(end0)) ||  (!zone.contains(end1))) {
				return true;
			}
		}
	}
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersects(segments[i]);
    if (ip) {
      return true;
    }
  }
}

item.intersectsSomething = function (g) {
  let {segments,width,height,ignoreBefore:ibf} = this;
  if (0 && ibf) {
    debugger;
  }
  let ln = segments.length;
  let st = (ibf)?ibf:0;
  for (let i=st;i<ln;i++) {  
	  let seg = segments[i];
		if (g.intersects(seg)) {
			return true;
		}
  }
}

item.activeEnds = function () {
  let ends = this.ends;
  let rs = [];
	let cnt = 0;
  ends.forEach((end) => {
		cnt++
    if (!(end.inactive)) {
      rs.push(end);
    }
  });
  return rs;
}

item.addSegmentAtThisEnd = function (end) {
 // let {maxDrops,dropTries,segments,lineLength,ends,shapes,fromEnds,numRows,randomGridsForShapes} = this;
 // let {maxDrops,segments,lineLength,ends,shapes,numRows,randomGridsForShapes,maxTriesPerEnd} = this;
  let {maxDrops,segments,lineLength,ends,shapes,numRows,randomGridsForShapes,dropTries} = this;
  if (!this.genDropStruct) {
    return;
  }
  let tries = 0;
 // let numDropped = 0;
	let cell,rvs;
	if (numRows && randomGridsForShapes) {
	  cell = this.cellOf(end);
    rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	}
  while (true) {
		let dropStruct = this.genDropStruct(end,rvs);
		let ifnd = 0;
		let sln = 0
		if (dropStruct) {
			let [segs,shapes] = dropStruct;
			sln = segs.length;
			for (let i=0;i<sln;i++) {
				let seg = segs[i];
				if (this.segmentIntersects(seg)) {				
					ifnd = true;
					break;
				}
			}
		} else {
			ifnd = 1;
		}
		if (ifnd) {
			tries++;
			//if (tries === maxTriesPerEnd) {
			if (tries === dropTries) {
        console.log('inactivated - could not find continuation');
       //debugger;
        end.inactive = 1;
				return 0;
			}
		} else {
			this.installDropStruct(dropStruct);
			return 1;  
    } 
  }
}

item.randomArrayElement = function (a) {
	let ln = a.length;
	let rni = Math.floor(ln*Math.random());
	return a[rni]
}

item.lastArrayElement = function (a) {
  let	ln = a.length;
	return a[ln-1]
}

item.randomDirection = function (n) {
	if (n) {
	  return 2*Math.PI*(Math.floor(n*Math.random())/n);
	} else {
		return 2*Math.PI*Math.random();
	}
}


item.addSegmentAtSomeEnd = function () {
  let {extendWhich} = this;
  while (true) {
    let ae = this.activeEnds();
    let end;
		let ln = ae.length;
		if (ln > 0) {
      if (extendWhich === 'last') {
			  end = this.lastArrayElement(ae);
      } else if (extendWhich === 'random') {
		  	end =  this.randomArrayElement(ae);
      } else {
        end = ae[0];
      }
			let ars = this.addSegmentAtThisEnd(end);
      if (ars) {
        return ars;
      }
		} else {
      return "noEndsLeft";
    }
	}
}

item.addSegmentsAtEnds = function () {
  let maxEndTries = 100;
  let tries = 0; 
  let loop = 0;
	let maxDrops = this.maxDrops;
  while (this.numDropped  < maxDrops) {
    loop++;
    let ars = this.addSegmentAtSomeEnd();
    if (ars === 'noEndsLeft') {
      return ars;
    }
		// new 11/8
    if (!ars) {
     // tries++;
     // if (tries >= maxEndTries) {
     return 'triesExhausted';
     // }
    }
  }
  //debugger;
  return ['loopsExceeded',this.numDropped];
}
       

item.addRandomSegment = function () {
  let p = this.genRandomPoint(); 
  //debugger;
  let dropStruct = this.genDropStruct(p);
  let ifnd = 0;
  let sln=0;
  if (dropStruct) {
    let [segs,shapes] = dropStruct;
    let rect;
    sln = segs.length;
    for (let i=0;i<sln;i++) {
      let seg = segs[i];
      if (this.intersectsSomething(seg)) {
        return undefined;
      }
    }
    this.installDropStruct(dropStruct);
    return true;

  } else {
    return undefined;
  }
}
    
item.addNrandomSegments = function (n) {
  let {maxDrops,dropTries,maxLoops,segments,lineLength,ends,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genDropStruct) {
    return;
  }
  let tries = 0;
  let numAdded = 0;
  while (numAdded < n) {
    if (fromEnds) {
      let ae = this.addSegmentsAtEnds();
      if (ae[0] === 'loopsExceeded') {
         return numAdded;
      } else {
        numAdded++
      }
      continue; //added return 11/21
    }
		//let ifnd = this.addRandomSegment();
		let segsAdded = this.addRandomSegment();
		if (segsAdded) {
      tries = 0;
      numAdded++;
    } else {  
			tries++;
			if (tries >= 50) {
				debugger;
			}	
      if (tries >= dropTries) {
				debugger;
				return numAdded;
			}
    }
  }
  return numAdded;
} 

item.addRandomSegments = function () {
  let {maxDrops,dropTries,maxLoops,segments,lineLength,ends,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genDropStruct) {
    return;
  }
  this.numDropped = 0;
  let tries = 0;
  let endsVsNew = 1;
  let loops = 0;
	//debugger;
  while (loops < maxLoops) {
    loops++;
    if (fromEnds) {
      if (Math.random() < endsVsNew) {
        let ae = this.addSegmentsAtEnds();
        if (ae[0] === 'loopsExceeded') {
           return;
        }
      }
			return; //added return 11/21
    }
	//	let ifnd = this.addRandomSegment();
		let segsAdded = this.addRandomSegment();
		if (segsAdded) {
      tries = 0;
			if (this.numDropped >= maxDrops) {
				return this.numDropped;
			}    
    } else {  
			tries++;
			if (tries >= dropTries) {
				debugger;
				return this.numDropped;
			}
    }
  }
}


item.installShape = function (shape) {
	if (shape.period) {
	  debugger;
	}
  this.shapes.push(shape);
  shape.show();
  shape.update();
	this.numDropped++;
  return shape;
}

item.updateShapes = function () {
	if (!this.shapeUpdater) {
		return;
	}
	let {shapes} = this;
	let ln = shapes.length;
	for (let i=0;i<ln;i++) {
		let shp = shapes[i]
		this.shapeUpdater(shp);
	}
}
	
	
item.installDropStruct = function (dropStruct) {
  let {segments,ends} = this;
  let ln = segments.length;
  let [segs,shapes] = dropStruct;
//	if (dropStruct.isRectangle) {
	if (!Array.isArray(segs)) {
    debugger;
		let rect = segs;
		let rectShape = shapes;
		segments.push(rect);
		this.installShape(rectShape);
		return;
	}

  segs.forEach( (seg) => {
		seg.number = ln;
		let {end0,end1,end} = seg;
		if (!end0) {
			debugger;
		}
		end0.end0of = ln;
		end1.end1of = ln;
		if (end) {
		  end.isEndOf = ln;
		}
    segments.push(seg);
    if (end) {
      ends.push(end);
      end.isEnd = 1;
    }
		let fre = seg.fromEnd;
    if (fre) {
      fre.inactive = 1;
    }
		ln++;
  });
  shapes.forEach( (shape) => this.installShape(shape));
}

item.removeSegmentsAndShapes = function (n) {
	let {segments,shapes} = this;
	let ln = segments.length;
	let sln  = shapes.length;
	console.log('ln sln',ln,sln);
	let nln = Math.max(0,ln-n);
	segments.length = nln;
	for (let i = nln;i<ln;i++) {
		let shp = shapes[i];
		if (shp) {
		  shp.remove();
		}
	}
	shapes.length = nln;
}


item.cellOf  = function (p) {
  let {x,y} = p;
  let {width,height,numRows,numCols} = this;
  let hw = width/2;
  let hh = height/2;
  let ix = Math.floor(((x+hw)/width) * numCols);
  let iy = Math.floor(((y+hh)/height) * numRows);
  return {x:ix,y:iy};
}

item.segsToSeed = function (segs) {
  let shapes = segs.map((sg) => {
	  let line = this.genLine(sg);
		return line;
	});	
	return [segs,shapes];
}

item.concatEachArray = function (ays) {
	let c0 = [];
	let c1 = [];
	ays.forEach( (a) => {
	 let [a0,a1]= a;
	 c0.push(...a0);
	 c1.push(...a1);
	 //c0 = c0.concat(a0);
	 //c1 = c1.concat(a1);
  });	 
	 return [c0,c1];
}
/*
item.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  
*/

item.generateDrop = function (doDrop=1) {
  let {rectangles,initialSegments,genSeeds} = this;
 /* this.initProtos();
  this.addBackStripe();
  this.addBackground();*/
  this.segments = [];
	this.numDropped = 0;
  this.ends = [];
  this.set('shapes',core.ArrayNode.mk());
  if (initialSegments) {
    let isegs = this.initialSegments();
    this.installDropStruct(isegs);
  }
	if (genSeeds) {
    let isegs = this.genSeeds();
    this.installDropStruct(isegs);
  }
  if (doDrop) {
		this.addRandomSegments();
		//debugger;
	}
}
item.inAzone = function (zones,p) {
	if (!zones) {
		return 0;
	}
	let fnd = false;
	let eln = zones.length;
	for (let i=0;i<eln;i++) {
		let zone = zones[i];
		if (zone.contains(p)) {
			return 1;
		}
	}
	return 0;
}


item.pointsFromCircleDrops = function () {
	let {zone,exclusionZones} = this;
	let pnts = [];
	this.segments.forEach( (seg) => {
	  if (geom.Circle.isPrototypeOf(seg)) {
			let p = seg.center;
			if (zone) {
				if (!zone.contains(p)) {
					return;
				}
			}
			
			let inex = this.inAzone(exclusionZones,p);
			if (!inex) {
				pnts.push(p);
			}
	  }
	});
	return pnts;
}
}
export {rs};


      
