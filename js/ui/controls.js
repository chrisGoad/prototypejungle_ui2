
/* there are three kinds of "controls":The resizer consisting of eight eight draggable boxes and an outline box, the custom controls (yellow boxes) computed by
 the controlPoints method, if any, of each shape (see https://prototypejungle.org/doc/code.html#controllers) and finally the outline box on its own, when the
 visible extent of a shape is too small for a resizer.
 This code takes care of building and managing those controls
*/




let proportion; // y/x
let controlled;
let controlActivity;
let resizePoints; // in global coords
let customControlPoints; // in the local coords of controlled, and set by code in controlled
let draggedCustomControlName;
let protoResizeBox;
let protoOutline;
let protoCustomBox;
let svgRoot; // the instance of the prototye dom.SvgRoot which is the actual root of the tree

let controlBounds = Rectangle.mk(Point.mk(),Point.mk());
let controlCenter = Point.mk();
// all adjustable objects have their origins at center
const updateControlPoints = function () {
  let cx,cy,ex,hex,ey,hey;
  if (!resizePoints) {
    resizePoints = {};
  }
  if (computeControlBounds(controlled)) {
    let bnds = controlBounds;
    let {corner,extent} = bnds;
    cx = corner.x;cy = corner.y;
    ex = extent.x;ey = extent.y;
    hex = 0.5 * ex;hey = 0.5 * ey;
  // the control points are c00, c01, c02 for the left side of the rectangle. c10, c12 for the middle, c20,c21,c22 for the right 
  } else { // in this case, we just want to set up the structure of control points, with arbitrary values
    //if (cp.c00) { // the structure is already there, so no need
    //  return;
    //}
    return;
    //cx=cy=ex=hex=ey=hey=0;
  }
  core.log('control','controlBounds',cx,cy,ex,ey);
  resizePoints.c00 = Point.mk(cx,cy);
  resizePoints.c01 = Point.mk(cx,cy+hey);
  resizePoints.c02 = Point.mk(cx,cy+ey);
  resizePoints.c10 = Point.mk(cx+hex,cy);
  resizePoints.c12 = Point.mk(cx+hex,cy+ey);
  resizePoints.c20 = Point.mk(cx+ex,cy);
  resizePoints.c21 = Point.mk(cx+ex,cy+hey);
  resizePoints.c22 = Point.mk(cx+ex,cy+ey);
  return resizePoints;
}
  


  
const initControlProto = function () {
  if  (!protoResizeBox) {
    protoResizeBox = dom.SvgElement.mk(
       '<rect   fill="rgba(0,0,255,0.5)" stroke="black" stroke-width="1" x="-5" y="-5" width="10" height="10"/>');
   protoOutline = dom.SvgElement.mk('<rect   fill="transparent" stroke="maroon" stroke-width="0.4" x="-50" y="-50" width="100" height="100"/>');
   //protoOutline.__element.setAttribute('pointer-events','none');
   protoOutline = protoOutline;
  }
}
 
const initCustomProto = function () {
  if  (!protoCustomBox) {
    protoCustomBox = dom.SvgElement.mk(
       '<rect  fill="yellow" stroke="black" stroke-width="1" x="-5" y="-5" width="10" height="10"/>');
    protoCustomBox = protoCustomBox;
  }
   
}

const installMoveCursor = function () {
  if (!vars.copyMode) {
    dom.svgMain.__element.style.cursor = 'move';
  }
};

const installDefaultCursor = function () {
  if (!vars.copyMode) {
    dom.svgMain.__element.style.cursor = 'default';
  }
};

const installPointerCursor = function () {
  if (!vars.copyMode) {
    dom.svgMain.__element.style.cursor = 'pointer';
  }
};

const initResizeControl = function () {
  initControlProto();
  let boxes = core.root.__resizeBoxes;
  if (boxes) {
    boxes.__bringToFront();
  } else {
    boxes = core.root.set("__resizeBoxes",dom.SvgElement.mk('<g/>'));
    boxes.__computed = true;//prevent saving
    boxes.set('outline',protoOutline.instantiate());
    boxes.outline.show();
    boxes.outline.__element.setAttribute('pointer-events','none');
   // boxes.outline["pointer-events"] = "none";
    //if (1 || controlled.draggable) {
    if (!controlled.undraggable && !controlled.inert) {
      let outlineEl = boxes.outline.__element;
      outlineEl.addEventListener('mouseover',installMoveCursor);
      outlineEl.addEventListener('mouseleave',installDefaultCursor);
    }
    boxes.outline.hide();
    boxes.outline.neverselectable = true;
  }
  if (boxes.c00) {
    return;
  }
  for (let nm in resizePoints) {
    if (boxes[nm]) {
      continue;
    }
    let box = protoResizeBox.instantiate();
    boxes.set(nm,box);
    let boxel = box.__element;
    boxel.addEventListener("mouseover",installPointerCursor);//function (e) {
    boxel.addEventListener("mouseleave",installDefaultCursor);//function (e) {
  }
}
   
