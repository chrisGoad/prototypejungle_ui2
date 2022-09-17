// a part tree node has the form {polygn,P0:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {

rs.wLevelOf = function (where,n) {
  if (n<0) {
    return 0;
  }
  let h = where[n];
  let isInner = h[2];
  let plv = this.wLevelOf(where,n-1);
  let lv = isInner?plv:plv+1
  return lv;
}

rs.levelOf = function (prt) {
 // debugger;
  let {where} = prt;
  let ln = where.length;
  return this.wLevelOf(where,ln-1);
}
rs.isInner = function (prt) {
  let {where} = prt;
  let ln = where.length;
  if (ln === 0) {
    return 0;
  }
  let h = where[ln-1];
  return h[2]
}
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
 // debugger;
   let {polygon:pgon,where,root} = prt;
   let {corners} = pgon;
   let innerPart = sep?1:0;

   let sp;
   let psp=this.partSplitParams(prt);
   if (!psp) {
     return;
   }
   if (psp.TOP) {// mutlilevel split
      sp = psp.TOP;
   } else {
     sp = psp;
   }
   let {Case,vertexNum:ivertexNum,fr0,fr1,fr2,fr3,stop} = sp;
   let vertexNum = ivertexNum?ivertexNum:0;
   const addPart = (pn,vn,pgon) => {
     if (!pgon) {
       return;
     }
     let nprt = {polygon:pgon,where:[...where,[pn,vn,innerPart]],root,parent:prt,stop};
     prt[pn]= nprt;
     let ep = psp[pn];
     if (ep) {
       this.extendPartOneLevel(nprt,ep);
     }
     return nprt;
   }
   let e0,e1,e2,e3,p0corners,p1corners,p2corners,p3corners,p0pgon,p1pgon,p2pgon,p3pgon;
   const vertex = (n) =>  corners[(vertexNum+n)%3]; 
   let v0 = vertex(0);
   let v1 = vertex(1);
   let v2 = vertex(2);

   if (Case ===  1) {
     let seg0 = LineSegment.mk(v0,v1);
     let seg1 = LineSegment.mk(v2,v0);
     e0 = seg0.along(fr0);
     e1 = seg1.along(fr1);
     p0corners =[v0,e0,e1];
     p1corners = [e0,v1,v2,e1];
     p0pgon = Polygon.mk(p0corners);
     p1pgon = Polygon.mk(p1corners);
     addPart('P0',0,p0pgon);
     addPart('P1',0,p1pgon);
     return 1;
   }
  if ((Case ===  2) || (Case === 3)) {
     //debugger;
     let seg0 = LineSegment.mk(v0,v1);
     let seg1 = LineSegment.mk(v1,v2);
     let seg2 = LineSegment.mk(v2,v0);
     e0 = seg0.along(fr0);
     e1 = seg0.along(fr1);
     e2 = seg1.along(fr2);
     e3 = seg2.along(fr3);
     p0corners =[e0,e1,e2,e3];
     if (Case === 3) {
      p1corners = [e1,v1,e2];
      p2corners = [e2,v2,e3];
      p3corners = [v0,e0,e3];
     }
     p0pgon = Polygon.mk(p0corners);
     if (Case === 3) {
         p1pgon = Polygon.mk(p1corners);
        p2pgon = Polygon.mk(p2corners);
        p3pgon = Polygon.mk(p3corners);
     }
     this.checkPolygon(p0pgon);
     this.checkPolygon(p1pgon);
     addPart('P0',0,p0pgon);
     addPart('P1',0,p1pgon);
     addPart('P2',0,p2pgon);
     addPart('P3',0,p3pgon);
     return 1;
   }

   e0 = corners[vertexNum];
   let sege0 = corners[(vertexNum+1)%3];
   let sege1 = corners[(vertexNum+2)%3];
   let seg = LineSegment.mk(v1,v2);
   e1 = seg.along(fr0);
  // p0corners =[e0,sege0,e1];
   p0corners =[v0,v1,e1];
   //p1corners = [e0,e1,sege1];
   p1corners = [v0,e1,v2];
   p0pgon = Polygon.mk(p0corners);
   p1pgon = Polygon.mk(p1corners);
   addPart('P0',0,p0pgon);
   addPart('P1',0,p1pgon);
   return 1;
 }
 
 
