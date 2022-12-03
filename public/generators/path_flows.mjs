import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.setName('path_flows');
let wd = 100;
let topParams = {width:wd,height:wd,framePadding:0.2*wd,frameStrokee:'white'}
Object.assign(rs,topParams);

let nr = 40;
let ncpr = 8; //num circles per row
let initState = {};
let pspace = {};
let pathNames = [];
 let delta = wd/nr;
  let d = 0.5*wd;
  let pathCount = 0;
const addPath = function (vertical,n,m) {  // n= row or col, m = index in that row or col
 // let ws = this.whereString(w);
  let nm = (vertical?'v':'h')+'_'+n+'_'+m;
  pspace[nm] = {kind:'sweep',step:0.04*d,min:-d,max:d,n,m,vertical,circleIndex:pathCount,hidden:1};
  pathCount++;
  initState[nm] = {value:-d,paused:1};
  pathNames.push(nm);
 

};

for (let i=0;i<nr;i++) {
  for (let j=0;j<ncpr;j++) {
    addPath(0,i,j);
    addPath(1,i,j);
  }
}
  
 

rs.copyOfInitState = rs.deepCopy(initState);

rs.pstate = {pspace,cstate:initState};

rs.saveAnimation = 0;
rs.numSteps = 500;
rs.numISteps = 0;

rs.updateState = function () {
  debugger;
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
      let {value} = cs;
      let disp = n*delta - d;
      let pos = ornt==='h'?Point.mk(value,disp):Point.mk(disp,value);
      let crc = circles[circleIndex]; 
      crc.moveto(pos);
    }
  });
}


rs.initProtos = function () {
  
    this.circleP =  circlePP.instantiate();
  this.circleP.stroke = 'blue';
  this.circleP.fill = 'white';
  this.circleP['stroke-width'] =.02;
  this.circleP.dimension = .5;
  
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

  
//rs.addToArray(strokeWidths,.1,levels);
export {rs};