/*
 * if a user clicks where a custom box appears, then treat matters as if the box had been clicked
 */
let clickedInBox = false;
const clickIsInBox = function (p) {
  if (svgRoot.clickedPoint) {
    let cx = svgRoot.clickedPoint.x;
    let cy = svgRoot.clickedPoint.y;
    let px = p.x;
    let py = p.y;
    let hbx = 0.5 * boxDim;
    core.log('control','clickIsInBox',boxDim,hbx,cx,cy,px,py);
   return (Math.abs(px - cx) < hbx) && (Math.abs(py -cy) < hbx);
  } else {
    return false;
  }
}

const setPointerEventsForCustomBoxes = function(value) {
  let boxes = core.root.__customBoxes;
  core.forEachTreeProperty(boxes,function (box) {
    let el = box.__element;
    if (el) {
      el.setAttribute('pointer-events',value);
    }
  });
}

const updateCustomBoxes = function (points,icheckForClick) {
  let checkForClick = false;
  let boxes,ln,sc,nm,ps,sps,idx,i;
  core.log('control','UPDATECUSTOMBOXES');
  updateBoxSize();
  controlCenter = controlled.toGlobalCoords();//,localCenter);
  boxes = core.root.__customBoxes;
  boxes.moveto(controlCenter);
  ln = points.length;
  sc = controlled.scalingDownHere();
  for (i=0;i<ln;i++) {
    nm = "c"+i;
    ps = points[i];
    if (ps) {
      sps = ps.times(sc); 
      if (checkForClick && clickIsInBox(sps)) {
        core.log('control','CLICKED BOX INDEX',i);
        clickedInBox = true;
        svgRoot.dragee = boxes[nm];
        controlActivity = 'draggingCustomControl';
        svgRoot.refPos = sps;
        draggedCustomControlName = nm;
        idx = parseInt(nm.substr(1));
        svgRoot.clickedPoint = undefined;
        setPointerEventsForCustomBoxes('none');
      }
      boxes[nm].show();
      boxes[nm].moveto(sps);
    } else {
      boxes[nm].hide();
      
    }
  }
  boxes.draw();
  vars.showAdjustSelectors(idx);
}
// called when shifting - the points are in coordinates of the shiftee so need not be recomputed

const refreshCustomControlBoxes = function () {
  if (customControlPoints) {
    updateCustomBoxes(customControlPoints);
  }
}
const initCustomControl = function (points) {
  let ln,boxes,i,nm,box,n;
  initCustomProto();
  ln = points.length;
  boxes = core.root.__customBoxes;
  if (boxes) {
     boxes.unhide();
     boxes.__bringToFront();
  } else {
    boxes = core.root.set("__customBoxes",dom.SvgElement.mk('<g/>'));
    boxes.__computed = true;//prevent saving
  }
  for (i=0;i<ln;i++) {
    nm = "c"+i;
    box = boxes[nm];
    if (box) {
      if (!box.__element) {
        alert('bug');
        debugger;//keep
      }
      box.unhide();
    } else {
      let newBox = boxes.set(nm,protoCustomBox.instantiate());
      newBox.draw();
      let boxEl = newBox.__element;
      boxEl.addEventListener('mouseover',installPointerCursor);
      boxEl.addEventListener('mouseleave',installDefaultCursor);
      
    }
  }
  // now hide the unused boxes, if any
  n = ln;
  while (true) {
    nm = "c"+n;
    box = boxes[nm];
    if (box) {
      box.hide();
    } else {
      break;
    }
    n++;
  }
  updateCustomBoxes(points,true);
}
    

