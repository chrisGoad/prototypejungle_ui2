// a quad tree node has the form {rectangle,UL:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {

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

rs.extendTriOneLevel = function (prt) {
   let {polygon:pgon} = this;
   let {corners} = pgon;
   let sp=this.partSplitParams(prt);
   let {vertexNum,fr0,fr1} = sp;
   const addPart = (pn,vn,pgon) => {
     qd[nm] = {polygon:pgon,where:[...where,[pn,vn],root};
   }
   if (fr1) {
     seg0e0 = corners[vertexNum];
     seg0e1 = corners[(vertexNum+1)%3];
     seg1e0 = corners[(vertexNum+2)%3];
     seg1e1 = seg0e0;

     seg0 = LineSegment.mk(seg0e0,seg0e1);
     seg1 = LineSegment.mk(seg1e1,seg1e0);
     e0 = seg0.along(fr0);
     e1 = seg1.along(fr1);
     let p0corners =[seg0e0,e0,e1];
     let p1corners = [e0,seg0e1,seg1e0,e1];
     p0pgon = Polygon.mk(p0corners);
     p1pgon = Polygon.mk(p1corners);
     addPart(p0pgon,0,vertexNum);
     addPart(p1pgon1,1,vertexNum);
   }
 }
   
rs.extendPartOneLevel = function (prt) {
   let {polygon:pgon} = prt;
   let {corners} = pgon;
   if (corners.length === 3) {
     this.extendTriOneLevel(qd);
  }
}
     

 
 
  
rs.extendPartNLevels = function (prt,params) {
 // debugger;
   let {shapes,numRows,randomGridsForShapes} = this;
   let {where} = prt;
   if (!shapes) {
     shapes = this.set('shapes',arrayShape.mk());
   }
   if (!where) {
     where = prt.where = [];
     prt.root = prt;
     prt.params = params;
   }
   let lv =  where.length;
   let {levels} = params;
   if (lv >= levels) {
     return;
    }
    let {polygon:pgon} = prt;
    let rvs;
    if (numRows && randomGridsForShapes) {
      let pnt = rect?rect.center():pgon.center();
      let cell = this.cellOf(pnt);
      rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
    }
   let split = this.splitHere(prt,rvs);
   if (!split) {
     return;
   }
   if (this.extendPartOneLevel(prt)) {
     this.extendQuadNLevels(prt.UL);//,i+1);
     this.extendQuadNLevels(prt.UR);//,i+1);
     this.extendQuadNLevels(prt.LL);//,i+1);
     this.extendQuadNLevels(prt.LR);//,i+1);
  }
 }
 
 
 rs.displayQuad = function (qd,emitLineSegs) {
   let {shapes,lineSegs} = this;
   //debugger;
   if (emitLineSegs && (!lineSegs)) {
    this.lineSegs = [];
   }
   let lev = qd.where.length;
   if (lev > -1) {
     this.displayCell(qd,emitLineSegs);
   }
   if (qd.UL) {
     this.displayQuad(qd.UL,emitLineSegs);
     if (lev > -1) {
       this.displayQuad(qd.UR,emitLineSegs);
       this.displayQuad(qd.LL,emitLineSegs);
       this.displayQuad(qd.LR,emitLineSegs);
     }
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
  //  debugger;
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
  let lv,sw;
  if (strokeWidths) {
    lv =  qd.where.length;
    if (lv > 2) {
      debugger;
    }
    sw =strokeWidths[lv];
   // console.log('lv',lv,'sw',sw);
    return sw;
  }
}


rs.quadStroke = function (qd) {
  let {strokes} = this.quadParams;
  //debugger;
  if (strokes) {
    let lv =  qd.where.length;
    let s =strokes[lv];
   // console.log('lv',lv,'sw',sw);
    return s;
  }
}

/*
rs.quadSplitParams = function (qd) {
  let {splitParams,splitParamsByLevel} = this.quadParams;
  if (splitParams) {
    return splitParams;
  }
  let lv =  qd.where.length;
  return splitParamsByLevel[lv];
}
*/
rs.quadFill = function (qd) {
}


rs.quadFillScale = function (qd) {
 return 0;
}

rs.displayCell = function (qd,toSegs) {	
  let {shapes,lineSegs,lineP,circleP,polygonP,mangles,lengthenings,twists,strokeWidths,orect} = this;
  let {circleScale} = qd.root.params;
  let vs = this.quadVisible(qd);
  if (!vs) {
    return;
  }
  let {where,rectangle:rect,polygon:pgon} = qd;
  let lv = where.length;
  //let mng = mangles?mangles[lv]:0;
  let mng = this.quadMangle(qd);
  let mangled;
 //let geom = rect?rect:pgon;
  let geom = pgon;
  let shps;
  let strokew = this.quadStrokeWidth(qd);//strokeWidths[lnw];
  let stroke = this.quadStroke(qd);
  let fill = this.quadFill(qd);
  let fillScale = this.quadFillScale(qd);
  const styleShape = (shp) => {
     if (strokew) {
       shp['stroke-width'] = strokew;
     }
     if (stroke) {
       shp.stroke = stroke;
     }
     if (fill) {
       shp.fill = fill;
     }
  }
  const addShape = (sc) => {
  //  debugger;
   // if (rect) {
   //   shps = rect.toShape(rectP,sc);
   // } else {
      shps = pgon.toShape(polygonP,sc);
   // }
    styleShape(shps);
    shapes.push(shps);
  }
  if (mng) {
    let {lengthen:ln,twist:tw} = mng;
     mangled = geom.mangle({within:orect,lengthen:ln,twist:tw});
     mangled.forEach((seg) => {
      if (toSegs) {
        lineSegs.push(seg);
        return;
      }
      let segs = seg.toShape(lineP);
      let  lnw = qd.where.length;
      styleShape(segs);
      shapes.push(segs);
    });
    //stroke1
     if (fill && fillScale) {
       addShape(fillScale);
       /*
       if (rect) {
        shps = rect.toShape(rectP,fillScale);
      } else {
        shps = pgon.toShape(polygonP,fillScale);
      }
      styleShape(shps);
      shapes.push(shps);
     */
    }
  } else {
    addShape();
  /*  if (rect) {
      shps = rect.toShape(rectP);
    } else {
      shps = pgon.toShape(polygonP);
    }
   // mangled = geom.sides();
    styleShape(shps);
    shapes.push(shps);
*/
  }
  
  if (circleScale) {
   // debugger;
    let c = geom.center();
    let r;
    if (rect) {
     let ext = rect.extent;
     r = 0.5*circleScale*Math.min(ext.x,ext.y);
   } else {
     r = 0.5*circleScale*pgon.minDimension();
   }
   let crc = Circle.mk(c,r);
   let crcs =  crc.toShape(circleP);
   shapes.push(crcs);
  }
}

rs.stepQuadParams = function (params) {
 // debugger;
  let {randomize,quadParams:qdp,whichToStep,range:v,stepper} = params;
  if (randomize) {
    let rs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
    return rs;
  }
  let ln = whichToStep.length;
 // let qdp = {ornt};
  stepper.step(0);
  console.log(JSON.stringify(this.ar));
  for (let i=0;i<ln;i++) {
    let wts = whichToStep[i];
    let wtsln = wts.length;
    for (let j=0;j<wtsln;j++) {
      let idx = wts[j];
      let frnm = 'fr'+idx;
      let av = stepper.ar[i];
      qdp[frnm] = 0.01*av;
     };
  }
 // return qdp;
 }
 
 
rs.whereName = function (w) {
  let rs = '_';
  w.forEach( (v) => {
    rs = rs+v+'_';
  });
  return rs;
}

rs.initialize = function () {
  let {width:wd,height:ht,quadParams,dropParams} = this;
 debugger;
  let {emitLineSegs,polygonal} = quadParams;
  polygonal = 1;
  this.addFrame();
  this.initProtos();
  this.callIfDefined('adjustProtos');
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
  this.callIfDefined('afterInitialize');

}
}

export {rs};