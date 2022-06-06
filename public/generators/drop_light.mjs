import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/circleDrops.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);

rs.setName('drop_light');
let ht= 6000;
let topParams = {width:ht,height:ht}
Object.assign(rs,topParams);

let dropParams = {dropTries:150}

rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.fill = 'black';
  circleP['stroke-width'] = 0;
}  

rs.generateCircleDrop= function (p) {
  let ln = p.length()-400;
  if (ln<=0) {
    return;
  }
  return {radius:0.01*ln}; 
 }

rs.initialize = function () {
  this.addRectangle({width:ht,height:ht,stroke_width:0,fill:'white'});
  this.initProtos();
  this.addFrame();
  let drops =  this.generateCircleDrops(dropParams);
  this.installCircleDrops(drops,this.circleP);
}

export {rs};


