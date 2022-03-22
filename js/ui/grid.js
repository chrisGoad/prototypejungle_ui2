// support for grids in the UI (only in network diagrams for now)
const addGrid = function () {
  let grid = core.root.__grid;
  if (grid) {
    return;
  }
  grid = svg.Element.mk('<path fill="none" stroke="grey"  stroke-opacity="1"  stroke-width="0.5"/>');
  grid.neverselectable = true;
  grid.interval = 30;
  grid.neverselectable = true;
  hide(grid,['d','fill'])
  core.root.set('__grid',grid);
  core.root.neverselectable = true;
}
// the  grid gets moved around when saved by centering
// gridOrigin is a point within interval of (0,0).  adjustGridRect places its corner an even number
// of intervals from gridOrigin
/*
const gridOrigin = () => {
  let grid = core.root.__grid;
  if (grid) {
    let pos = grid.getTranslation();
    let interval = grid.interval;
    return Point.mk(pos.x%interval,pos.y%interval);
  } else {
    return Point.mk(0,0);
  }
}

const adjustGridRect = function (bnds) { // assure that the corner is an even count of intervals from (0,0) 
  let origin = Point.mk(0,0);//gridOrigin();
  let corner = (bnds.corner.difference(origin));
  let interval = core.root.__grid.interval;
  let newCx = Math.round(corner.x/interval)*interval+origin.x;
  let newCy = Math.round(corner.y/interval)*interval+origin.y;
  bnds.corner.x = newCx;
  bnds.corner.y = newCy;
}
*/


let gridRect  = Rectangle.mk(Point.mk(-50,-50),Point.mk(100,100));

const adjustGridRect = function (bnds) { // assure that the corner is an even count of intervals from (0,0)
  let corner = bnds.corner;
  let interval = core.root.__grid.interval;
  let newCx = Math.round(corner.x/interval)*interval;
  let newCy = Math.round(corner.y/interval)*interval;
  corner.x = newCx;
  corner.y = newCy;
}


const updateGrid = function(grid) {
  if (grid.__hidden()) {
    return;
  }
  let interval = grid.interval;
  let {corner,extent} = gridRect;
  let lowX = corner.x;
  let lowY = corner.y;
  let numX = Math.round(extent.x/interval);
  let numY = Math.round(extent.y/interval)
  let highX = lowX + interval*numX;
  let highY = lowY + interval*numY;
  let path = '';
  for (let i=0;i<=numY;i++) {//the horizontal lines
    let y=lowY + i*interval;
    path += 'M '+lowX+' '+y+' ';
    path += 'L '+highX+' '+y+' ';
  }
   for (let i=0;i<=numX;i++) {// the vertical lines
    let x=lowX + i*interval;
    path += 'M '+x+' '+lowY+' ';
    path += 'L '+x+' '+highY+' ';
  }
  grid.d = path;
}

const selectGrid = function () {
  core.root.__grid.__select('svg',false,true); 
}

const gridCoversSvg = function () {
  let grid = core.root.__grid;
  let gridBnds = grid.bounds();
  let svgBnds = dom.svgMain.visibleBounds();
  return gridBnds.containsRectangle(svgBnds);
}

const setGridRect = function () {
  addGrid();
  core.root.__grid.update = function () {updateGrid(core.root.__grid)};
  let bnds = dom.svgMain.visibleBounds().scaleCentered(1.5);
  adjustGridRect(bnds);
  gridRect = bnds;
  updateGrid(core.root.__grid);
  //core.root.grid.update();
  core.root.__grid.draw();
}

const adjustGrid = function () {
  let grid = core.root.__grid;
  if (grid && grid.__visible()) {
    if (!gridCoversSvg()) {
      setGridRect();
    }
  }
}


const snapPointToGrid = function (pos) {
  let interval = core.root.__grid.interval;
  let gpos = core.root.__grid.getTranslation();
  let corner = (gridRect.corner).plus(gpos);
  let relPos = pos.difference(corner);
  let xi = Math.round(relPos.x/interval);
  let yi = Math.round(relPos.y/interval);
  return corner.plus(Point.mk(xi,yi).times(interval));
}


const snapToGrid = function (node) {
  if (node.undraggable) {
    return;
  }
  let gpos = node.toGlobalCoords();
  //let pos = node.getTranslation();
  let newPos = snapPointToGrid(gpos);
  geom.movetoInGlobalCoords(node,newPos);
 // node.moveto(newPos);
  let diagram = core.containingKit(node);
  if (diagram) {
    diagram.__update;
    diagram.draw();
  }
 // updateControlBoxes();
  
}

let gridWasVisible;
const removeGridPath = function (itm) {
  gridWasVisible = false;
  let grid = itm.__grid;
  if (grid) {
    grid.d = '';
    if (grid.__visible()) {
      gridWasVisible = true;
      grid.hide();
    }
  }
}

core.beforeSerialize.push(removeGridPath);

const restoreGridPath = function () {
  if (gridWasVisible) {
    core.root.__grid.show();
    setGridRect();
  }
}

core.afterSerialize.push(restoreGridPath);

export {setGridRect,selectGrid,snapPointToGrid,gridRect};