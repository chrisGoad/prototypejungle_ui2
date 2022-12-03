// a part tree node has the form {polygn,P0:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {


rs.levelOf = function (prt) {
 // debugger;
  let {where} = prt;
  return where.length;
}

rs.partName = function (prt) {
  let {where} = prt;
  let ln = where.length;
  if (ln === 0) {
    return 'top';
  }
  return where[ln-1][0];
}

rs.partSplitParams = function (prt) {
  let {partParams} = this;
  let {splitParams,splitParamsByLevel} = partParams;
  if (splitParams) {
    return splitParams;
  } 
}
 

rs.extendTriOneLevel = function (prt) {
   let {polygon:pgon,where,root} = prt;
   let {corners} = pgon;
   let sp= this.partSplitParams(prt);
   if ((!sp)  || (prt.stop)) {
     return;
   }
   let {Case,vertexNum:ivertexNum,pcs = [],pc0,pc1,pc2,pc3,stops=[]} = sp;
   if (!pc0) {
     pc0 = pcs[0]; 
     pc1 = pcs[1]; 
     pc2 = pcs[2];
     pc3 = pcs[3]; 
   }
   let case1 = Case === 1;
   let case2 = Case === 2;
   let vertexNum = ivertexNum?ivertexNum:0;
   const addPart = (pn,vn,pgon,stop) => {
     if (!pgon) {
       return;
     }
     if (!(pgon.corners)) {
       return;
     }
     let nprt = {polygon:pgon,where:[...where,[pn,vn]],root,parent:prt,stop};
     prt[pn]= nprt;
     return nprt;
   }
   let side0 = Math.floor(pc0);
   let side1 = Math.floor(pc1); 
   if (side1 <= side0) {
     core.error('bad sides');
   }
   let n0 = pgon.pc2point(pc0+vertexNum);
   let n1 = pgon.pc2point(pc1+vertexNum);
   let n2 = pgon.pc2point(pc2+vertexNum);
   let n3 = pgon.pc2point(pc3+vertexNum);
   let p0corners,p1corners,p2corners,p3corners;
   let p0pgon,p1pgon,p2pgon,p3pgon;
   let p00,p01,p02,p03,p10,p11,p12,p13;
   const vertex = (n) =>  corners[(vertexNum+n)%3]; 
   let v0 = vertex(0);
   let v1 = vertex(1);
   let v2 = vertex(2);
   if (case1) {
     if (side0 === 0) {
       if (side1 === 1) {
         p0corners = [v0,n0,n1,v2];
         p1corners = [n0,v1,n1];
      } else if (side1 === 2) {
         p0corners = [v0,n0,n1];
         p1corners = [n0,v1,v2,n1];
      } 
    } 
  } else if (case2) {
    if (side0 === 0) {
      p0corners = [n3,n0,n1,n2];
      p1corners = [v0,n0,n3];
     p2corners = [n0,v1,n1];
      p3corners = [n2,n1,v2];
     // p1corners = [];
    }
  }
  p0pgon = Polygon.mk(p0corners);
  p1pgon = Polygon.mk(p1corners);
  p2pgon = Polygon.mk(p2corners);
  p3pgon = Polygon.mk(p3corners);
  addPart('P0',0,p0pgon,stops[0]);
  addPart('P1',0,p1pgon,stops[1]);
  addPart('P2',0,p2pgon,stops[2]);
  addPart('P3',0,p3pgon,stops[3]);
  return 1; 
 }
 

