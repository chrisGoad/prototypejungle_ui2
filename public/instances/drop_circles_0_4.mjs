
import {rs} from '/generators/drop_circles_0.mjs';
import {rs as innerDrop} from '/instances/drop_circles_0_0.mjs';


rs.setName('drop_circles_0_4');



let ht = 2000;
let topParams = {width:ht,height:ht}
Object.assign(rs,topParams);
debugger;
let dropParams = {dropTries:150,dropP:innerDrop,radius:400}
innerDrop.setDimension = function (dim) {
 this.width = dim;
 this.height = dim;
}


rs.generateDrop= function (p) {
  let {height:ht,dropParams} = this;
  let {radius} = dropParams;
  let hht = 0.5*ht;
  //let fr = (p.y + hht)/ht;
  let d = p.length();
  if (d>=hht) {
    return;
  }
 // let fr = d/(hht * Math.SQRT2);
 
  return {radius}
}
 
 



rs.initialize = function () {
  this.stdInitialize(dropParams);
  return;
  this.initProtos();
  let shapes = this.set('shapes',arrayShape.mk());
  let drops =  this.generateCircleDrops(dropParams);
  debugger;
  let ln  = drops.length;
  for (let i=0;i<ln;i++) {
    let {point,radius} = drops[i];
    //let fill = this.fillGenerator(p);
    let crc = innerDrop.instantiate();
    let dim = 2.0*radius;
    crc.width = dim;
    crc.height = dim;
    shapes.push(crc);
    crc.initialize();
    crc.moveto(point);
   }
}

export {rs};


