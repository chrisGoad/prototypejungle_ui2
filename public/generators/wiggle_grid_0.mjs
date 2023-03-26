


import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	
let rs = basicP.instantiate();
addPathMethods(rs);

rs.addPath = function (nm,dur,max) {
  let {pstate} = this;
  let {pspace,cstate} = pstate;
  pspace[nm] = {kind:'sweepFixedDur',dur,min:0,max:1,start:0};
  cstate[nm] = {value:0};
};

rs.grid = [];

rs.numRows = 5;

rs.buildGrid = function () {
  let gr = this.grid = [];
  let {numRows:nr,numCols:nc,height:ht,width:wd} = this;
  let deltaX = wd/nc;
  let deltaY = ht/nr;
  let minX = -0.5*wd;
  let minY = -0.5*ht;
  for (i=0;i<nc;i++) {
    let x = minX+i*deltaX;
    for (j=0;j<nr;j++) {
      let y = minY + j*deltaY;
      let p = Point.mk(x,y);
      let idx =i*nr+j;
      let gs = {row:j,col:i,basePos:p,index:idx,offset:Point.mk(0,0)};
      gr.push(gs);
    }
  }
}


rs.addLines = function() {
  let {numRows:nr,numCols,grid} = this;
  let hlines =  this.set('hlines',arrayShape.mk());
  let vlines =  this.set('vlines',arrayShape.mk());
  for (let i=0;i<nc-1;i++) {
    for (let j=0;j<nr;j++) {
      if (i=nc-1) {
      let hline = (i === nc-1)?null:lineP.instantiate();
      let vline = (j === nr-1)?null:lineP.instantiate();
      lines.push(hline);
      hlines.push(vline);
      let idx =i*nr+j;
      g = grid[idx];
      g.hline = hline;
      g.vline = vline;
    }
  }
}


rs.adjustLines = function() {
    let {grid} = this;
    let ln 
    for (let i=0;i<nc-1;i++) {
      for (let j=0;j<nr-1;j++) {
        let idx =i*nr+j;
        let g = grid[idx];
        let bp  = g.basePos;
        let h = grid[idx+nr];
        let hp = h.basePos;
        let v= grid[idx+1];
        let vp = v.basePos;
        


     


  
export {rs};


