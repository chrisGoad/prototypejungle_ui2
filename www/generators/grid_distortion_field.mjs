
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
rs.setName('grid_distortion_field2');
let nr = 40;
let dim = 400;
let topParams = {numRows:nr,numCols:nr,width:dim,height:dim,lowJiggle:0,highJiggle:20,lowJiggleStep:0,highJiggleStep:5};

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.blineP = linePP.instantiate();
  this.blineP.stroke = 'rgb(255,255,255)';
  this.blineP['stroke-width'] = 0.5;
  this.polygonP = polygonPP.instantiate();
  this.polygonP.stroke = 'rgb(255,255,255)';
  this.polygonP['stroke-width'] = 0.5;
  this.polygonP.fill = 'red';
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
  let {blineP,lines} = this;
  let line = blineP.instantiate();
  lines.push(line);
  line.setEnds(end0,end1);
  line.show();
  return line;
}

rs.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,polygonP} = this;
  let corners = this.cellCorners(cell);
  let mcnt = cnt.minus();
  let rCorners = this.displaceArray(corners,mcnt);
  let sCorners = this.scaleArray(rCorners,0.5,0.25);
  let pgon = polygonP.instantiate();
  pgon.corners = sCorners;
  shapes.push(pgon);
  pgon.show();
  pgon.update();
  return pgon;
}

let root2 = Math.sqrt(2);

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initProtos();
  let {numRows,numCols,lowJiggle,highJiggle,lowJiggleStep,highJiggleStep} = this;
  this.addFrame();
  let hnr = numRows/2;
  const computeParams =  (i,j) => {
    let di = i - hnr;
    let dj = j - hnr;
    let fromSides = root2*hnr - Math.sqrt(di*di + dj*dj);
    let jiggleMax = this.interpolate(fromSides,0,root2*numRows/2,lowJiggle,highJiggle);
    let jiggleStep = this.interpolate(fromSides,0,root2*numRows/2,lowJiggleStep,highJiggleStep);
    return {step:jiggleStep,min:0,max:jiggleMax,bias:i};
  }
  this.pointJiggleParams = computeParams;
  this.generateGrid();
}

export {rs};