rs.extendQuadOneLevel = function (prt,sep) {
  // debugger;
   let {polygon:pgon,where,root} = prt;
   let {corners} = pgon;
   let sp;
   let innerPart = sep?1:0;
   let psp=sep?sep:this.partSplitParams(prt);
   if (!psp) {
     return;
   }
   if (psp.TOP) {// mutlilevel split
      sp = psp.TOP;
   } else {
     sp = psp;
   }
   if (sp.stop) {
     return;
   }
   let levels = this.partParams.levels;
   let lv = this.levelOf(prt);
   if ((lv >= levels) && !innerPart) {
     return;
   }
   console.log('quad split','level',this.levelOf(prt),'inner',innerPart);

   let {vertexNum:ivertexNum,center,Case,ornt,fr0,fr1,fr2,fr3,stop} = sp;
   let vertexNum = ivertexNum?ivertexNum:0;

   const addPart = (pn,vn,pgon) => {
     if (pgon && pgon.corners) {
       let nprt = {polygon:pgon,where:[...where,[pn,vn,innerPart]],root,parent:prt};
       prt[pn]= nprt;
       let ep = psp[pn];
       if (ep) {
         this.extendPartOneLevel(nprt,ep);
       }
       return nprt;
     }
   }
   let e0,e1,e2,e3,p0corners,p1corners,p2corners,p3corners,p4corners,p0pgon,p1pgon,p2pgon,p3pgon,p4pgon;
   const vertex = (n) =>  corners[(vertexNum+n)%4];
   let v0 = vertex(0);
   let v1 = vertex(1);
   let v2 = vertex(2);
   let v3 = vertex(3);
   if (Case === 1) {
     let bisect  = (fr0===0) && (fr1 === 1);
     if (bisect) {
       p0corners =[v0,v1,v2];
       p1corners =[v0,v2,v3];
     } else if (fr0===0)  {
       let seg1 = LineSegment.mk(v1,v2);
       e1 = seg1.along(fr1);
       p0corners =[v0,v1,e1];
       p1corners = [v0,e1,v2,v3];
     } else {
       let seg0 = LineSegment.mk(v0,v1);
       let seg1 = LineSegment.mk(v1,v2);
       e0 = seg0.along(fr0); 
       e1 = seg1.along(fr1); 
       p0corners =[e0,v1,e1];
       p1corners =[v0,e0,e1,v2];
       p2corners =[v0,v2,v3];
     }
  } else if (Case === 2) {
     if (ornt === 'v') {
       let seg0 = LineSegment.mk(v1,v2);
       let seg1 = LineSegment.mk(v3,v0);
       e0 = seg0.along(fr0); 
       e1 = seg1.along(fr1); 
       p0corners =[v0,v1,e0,e1];
       p1corners =[e1,e0,v2,v3];
     } else{
       let seg0 = LineSegment.mk(v0,v1);
       let seg1 = LineSegment.mk(v2,v3);
       e0 = seg0.along(fr0); 
       e1 = seg1.along(fr1); 
       p0corners =[e0,v1,v2,e1];
       p1corners =[v0,e0,e1,v3];
     }
  }   else if (Case === 3) {
  //   debugger;
     let seg0 = LineSegment.mk(v0,v1);
     let seg1 = LineSegment.mk(v1,v2);
     let seg2 = LineSegment.mk(v2,v3);
     let seg3 = LineSegment.mk(v3,v0);
     e0 = seg0.along(fr0); 
     e1 = seg1.along(fr1); 
     e2 = seg2.along(fr2); 
     e3 = seg3.along(fr1); 
     p0corners =[e0,v1,e1];
     p1corners =[e1,v2,e2];
     p2corners =[e2,v3,e3];
     p3corners =[e3,v0,e0];
     p4corners =[e0,e1,e2,e3];
     
  } else if (Case===4) {
    let seg0 = LineSegment.mk(v0,v1);
    let seg1 = LineSegment.mk(v1,v2);
    let seg2 = LineSegment.mk(v2,v3);
    let seg3 = LineSegment.mk(v3,v0);
    e0 = seg0.along(fr0); 
    e1 = seg1.along(fr1); 
    e2 = seg2.along(fr2); 
    e3 = seg3.along(fr3); 
    let cseg = LineSegment.mk(e0,e2);
    let ce0 = cseg.along(fr4);
    let ce1 = cseg.along(fr5);
    p0corners = [v0,e0,ce0,e3];
    p1corners = [e0,v1,e1,ce1];
    p2corners = [ce1,e1,v2,e2];
    p2corners = [e3,ce0,e2,v3];
  } else if (center) {
    let seg0 = LineSegment.mk(v0,v1);
    let seg1 = LineSegment.mk(v1,v2);
    let seg2 = LineSegment.mk(v2,v3);
    let seg3 = LineSegment.mk(v3,v0);
    e0 = seg0.along(fr0); 
    e1 = seg1.along(fr1); 
    e2 = seg2.along(fr2); 
    e3 = seg3.along(fr3); 
    let c = center;
    p0corners = [v0,e0,ce0,e3];
    p1corners = [e0,v1,e1,c];
    p2corners = [e1,v2,e2,c];
    p3corners = [c,e2,v3,e3];
  }  
  p0pgon = Polygon.mk(p0corners);
  p1pgon = Polygon.mk(p1corners);
  p2pgon = Polygon.mk(p2corners);
  p3pgon = Polygon.mk(p3corners);
  p4pgon = Polygon.mk(p4corners);
  this.checkPolygon(p0pgon);
  this.checkPolygon(p1pgon);
  addPart('P0',0,p0pgon);
  addPart('P1',0,p1pgon);
  addPart('P2',0,p2pgon);
  addPart('P3',0,p3pgon);
  addPart('P4',0,p4pgon);
  return 1;
}
   
