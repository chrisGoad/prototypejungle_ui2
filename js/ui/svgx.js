/*global svgRoot controlled controlActivity controlCenter draggedControlName
draggedCustomControlName clickedInBox protoCustomBox controlCenter: true */


/*
 mouse handling
 
 
 Principle variables:
   
   iselnd: the object that has been selected. This might be a shape (circle etc), or it might be a control box
      There are two kinds of control boxes: the resizer boxes (blue), and the custom control boxes (yellow)
   controlled: the object being controlled (dragged resized etc). If a circle is being resized, for example, controlled will be the circle
     and iselnd will be the little blue box which the user is moving around for the resize
   vars.selectedNode This global is used from other modules. controlled is often selectedNode, but might also be its prototype (causing all instances
                     to be adjusted)
   controlActivity: the kind of control being exercised when the mouse is down. Options:  undefined (when no particular activity has been engaged)
                     draggingResizeControl, draggingCustomControl, shifting (meaning dragging controlled, as when dragging a circle around)
                     and panning
    There are  two other variables which affect the mode of operation: connectMode, and replace
    These are meaningful when shifting, 
                      
properties of a node relevant to mouse control. undraggable,unselectable,resizable


There is also a mode which affects the behavior of mouseDown:   if vars.addToPointSeries is defined,
 clicks do not select objects, as usually happens. Instead, vars.addToPointSeries is called on the clicked point. Escape terminates
*/

const SvgRoot = dom.SvgRoot;
let cZoomFactor;
let nowPlayingHistory = false;

let draggedControlName = 0;


SvgRoot.visibleBounds = function () {
  let cn = this.contents;
  let cxf = cn.transform;
  let wd = this.__container.offsetWidth;
  let ht = this.__container.offsetHeight;
  let screenBounds = Point.mk(wd,ht).toRectangle();
  let tbnds = screenBounds.applyInverse(cxf);
  return tbnds;
}


SvgRoot.setZoom = function (trns,ns) {
  let cntr = Point.mk(this.width()/2,this.height()/2);// center of the screen
  let ocntr = trns.applyInverse(cntr);
  let ntx,nty,tr;
  trns.scale = ns;
  ntx = cntr.x - (ocntr.x) * ns;
  nty = cntr.y - (ocntr.y) * ns;
  tr = trns.translation;
  tr.x = ntx;
  tr.y = nty;
  updateBoxSize();
}
  
  
const zoomStep = function (factor) {
  let trns = dom.svgMain.contents.transform;
  if (!trns) {
    return;
  }
  let s = trns.scale;
  core.log("svg","zoom scaling",s);
  updateControlBoxes('zooming');
  dom.svgMain.setZoom(trns,s*factor);
  adjustGrid();
  dom.svgDraw();
}
  
let nowZooming = false;
let zoomFactor = 1.1;
let zoomInterval = 150;
const zoomer = function zoomer() {
  if (nowZooming) {
    zoomStep(cZoomFactor);
    setTimeout(zoomer,zoomInterval);
  }
}


const startZooming = function () {
  core.log("svg","start zoom");
  cZoomFactor = zoomFactor;
  if (!nowZooming) {
    nowZooming = true;
    zoomer();
  }
}
  
const startUnZooming = function () {
  cZoomFactor = 1/zoomFactor;
  if (!nowZooming) {
    nowZooming = true;
    zoomer();
  }
}

const stopZooming = function() {
  core.log("svg","stop zoom");
  nowZooming = false;
}
  

const initDiv = function (dv) {
  //let jdv = $(dv);
  let svgDiv =  dom.El('<div style="postion:absolute;background-color:white;border:solid thin black;display:inline-block"/>');
  svgDiv.install(dv);
}

const selectCallbacks = [];

  // what to do when an element is selected by clicking on it in graphics or tree