rs.extendQuadOneLevel = function (prt) {
  // debugger;
   let {polygon:pgon,where,root} = prt;
   //console.log('where',where);
   let {corners} = pgon;
   let sp = this.partSplitParams(prt);
   prt . splitParams =  sp;
   if ((!sp)  || (prt.stop)) {
     prt.stopped = 1;
     return;
   }
   let levels = this.partParams.levels;
   let lv = this.levelOf(prt);
   if (lv >= levels) {
     prt.stopped = 1;
     return;
   }
  // console.log('quad split','level',this.levelOf(prt));
   let {vertexNum:ivertexNum,center,direction,radius,ips=[],Case,ornt,pcs = [],pc0,pc1,pc2,pc3,pc4,pc5,stops=[],frs=[]} = sp;//fr0,fr1} = sp;
   let vertexNum = ivertexNum?ivertexNum:0;
   if (!pc0) {
     pc0 = pcs[0]; 
     pc1 = pcs[1]; 
     pc2 = pcs[2];
     pc3 = pcs[3]; 
     pc4 = pcs[4]; 
     pc5 = pcs[5]; 
   }
   let fr0 = frs[0];
   let fr1 = frs[1];
   let fr2 = frs[2];
   let fr3 = frs[3];
   let ip0 = ips[0];
   let ip1 = ips[1];
   const addPart = (pn,vn,pgon,stop) => {
    //S debugger;
     if (pgon && pgon.corners) {
       let nprt = {polygon:pgon,where:[...where,[pn,vn]],root,parent:prt,stop};
       prt[pn]= nprt;
       return nprt;
     }
   }
   let e0,e1,e2,e3,p0corners,p1corners,p2corners,p3corners,p4corners,p5corners,p0pgon,p1pgon,p2pgon,p3pgon,p4pgon,p5pgon;

   const vertex = (n) =>  corners[(vertexNum+n)%4];
   let case1 = Case === 1;
   let case2 = Case === 2;
   let case3 = Case === 3;
   let case4 = Case === 4;
   let case5 = Case === 5;
   let case6 = Case === 6;
   let case7 = Case === 7;
   let case8 = Case === 8;
   let case9 = Case === 9;
   let case10 = Case === 10;
   let case11 = Case === 11;
   let case12 = Case === 12;
   let case13 = Case === 13;
   let v0 = vertex(0);
   let v1 = vertex(1);
   let v2 = vertex(2);
   let v3 = vertex(3);
   let n0 = pgon.pc2point(pc0+vertexNum);
   let n1 = pgon.pc2point(pc1+vertexNum);
   let n2 = pc2?pgon.pc2point(pc2+vertexNum):null;
   let n3 = pc3?pgon.pc2point(pc3+vertexNum):null;
   let n4 = pc4?pgon.pc2point(pc4+vertexNum):null;
   let side0 = Math.floor(pc0);
   let side1 = Math.floor(pc1);
   let side2 = pc2?Math.floor(pc2):null;
   let side3 = pc3?Math.floor(pc3):null;
   let side4 = pc4?Math.floor(pc4):null;
   let side5 = pc5?Math.floor(pc5):null;
  // debugger;
   if (case2) {
     if ((side0 === 0) && (side1 === 2)) {
       p0corners = [v0,n0,n1,v3];
       p1corners = [n0,v1,v2,n1];
     } else {
        core.error('bad case2 for quad');   
     }  
  }  else if (case3) {
     if ((side0 === 0) && (side1 === 1) && (side2 === 2) && (side3 === 3)) {
       p0corners = [n0,n1,n2,n3];
      // p1corners = [v0,n0,n3];
       p1corners = [n3,v0,n0];
       p2corners = [n0,v1,n1];
       p3corners = [n1,v2,n2];
     //  p4corners = [n3,n2,v3];
       p4corners = [n2,v3,n3];
     } else {
        core.error('bad case3 for quad');
     }
   } else if (case4) {
     if ((side0 === 0) && (side1 === 1) && (side2 === 2) && (side3 === 3)) {
       let cseg = LineSegment.mk(n0,n2);
       let c0 = cseg.along(fr0);
       let c1 = cseg.along(fr1);
       p0corners = [v0,n0,c0,n3];
       p1corners = [n0,v1,n1,c1];
       p2corners = [c1,n1,v2,n2];
       p3corners = [n3,c0,n2,v3];
     } else {
        core.error('bad case4 for quad');
     }
   } else if (case5) {
     // debugger;
      if ((side0 === 0) && (side1 === 1) && (side2 === 2) && (side3 === 3)) {
        //debugger;
        if ([fr0,fr1].includes(undefined)) {
         core.error('case 5 undefined parameters');
        }
      let cseg = LineSegment.mk(n1,n3);
      let c0 = cseg.along(fr0);
      let c1 = cseg.along(fr1);
      p4corners = [n0,c1,n2,c0];
      p1corners = [v0,n0,c0,n3];
      p2corners = [n0,v1,n1,c1];
      p3corners = [c1,n1,v2,n2];
      p0corners = [n3,c0,n2,v3]
    }  else {
        core.error('bad case5 for quad');
    } 
  }  else if (case10) {
     // debugger;
      if ((side0 === 0) && (side1 === 1) && (side2 === 2) && (side3 === 3)) {
        //debugger;
        if ([ip0,ip1].includes(undefined)) {
         core.error('case 10 undefined parameters');
        }
      let xside = LineSegment.mk(v0,v3);
      let yside = LineSegment.mk(v1,v0);
      let x0 = xside.along(ip0.x).x;
      let y0 = yside.along(ip0.y).y;  
      let x1 = xside.along(ip1.x).x;
      let y1 = yside.along(ip1.y).y;
      let c0 = Point.mk(x0,y0);
      let c1 = Point.mk(x1,y1);
      p0corners = [n0,c0,n2,c1];
      p1corners = [v0,n0,c1,n3];
      p2corners = [n0,v1,n1,c0];
      p3corners = [c0,n1,v2,n2];
      p4corners = [n3,c1,n2,v3]
    }  else {
        core.error('bad case5 for quad');
    } 
  }   else if (case6) {
    if ((side0 === 0) && (side1 === 1) && (side2 === 2) && (side3 === 3)) {
      //debugger;
       if ([fr0,fr1].includes(undefined)) {
         core.error('case 6 undefined parameters');
       }
       let cseg = LineSegment.mk(n1,n3);
       let c0 = cseg.along(fr0);
       let c1 = cseg.along(fr1);
       p0corners = [v0,n0,c0,n3];
       p1corners = [n0,v1,n1,c0];
       p2corners = [c1,n1,v2,n2];
       p3corners = [n3,c1,n2,v3];
     } else {
        core.error('bad case6 for quad');
     }
   } else if (case7) {
     if ((side0 === 0) && (side1 === 1)&& (side3 === 3))  {
    // debugger;
       let n2 = pgon.pc2point(2+(1-pc0)+vertexNum);
       let cseg = LineSegment.mk(n0,n2);
       let fr0 =pc1-1; 
       let fr1 = (1-(pc3-3));
       let c0 = cseg.along(fr0);
       let c1 = cseg.along(fr1);
       p0corners = [v0,n0,c1,n3];
       p1corners = [n0,v1,n1,c0];
       p2corners = [c0,n1,v2,n2];
       p3corners = [n3,c1,n2,v3];
     } else {
        core.error('bad case7 for quad');
     } 
   } else if (case8) {
       if ((side0 === 0) && (side1 === 1)&& (side2 === 2))  {
    // debugger;
       let n3 = pgon.pc2point(3+(1-(pc1-1))+vertexNum);
       let cseg = LineSegment.mk(n1,n3);
       let fr0 =1-pc0; 
       let fr1 = (pc2-2);
       let c0 = cseg.along(fr0);
       let c1 = cseg.along(fr1);
       p0corners = [v0,n0,c0,n3];
       p1corners = [n0,v1,n1,c0];
       p2corners = [c1,n1,v2,n2];
       p3corners = [n3,c1,n2,v3];
     } else {
        core.error('bad case8 for quad');
     }
  } else if (case9) {
    let cnt = center;
    if  (!cnt) { 
      let c = pgon.center();
      let d = pgon.minDimension();
      cnt = c.plus(Point.mk(Math.cos(direction),Math.sin(direction)).times(d*radius));
      
   }
    p0corners = [n3,v0,n0,cnt];
    p1corners = [n0,v1,n1,cnt];
    p2corners = [n1,v2,n2,cnt];
    p3corners = [n2,v3,n3,cnt];
  }  else if (case11) {
     if ((side0 === 0) && (side1 === 1) && (side2 === 2)) {
       p0corners = [v0,n0,n2,v3];
      // p1corners = [v0,n0,n3];
       p1corners = [n0,n1,n2];
       p2corners = [n0,v1,n1];
       p3corners = [n1,v2,n2];
     //  p4corners = [n3,n2,v3];
     } else {
        core.error('bad case11 for quad');
     }
  }  else if (case12) {
     if ((side0 === 0) && (side1 === 1) && (side2 === 2)) {
   //  debugger;
       p0corners = [n0,n3,n2];
      // p1corners = [v0,n0,n3];
       p1corners = [n0,n1,n2];
       p2corners = [n0,v0,n3];
       p3corners = [n0,v1,n1];
       p4corners = [n1 ,v2,n2];
       p5corners = [n3,v3,n2];
     } else {
        core.error('bad case12 for quad');
     }
  } else if (case13) {
    //debugger;
    let cnt = pgon.center();
    let diag0 = LineSegment.mk(v0,cnt);
    let diag1 = LineSegment.mk(v1,cnt);
    let diag2 = LineSegment.mk(v2,cnt);
    let diag3 = LineSegment.mk(v3,cnt);
    let iv0 = diag0.along(fr0);
    let iv1 = diag1.along(fr1?fr1:fr0);
    let iv2 = diag2.along(fr2?fr2:fr0);
    let iv3 = diag3.along(fr3?fr3:fr0);
    p0corners = [iv0,iv1,iv2,iv3];
    p1corners = [v1,iv1,iv0,v0];
    p2corners = [v2,iv2,iv1,v1];
    p3corners = [v3,iv3,iv2,v2];
    p4corners = [v0,iv0,iv3,v3];
  }
  p0pgon = Polygon.mk(p0corners);
  p1pgon = Polygon.mk(p1corners);
  p2pgon = Polygon.mk(p2corners);
  p3pgon = Polygon.mk(p3corners);
  p4pgon = Polygon.mk(p4corners);
  p5pgon = Polygon.mk(p5corners);
  this.checkPolygon(p0pgon);
  this.checkPolygon(p1pgon);
  this.checkPolygon(p2pgon);
  this.checkPolygon(p3pgon);
  this.checkPolygon(p4pgon);
  this.checkPolygon(p5pgon);
  addPart('P0',0,p0pgon,stops[0]);
  addPart('P1',0,p1pgon,stops[1]);
  addPart('P2',0,p2pgon,stops[2]);
  addPart('P3',0,p3pgon,stops[3]);
  addPart('P4',0,p4pgon,stops[4]);
  addPart('P5',0,p5pgon,stops[5]);
  return 1;
}
   
