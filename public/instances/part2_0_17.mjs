
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_17');
let levels = 8;
levels = 6;

rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.partParams.displayProbability = .2;

rs.qspa = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.4,1.4,2.6,3.4],frs:[.3,0.6]});
rs.qspa.push({Case:7,pcs:[0.4,1.4,2.6,3.4]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});

/*
rs.qspa = [];
//rs.qspa.push({Case:3,vertexNum:0,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
//rs.qspa.push({Case:7,pcs:[0.5,1.5,2.5,3.5]});
rs.qspa.push({Case:4,vertexNum:0,pcs:[0.3,1.3,2.7,3.3],frs:[.3,0.7]});
rs.qspa.push({Case:6,vertexNum:0,pcs:[0.3,1.4,2.7,3.3],frs:[.3,0.7]});
rs.qspa.push({Case:7,pcs:[0.3,1.3,2.7,3.3]});
//rs.qspa.push({Case:9,radius:.2,direction:0.25*Math.PI,pc0:0.4,pc1:1.4,pc2:2.6,pc3:3.4});
*/
rs.triSplitParams1 = {Case:1,vertexNum:0,pcs:[0.3,1.3]};

rs.partSplitParams = function (prt) {
  let {polygon:pgon} = prt;
  let {width:wd} = this;
  let hwd = 0.5*wd;
  let ln = pgon.corners.length;
  let cnt = pgon.center();
  //let wp = Math.floor(Math.random()*3);
  let lev = prt.where.length;
  let Case = lev%2?4:6;
  let dist = cnt.length();
 // let div = 0.3*Math.abs(Math.max(cnt.x,cnt.y))/hwd;
  let div = (0.15*dist/hwd) + .01;
  console.log('div',div);
  let qsp = {Case,pcs:[0.5-div,1.5-div,2.5+div,3.5-div],frs:[0.5-div,0.5+div]}
  
  let rs = (ln === 3)?this.triSplitParams1:qsp;
  return rs;
}


rs.afterDisplayCell = function (prt) {
  let crc = this.circleP.instantiate()
  crc.dimension = 0.3;
  crc.fill = 'white';
  this.shapes.push(crc);
  let {polygon:pgon} = prt;
  let cnt = pgon.center();
  crc.moveto(cnt);
}

let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,1,20);

let strokeWidths = rs.partParams.strokeWidths = [];
rs.computeExponentials({dest:strokeWidths,n:20,root:0.4,factor:.7});

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