core.ObjectNode.__select = function (src,dontDraw,dontControl) { // src = "svg" or "tree"
  let currentlySelected = vars.selectedNode;
  if (currentlySelected === this) {
    return;
  }
  unselect();
  vars.selectedNodePath =this.__pathOf(core.root);
  if (currentlySelected) {
    if (currentlySelected.__whenUnselected) {
      currentlySelected.__whenUnselected();
    }
  
  }
  vars.selectedNode = this;
  window.sn = this;//for debugging;
  window.core = core;
  window.pof = Object.getPrototypeOf;
  this.__selected = true;
  if (this.__assembly) {
    let bb = this.getBBox();
    this.width = bb.width;
    this.height = bb.height;
  }

  if (src === 'tree') {
    controlActivity = undefined;
    clearControl();
  }
 // vars.nowAdjusting = (!this.inert) && (!this.undraggable  || (this.resizable || this.controlPoints));
  //vars.nowAdjusting = (!this.inert) &&  (this.resizable || this.controlPoints);
  vars.nowAdjusting =   (this.resizable || this.controlPoints);
  if (!dontControl) { //&& !this.inert) {
    setControlled(this);
    updateControlBoxes();
  }
  if (src === "svg") {
    let thisHere = this;
    selectCallbacks.forEach(function (c) {
      c(thisHere,true);
    });
  }
}

core.ObjectNode.__reselect = function (src) {
  vars.selectedNode = undefined;
  this.__select(src);
}

const zoomToSelection = function () {
  let rt = dom.svgMain;
  let snd = vars.selectedNode;
  if (snd) { 
    let bnds = snd.bounds(rt.contents); // includehidden avoids a bug that shows up in navajo.js
    rt.fitBounds(0.2,bnds);
  }
}

const unselectCallbacks = [];
const unselect = function () {
  if (vars.selectedNode) {
    if (vars.selectedNode.__whenUnselected) {
      vars.selectedNode.__whenUnselected();
    }
    vars.selectedNode.__selected = false;
    vars.selectedNode = undefined;
    controlActivity = undefined;
    clearControl();
    dom.unhighlight();
    vars.nowAdjusting = undefined;
 
  }
  if (!vars.copyMode) {
    dom.svgMain.__element.style.cursor = "default";
  }
  unselectCallbacks.forEach(function (fn) {fn();})
}

graph.vars.unselect = unselect;
  
//  refresh the whole UI, 
const refresh = function (doFit) {
  let selectedPath;
  selectedPath = undefined;
  if (vars.selectedNode) {
    selectedPath = core.pathOf(vars.selectedNode,core.root);
  }
  
  dom.fullUpdate();
  //dom.svgMain.updateAndDraw(doFit);
  //graph.graphUpdate();
  vars.refreshTree();
  if (selectedPath) {
    let cselection = core.evalPath(selectedPath);
    if (cselection) {
      if  (cselection !== vars.selectedNode) {
        cselection.__select();
      }
    } else {
      unselect();
    }
  }
}
  
// this is the nearest ancestor of the hovered object which has a forHover method
 
 // the node currently hovered over
 
 let hoverNode = undefined;
 
 // unwrapping effectively disables the unselectable flag, but not neverselectable
 core.ObjectNode.__isSelectable = function () {
   //let assembly = core.ancestorWithPropertyTrue(this);
   return (!this.neverselectable) && (vars.unwrapAll  || !this.unselectable); // 9/13
// make   neverselectable the same as unselectable cg 8/24/2019
   //return vars.unwrapAll  || !(this.unselectable || this.neverselectable);
 }
 
 core.ArrayNode.__isSelectable = function () {
   return false;
 }
 
 const selectableAncestor = function (node) {
   return core.findAncestor(node,(x) => x.__isSelectable());
 }
 
 
 const ignoreableAncestor = function (node) {
   return core.findAncestor(node,(x) => x.ignoreClick);
 }
     
     
// used in replacement and the action menu (up in editor)

const actionSubject = function (item,role) {
 let rs;
  if (!item) {
    return undefined;
  }
  if (role) {
   rs = core.ancestorWithPropertyValue(item,'role',role);
   //console.log('actionSubject1',item.__name,rs.__name,role);
   return rs;
  }
  rs = core.ancestorWithPropertyTrue(item,'actionSubject');
  if (!rs) {
    rs = core.ancestorWithPropertyTrue(item,'role');
  }
  if (!rs) {
    rs = selectableAncestor(item);//core.ancestorWithPropertyFalse(item,"unselectable");
  }
  let frs = rs?rs:item;
  //console.log('actionSubject2',item.__name,rs.__name,role);
  return frs;
}

