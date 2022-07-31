// a quad tree node has the form {rectangle,UL:quadNode,UR:quadNode,LL:quadNode,QLR
const rs =function (rs) {

rs.extendQuadOneLevel = function (qd) {
   if (qd.UL) {
     return;
   }
   let where = qd.where;
   let root = qd.root;
   //let params = iparams?iparams:root.splitParams;
  // let {splitType,fr0,fr1,fr2} = params;
   
 //  let [fr0,fr1,fr2] = [0.45,0.45,0.3];
   let sp=(this.computeSplitParams)?this.computeSplitParams(qd):['h',0.5,0.5,0.5];
   if (!sp) {
     return;
   }
   let [ornt,fr0,fr1,fr2] = sp;
   let h = ornt === 'h';
   let rect = qd.rectangle;
   let {corner,extent} = rect;
   let {x:cx,y:cy} = corner;
   let {x:ex,y:ey} = extent;
   let ULcorner = corner;
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
 }
 
 
 
rs.randomSplit = function (qd,ichance) {
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
  debugger;
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
    let rect = qd.rectangle;
    let pnt = rect.center();
    let rvs;
    if (numRows && randomGridsForShapes) {
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

 rs.displayQuad = function (qd,depth=0) {
   let {shapes} = this;
   if (qd.UL) {
     this.displayQuad(qd.UL,depth+1);
     this.displayQuad(qd.UR,depth+1);
     this.displayQuad(qd.LL,depth+1);
     this.displayQuad(qd.LR,depth+1);
     return;
   }
   this.displayCell(qd,depth);
   //this.rectangleToShape(qd.rectangle,depth);
}
}

export {rs};	
