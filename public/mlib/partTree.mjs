// a part tree node has the form {polygn,P0:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {

rs.partSplitParams = function (prt) {
  let {partParams} = this;
  let {splitParams,splitParamsByLevel} = partParams;
  if (splitParams) {
    return splitParams;
  } 
  if (splitParamsByLevel) {
    let lv = prt.where.length;
    return splitParamsByLevel[lv];
  }  
}

rs.extendTriOneLevel = function (prt) {
  
   let {polygon:pgon} = prt;
   let {corners} = pgon;
   let sp=this.partSplitParams(prt);
   let {vertexNum,fr0,fr1} = sp;
   const addPart = (pn,vn,pgon) => {
     prt[nm] = {polygon:pgon,where:[...where,[pn,vn],root};
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
     return;
   }
   e0 = corners[vertexNum];
   sege0 = corners[(vertexNum+1)%3];
   sege1 = corners[(vertexNum+2)%3];
   seg = LineSegment.mk(sege0,sege1);
   e1 = seg.along(fr1);
   let p0corners =[e0,sege0];
   let p1corners = [e0,e1,sege1,e1];
   p0pgon = Polygon.mk(p0corners);
   p1pgon = Polygon.mk(p1corners);
   addPart(p0pgon,0,vertexNum);
   addPart(p1pgon1,1,vertexNum);
   return;
 }
   
rs.extendPartOneLevel = function (prt) {
   if (!prt) {
     return;
   }
   let {polygon:pgon} = prt;
   let {corners} = pgon;
   if (corners.length === 3) {
     this.extendTriOneLevel(prt);
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
     this.extendPartNLevels(prt.P0));//,i+1);
     this.extendPartNLevels(prt.P1);//,i+1);
     this.extendPartNLevels(prt.P2);//,i+1);
     this.extendPartNLevels(prt.P3);//,i+1);
  }
 }
 
 
 rs.displayPart = function (prt,emitLineSegs) {
   let {shapes,lineSegs} = this;
   //debugger;
   if (!prt) {
     return;
   }
   if (emitLineSegs && (!lineSegs)) {
    this.lineSegs = [];
   }
   let lev = prt.where.length;
   if (lev > -1) {
     this.displayCell(prt,emitLineSegs);
   }
   if (prt.UL) {
     this.displayPart(prt.UL,emitLineSegs);
     if (lev > -1) {
       this.displayPart(prt.UR,emitLineSegs);
       this.displayPart(prt.LL,emitLineSegs);
       this.displayPart(prt.LR,emitLineSegs);
     }
     return;
   }
}

rs.partVisible = function (prt) {
  let {visibles} = this.partParams;
  if (!visibles) {
    return 1;
  }
  let lv = prt.where.length;
 /* if (lv >= 6) {
  //  debugger;
  }*/
  return visibles[lv];
}

rs.partMangle = function (prt) {
  let {mangles,mangle} = this.partParams;
  if (mangles) {
    let lv =  prt.where.length;
    return mangles[lv];
  } else if (mangle) {
    return mangle;
  }
}

rs.partStrokeWidth = function (prt) {
  let {strokeWidths} = this.partParams;
  //debugger;
  let lv,sw;
  if (strokeWidths) {
    lv =  prt.where.length;
    if (lv > 2) {
      debugger;
    }
    sw =strokeWidths[lv];
   // console.log('lv',lv,'sw',sw);
    return sw;
  }
}


rs.partStroke = function (prt) {
  let {strokes} = this.partParams;
  //debugger;
  if (strokes) {
    let lv =  prt.where.length;
    let s =strokes[lv];
   // console.log('lv',lv,'sw',sw);
    return s;
  }
}

/*
rs.partSplitParams = function (prt) {
  let {splitParams,splitParamsByLevel} = this.partParams;
  if (splitParams) {
    return splitParams;
  }
  let lv =  prt.where.length;
  return splitParamsByLevel[lv];
}
*/
rs.partFill = function (prt) {
}


rs.partFillScale = function (prt) {
 return 0;
}

rs.displayCell = function (prt,toSegs) {	
  let {shapes,lineSegs,lineP,circleP,polygonP,mangles,lengthenings,twists,strokeWidths,orect} = this;
  let {circleScale} = prt.root.params;
  let vs = this.partVisible(prt);
  if (!vs) {
    return;
  }
  let {where,polygon:pgon} = prt;
  let lv = where.length;
  //let mng = mangles?mangles[lv]:0;
  let mng = this.partMangle(prt);
  let mangled;
 //let geom = rect?rect:pgon;
  let geom = pgon;
  let shps;
  let strokew = this.partStrokeWidth(prt);//strokeWidths[lnw];
  let stroke = this.partStroke(prt);
  let fill = this.partFill(prt);
  let fillScale = this.partFillScale(prt);
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
      let  lnw = prt.where.length;
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

rs.stepPartParams = function (params) {
 // debugger;
  let {randomize,partParams:qdp,whichToStep,range:v,stepper} = params;
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
  let {width:wd,height:ht,partParams,dropParams} = this;
 debugger;
  let {emitLineSegs,polygonal} = partParams;
  polygonal = 1;
  this.addFrame();
  this.initProtos();
  this.callIfDefined('adjustProtos');
 // if (!this.strokeWidths) {
  //  this.strokeWidths = this.computeExponentials(partParams.levels,0.1,0.9);
  //}
  let p0 = Point.mk(-hwd,hht);
  let p1 = Point.mk(0,-hht);
  let p1 = Point.mk(hwd,hht);
  let pgon = Polygon.mk([p0,p1,p2]);
  prt ={polygon:pgon};
  this.extendPartNLevels(prt,partParams);
  this.displayPart(prt,emitLineSegs);
  if (partParams.emitLineSegs) {
    this.generateDrops(dropParams);
  }
  this.callIfDefined('afterInitialize');

}
}

export {rs};