rs.extendPartOneLevel = function (prt,sep) {
  // debugger;
   if (!prt) {
     return;
   }
 /*  if (prt.P0) { // already extended 
     let ext = this.extendPartOneLevel(prt.P0,sep);
     this.extendPartOneLevel(prt.P1,sep);
     this.extendPartOneLevel(prt.P2,sep);
     this.extendPartOneLevel(prt.P3,sep);
     this.extendPartOneLevel(prt.P4,sep);
     return ext;
   }*/
   if (sep && sep.stop) {
     console.log('stop');
     return;
   }
   let {polygon:pgon,stop} = prt;
   if (stop) {
     //debugger;
     return 0;
   }
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
     prt.stopped = 1;
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
     this.extendPartNLevels(prt.P5);//,i+1);
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
       this.displayPart(prt.P5,emitLineSegs);
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
  //debugger;
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
  //  console.log('lv',lv,'sw',sw);
    return sw;
  }
}


rs.partStroke = function (prt) {
  let {stroke} = this.partParams;
  //debugger;
  return stroke;
}


rs.partSplitParams = function (prt) {
  let {splitParams} = this.partParams;
  if (splitParams) {
    return splitParams;
  }
  core.error('No splitParams');
}

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
  if (!corners) {
    return 0;
  }
  let ln = corners.length;
  for (let i=0;i<ln;i++) {
    let crn = corners[i];
    if (isNaN(crn.x)||isNaN(crn.y)) {
      debugger;//keep
      return 1;
    }
  }
  return 0;
}

