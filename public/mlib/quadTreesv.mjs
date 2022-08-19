// a quad tree node has the form {rectangle,UL:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {

const interpolatePoints = function (p0,p1,fr)  {
  let vec = p1.difference(p0);
  return p0.plus(vec.times(fr));
}

const switchToPolygon = function (qd) {
  return 0;
}
rs.quadSplitParams = function (qd) {
  let {quadParams} = this;
  let {splitParams,splitParamsByLevel} = quadParams;
  if (splitParams) {
    return splitParams;
  } 
  if (splitParamsByLevel) {
    let lv = qd.where.length;
    return splitParamsByLevel[lv];
  }
}
rs.extendQuadOneLevel = function (qd) {
   if (qd.UL) {
     return;
   }
   let where = qd.where;
   let root = qd.root;
   //let params = iparams?iparams:root.splitParams;
  // let {splitType,fr0,fr1,fr2} = params;
   
 //  let [fr0,fr1,fr2] = [0.45,0.45,0.3];
  // let sp=(this.computeSplitParams)?this.computeSplitParams(qd):['h',0.5,0.5,0.5];
   let sp=this.quadSplitParams(qd);
   if (!sp) {
     return;
   }
   let {switchToPolygon:swtp,ornt,fr0,fr1,fr2,fr3,fr4,fr5,center,pfr0,pfr1,pfr2,pfr3} = sp;

 // debugger;
   let {rectangle:rect,polygon:pgon} = qd;
   if (rect && swtp) {
     pgon = rect.toPolygon();
   }
   /*  the parameters ornt,fr0,fr1,fr2 determine how the rectangle is split up in to 4 smaller rectangles.
   If ornt === 'h' is falsy, the rectangle is first split at the fr0 mark into left and right rects RL and RR.
    Then RL is split at the fr1 mark and RR and the fr2 mark;
     If ornt === 'h', the rectangle is first split at the fr0 mark into top and bottom rects RT and RB.
    Then RT is split at the fr1 mark and RB and the fr2 mark;*/
   if (rect && !swtp) {
    // let [ornt,fr0,fr1,fr2] = sp;
     let h = ornt === 'h';   
     let {corner,extent} = rect;
     let {x:cx,y:cy} = corner;
     let {x:ex,y:ey} = extent;
     let ULcorner = corner.copy();
     let ULextentX = h?fr1*ex:fr0*ex;
     let ULextentY = h?fr0*ey:fr1*ey;
     let URcornerX = h?cx + fr1*ex:cx + fr0*ex;
     let URcornerY = cy;
     let URextentX = h?(1-fr1)*ex:(1-fr0)*ex;
     let URextentY = h?ULextentY:fr2*ey;
     let LLcornerX = cx;
     let LLcornerY = h?cy + fr0 * ey:cy+fr1*ey;
     let LLextentX = h?fr2 * ex:fr0*ex;
     let LLextentY = h?(1-fr0) * ey:(1-fr1)*ey;
     let LRcornerX = h?cx + fr2*ex:URcornerX;
     let LRcornerY = h?LLcornerY:cy+fr2*ey;
     let LRextentX = h?(1-fr2) * ex:(1-fr0)*ex;
     let LRextentY = h?LLextentY:(1-fr2)*ey;
     let ULextent = Point.mk(ULextentX,ULextentY);
     let URextent = Point.mk(URextentX,URextentY);
     let LRextent = Point.mk(LRextentX,LRextentY);
     let LLextent = Point.mk(LLextentX,LLextentY);
     
     let URcorner = Point.mk(URcornerX,URcornerY);
     let LRcorner = Point.mk(LRcornerX,LRcornerY);
     let LLcorner = Point.mk(LLcornerX,LLcornerY);
     
     
     const nextQuad = (nm,corner,extent) => {
       let rect = Rectangle.mk(corner,extent);
       qd[nm] = {rectangle:rect,where:[...where,nm],root};
     }
     
     nextQuad('UL',ULcorner,ULextent);
     nextQuad('UR',URcorner,URextent);
     nextQuad('LR',LRcorner,LRextent);
     nextQuad('LL',LLcorner,LLextent);
     return 1;
   } else if (center) {
     let {corners} = pgon;
    // let [center,fr0,fr1,fr2,fr3] = sp;
     let ONtop = interpolatePoints(corners[0],corners[1],pfr0);
     let ONright = interpolatePoints(corners[1],corners[2],pfr1);
     let ONbot = interpolatePoints(corners[2],corners[3],pfr2);
     let ONleft= interpolatePoints(corners[3],corners[0],pfr3);
     let ULgon = Polygon.mk([corners[0].copy(),ONtop.copy(),center.copy(),ONleft.copy()]);
     let URgon = Polygon.mk([ONtop.copy(),corners[1].copy(),ONright.copy(),center.copy()]);
     let LRgon = Polygon.mk([center.copy(),ONright.copy(),corners[2].copy(),ONbot.copy()]);
     let LLgon = Polygon.mk([ONleft.copy(),center.copy(),ONbot.copy(),corners[3].copy()]);  
     const addQuad = (nm,pgon) => {
       qd[nm] = {polygon:pgon,where:[...where,nm],root};
     }
     addQuad('UL',ULgon);
     addQuad('UR',URgon);
     addQuad('LR',LRgon);
     addQuad('LL',LLgon);
     return 1;
  } else {
   /*  the parameters ornt,fr0,fr1,fr2,fr3,fr4,fr5 determine how the quadrangle is split up in to 4 smaller quadrangles.
   If ornt === 'h' is falsy, the quadrangle is first split at the fr0 mark (at top) and fr1 (at bottom into left and right quadrangles QL and QR, .
    Then QL is split at the fr2 ,fr3 marks and QR at the fr4, fr5 marks;
     If ornt === 'h', the quadrangle is first split at the fr0,fr1 marks into top and bottom quadrangles QT and QB.
    Then QT is split at the fr2, fr3 marks and QB at the fr4, fr5  marks.*/
     let v = ornt !== 'h'; 
     let sides =  pgon.sides();
     let top = sides[0];    
     let right = sides[1];     
     let bot = sides[2];     
     let left = sides[3];
     let corners = pgon.corners;
     let ULC = corners[0];
     let URC = corners[1];
     let LRC = corners[2];
     let LLC = corners[3];
     let ULQ_ULC,ULQ_URC,ULQ_LRC,ULQ_LLC, URQ_ULC,URQ_URC,URQ_LRC,URQ_LLC, LRQ_ULC,LRQ_URC,LRQ_LRC,LRQ_LLC, LLQ_ULC,LLQ_URC,LLQ_LRC,LLQ_LLC;
     if (v) {
       ULQ_ULC = ULC.copy();
       ULQ_URC = top.along(fr0);
       LRQ_LLC = bot.along(fr1);
       let Central_split = LineSegment.mk(ULQ_URC,LRQ_LLC);
       ULQ_LRC =Central_split.along(fr3);
       ULQ_LLC =left.along(fr0);
       
       URQ_ULC= ULQ_URC;
       URQ_URC = URC;
       URQ_LRC = right.along(fr5);
       URQ_LLC = Central_split.along(fr4);
       LRQ_ULC = URQ_LLC;
       LRQ_URC = URQ_LRC;
       LRQ_LRC = LRC;
       //LRQ_LLC already defined
       LLQ_ULC = ULQ_LLC;
       LLQ_URC = Central_split.along(fr3);
       LLQ_LRC = LRQ_LLC;
       LLQ_LLC = LLC;
     } else {
       ULQ_ULC = ULC.copy();
       ULQ_URC = top.along(fr2);
       ULQ_LLC = left.along(fr0);
       URQ_LRC = right.along(fr1);
       let Central_split = LineSegment.mk(ULQ_LLC,URQ_LRC);
       ULQ_LRC = left.along(fr0);
       
       URQ_ULC= ULQ_URC;
       URQ_URC = URC;
       URQ_LLC = Central_split.along(fr3);
       
       LRQ_ULC = Central_split.along(fr5);
       LRQ_URC = URQ_LRC;
       LRQ_LRC = LRC;
       LRQ_LLC = bot.along(fr4);
       
       LLQ_ULC = ULQ_LLC;
       LLQ_URC = Central_split.along(fr3);
       LLQ_LRC = LRQ_LLC;
       LLQ_LLC = LLC;
     }
     const nextQuad = (nm,UL,UR,LR,LL) => {
       
       let corners = [UL,UR,LR,LL];
       let newgon = Polygon.mk(corners);
       qd[nm] = {polygon:newgon,where:[...where,nm],root};
     }
     
     nextQuad('UL',ULQ_ULC,ULQ_URC,ULQ_LRC,ULQ_LLC);
     nextQuad('UR',URQ_ULC,URQ_URC,URQ_LRC,URQ_LLC);
     nextQuad('LR',LRQ_ULC,LRQ_URC,LRQ_LRC,LRQ_LLC);
     nextQuad('LL',LLQ_ULC,LLQ_URC,LLQ_LRC,LLQ_LLC);
    
     return 1;
  }
}
  
 
 
 
rs.randomSplit = function (qd,ichance) {
  if (!qd) {
    debugger;
  }
  let params = qd.root.params;
  let {chance,alwaysSplitBefore,levels} = params;
  if (!chance) {
    chance = ichance;
  }
  let d = qd.where.length;
  return (d<levels) && ((Math.random()<chance) || (d<alwaysSplitBefore));
}