const draggable = function (item) {
  let diagram = core.containingKit(item);
  return (diagram)?item.draggableInKit: !item.undraggable;//1;//item.draggable;
}
 
// returns the  node, if any, over which mouse event e takes place
const overNode = function (e,operation) {
    let trg = e.target;
    core.log('control',"svg",operation,trg.id);
    let node= trg.__prototypeJungleElement;
    if (node) {
       core.log('control','OVER',node.__name,node.__parent.__name);
    }
    return node;
}

// for selection 
let draggingInDiagram,draggingNoDiagram;
let connectMode;
//let doubleClickInterval = 500;

const mouseDownListener = function (svgroot,e) {
 if (nowPlayingHistory) {
   return;
 }
 if (vars.hideFilePulldown) {
    vars.hideFilePulldown();
  }
  core.log('control','MOUSEDOWN');
  svgRoot = svgroot;
  e.preventDefault();
  let cp = svgroot.cursorPoint(e);
  //let clickedNode = overNode(e,'mousedown');
  mouseDown(svgroot,cp);//clickedNode);
}

const mouseDown = function (svgroot,cp,clickedNode) {
  //let selectionCandidate,xf,dra,rfp,clickedPoint,diagram;
  let xf,dra,rfp,clickedPoint,diagram;
  /*if (nowRecording) {
    addToHistory('down',cp,clickedNode);
  }*/
  draggingOver = undefined;
  connectMode = false;
  svgroot.refPoint = cp; // refpoint is in svg coords (ie before the viewing transformation)
  core.log('control',svgroot.refPoint);
  xf = svgroot.contents.transform;
  clickedPoint = xf.applyInverse(cp);// in coordinates of content
  let pointSeries = vars.activePointSeries;
  if (pointSeries) {
    pointSeries.addToPointSeries(clickedPoint);
    return;
  }
  if (vars.copyMode) {
    let pos = vars.snapMode?snapPointToGrid(clickedPoint):clickedPoint;
    vars.completeTheCopy(pos);
    return;
  }
  svgroot.clickedPoint = clickedPoint;// in coordinates of content
  if (clickedNode) {
    core.log('control','clickedNode',clickedNode);
    if (protoOutline && protoOutline.isPrototypeOf(clickedNode)) {  
      clickedNode = controlled;
      core.log('control','protoOutline');
    }
  }
  draggingInDiagram = draggingNoDiagram = false;
  if (clickedNode) {
    if (clickedNode.onClick) {
      clickedNode.onClick(clickedPoint);
      return;
    }
    //if (clickedNode.__resizeBox) {
    if (protoResizeBox && protoResizeBox.isPrototypeOf(clickedNode)) { // a resize box

      dra = clickedNode;
      controlActivity = 'draggingResizeControl';
      core.log('control','controlActivity set to ',controlActivity);
      draggedControlName = clickedNode.__name;
      core.log('control','dragging '+draggedControlName);mouseUpOrOutListener
    } else if (protoCustomBox && protoCustomBox.isPrototypeOf(clickedNode)) { // a custom control box
      dra = clickedNode;
      controlActivity = 'draggingCustomControl';
      dra.__element.setAttribute('pointer-events','none');
      controlled.__element.setAttribute('pointer-events','none');
      setPointerEventsForCustomBoxes('none');
      core.log('control','controlActivity set to ',controlActivity);
      draggedCustomControlName = clickedNode.__name;
      svgroot.refControlledPos = controlled.getTranslation().copy();
      core.log('control','dragging custom control '+draggedCustomControlName);
      connectMode = Boolean(controlled.dropControlPoint);
    } else  {
      if (ignoreableAncestor(clickedNode)) {
        return;
      }
      let selectedNode = selectableAncestor(clickedNode);
      selectedNode.__select("svg");  //SELECT IT!
      diagram = core.containingKit(controlled);
      // dragging is customized for diagrams
      if (diagram) {
        //let draggableAncestor = controlled && !controlled.inert && core.ancestorWithPropertyTrue(controlled,'draggableInKit');
        let draggableAncestor = controlled && core.ancestorWithPropertyTrue(controlled,'draggableInKit');
       if (draggableAncestor && diagram.dragStep) {
          draggingInDiagram = true;
          dra = draggableAncestor;
        }
      }
      if (!draggingInDiagram) {
        //draggingNoDiagram = controlled && !controlled.undraggable && !controlled.inert;//1;//controlled.draggable;
        draggingNoDiagram = controlled && !controlled.undraggable;//1;//controlled.draggable;
        dra = controlled;
      }
      if (draggingInDiagram || draggingNoDiagram) {
        controlActivity = 'shifting';
      }
      core.log('control','control','	 to ',controlActivity);
    }
    if (dra) {
      svgroot.dragee = dra;
      rfp = dra.toGlobalCoords();
      //core.log("control",'dragging ',dra.__name,'refPos',rfp.x,rfp.y);
      svgroot.refPos = rfp;
      if (draggingInDiagram && diagram.dragStart) {
        diagram.dragStart(dra,rfp);
      }
    } else if (!clickedInBox) {
      delete svgroot.dragee;
      core.log('control','dragee off');
      delete svgroot.refPos;
    }
  } else { // if not selectedNode; nothing selected
    svgroot.refTranslation = svgroot.contents.getTranslation().copy();
    if (controlled) { // this happens when the user clicks on nothing, but something is under adjustment
      xf = svgroot.contents.transform;
      unselect();
      controlActivity = 'panning';
      core.log('control','controlActivity set to ',controlActivity);  
    } else {
      unselect();
      controlActivity = 'panning';
      core.log('control','controlActivity set to ',controlActivity);
    }
  }
}


