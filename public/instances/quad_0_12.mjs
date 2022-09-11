
import {rs as generatorP} from '/generators/quad_9.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_0_12');
let levels = 8;
rs.quadParams.levels = levels;
levels++;


rs.splitParams = {fr0:0.5,fr1:0.5,fr2:0.2};
rs.quadSplitParams = function (qd) {
  let ornt = Math.random() < 0.5?'h':'v';
  let rs = this.splitParams;
  rs.ornt = ornt;
  return rs;
}
/*let mangles = rs.mangles = [];
rs.addToArray(mangles,0,levels);

let visibles = rs.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);
let lengthenings = rs.lengthenings = [];
rs.addToArray(lengthenings,5.5,levels);
let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
rs.addToArray(twists,0.05*Math.PI,levels);

*/

rs.quadStrokeWidth = function () {
 return 0.00001;
 }
rs.quadFill = function (qd) {
  let  lnw = qd.where.length;
  let fill = Math.random()>0.5?'red':'blue';
  if (lnw === (levels-1)) {
    return fill;
  }
   // shapes.push(crcs);
} 
  
rs.displayCelll = function (qd) {
  let {shapes,rectP,lineP,circleP} = this;
  let  lnw = qd.where.length;
if (lnw ===  levels) {
  debugger;
 }   
  let rect = qd.rectangle;
  let cnt = rect.center();
  let ext = rect.extent;
  let dim = Math.min(ext.x,ext.y);
  let crc = Circle.mk(cnt,0.4*dim);
  let crcs = crc.toShape(circleP);
  let rs = rect.toShape(rectP,1);
  //let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = 0;//strokew;
 // crcs['stroke-width'] = 0.2*strokew;
  let fill = Math.random()>0.5?'red':'blue';
  if (lnw === (levels-1)) {
    rs.fill = fill;
   // shapes.push(crcs);
  } 
  shapes.push(rs);
  

}

export {rs};


