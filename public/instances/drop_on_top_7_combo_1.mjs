
import {rs as generatorP} from '/generators/drop_on_top_7.mjs';
import {rs as basicP} from '/generators/basics.mjs';
let v2 = 255;
let v = 200;
let p2params = {initialDropColor:[0,0,v,1],middleDropColor:[v,0,v,1],finalDropColor:[v,0,0,1],
                initialGridColor:[v2,v2,v2,1],middleGridColor:[v2,v2,v2,1],finalGridColor:[v2,v2,v2,1]};
let rs = basicP.instantiate();
rs.setName('drop_on_top_7_combo_1');
let p1 = generatorP.instantiate();
let p2 = generatorP.instantiate();
debugger;
let ht = p1.height;
let mv = 0.6*ht;
rs.set('p1',p1);
rs.set('p2',p2);
Object.assign(p2,p2params);
rs.initialize = function () {
  debugger;
  p1.initialize();
  p2.initialize();
  p1.moveto(Point.mk(0,-mv));
  p2.moveto(Point.mk(0,mv));
}


export {rs};



