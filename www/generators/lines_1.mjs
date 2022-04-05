
//core.require('/line/line.js','/mlib/lines.js','/gen0/Basics.js',
//function (linePP,addMethods,linesP) {



import {rs as linePP} from '/line/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as fromCenterP} from '/generators/lines_from_center.mjs';	
import {rs as cobwebP} from '/generators/lines_cobweb.mjs';	

let rs = basicP.instantiate();


debugger;	//this.initProtos();
//core.vars.whereToSave = 'images/grid_1_1.jpg';
rs.setName('lines_1');
let wd = 400;
//let topParams = {width:wd,height:wd,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*wd,backStripeVisible:0};
let topParams = {width:wd,height:wd,frameColor:'rgb(2,2,2)',backgroundColorr:'rgb(2,2,2)',backgroundPadding:0.1*wd};
Object.assign(rs,topParams);

rs.initialize = function () {
  let {width} = this;
  debugger;
  let mv = 0.25*width;
  this.addFrame();
  let quad00 = this.set('quad00',fromCenterP.instantiate().show());
  quad00.initialize();
  quad00.moveto(Point.mk(-mv,-mv));
  let quad10 = this.set('quad10',fromCenterP.instantiate().show());
  quad10.lineColor = 'black';
  quad10.backgroundColor = 'white';
  quad10.initialize();
  quad10.moveto(Point.mk(mv,-mv));
  let quad01= this.set('quad01',cobwebP.instantiate().show());
  quad01.initialize();
  quad01.moveto(Point.mk(-mv,mv));
  let quad11 = this.set('quad11',cobwebP.instantiate().show());
  quad11.lineColor = 'black';
  quad11.backgroundColor = 'white';
  quad11.initialize();
  quad11.moveto(Point.mk(mv,mv));

}

export {rs};