let boxSize = 15; // in pixels
let outlineStrokeWidth = 3;
let boxDim; // in global coords
const updateBoxSize = function () {
  let sc,setDim,strokeWidth;
  if (!controlled) {
    return;
  }
  sc = core.root.getScale();
  boxDim = boxSize/sc;
  strokeWidth = outlineStrokeWidth/sc;
  setDim = function (bx) {
    bx.width = boxDim;
    bx.height = boxDim;
    bx.x = bx.y = -0.5*boxDim;
    bx["stroke-width"] = 0.05 * boxDim;
    
  }
  if (protoResizeBox) {
    setDim(protoResizeBox);
  }
  if (protoCustomBox) {
    setDim(protoCustomBox);
  }
  if (protoOutline) {
    protoOutline['stroke-width'] = strokeWidth;
  }
  return boxDim;
}

let svBoxes;

core.beforeSaveStateHooks.push( () => {
   svBoxes = core.root.__customBoxes;
   if (svBoxes) {
     core.root.__customBoxes = undefined;
   }
});


core.afterSaveStateHooks.push( () => {
   if (svBoxes) {
     core.root.__customBoxes = svBoxes;
   }
   svBoxes = undefined;
});

  
let boxesToHideForScaling = {c00:1,c20:1,c02:1,c22:1};
  
const updateControlBoxes = function (mode) { //mode = shifting or zooming
  let boxTooBigRelatively;
  if (!controlled) {    
    return;
  }
  const isInert = core.ancestorWithPropertyTrue(controlled,'inert');
  const isSideBox = function (nm) {
    return  (nm === 'c01') || (nm === 'c21');
  }
  const isTopOrBottomBox = function (nm) {
    return  (nm === 'c10') || (nm === 'c12');
  }
  const isDiagBox = function (nm) {
    return  (nm === 'c00') || (nm === 'c02') || (nm === 'c20') || (nm === 'c22');
  }
  
  let fixedWidth = controlled.fixedWidth;
  let fixedHeight = controlled.fixedHeight;
  if (!controlBounds) {
    if ((!controlled.controlPoints) ) { //|| controlled.undraggable) {
      dom.highlightNodes([controlled]);
    }
    return;
  }
  let outlineOnly = !vars.nowAdjusting;// && !controlled.controlPoints;
  core.log('control','updateControlBoxes');
  let allBoxes = !outlineOnly;
  let boxes,showBox,box,extent,corner,dst;
  boxDim = updateBoxSize();
  extent = controlBounds.extent;
  if (isNaN(extent.x) || isNaN(extent.y)) {
     core.error('NaN');
  }
  if (controlled.outlineOnly) {
    boxTooBigRelatively = true;
    allBoxes = false;
  } else if (2*boxDim > Math.max(extent.x,extent.y)) {
    boxTooBigRelatively = true;
  } else {
    boxTooBigRelatively = false;
    boxTooBigRelatively = false;
  }
  if (allBoxes && controlled.controlPoints) { //  && !controlled.undraggable) {
    if (mode === 'shifting') {
      refreshCustomControlBoxes();
    } else {
      customControlPoints = controlled.controlPoints();
      updateCustomBoxes(customControlPoints,true);
    }
  }
  //if (allBoxes && controlled.customControlsOnly) {
  if (allBoxes && !controlled.resizable) {
    return;
  }
  if (allBoxes) {
    updateControlPoints();
  }
  boxes = core.root.__resizeBoxes;
  const updateControlBox = function(nm) {
    box = boxes[nm];
    if (outlineOnly) {
      showBox = nm === 'outline';
    } else {
      if (boxTooBigRelatively  && (nm !== 'outline')) {
        showBox = false;
      } else if (fixedWidth && (isSideBox(nm) || isDiagBox(nm))) {
        showBox = false;
      } else if (fixedHeight &&  (isTopOrBottomBox(nm) || isDiagBox(nm))) {
        showBox = false;
      } else {
        showBox = true;
        if (!box) {
          return;
        }
        if (proportion) {
          if (boxesToHideForScaling[nm]) {
            showBox = false;
          }
        } else if (!controlled.resizable) {
          showBox = false;
        }
      }
    }
    if (showBox) {
      box.show();
      if (nm === 'outline') {
        extent = controlBounds.extent;
        corner = controlBounds.corner;
        box.stroke = isInert?'maroon':'blue';// __element.setAttribute('stroke',isInert?'maroon':'blue');
        box.x = corner.x - (boxTooBigRelatively?0.5 * boxDim:0);
        box.y = corner.y -  (boxTooBigRelatively?0.5*boxDim:0);
        box.width = extent.x +  (boxTooBigRelatively?boxDim:0);
        box.height = extent.y +   (boxTooBigRelatively?boxDim:0);
      } else {
        dst = resizePoints[nm];
        box.moveto(dst);
      }
    } else {
      if (box) {
        box.hide();
        box.draw();
      }
    }
  }
  for (let nm in resizePoints) {
    updateControlBox(nm);
  }
  updateControlBox('outline');
  boxes.moveto(controlCenter);
  boxes.draw();
}

