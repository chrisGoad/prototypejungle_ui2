
import {rs} from '/generators/drop_circles_4.mjs';
rs.setName('drop_circles_4_2');


let ring0 = {innerRadius:200,outerRadius:300, center:Point.mk(-100,0)};
let ring1 = {innerRadius:200,outerRadius:300, center:Point.mk(100,0)};

let rd0 = 3;
let rd1 = 6;
const inRing = function(ring,p) {
  let {innerRadius:inr,outerRadius:otr,center} = ring;
  let d = p.distance(center);
  return (inr <= d) && (d <= otr);
}
 
rs.generateDrop= function (p) {
  let {height:ht} = this;
  let in0 = inRing(ring0,p);
  let in1 = inRing(ring1,p);
  let rd;
  if (in0 && in1) {
    rd = Math.random()<0.5?rd0:rd1;
  } else if (in0) {
    rd = rd0;
  } else if (in1) {
    rd = rd1;
  } else {
    return;
  }
  let rc0= Point.mk(-300,0);
  let rc1= Point.mk(300,0);
  let d = p.length();
  if (d>500) {
    return;
  }
  return {radius:rd};
}


  

export {rs};


