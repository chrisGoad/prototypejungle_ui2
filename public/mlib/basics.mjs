// documented in https://prototypejungle.net/doc/basics.html

import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as shadedRectPP} from '/shape/shadedRectangle.mjs';
import {rs as textPP} from '/shape/textOneLine.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';

const rs = function (item) {
window.root = core.root;
item.stateOpsDisabled = 1; // for exported version
item.setName = function (name,variant,jsonName) {
  let nameWithV = name+(variant?'_v_'+variant:'');
  let nameWithoutV= name;
	let theName = this.name = nameWithV+(this.signIt?'_s':'');
  this.variant = variant;
	core.vars.whereToSave = theName;
	let pathPart = jsonName?jsonName:nameWithV;
	this.path = `json/${pathPart}.json`;
}


item.numFrames = 0;
item.numRects =0;
item.addRectangle  = function (iparams) {
  if (!iparams) {
    return;
  }
  let params = (typeof iparams === 'string')?{fill:iparams}:iparams;
  let {width,height,fill='transparent',leftFill,rightFill,stroke,stroke_width,position} = params;
  if (!width) {
    width = this.width;
   }
   if (!height) {
    height = this.height;
   }
   if (!width || ((!fill)  && (!leftFill))) {
    return;
   }
  let rect  = this.set('brect'+this.numRects,leftFill?shadedRectPP.instantiate():rectPP.instantiate());
  this.numRects = this.numRects + 1;
  if (fill) {
    rect.fill = fill;
  }
   if (leftFill) {
    rect.leftFill = leftFill;
    rect.rightFill = rightFill;
  } else {
    rect.fill = fill;
  }
  if (stroke) {
    rect.stroke = stroke;
  }
  if (typeof stroke_width === 'number') {
    rect['stroke-width'] = stroke_width;
  } 
  rect.width = width;
  rect.height = height;
	if (position) {
    rect.moveto(position);
  }
  rect.update();
	rect.show();
  return rect;
}
item.numCircs = 0;
item.addCircle  = function (params) {
  if (!params) {
    return;
  }
  let p0 = Point.mk(0,0);
  let {fill='transparent',stroke,stroke_width=0,position=p0,radius} = params;
  let crc  = this.set('crc'+this.numCircs,circlePP.instantiate());
  this.numCircs = this.numCircs + 1;
  crc.fill = fill;
  if (stroke) {
    circ.stroke = stroke;
  }
  if (typeof stroke_width === 'number') {
    crc['stroke-width'] = stroke_width;
  } 
  crc.dimension  = 2*radius;
 
 // rect.update();
	//rect.show();
  return crc;
}
// add a stripe around the image, to control the size of the jpg when saved
item.addFrame = function (params) {
  let {width,height} = this;
  let fparams = params?params:this;
  let {frameStroke:frs,frameFill:frf,framePadding:frp,
  frameWidth,frameHeight,frameStrokeWidth:fswd,framePos:pos,signIt} =  fparams;
  let frpd = frp!==undefined;
  if (!(frpd || frameWidth)) {
    return;
  }
  if (!frs) {
    frs = 'rgb(2,2,2)';
  }
  fswd = fswd?fswd:2;
  frf = frf?frf:'transparent';
  if (frameWidth) {
    width = frameWidth;
    height = frameHeight;
  } else {
    width = width + frp;
    height = height + frp;
  }
  let rect =  this.addRectangle({width,height,fill:frf,stroke:frs,stroke_width:fswd,position:pos});
  return rect;
}


rs.drawGrid = function (lineP) {
  let {numRows,numCols,width:wd,height:ht} = this;
  let deltaX = wd/numCols;
  let deltaY = ht/numRows;
  let hwd = 0.5*wd;
  let hht = 0.5*ht;
  let cx = -hwd;
  let cy = -hht;
  let lines = this.set("lines",arrayShape.mk());
  for (let i=0;i<=numRows;i++) {
    let top = Point.mk(cx,-hht);
    let bot = Point.mk(cx,hht);
    let sg = LineSegment.mk(bot,top)
    let ln = sg.toShape(lineP);
    lines.push(ln);
    cx += deltaX;
  }
  for (let i=0;i<=numCols;i++) {
    let left = Point.mk(-hwd,cy);
    let right = Point.mk(hwd,cy);
    let sg = LineSegment.mk(left,right)
    let ln = sg.toShape(lineP);
    lines.push(ln);
    cy += deltaY;
  }
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

Circle.toShape = function (circleP,scale=1) {
   let {center,radius} = this;
   let rs = circleP.instantiate();
   rs.radius = scale*radius;
   rs.moveto(center);
   return rs;
 }

 
Rectangle.toShape = function (rectP,scale=1) {
   let {corner,extent} = this;
   let hext = extent.times(0.5);
   let center = corner.plus(hext);
   let rs = rectP.instantiate();
   rs.width = scale*extent.x;
   rs.height = scale*extent.y;
   rs.moveto(center);
   return rs;
 }
 
 // recycling shapes will only work if the shape tree is identical each time

Polygon.toShape = function (polygonP,scale=1,recycledPolygon) {
   let {corners} = this;
   let rs = recycledPolygon?recycledPolygon:polygonP.instantiate();
   rs.fromGeom = this;
   let pcorners = arrayShape.mk();
   if (scale) {
     let cnt = this.center();
     corners.forEach((c) => {
        let vec = c.difference(cnt);
        pcorners.push(cnt.plus(vec.times(scale)));
      })
   } else {
     corners.forEach((c) => {pcorners.push(c.copy())});
   }
   rs.corners = pcorners;
   return rs;
}

Rectangle.toCircleShape = function (circleP,scale=1) {
   let {corner,extent} = this;
   let hext = extent.times(0.5);
   let center = corner.plus(hext);
   let {x:wd,y:ht} = extent;
   let d = scale*Math.min(wd,ht);
   let rs = circleP.instantiate();
   rs.dimension = d;
   rs.moveto(center);
   return rs;
 }

Polygon.toCircleShape = function (circleP,scale=1) {
   let dim = this.minDimension();
   let center = this.center();
   let d = scale*dim;
   let rs = circleP.instantiate();
   rs.dimension = d;
   rs.moveto(center);
   return rs;
 }


LineSegment.toShape = function (lineP,scale=1) {
  let {end0,end1} = this;
  if (!lineP) {
    debugger;
  }
  if (scale!==1) {
    let vec = end1.difference(end0);
    let ln = vec.length();
    let nvec = vec.normalize();
    let center = end0.plus(end1).times(0.5);
    end1 = center.plus(nvec.times(0.5*scale*ln));
    end0 = center.plus(nvec.times(-0.5*scale*ln));
  }
  let line = lineP.instantiate();
  if (!line.setEnds) {
    debugger;
  }
  if (this.genPoint3d) {
    let e03d = this.via3d(end0);
    let e13d = this.via3d(end1);
    line.setEnds(e03d,e13d);
  } else {
    line.setEnds(end0,end1);
  }
  return line;
}
item.toShape = function (g,shapeDict,scale=1) {
  if (Circle.isPrototypeOf(g)) {
    return g.toShape(shapeDict.circleP,scale);
  }
   if (LineSegment.isPrototypeOf(g)) {	
    return g.toShape(shapeDict.lineP,scale);
  }
  if (Rectangle.isPrototypeOf(g)) {
    return g.toShape(shapeDict.rectP,scale);
  }
}

item.geoms2shapes = function (gs,shapeDict,scale=1) {
  return gs.map((g) => this.geom2shape(g,shapeDict,scale));
}
   
item.addLine = function (params)  {
  let {lines,line,lineP,end0,end1,segment} =params;
	if (!lines) {
		lines = this.lines =this.set('lines',core.ArrayNode.mk());
	}
  let oline=line?line:(end0?LineSegment.mk(end0,end1).toShape(lineP):segment.toShape(lineP));
  oline.show();
  lines.push(oline);
  oline.update();
  return oline;
}

const numPowers = function(n,p) {
  if (n === 0) {
    return 0;
  }
  if (n === p) { 
    return 1;
  }
  if (n%p === 0) {
    return 1 + numPowers(n/p,p);
  }
  return 0;
}
item.numPowers = function (n,p) {
  return numPowers(n,p);
}

// for the facility for saving state as json
item.assignValueToPath = function (path,value) {
  let spath = path.split('/');
  let ln = spath.length;
  let cvl = this;
  for (let i=0;i<ln-1;i++) {
    let pel = spath[i];
    let nvl = cvl[pel];
    if (!nvl) {
      nvl = {};
      cvl[pel] = nvl;
    }
    cvl = nvl;
  }
  let lst = spath[ln-1];
  cvl[lst] = value;
}
  
item.assignValues = function (vls) {
  vls.forEach( (vl) => {
    let [path,value] = vl;
    this.assignValueToPath(path,value);
  });
}
    
item.getTheState = function (cb) {
  let {path:ipath} = this;
  let idx = ipath.indexOf('_i_');
  let path = (idx>0)? ipath.substring(0,idx)+'.json':ipath;
  debugger;
  core.httpGet(path, (error,json) => {
    debugger;
    let state = JSON.parse(json);
    this.assignValues(state);
    if (cb) {
      cb();
    }
  });
}

item.saveTheState = function (cb) {
  let {path,stateOpsDisabled} = this;
  const next =
    () => {
      if (cb) {
        cb();
      } 
   };
    
  if (stateOpsDisabled) {
    next();
    return;
  }
  let state = this.computeState?this.computeState():null;
  if (state) {
    let jsn = JSON.stringify(state);
    core.saveJson(path,jsn,
      function (err,rs) {
        next();
      })
  }
}

item.horizontalize = function (p,noFrame) {
  if (p.width) {
    this.height = p.width;
    this.width = p.height;
  }
  this.frameWidth = p.frameHeight;
  this.frameHeight = p.frameWidth;
}


item.pointsTo3dAndBack = function (pnts) {
  let rs = [];
  pnts.forEach((p) => {
    let p3d = this.genPoint3d(p);
    if (p3d && (p3d.category !== 'notOnSurface')) {
      let ppnt = this.camera.project(p3d);
      rs.push(ppnt);
    } 
  });
  return rs;
}
item.toRGB = (r,g,b) => `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;

item.toGray = (v) => {
  let vi = Math.floor(v);
  return `rgb(${vi},${v},${vi})`;
}
item.canvasToRectangle = function () {
 let {width:wd,height:ht} = this;
 let corner = Point.mk(-0.5*wd,-0.5*ht);
 let extent = Point.mk(wd,ht);
 return Rectangle.mk(corner,extent);
}

item.rectSides = function (rect) {
  let hw,hh;
  let {corner,extent} = rect;
  hw = (extent.x)/2;
  hh = (extent.y)/2;
  let {x:cx,y:cy} = corner;
  let {x:ex,y:ey} = extent;
  let UL = Point.mk(cx,cy)
  let UR = Point.mk(cx+ex,cy)
  let LL = Point.mk(cx,cy+ey)
  let LR  = Point.mk(cx+ex,cy+ey)
  return [LineSegment.mk(UL,UR),LineSegment.mk(UR,LR),LineSegment.mk(LR,LL),LineSegment.mk(LL,UL)];
}

item.circleToCircleShape = function (nm,c,circleP) {
  let {center,radius} = c;
  let crc = circleP.instantiate().show();
  crc.dimension = 2*radius;
  this.set(nm,crc);
  crc.moveto(center);
  return crc;
}

item.addToArray = function (a,v,n) {
  for (let i=0;i<n;i++) {
    a.push(v);
  }
}


//item.computeExponentials = function (a,n,fc,root) {
item.computeExponentials = function (args) {
  let {dest:a,n,factor:fc,root} = args;
  a.push(root);
  let cv = root;
  for (let i=0;i<n;i++) {
    cv = fc*cv;
    a.push(cv);
  }
}

item.randomBetween = function (lh) {
  let {low,high} = lh;
  let d = high-low;
  let rs = low + Math.random() * d;
  rs = 0.01 * Math.floor(100*rs);
  return rs;
}

item.randomAmong = function (a) {
  let ln = a.length;
  let ri = Math.floor(ln * Math.random());
  let rs = a[ri];
  return rs;
}

item.randomizeFrom = function (o) {
  let ks = Object.keys(o);
  let rs = {};
  ks.forEach((k)=>{
    let v = o[k];
    let rv;
    if (Array.isArray(v)) {
      if (v.length === 1) {
        rv = v[0];
      } else {
        rv = this.randomAmong(v);
      }
    } else if (typeof v === 'object') {
      rv = this.randomBetween(v);
    } else {
      rv = v;
    }
    rs[k] = rv;
  });
  return rs;
}


item.randomizeArrayFrom = function (a) {
  let rs = a.map((v) => {
    if (Array.isArray(v)) {
       if (v.length === 1) {
        return v[0];
      } else {
        return this.randomAmong(v);
      }
    } else if (typeof v === 'object') {
      return this.randomBetween(v);
    } else {
      return v;
    }
  });
  return rs;
}
   
item.anyUndefined = function (a) {
  return a.includes(undefined);
}

item.firstNvaluesEqual = function (a,n,v) {
  let ln = a.length;
  if (ln < n) {
    return false;
  }

  for (let i=0;i<n;i++) {
    let cv = a[i][0];
    if (cv !== v) {
      return false;
    }
  }
  return true;
}
item.allValuesEqual = function (a,v) {

  return this.firstNvaluesEqual(a,a.length,v);
}
  
// Stepper 

item.Stepper = {};

item.mkStepper = function () {
  return Object.create(this.Stepper);
}

item.Stepper.min = 10;
item.Stepper.max = 90;
item.Stepper.stepSize  = 10;

item.Stepper.init = function (n) {
  let ar = this.ar = [];
  let loopIndices = this.loopIndices = [];

  for (let i=0;i<n;i++) {
    ar[i] = this.min;
    loopIndices[i] = 0;  
   }
  this.maxIndex = n-1;
}
  

item.Stepper.step = function (index) {
  let {ar,min,max,stepSize,maxIndex,loopIndices} = this;
  let loopOdd=0;
  let loopIndex;
  loopIndex = loopIndices[index];
  loopOdd = loopIndex%2;
  if (index>maxIndex) {
    return 1;
  }
  if (this.step(index+1)) {
    let v = ar[index];
    let nv = v + (loopOdd?-stepSize:stepSize);
    if ((nv > max) || (nv< min)) {
      this.loopIndices[index] =  loopIndex+1;
      return 1;
    } else {
      ar[index] =nv;
      return;
     }
   }
 }
 
 
item.deepCopy = function (o) { //only own props, and fails on circular structures
  let props = Object.getOwnPropertyNames(o);
  let cp = {};
  props.forEach((pr) => {
    let v = o[pr];
    let rv = (v && (typeof v === 'object'))?this.deepCopy(v):v;
    cp[pr] = rv;
  });
  return cp; 
}

item.firstInitialize = 1;
item.resetShapes = function () {
  if (this.recycle && !this.firstInitialize) {
    this.shapesRecycleIndex = 0;
  } else {
    if (this.shapes) {
      this.shapes.remove();
    }
    this.set('shapes',arrayShape.mk());
  }
  this.initialize();
  this.firstInitialize = 0;
  draw.refresh();
}

item.genRandomPoint = function (onw) {
  if (onw) {
    if (Rectangle.isPrototypeOf(onw)) {
      let {corner,extent} = onw;
      let lx = corner.x;	
      let ly = corner.y;
      let x = Math.random() * extent.x + lx;
      let y = Math.random() * extent.y + ly;
      return Point.mk(x,y);
    }
    if (oneDf.isPrototypeOf(onw)) {
      let rpnt = onw.randomPoint();
      return rpnt;
    }

  }
  let {width,height} = this;
  let rx = (Math.random()-0.5) * width;
   let ry= (Math.random()-0.5) * height;
  return Point.mk(rx,ry);
}

item.callIfDefined = function (nm,a0) {
  let fn = this[nm];
  if (fn) {
    fn.call(this,a0);
  }
}

item.pushValNtimes = function (a,v,n) {
  for (let i=0;i<n;i++) {
    a.push(v);
  }
}

item.addText = function (textP,rt,n,p,color) {
  let isTitle = n==='';
  let nm = isTitle?'txtTitle':'txt'+rt+n;
  let theText = rt+n;
  let txt = textP.instantiate();
  txt.text = theText;
  if (color) {
   txt.stroke = color;
  }
  this.set(nm,txt);
  txt.moveto(p);
  return txt;
}
core.root.backgroundColor = 'black';
item.setBackgroundColor = (clr) => core.root.backgroundColor = clr; 


item.initProtos = function () {
  this.polygonP =  polygonPP.instantiate();
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'transparent';
  this.polygonP['stroke-width'] =1;
  this.lineP =  linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] =.5 ;
    this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP['stroke-width'] =.05;
   let textP = this.textP =  textPP.instantiate();
  textP["font-size"] = "12";
  textP["font-style"] = "normal";
  textP["font-family"] = "arial";
  textP["font-weight"] = "normal";
  textP.stroke = 'white';
}
}
export {rs};
 