rs.extendPartOneLevel = function (prt,sep) {
   if (!prt) {
     return;
   }
   if (prt.P0) { // already extended 
     let ext = this.extendPartOneLevel(prt.P0,sep);
     this.extendPartOneLevel(prt.P1,sep);
     this.extendPartOneLevel(prt.P2,sep);
     this.extendPartOneLevel(prt.P3,sep);
     this.extendPartOneLevel(prt.P4,sep);
     return ext;
   }
   if (sep && sep.stop) {
     console.log('stop');
     return;
   }
   let {polygon:pgon} = prt;
   let {corners} = pgon;
   if (corners.length === 3) {
     return this.extendTriOneLevel(prt,sep);
  } else {
     return this.extendQuadOneLevel(prt,sep);
  }
  
}
     

 
 
  
rs.extendPartNLevels = function (prt,iparams) {
   //debugger;
   
    
   if (!prt) {
     return;
   }
   let {shapes,numRows,randomGridsForShapes} = this;
   let {where} = prt;
   if (!shapes) {
     shapes = this.set('shapes',arrayShape.mk());
   }
   let params;
   if (where) {
     params = prt.root.params;
   } else {
     where = prt.where = [];
     prt.root = prt;
     params = prt.params = iparams;
   }
      let lv =  this.levelOf(prt);
   //   console.log('extendPartNLevels',lv,'where=',where);
  // let lv =  where.length;
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
  /* let split = this.splitHere(prt,rvs);
   if (!split) {
     return;
   }*/
   if (this.extendPartOneLevel(prt)) {
     this.extendPartNLevels(prt.P0);//,i+1);
     this.extendPartNLevels(prt.P1);//,i+1);
     this.extendPartNLevels(prt.P2);//,i+1);
     this.extendPartNLevels(prt.P3);//,i+1);
     this.extendPartNLevels(prt.P4);//,i+1);
  }
 }
 
 
 rs.displayPart = function (prt,emitLineSegs) {
  //debugger;
   let {shapes,lineSegs} = this;
   //debugger;
   if (!prt) {
     return;
   }
   if (emitLineSegs && (!lineSegs)) {
    this.lineSegs = [];
   }
  // let lev = prt.where.length;
   let lev = this.levelOf(prt);
   if (lev > -1) {
     this.displayCell(prt,emitLineSegs);
   }
   if (prt.P0) {
     this.displayPart(prt.P0,emitLineSegs);
     if (lev > -1) {
       this.displayPart(prt.P1,emitLineSegs);
       this.displayPart(prt.P2,emitLineSegs);
       this.displayPart(prt.P3,emitLineSegs);
       this.displayPart(prt.P4,emitLineSegs);
     }
     return;
   }
}

rs.partVisible = function (prt) {
  let {visibles} = this.partParams;
  if (!visibles) {
    return 1;
  }
 // let lv = prt.where.length;
  let lv = this.levelOf(prt);
 /* if (lv >= 6) {
  //  debugger;
  }*/
  return visibles[lv];
}