const hideControl = function () {
  let boxes = core.root.__resizeBoxes;
  if (boxes) {
    for (let nm in resizePoints) {
      if (boxes[nm]) {
        boxes[nm].hide();
      }
    }
    boxes.outline.hide();
    boxes.draw();
  }
}
  
const hideCustomControl = function () {
  let boxes = core.root.__customBoxes;
  if (boxes) {
    boxes.hide();
    boxes.draw();
  }
}
    
const clearControl = function () {
  core.log('control','CLEAR CONTROL');
  proportion = 0;
  controlled = controlled = undefined;
  hideControl();
  hideCustomControl();
  controlActivity = undefined;
}

const computeControlBounds = function (node) {
  
  let localExtent = node.getExtent();
  if (!localExtent) {
    controlBounds = undefined;
    return undefined;
  }
  let sc = node.scalingDownHere();
  let controlExtent = localExtent.times(sc);
  controlCenter = node.toGlobalCoords();//,localCenter);
  controlBounds = Rectangle.mk(controlExtent.times(-0.5),controlExtent);
  proportion = node.scalable?(controlExtent.y)/(controlExtent.x):0;
  controlBounds = controlBounds; // only for debugging
  return controlBounds; 
}
  
      
const setControlled = function (node) {
  graph.recenter(node);
  controlled = controlled  = node;
  computeControlBounds(controlled);

  //if (vars.nowAdjusting && !controlled.customControlsOnly) {
  if (vars.nowAdjusting && controlled.resizable) {
    updateControlPoints();
  }
  if (1 || controlled.resizable) {
// if (!controlled.customControlsOnly) {
    initResizeControl();
  }

  if (controlled.controlPoints) { //  && !controlled.undraggable) {
    customControlPoints = controlled.controlPoints(1);
    initCustomControl(customControlPoints);
  } else {
    if (core.root.__customBoxes) {
      core.root.__customBoxes.hide();
      core.root.__customBoxes.draw();
    }
    customControlPoints = undefined;
  }
  return  controlBounds;
}
  
const showControl = function () {
  if (controlled) {
    computeControlBounds(controlled);
    updateControlBoxes();//true);
  }
}

  // standard method, which adjusts the bounds 
  
const currentZoom = function () {
  return dom.svgMain.contents.transform.scale;
}

const ownsExtent = function (item) {
  return item.hasOwnProperty('width') ||  item.hasOwnProperty('dimension');
}