rs.splitHere = function (qd) {
  return this.randomSplit(qd);
}
  
rs.extendQuadNLevels = function (qd,params) {
 // debugger;
   let {shapes,numRows,randomGridsForShapes} = this;
   let {where} = qd;
   if (!shapes) {
     shapes = this.set('shapes',arrayShape.mk());
   }
   if (!where) {
     where = qd.where = [];
     qd.root = qd;
     qd.params = params;
   }
  // let params = qd.root.params;
 //  let {levels,chance,startSplit=3} = params;

 //  if (i===0){
  //   qd.where = [];
 //  }
    let {rectangle:rect,polygon:pgon} = qd;
    let rvs;
    if (numRows && randomGridsForShapes) {
      let pnt = rect?rect.center():pgon.center();
      let cell = this.cellOf(pnt);
      rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
    }
   let split = this.splitHere(qd,rvs);
   if (!split) {
     return;
   }
   if (this.extendQuadOneLevel(qd)) {
 //  if ((i+1) >= levels) {
 //    return;
 //  }
     this.extendQuadNLevels(qd.UL);//,i+1);
     this.extendQuadNLevels(qd.UR);//,i+1);
     this.extendQuadNLevels(qd.LL);//,i+1);
     this.extendQuadNLevels(qd.LR);//,i+1);
  }
 }
 
 
 rs.displayQuad = function (qd,emitLineSegs) {
   let {shapes,lineSegs} = this;
   //debugger;
   if (emitLineSegs && (!lineSegs)) {
    this.lineSegs = [];
   }
   this.displayCell(qd,emitLineSegs);
   if (qd.UL) {
     this.displayQuad(qd.UL,emitLineSegs);
     //this.displayQuad(qd.UR,emitLineSegs);
     //this.displayQuad(qd.LL,emitLineSegs);
     //this.displayQuad(qd.LR,emitLineSegs);
     return;
   }
}