const mouseMoveListener = function (svgroot,e) {
  if (nowPlayingHistory) {
    return;
  }
  e.preventDefault(); 
  let cp = svgroot.cursorPoint(e);
  let ovr = overNode(e);
  mouseMove(svgroot,cp,ovr);
  
}




const mouseMove = function (svgroot,cp,ovr)  {
  let pdelta,tr,delta,dr,s,npos,drm,xf;

  /*if (nowRecording) {
    addToHistory('move',cp,ovr);
  }*/
  xf = svgroot.contents.transform;
  let pointSeries = vars.activePointSeries;
  if (pointSeries && pointSeries.moveExtensionPoint) {
    pointSeries.moveExtensionPoint(xf.applyInverse(cp));// in coordinates of content
    return;
  }
  if (vars.localSwapMode) {
    dragOverOp(ovr);
    return;
  }
  if (!xf) {
    return;
  }
  if (controlActivity === 'panning') {
    pdelta = cp.difference(svgroot.refPoint);
    tr = svgroot.contents.getTranslation();
    s = svgroot.contents.transform.scale;
    tr.x = svgroot.refTranslation.x + pdelta.x;// / s;
    tr.y = svgroot.refTranslation.y + pdelta.y;//
    core.log("svg","drag","doPan",pdelta.x,pdelta.y,s,tr.x,tr.y);
    adjustGrid();
    dom.svgMain.draw();
    return;
  }
  let {refPoint} = svgroot;
  
  if (refPoint) {
    delta = cp.difference(refPoint); 
  } 
  dr = svgroot.dragee;
  if (dr) {
    let {refPos} = svgroot;
    s = svgroot.contents.transform.scale;
    npos = refPos.plus(delta.times(1/s));
    core.log('control','ZZZ');
    if (controlActivity === 'draggingResizeControl') {
      dragResizeControl(controlled,draggedControlName,npos);
      core.root.draw();
    } else if (controlActivity === 'draggingCustomControl') {
      core.log('control','NOW DOING THE CUSTOM DRAG');  
      dragOverOp(ovr);
      dragCustomControl(controlled,draggedCustomControlName,npos);
    } else {
      if (controlActivity === 'shifting') {
        let diagram = core.containingKit(dr);
        let withDragStep = false;
        if (draggingInDiagram) { 
          core.log('control','drag stepping');
          diagram.dragStep(dr,npos);
          withDragStep = true;
        }
        core.log('control',"SHIFTING ",dr.__name);
        if (controlled.dragVertically) {
          npos.x = refPos.x;
        }
        let toDrag = dr.__affixedChild?dr.__parent:dr;
        if (!withDragStep) {
          geom.movetoInGlobalCoords(toDrag,npos);
        }
        vars.setSaved(false);
        graph.graphUpdate(toDrag);
        updateCustomControls(toDrag);
        controlCenter = toDrag.toGlobalCoords();
        updateControlBoxes(true);
      }
    }
    drm = dr.onDrag;
    if (drm) {
      dr.onDrag(delta);
    }
  }
}