let lastResizeSubject; // used for the final update after the drag
const dragResizeControl = function (bcontrol,nm,ipos) { // bcontrol is the object being controlled
  let bnds,outerCorner,localExtent,marks,pos,bx;
  core.log('control','dragging bounds control ',nm,ipos.x,ipos.y);
  bx = core.root.__resizeBoxes[nm];
  bnds = controlBounds;
  pos = geom.toOwnCoords(core.root.__resizeBoxes,ipos);
  let {corner,extent} = bnds;
  outerCorner = corner.plus(extent);
  // generate new bounds with corner at upper left (recenter later)
  switch (nm) {
    case "c00":
      bnds.extent =  outerCorner.difference(pos);
      break;
    case "c01":
      extent.x = outerCorner.x - pos.x;
      if (proportion) {
        extent.y = (extent.x)*proportion;
      }
      break;
    case "c02":
      extent.x = outerCorner.x - pos.x;
      extent.y = pos.y - corner.y;
      break;
    case "c10": 
      extent.y = outerCorner.y - pos.y;
      if (proportion) {
        extent.x = (extent.y)/proportion;
      }
      break;
    case "c12":
      extent.y = pos.y - corner.y;
      if (proportion) {
        extent.x = (extent.y)/proportion;
      }
      break;
    case "c20":
      extent.x = pos.x - corner.x;
      extent.y = outerCorner.y - pos.y;
      break;
    case "c21": 
      extent.x = pos.x - corner.x;
      if (proportion) {
        extent.y = (extent.x)*proportion;
      }
      break;
    case "c22":
      bnds.extent = pos.difference(corner);
      break;
  }
  //let minExtent = 10/currentZoom();
  //bnds.extent.x = Math.max(minExtent,bnds.extent.x); // don't allow the box to disappear
 // bnds.extent.y = Math.max(minExtent,bnds.extent.y); // don't allow the box to disappear
  bx.moveto(pos);
  let sc =1/bcontrol.scalingDownHere();
  core.log("control","OLD CENTER",controlCenter);
  bnds.corner =  bnds.extent.times(-0.5); 
  localExtent = bnds.extent.times(sc);
 if (bcontrol.__mark) {
    marks = bcontrol.__parent.__parent;
    if (marks.assertModified) {
        marks.assertModified(bcontrol);
    }
  }
  // if extent being adjusted is owned by bcontrol, then only bcontrol should be adjusted, not its prototype (and wta might be its prototype)
  let whichExtent,wta,extentToSet;
  if (controlled.__assembly) {
    wta = controlled;
    extentToSet = bnds.extent;
    whichExtent = 'both';
  } else {
    wta = vars.whatToAdjust;
    whichExtent =  (proportion)?'both': (((nm === 'c10') || (nm === 'c12'))?'height':((nm === 'c01') || (nm === 'c21'))?'width':'both');
    extentToSet = localExtent;
  }
  if ((bcontrol  === wta) || ((whichExtent !== 'both') && Number(bcontrol.__get(whichExtent)))) {
    bcontrol.setExtent(extentToSet,whichExtent);
  } else if (whichExtent === 'both') { // complicated case : we might want to send one of width, height to the prototype and keep one for he instance
    if (bcontrol.__get('width') && !bcontrol.__get('height')) {
      bcontrol.setExtent(localExtent,'width');
      wta.setExtent(localExtent,'height');
    } else if (bcontrol.__get('height') && !bcontrol.__get('width'))  {
      bcontrol.setExtent(localExtent,'height');
      wta.setExtent(localExtent,'width');
    } else if (bcontrol.__get('width')) {
      bcontrol.setExtent(localExtent,'both')
    } else {
      wta.setExtent(localExtent,'both')
    }
  } else {
    wta.setExtent(localExtent,whichExtent);
  }
  vars.setSaved(false);
  wta.__beenAdjusted = true;
  lastResizeSubject = wta;
  if (core.isPrototype(wta)) {
    wta.__update();
    graph.graphUpdate();
  } else {
    graph.graphUpdate(wta);
  }
  core.root.draw();
  updateControlBoxes();
}

   // ipos is in global coords 
const dragCustomControl = function (ccontrol,nm,ipos) {
  let pos = geom.toOwnCoords(ccontrol,ipos); 
  let idx,boxes,bx,npos,sc,bxnpos;
  core.log('control','dragging custom control ',nm);
  idx = parseInt(nm.substr(1));
  boxes = core.root.__customBoxes;
  bx = boxes[nm];
  npos = ccontrol.updateControlPoint(idx,pos);
  vars.setSaved(false);
  core.log('control','npos',idx,npos);
  if (npos === 'drag') {
    let rf  = dom.svgMain.refPos;
    let delta = ipos.difference(rf);
    core.log('control','delta',rf.x,rf.y,' ',ipos.x,ipos.y,' ',delta.x,delta.y);
    let rfcontrolled = dom.svgMain.refControlledPos;
    ccontrol.moveto(rfcontrolled.plus(delta));
    npos = undefined;
  }
  if (!npos) {//  && !ccontrol.undraggable) {
    core.log('control','updatingBOxes');
    customControlPoints = ccontrol.controlPoints();
    updateCustomBoxes(customControlPoints,true);
    return;
  }
  sc = ccontrol.scalingDownHere();
  bxnpos = npos.times(sc); // the new point relative to the control boxes
  bx.moveto(bxnpos);
  bx.draw();
}

const updateCustomControls = function (control) {
  if (control.controlPoints  && !control.undraggable) {
    customControlPoints = control.controlPoints();
    updateCustomBoxes(customControlPoints,true);
  }
}

export {initControlProto,updateControlBoxes,clearControl,controlled};