rs.quadVisible = function (qd) {
  let {visibles} = this.quadParams;
  if (!visibles) {
    return 1;
  }
  let lv = qd.where.length;
 /* if (lv >= 6) {
    debugger;
  }*/
  return visibles[lv];
}

rs.quadMangle = function (qd) {
  let {mangles,mangle} = this.quadParams;
  if (mangles) {
    let lv =  qd.where.length;
    return mangles[lv];
  } else if (mangle) {
    return mangle;
  }
}

rs.quadStrokeWidth = function (qd) {
  let {strokeWidths} = this.quadParams;
  //debugger;
  if (strokeWidths) {
    let lv =  qd.where.length;
    let sw =strokeWidths[lv];
   // console.log('lv',lv,'sw',sw);
    return sw;
  }
}


rs.quadSplitParms = function (qd) {
  let {splitParams,splitParamsByLevel} = this.quadParams;
  if (splitParams) {
    return splitParams;
  }
  let lv =  qd.where.length;
  return splitParamsByLevel[lv];
}

rs.displayCell = function (qd,toSegs) {	
  let {shapes,lineSegs,lineP,circleP,mangles,lengthenings,twists,strokeWidths,orect} = this;
  let {circleScale} = qd.root.params;
  let vs = this.quadVisible(qd);
  if (!vs) {
    return;
  }
  debugger;
  let {where,rectangle:rect,polygon:pgon} = qd;
  let lv = where.length;
  //let mng = mangles?mangles[lv]:0;
  let mng = this.quadMangle(qd);
  let mangled;
  let shp = rect?rect:pgon;
  if (mng) {
    let {lengthen:ln,twist:tw} = mng;
     mangled = shp.mangle({within:orect,lengthen:ln,twist:tw});
  } else {
    mangled = shp.sides();
  } 
  mangled.forEach((seg) => {
     if (toSegs) {
      lineSegs.push(seg);
      return;
    }
    let segs = seg.toShape(lineP);
    let  lnw = qd.where.length;
    
    let strokew = this.quadStrokeWidth(qd);//strokeWidths[lnw];
    if (strokew) {
      segs['stroke-width'] = strokew;
    }
    shapes.push(segs);
  });
  if (circleScale) {
    debugger;
    let c = rect.center();
   let ext = rect.extent;
   let r = 0.5*circleScale*Math.min(ext.x,ext.y);
   let crc = Circle.mk(c,r);
   
   let crcs =  crc.toShape(circleP);
   shapes.push(crcs);
  }
}

/*
rs.computeExponentials = function (rs,n,fc,root) {
  for (let i=0;i<=n;i++) {
    let cv = fc*Math.pow(root,i);
    console.log('cv',cv);
    rs.push(cv);
  }
}
*/

rs.initialize = function () {
  let {width:wd,height:ht,quadParams,dropParams} = this;
  debugger;
  let {emitLineSegs,polygonal} = quadParams;
  this.addFrame();
  this.initProtos();
 // if (!this.strokeWidths) {
  //  this.strokeWidths = this.computeExponentials(quadParams.levels,0.1,0.9);
  //}
  let r = Rectangle.mk(Point.mk(-0.5*wd,-0.5*ht),Point.mk(wd,ht));
  let qd;
  if (polygonal) {
     let p = r.toPolygon();
     qd ={polygon:p};
  } else {
    qd = {rectangle:r};
  }
  this.extendQuadNLevels(qd,quadParams);
  this.displayQuad(qd,emitLineSegs);
  if (quadParams.emitLineSegs) {
    this.generateDrops(dropParams);
  }
}
}

export {rs};