let updateOnNextMouseUp = true;

let draggingOver;
let dragOverHighlighted;

const mouseUpOrOutListener = function (svgroot,e) {
  let cp;
  if (nowPlayingHistory) {
    return;
  }
  cp = svgroot.cursorPoint(e);
  mouseUpOrOut(svgroot,cp,e);//e.type === 'mouseup');
}

const mouseUpOrOut = function (svgroot,cp,e) {
  let svActivity = controlActivity;
  let svControlled = controlled;
//console.log('ca',controlActivity,'c',controlled);
   let isMouseUp = e.type === 'mouseup';
   /*if (nowRecording) {
    addToHistory('up',cp);
  }*/
  let xf,clickedPoint;
  xf = svgroot.contents.transform;
  clickedPoint = xf.applyInverse(cp);// in coordinates of content
  if (vars.snapMode && (controlActivity === 'shifting')) {
    snapToGrid(controlled);
    graph.graphUpdate(controlled);
  }
  if (controlActivity === 'draggingResizeControl') {
    
    if (controlled.stopAdjust) {
       controlled.stopAdjust();
    }
  }
  if (controlActivity === 'draggingCustomControl') {
     setPointerEventsForCustomBoxes('auto');
     controlled.__element.setAttribute('pointer-events','auto');
     let nm = svgroot.dragee.__name;
     let idx = parseInt(nm.substr(1));
     if ((!controlled.connected) || (!controlled.connected(idx))) {
       if (vars.snapMode && !(draggingOver && controlled.dropControlPoint)) {
          let npos = snapPointToGrid(clickedPoint);
          dragCustomControl(controlled,draggedCustomControlName,npos);
       }
       if (controlled.dropControlPoint) {
         controlled.dropControlPoint(idx,draggingOver);
       }
     }
  }
  if (controlActivity === 'shifting') {
    if (controlled && controlled.stopDrag) {
      controlled.stopDrag();
    }
    controlActivity = 'panning';
    core.log('control','controlActivity set to ',controlActivity);
  }
  delete svgroot.refPoint;
  delete svgroot.refPos;
  delete svgroot.dragee;
  delete svgroot.refTranslation;
  if (updateOnNextMouseUp) {
    dom.fullUpdate();
    //dom.svgMain.updateAndDraw();
    //graph.graphUpdate();
    updateOnNextMouseUp = false;
  }
  if (isMouseUp) {
    vars.refreshTree();
  }
  if (svControlled && svActivity && (svActivity !== "panning")) {
	  core.saveState(svActivity);
    if (vars.afterSaveState) {
      vars.afterSaveState();
    }
  }
  controlActivity = undefined;
  if (svActivity === 'draggingResizeControl') {
    if (lastResizeSubject && core.isPrototype(lastResizeSubject)) { 
    // some updates are repressed during resizing;  get in an update at end though
      lastResizeSubject.__update();
      graph.graphUpdate();
    }
  }
  core.log('control','controlActivity set to ',controlActivity);
  showControl();
}


const dragOverListener = function (svgroot,e) {
  connectMode = false;
  e.preventDefault();
  let cp = svgroot.cursorPoint(e);

  let replacing =  (controlActivity === undefined) && vars.replaceMode;
  if (connectMode || replacing) {    
    let ovr = overNode(e);
    let xf = svgroot.contents.transform;
    let ccp = xf.applyInverse(cp);// in coordinates of content
    dragOverOp(ovr,ccp);
  }
}