rs.whereString = function (where) {
  let rs ='';
  let first=1;
  where.forEach((w) => { 
    if (!first) {
      rs+='_';
    } else {
      first = 0;
    }
    rs+=w[0];
  });
  return rs;
}


const allWheres = function (frmlev,tolev,np) {
  //debugger;
  let aw = [];
  if (frmlev === 0) {
    aw.push(['top',[]]);
  }
  for (let i=0;i<np;i++) {
    let cpn = 'P'+i;
    let cpne = cpn+'_';
    if (frmlev < tolev) {
       let aws = allWheres(frmlev+1,tolev,np);
       aws.forEach((w) => {
         aw.push([cpne+w[0],[i].concat(w[1])]);
       });
    }// else {
      aw.push([cpn,i]);
    //}
  }
  return aw;
}

rs.allWheres = function (levels,numParts) {
  return allWheres(1,levels,numParts);
}

rs.displayCell = function (prt,toSegs) {	
  let {shapes,lineSegs,lineP,circleP,polygonP,mangles,lengthenings,
      recycle,shapesRecycleIndex,firstInitialize,twists,strokeWidths,orect,displayCnt} = this;
  let {where} = prt;
  let {circleScale} = prt.root.params;
  let vs = this.partVisible(prt);
  if (!vs) {
    return;
  }
 // console.log('displayCell',this.whereString(where));
//debugger;
  //console.log('DISPLAY CELL')
  //debugger;
  let {polygon:pgon} = prt;
  if (this.checkPolygon(pgon)) {
    console.log('checkPolygon failed');
  }
  let nc = pgon.corners.length;
  let pod = this.partParams.displayProbability;
  if (pod && (Math.random() < (1-pod))) {
    console.log('BAIL');
    return;
   }
  //console.log(' display ',displayCnt,this.whereName(where));
  this.displayCnt = displayCnt+1;
 // debugger;
  if (0 && (displayCnt>400)) {
    return;
  }
  let mng = this.partMangle(prt);
  let mangled;
  let geom = pgon;
  let shps;
 // let strokew = this.partStrokeWidth(prt);//strokeWidths[lnw];
  let stroke = this.partStroke(prt);
  let fill = this.partFill?this.partFill(prt):undefined;
  let fillScale = this.partFillScale(prt);
  const styleShape = (shp) => {
    let strokew = this.partStrokeWidth(prt,shp);//strokeWidths[lnw];
     if (typeof strokew === 'number') {
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
      if (!pgon) {
        debugger; // keep
      }
      if (recycle && !firstInitialize) {
        shps = pgon.toShape(polygonP,sc,shapes[shapesRecycleIndex]);
        this.shapesRecycleIndex = shapesRecycleIndex+1;
      } else{
        shps = pgon.toShape(polygonP,sc);
      }
    styleShape(shps);
    if (firstInitialize || !recycle) {
      shapes.push(shps);
    }
  }
  if (mng) {
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
    }
  } else {
    addShape();
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
  if (this.afterDisplayCell) {
    this.afterDisplayCell(prt)
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

// for illustrations of the partitions (eg instances/part_0_D_0.mjc)
rs.displayPc = function (n,ijog) {  //display periphery coordinate
 // debugger;
   let jog = ijog?ijog:Point.mk(0,0);

  let topP = this.shapes[0].fromGeom;
  //let pc = rs.partParams.splitParams['pc'+n];
  let pc = this.partParams.splitParams.pcs[n];
  let fpc = Math.floor(pc);
  let ps = topP.pc2point(pc);
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  let sdisp = 1.2*ff;
  let disp;
  if (fpc===0) {
    disp = Point.mk(-sdisp,0);
  } else if (fpc ===1) {
    disp = Point.mk(0,-sdisp);
   } else if (fpc ===2) {
    disp = Point.mk(sdisp,0);
   } else if (fpc ===3) {
    disp = Point.mk(0,sdisp);
   }
   this.addT('pc',n,ps.plus(disp).plus(jog));
 // this.addT('pc',n,ps.plus(disp));
}

rs.displayTitle = function (nm) {
 let {width:wd} = this;
  let hwd = 0.5*wd;
  let ff = 0.05*wd;
  let disp = 1.2*ff;
  this.addT(nm,'',Point.mk(0*ff,-(hwd+3*ff)));
}


rs.stepPartParams = function (params) {
 // debugger;
  let {randomize,partParams:qdp,whichPcsToStep:wPcs,whichFrsToStep:wFrs,range:v,stepper} = params;
  if (randomize) {
    let rs = this.randomizeFrom({ornt:['h','v'],fr0:v,fr1:v,fr2:v,fr3:v,fr4:v,fr5:v});
    return rs;
  }
  let {pcs,frs} = partParams;
  let ln = wPcs.length;
  stepper.step(0);
  console.log(JSON.stringify(this.ar));
  for (let i=0;i<ln;i++) {
    let wts = wPcs[i];
    let wtsln = wts.length;
    for (let j=0;j<wtsln;j++) {
      let idx = wts[j];
      let frnm = 'fr'+idx;
      let av = stepper.ar[i];
      pcs[idx] = 0.01*av;
     };
  }
 // return qdp;
 }

rs.alreadyInitialized = 0;
rs.initialize = function () {
  let {width:wd,height:ht,partParams,dropParams} = this;
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
  this.topPart = prt;
  this.extendPartNLevels(prt,partParams);
  this.displayPart(prt,emitLineSegs);
  if (partParams.emitLineSegs) {
    this.generateDrops(dropParams);
  }
  //debugger;
  let ized = this.alreadyInitialized;
  this.alreadyInitialized = 1;
  if (!ized) {

    this.callIfDefined('afterInitialize');
  }
  this.alreadyInitialized = 1;
}
}

export {rs};