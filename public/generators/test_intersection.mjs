import {rs as circlePP} from '/shape/circle.mjs';
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';

let rs = basicP.instantiate();

rs.setName('drop_circles_0');
let ht= 200;
let topParams = {width:ht,height:ht,framePadding:0.1*ht}
Object.assign(rs,topParams);


rs.initProtos = function () {
  let circleP = this.circleP = circlePP.instantiate();
  circleP.stroke = 'white';
  circleP['stroke-width'] = 0.5;
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'white';
  lineP['stroke-width'] = 0.5;
}

rs.initialize = function () {
  this.initProtos();
  let sg = LineSegment.mk(Point.mk(-20,-20),Point.mk(20,20));
  let crc = Circle.mk(Point.mk(0,16),10);
  let ln = this.genLine(sg,this.lineP);
  let crcs = this.genCircle(crc,this.circleP);	
  crcs.moveto(Point.mk(-20,-20));

  let shapes = this.set('shapes',ArrayNode.mk());
  shapes.push(ln);
  shapes.push(crcs);
  debugger;
 // let ii = sg.intersectsCircle(crc);
  let ii = sg.intersects(crc);
  console.log('ii',ii);
}

export {rs};



