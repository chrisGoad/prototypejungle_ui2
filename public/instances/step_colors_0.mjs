import {rs as rectanglePP} from '/shape/rectangle.mjs';

import {rs as generatorP} from '/generators/step_arrays.mjs';

let rs = generatorP.instantiate();


rs.setName('step_colors');
rs.framePadding = .2*(rs.width);


rs.pstate = {pspace:{},cstate:{}}

rs.arrayLen = 3;

rs.numCycles = 20;
rs.duration = 10;
rs.pauseDuration = 30;
rs.gridDim = 20;

rs.buildGrid = function () {
  let {gridDim:dim} = this;
  let gr = this.set('grid',containerShape.mk());
  let names = this.names = [];
  for (let i=0;i<dim;i++) {
    for (let j=0;j<dim;j++) {
      let nnm = '_'+i+'_'+j;
      names.push(nnm);
      let wnm = 'w'+nnm;
      let hnm = 'h'+nnm;
    /*  let rnm = 'r'+nnm;
      let gnm = 'g'+nnm;
      let bnm = 'b'+nnm;
      this.addPath(rnm);
      this.addPath(gnm);
      this.addPath(bnm);*/
      this.addPath(wnm);
      this.addPath(hnm);
      let sq = this.rectP.instantiate();
      gr.set(nnm,sq);   
      let ps=Point.mk(i*20,j*20);
      sq.moveto(ps);      
    }
  }
}


rs.addPath = function (nm) {
  let {pstate} = this;
  let {pspace,cstate} = pstate;
  let dur = this.duration;
 // let nm = 'v_'+n;
 // pspace[nm] = {kind:'sweepFixedDur',dur,min:0,max:250};
  pspace[nm] = {kind:'sweepFixedDur',dur,min:10,max:15};
  cstate[nm] = {value:0,start:0};
};

rs.buildSeqOb = function () {
  let {pstate,numCycles,arrayLen} = this;
  let {pspace} = pstate;
  let props = Object.getOwnPropertyNames(pspace);
  return this.randomSeqOb({props,ln:arrayLen,lb:1,ub:10,numCycles});
}


rs.initProtos = function () {
	this.rectP = rectanglePP.instantiate();
	this.rectP.fill = 'rgba(255,255,255,.5)';
  this.rectP.width = 10;
  this.rectP.height = 10;
	this.rectP['stroke-width'] = 0;
} 

rs.initialize = function () {
   debugger;
   this.initProtos();
   this.buildGrid();
   this.loopingSeqOb(this.buildSeqOb);
}

/*ebugger;
rs.buildGrid();
debugger;
rs.loopingSeqOb(rs.buildSeqOb);
*/

rs.updateState = function () {
  let {stepsSoFar:ssf,names,grid}  = this;
  //debugger;
  this.enterNewPart();
  let {pstate} = this;
  let {cstate} = pstate;
  //let props = Object.getOwnPropertyNames(cstate);
  let cnt =0;
  names.forEach( (nm) => {
    let rnm = 'r'+nm;
    let gnm = 'g'+nm;
    let bnm = 'b'+nm;
    let wnm = 'w'+nm;
        let hnm = 'h'+nm;

    let wnm0 = 'w_0_0';
    let hnm0 = 'h_0_0';
    
    let wnm1 = 'w_0_1';
    let hnm1 = 'h_0_1';
    debugger;
    cnt++;
    let w,h;
    if (cnt%2) {
      w = cstate[wnm0].value;
      h = cstate[hnm0].value;
    } else {
      w = cstate[wnm1].value;
      h = cstate[hnm1].value;
    }
 /*   let r = Math.floor(cstate[rnm].value);
    let g =  Math.floor(cstate[gnm].value);
    let b =  Math.floor(cstate[bnm].value);
    let clr = `rgb(${r},${g},${b})`;*/
    let sq = grid[nm];
    sq.width = w;
    sq.height = h;
  //  sq.fill = clr;
    sq.update();
    
  });

 }

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};

