import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.setName('path_flows');
let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStrokee:'white'}
Object.assign(rs,topParams);

let nr = 160;
nr = 4;
let ncpr = 8; //num circles per row
ncpr = 4;
let initState = {};
let pspace = {};
let pathNames = [];
 let delta = wd/nr;
  let hwd = 0.5*wd;
  let pathCount = 0;
  let crcDim = 2;
  crcDim = 8;
 let rows = []; 
 let cols = []; 
const addPath = function (vertical,n,m) {  // n= row or col, m = index in that row or col
 // let ws = this.whereString(w);
  let nm = (vertical?'v':'h')+'_'+n+'_'+m;
  pspace[nm] = {kind:'sweep',step:0.04*hwd,min:-hwd,max:hwd,n,m,vertical,circleIndex:pathCount,hidden:0};
  pathCount++;
  initState[nm] = {value:-hwd,paused:1,hidden:0};
  pathNames.push(nm);
  let rnm = 'r_'+nm;
  let minc = 150;
  pspace[rnm] = {kind:'random',step:25,min:minc,max:250};
  initState[rnm] = {value:minc};
   let bnm = 'b_'+nm;
  pspace[bnm] = {kind:'random',step:25,min:minc,max:250};
  initState[bnm] = {value:minc};
  if (vertical) {
    if (!cols[n]) {
      cols[n] = [nm];
    } else {
      cols[n].push(nm);
    }
  } else {
    if (!rows[n]) {
      rows[n] = [nm];
    } else {
      rows[n].push(nm);
    }
  }
};

for (let i=0;i<nr;i++) {
  for (let j=0;j<ncpr;j++) {
    addPath(0,i,j);
    addPath(1,i,j);
  }
}
  
 
debugger;
rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.saveAnimation = 0;
rs.numSteps = 500;
rs.numISteps = 0;

rs.updateState = function () {
  let {circles,pstate,stepsSoFar:ssf} = this;
  let {pspace,cstate} = pstate;
   let iv =16;

  let atBirth = ssf%iv === 0;
  let whichBorn = Math.floor(ssf/iv);
 // console.log('ssf',ssf,'atBirth',atBirth,'whichBorn',whichBorn);
  pathNames.forEach((pnm) => {
    let ornt = pnm.substring(0,1);
    let ps = pspace[pnm];
    let cs = cstate[pnm];
    let {n,m,circleIndex} = ps;
   
    if (m === whichBorn) {
      if (cs.paused) {
        console.log('unpaused n',n,'m',m,'pnm',pnm,'ornt',ornt);
        cs.paused = Math.random() > 0.1;
      }
    }
    if (!cs.paused) {
      let rnm = 'r_'+pnm;
      let bnm = 'b_'+pnm;
      let r = cstate[rnm].value;
      let b = cstate[bnm].value;
      let bst = cstate[bnm];
      let {value} = cs;
     
      let disp = n*delta - hwd;
      let pos = ornt==='h'?Point.mk(value,disp):Point.mk(disp,value);
      let crc = circles[circleIndex];
      if (value < -45) {
         debugger;
         crc.unhide();
         crc.update();
         cs.hidden = 0;
      }
      if (ornt === 'h') {
        let inCol = Math.floor((value+hwd)/delta);
        let colA = cols[inCol];
        let ln = colA.length;
        for (let j=0;j<ln;j++) {
          let cnm = colA[j];
          let cst = cstate[cnm];
          let pst = pspace[cnm];
          let ccrci= pst.circleIndex;
          let ccrc = circles[ccrci];
          if (cst.paused || cst.hidden) {
            continue;
          }
          let x= inCol*delta -hwd;
          let y = cst.value;
          let pnt = Point.mk(x,y);
          let dist = pos.distance(pnt);
          if (dist < crcDim) {
            crc.hide();
            cs.hidden = 1;
            ccrc.hide();
            cst.hidden = 1;
          }
        }
      }
      if (ornt === 'v') {
        let inRow = Math.floor((value+hwd)/delta);
        let rowA = rows[inRow];
        let ln = rowA.length;
        for (let j=0;j<ln;j++) {
          let cnm = rowA[j];
          let cst = cstate[cnm];
          let pst = pspace[cnm];
          let ccrci= pst.circleIndex;
          let ccrc = circles[ccrci];
          if (cst.paused || cst.hidden) {
            continue;
          }
          let y= inRow*delta -hwd;
          let x = cst.value;
          let pnt = Point.mk(x,y);
          let dist = pos.distance(pnt);
          if (dist < crcDim) {
            crc.hide();
            cs.hidden = 1;
            ccrc.hide();
            cst.hidden = 1;
          }
        }
      }
      crc.update();      
      crc.moveto(pos);
    }
  });
}


rs.initProtos = function () {
  
    this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'blue';
  this.circleP.fill = 'white';
  this.circleP['stroke-width'] =.02;
  this.circleP.dimension = crcDim;
  
}

rs.initialize = function () {
  this.addFrame();
  this.initProtos();
  let circles = this.set("circles",arrayShape.mk());
  for (let i=0;i<2*nr*ncpr;i++) {
    let crc = this.circleP.instantiate();
    circles.push(crc);
  }

 }

rs.stepInterval = 40;
  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