const dragOverOp = function (ovr,pos) {
  let replacing = (controlActivity === undefined) && vars.replaceMode;
  //if (connectMode || replacing) { 
  let leftBox = pos && ((!dom.highlightBounds) || (!dom.highlightBounds.contains(pos)));
  if (leftBox)  {
    draggingOver = undefined;
    //dom.highlightBounds = undefined;
  }
  if (ovr) {
    if (connectMode && !core.ancestorWithPropertyTrue(ovr,'inert')) {
      draggingOver = core.ancestorWithRole(ovr,'vertex');
    } else if (replacing) {
      draggingOver  = vars.replaceable(ovr); // might be an ancestor
    } 
    if (draggingOver && (dragOverHighlighted !== draggingOver)) {
      
      dom.highlightExtraNode(draggingOver);
      dragOverHighlighted = draggingOver;
    }
   /* if (dragOverHighlighted && !draggingOver) {
      dragOverHighlighted = undefined;
      dom.highlightExtraNode(undefined);
    }*/
  }
  if (dragOverHighlighted && !draggingOver) {
    dragOverHighlighted = undefined;
    dom.highlightExtraNode(undefined);
  }
}

const afterDropCallbacks = [];
const debugDrop = false;
const dropListener = function (svgroot,e) {
  let cp,xf;
  if (draggingOver) {
      core.log('control','DROP OVER',draggingOver.__name);
  } else {
      core.log('control','DROP  OVER NOTHING');
  }
  controlActivity = undefined;
  if (!dropListener) {
    return;
  }
  core.log('control','drop');
  e.preventDefault();
  if ( vars.replaceMode  && dragOverHighlighted) {
    dragOverHighlighted = undefined;
    dom.unhighlight();
  }
  if (vars.replaceMode && !vars.replaceable(draggingOver)) {
    return;
  }
  svgRoot = svgroot;
  cp = svgroot.cursorPoint(e);
  xf = svgroot.contents.transform;
  svgroot.clickedPoint = xf.applyInverse(cp);// in coordinates of content
  if (debugDrop) {
    debugger; //keep
  }
  afterDropCallbacks.forEach(function (fn) {
    fn(draggingOver,svgroot.clickedPoint,dom.svgMain.contents.transform.scale);
  });
}

SvgRoot.activateInspectorListeners = function () {
  let cel,thisHere;
  if (this.inspectorListenersActivated) {
    return;
  }
  cel = this.__element;
  thisHere = this;
  cel.addEventListener("mousedown",function (e) {mouseDownListener(thisHere,e);});     
  cel.addEventListener("mousemove",function (e) {mouseMoveListener(thisHere,e);});     
  cel.addEventListener("mouseup",function (e) {mouseUpOrOutListener(thisHere,e);});
  cel.addEventListener("mouseleave",function (e) {mouseUpOrOutListener(thisHere,e);});
  cel.addEventListener("dragover",(e) => {dragOverListener(this,e);},false);
  cel.addEventListener("drop",function (e) {dropListener(thisHere,e);});//{once:true});
  this.inspectorListenersActivated = true;
} 
   
// when inspecting dom, the canvas is a div, not really a canvas
SvgRoot.addButtons = function (navTo) {
  let plusbut,minusbut,navbut,div;
  this.navbut = navbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">'+navTo+'</div>');
  navbut.__addToDom(div);
  div = this.__container;
  this.plusbut = plusbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">+</div>');
  this.minusbut = minusbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">&#8722;</div>');
  plusbut.__addToDom(div);
  minusbut.__addToDom(div);
  this.initButtons();
  }
  

SvgRoot.positionButtons = function (wd) {
  this.plusbut.$css({"left":(wd - 50)+"px"});
  this.minusbut.$css({"left":(wd - 30)+"px"});
  this.navbut.$css({"left":"0px"});
}

SvgRoot.initButtons = function () {
  this.plusbut.addEventListener("mousedown",startZooming);
  this.plusbut.addEventListener("mouseup",stopZooming);
  this.plusbut.addEventListener("mouseleave",stopZooming);
  this.minusbut.addEventListener("mousedown",startUnZooming);
  this.minusbut.addEventListener("mouseup",stopZooming);
  this.minusbut.addEventListener("mouseleave",stopZooming);
}

export {selectCallbacks,unselectCallbacks,unselect,afterDropCallbacks,zoomStep,
        controlActivity};