rs.partMangle = function (prt) {
  let {mangles,mangle} = this.partParams;
  if (mangles) {
    //let lv =  prt.where.length;
    let lv =  this.levelOf(prt);
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
    //lv =  prt.where.length;
    lv =  this.levelOf(prt);
    if (lv > 2) {
     // debugger;
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
    let lv =  this.levelOf(prt);
    //let lv =  prt.where.length;
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
  let lv =  this.levelOf(prt);
  //let lv =  prt.where.length;
  return splitParamsByLevel[lv];
}
*/
rs.partFill = function (prt) {
}


rs.partFillScale = function (prt) {
 return 0;
}
rs.displayCnt = 0;
rs.checkPolygon = function (pgon) {
  if (!pgon) {
    return 0;
  }
  let {corners} = pgon;
  let ln = corners.length;
  for (let i=0;i<ln;i++) {
    let crn = corners[i];
    if (isNaN(crn.x)||isNaN(crn.y)) {
      debugger;
      return 1;
    }
  }
  return 0;
}

rs.displayCell = function (prt,toSegs) {	
  let {shapes,lineSegs,lineP,circleP,polygonP,mangles,lengthenings,twists,strokeWidths,orect,displayCnt} = this;
  let {circleScale} = prt.root.params;
  let vs = this.partVisible(prt);
  if (!vs) {
    return;
  }
  //debugger;
  let {where,polygon:pgon} = prt;
  if (this.checkPolygon(pgon)) {
    console.log('checkPolygon failed');
  }
 
  //console.log(' display ',displayCnt,this.whereName(where));
  this.displayCnt = displayCnt+1;
 // debugger;
  if (0 && (displayCnt>400)) {
    return;
  }
  //let lv = where.length;
  /*let isP0;
  if (lv === 1) {
    isP0 = (where[0][0] === 'P0');//&&(where[1][0] === 'P0');
    debugger;
  }*/
  //let mng = mangles?mangles[lv]:0;
  let mng = this.partMangle(prt);
  let mangled;
 //let geom = rect?rect:pgon;
  let geom = pgon;
  let shps;
  let strokew = this.partStrokeWidth(prt);//strokeWidths[lnw];
  let stroke = this.partStroke(prt);
  //let fill = isP0?'yellow':this.partFill(prt);
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
      if (!pgon) {
        debugger;
      }
      shps = pgon.toShape(polygonP,sc);
   // }
    styleShape(shps);
    shapes.push(shps);
  }
  if (mng) {
    //let {lengthen:ln,twist:tw} = mng;
     //mangled = geom.mangle({within:orect,lengthen:ln,twist:tw});
     mangled = geom.mangle(mng);
     mangled.forEach((seg) => {
      if (toSegs) {
        lineSegs.push(seg);
        return;
      }
      let segs = seg.toShape(lineP);
     // let  lnw = prt.where.length;
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
    rs = rs+v[0]+'_';
  });
  return rs;
}

rs.quad2part = function (params) { 
  let {iornt,fr0,fr1,fr2,fr3,fr4,fr5} = params;
  let ornt = iornt?iornt:'h';
  let oornt = ornt === 'h'?'v':'h';
  let efr0,efr1,efr2,efr3,efr4,efr5;
  if (!fr3) { //rectangular case
    efr0 = fr0;
    efr1 = fr0;
    efr2 = fr1;
    efr3 = fr1;
    efr4 = fr2;
    efr5 = 1-fr2;
  } else {
    efr0 = fr0;
    efr1 = fr1;
    efr2 = fr2;
    efr3 = fr3;
    efr4 = fr4;
    efr5 = fr5;
  }
  let p0p = {Case:2,ornt:oornt,fr0:efr2,fr1:1-efr3};
  let p1p = {Case:2,ornt:oornt,fr0:efr4,fr1:efr5};
  let tp = {Case:2,ornt:ornt,fr0:efr0,fr1:efr1};
  let rs = {TOP:tp,P0:p0p,P1:p1p}
  //debugger;
  return rs;
}

rs.initialize = function () {
  let {width:wd,height:ht,partParams,dropParams} = this;
 debugger;
  let hwd = 0.5*wd;
  let hht = 0.5*ht;
  //let {emitLineSegs,polygonal} = partParams;
  let {emitLineSegs,rectangular} = partParams;
//  polygonal = 1;
  this.addFrame();
  this.initProtos();
  this.callIfDefined('adjustProtos');
 // if (!this.strokeWidths) {
  //  this.strokeWidths = this.computeExponentials(partParams.levels,0.1,0.9);
  //}
  let pgon;
  if (rectangular) {
    let p0 = Point.mk(-hwd,hht);
    let p1 = Point.mk(-hwd,-hht);
    let p2 = Point.mk(hwd,-hht);
    let p3 = Point.mk(hwd,hht);
    pgon = Polygon.mk([p0,p1,p2,p3]);
  } else {
    let p0 = Point.mk(-hwd,hht);
    let p1 = Point.mk(0,-hht);
    let p2 = Point.mk(hwd,hht);
    pgon = Polygon.mk([p0,p1,p2]);
  }
  let prt ={polygon:pgon};
  this.extendPartNLevels(prt,partParams);
  this.displayPart(prt,emitLineSegs);
  if (partParams.emitLineSegs) {
    this.generateDrops(dropParams);
  }
  this.callIfDefined('afterInitialize');

}
}

export {rs};