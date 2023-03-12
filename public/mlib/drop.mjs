// documented in https://prototypejungle.net/doc/dropCircles.html

const rs = function (rs) {

let defaults = {dropTries:5,maxLoops:Infinity};

Object.assign(rs,defaults);
      

rs.genRandomLineSeg = function () {
  let {lineSegs} =this;
  let llns = lineSegs.length;
  let rv = Math.floor(Math.random()*llns);
  return lineSegs[rv];
}

rs.genRandomPoint = function (onw) {
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

rs.via3d = function (p) {
  if (this.genPoint3d) {
    let p3d = this.genPoint3d(p);
    let rs = this.camera.project(p3d);
    return rs;
  }
  return p;
}
 
rs.dropCenters = function () {
  let drops= this.drops;
  let rs = drops.map((d) => d.center);
  return rs;
 }
  
rs.generateDrops = function (params) {
  let {shapesC,drops,numRows,randomGridsForShapes,positions,saveState,pointFilter,noShapes} = this;
  let shapes;
  if (!shapesC) { 
    shapesC = this.set('shapesC',containerShape.mk());
    shapes = shapesC.set('shapes',arrayShape.mk());
  } else {
    shapes = shapesC.shapes;
  }
  if (!drops) {
    drops = this.drops = [];
  }
  let initialDropsLn = drops.length;
  if (this.initialDrop) {
    let idrop = this.initialDrop();
    if (idrop) {
      let {geometries:igeoms,shapes:ishapes} =  idrop;
      drops = this.drops = igeoms;
      ishapes.forEach((s) => shapes.push(s));
    }
  }
  this.dropParams = params;
  let {maxLoops=Infinity,maxDrops=Infinity,dropTries,mustIntersect,numIntersections=1,oneD,dropOnLineSegs} = params;
  //debugger;
  let cnt =0;
  let tries = 0;
  let rvs;
  let tgs;
  const dropAt = (ipnt) => {
     let pnt;
     if (ipnt) {
      if (ipnt.value) {
        pnt = ipnt.value;
      } else {
        pnt = ipnt;
      }
    }
    let seg;
    if (LineSegment.isPrototypeOf(pnt)) {
      let seg = pnt;
      pnt = seg.center();
    }
    if (numRows && randomGridsForShapes) {
      let cell = this.cellOf(pnt);
      rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
    }
    let drop = this.generateDrop(ipnt,rvs);
    if (!drop) {
      return;
    } 
    let dpnt = drop.pos?drop.pos:pnt;
    let gs = drop.geometries;
    tgs = gs.map((g) => {
    //  debugger;
      return geom.moveBy(g,dpnt)
    });
    return drop;
  }
  const installDrop = (drop,ipnt,containers) => {
    if (containers) {
    // debugger;
    }
    let moveNeeded = 1;
    let pnt;
    if (ipnt) {
      if (ipnt.value) {
        pnt = ipnt.value;
      } else {
        pnt = ipnt;
      }
    }
    let dpnt = drop.pos?drop.pos:pnt;

    if (saveState) {
      positions.push(dpnt);
    }
    if (!noShapes) {
        
      let newShapes = drop.shapes;
      
      newShapes.forEach((s) => {
        let sp = s.getTranslation();
        s.moveto(dpnt.plus(sp));
        shapes.push(s);
      });
    }
    tgs.forEach((g) => 
      {
      g.index = drops.length;
      drops.push(g)
    });
    tries = 0;
  }
  if (!this.generateDrop) {
    return;
  }
  if (!saveState && (saveState !== undefined)) {
    // drop points were stored in this.positions
    positions.forEach((ipnt) => {
      let pnt = Point.mk(ipnt.x,ipnt.y);
      let drop = dropAt(pnt);
      if (drop) {
        installDrop(drop,pnt);
      }
     });
     return;
  }
  // the live drop collision  detection is done
  while ((cnt < maxLoops) && ((drops.length-initialDropsLn) < maxDrops)) {
    cnt++;
    let drop,pnt;
    if (dropOnLineSegs) {
      let seg = this.genRandomLineSeg();
      pnt = seg.center();
      drop = dropAt(seg);
    } else {
      pnt = this.genRandomPoint(oneD);
      if (pointFilter) {
        let allowDrop = this.pointFilter(pnt);
        if (!allowDrop) {
          continue;
        }
      }
      drop = dropAt(pnt);
    }
    if (!drop) {
      continue;
    } 
    if (mustIntersect) {
       let doesIntersect = geometriesIntersect(tgs,mustIntersect);
       if (!doesIntersect) {
         continue;
       }
    }
    let gi =geometriesIntersect(tgs,drops,numIntersections-1);
    let acn = typeof gi !== 'number';//gi is an array of containers
    let lc  = 0;
    if (acn) {
      lc = gi.length;
      if (lc > 1) {
        debugger;
      }
    }
    if (gi && ((lc >1) || !acn)) {
      tries++;
      if (tries >= dropTries) {
        //console.log('dropTries',dropTries,'exceeded');
        return drops;
      }
    } else {
      installDrop(drop,pnt,gi);
      tries = 0;
    }
  }
}
      
}


export {rs};      
    
    
      
