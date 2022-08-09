
import {rs as generatorP} from '/generators/quad_9.mjs';

let rs = generatorP.instantiate();

rs.setName('quad_9_3');
let levels = 8;
rs.quadParams.levels = levels;
levels++;
rs.fr0 = 0.5;
rs.fr1 = 0.5;
rs.fr2 = 0.2;

let mangles = rs.mangles = [];
rs.addToArray(mangles,0,levels);

let visibles = rs.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);
let lengthenings = rs.lengthenings = [];
rs.addToArray(lengthenings,5.5,levels);
let twists = rs.twists = [];
//rs.addToArray(twists,0,2);
rs.addToArray(twists,0.05*Math.PI,levels);


  
rs.displayCell = function (qd) {
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
  let strokew = this.strokeWidths[lnw];
  rs['stroke-width'] = 0;//strokew;
  crcs['stroke-width'] = 0.2*strokew;
  let fill = Math.random()>0.5?'red':'blue';
  if (lnw === (levels-1)) {
    rs.fill = fill;
    shapes.push(crcs);
  } 
  shapes.push(rs);
  

}

export {rs};


