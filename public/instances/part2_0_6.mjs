
import {rs as generatorP} from '/generators/part2_0.mjs';

let rs = generatorP.instantiate();

rs.setName('part2_0_6');
let levels = 7;
//levels = 5;
rs.partParams.levels = levels;
rs.partParams.rectangular = 1;
//rs.quadParams.circleScale = 0.25;



let visibles = rs.partParams.visibles = [];
rs.addToArray(visibles,0,levels-1);
rs.addToArray(visibles,1,levels);

rs.partParams.manglee = {'lengthen':.3,'twist':0.05*Math.PI,within:rs.canvasToRectangle()}
rs.partParams.chance = 0.95;
rs.partParams.chance = 0.7;
rs.partParams.chance = 1;

rs.partFill = function (qd) {
  debugger;
  let rb= Math.random() > 0.5;
  let v = Math.floor(255*Math.random());
  let b = `rgb(${v},${v},${v})`;
  let r = `rgb(${v},0,0)`;
  return rb?r:b;
}
let strokeWidths = rs.partParams.strokeWidths = [];

//rs.computeExponentials(strokeWidths,20,0,.9);
rs.addToArray(strokeWidths,0.05,20);

let strokes = rs.partParams.strokes = [];
rs.addToArray(strokes,'white',levels);

rs.partSplitParams = function (qd) {
   //let v = 0.7;
  //debugger;
   let rs = this.randomizeFrom({Case:[4,6],pcs:[[.4,1.5,2.4,3.5]],frs:[[0.4,.3]]});

   //console.log('ornt',rs.ornt,'fr0',rs.fr0);
   console.log('rs',rs);
  return rs;
}
/*
fr0: 0.5669432372599208
fr1: 0.49575153861842747
fr2: 0.38641189948959437
fr3: 0.6256200601229618
fr4: 0.3272879105749005
fr5: 0.3696640457077124
ornt: "v"
*/
export {rs};

      

