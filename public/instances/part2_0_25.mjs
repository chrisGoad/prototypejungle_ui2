
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();
let levels = 7;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;

rs.setName('part2_0_25');


rs.computeFill = function () { 
   const shade = ()=> Math.floor(255*Math.random());
   let v = shade();
   let fill = `rgba(${v},0,${v},1)`;
   //return 'transparent';
   return fill;
}


 rs.displayCell  = function (qd) {
   debugger;
   let {shapes,circleP}= this;
   let {polygon:pgon,stopped} = qd;
   if (stopped) {
     let c = pgon.center();
     let wd = pgon.width();
     let crc = Circle.mk(0.4*wd);
    // let crc = Circle.mk(1*wd);
     let shape = crc.toShape(circleP);
     //shape.dimension = 0.7*ex;
     shape.fill = this.computeFill();
     this.shapes.push(shape);
     shape.moveto(c);
  }
 //  shape.update();
 }  

rs.partSplitParams = function (prt) {
  //debugger;
   let lv = this.levelOf(prt);
   if ((lv < 3) || (Math.random() < .8)) {
     return {Case:7,pcs:[.5,1.5,2.5,3.5]};
   }
 }

rs.adjustProtos = function () {
  this.circleP['stroke-width'] = .15;
  this.circleP.stroke = 'white';
}
export {rs};

      

