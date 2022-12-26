import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as polygonPP} from '/shape/polygon.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('flows_0');


rs.pstate = {pspace:{},cstate:{}};

rs.adjustQuadrantGon = function (qg,dim,ul,ur,ll,lr) { 
  qg.dim = dim;
  let hdim = 0.5*dim;
  let ulc = Point.mk(-hdim,-hdim);
  let urc = Point.mk(hdim,-hdim);
  let lrc = Point.mk(hdim,hdim);
  let llc = Point.mk(-hdim,hdim);
  let pul = ulc.plus(ul);
  let pur = urc.plus(ur);
  let plr = lrc.plus(lr);
  let pll = llc.plus(ll);
  let c = arrayShape.mk([pul,pur,plr,pll]);
  qg.polygon.set('corners',c);
}


rs.mkQuadrantGon = function (dim,iul,iur,ill,ilr) {
  let ul,ur,lr,ll;
  let qg = {};
  if (!ul) {
    ul = Point.mk(0,0);
    ur = Point.mk(0,0);
    lr = Point.mk(0,0);
    ll = Point.mk(0,0);
  } else {
    ul = iul;
    ur = iur;
    lr = ilr;
    ll = ill;
  }
  let gon = this.polygonP.instantiate();
  qg.polygon = gon;
  this.adjustQuadrantGon(qg,dim,ul,ur,ll,lr);
  this.polygons.push(gon);
  this.quads.push(qg);
  return qg;
}
 


rs.setFromTrace = function (n,tr,cfn,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx = cfn.call(this,i,j);
      let vm = tr[n+idx];
      let v = vm?vm.value:0;
      ifn.call(this,v,i,j);
    }
  }
}



rs.setFrom2Traces = function (n,tr0,tr1,cfn0,cfn1,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  const valueOf = (a,i) => {
    let vm = a[i];
    return vm?vm.value:0;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx0 = cfn0.call(this,i,j);
      let idx1 = cfn1.call(this,i,j);
      let v0 = valueOf(tr0,n+idx0);
      let v1 = valueOf(tr1,n+idx1);
      ifn.call(this,v0,v1,i,j);
    }
  }
}
rs.setFrom3Tracess = function (n,tr0,tr1,tr2,cfn0,cfn1,cfn2,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  const valueOf = (a,i) => {
    let vm = a[i];
    return vm?vm.value:0;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx0 = cfn0.call(this,i,j);
      let idx1 = cfn1.call(this,i,j);
      let idx2 = cfn2.call(this,i,j);
      let v0 = valueOf(tr0,n+idx0);
      let v1 = valueOf(tr1,n+idx1);
      let v2 = valueOf(tr2,n+idx2);
      ifn.call(this,v0,v1,v2,i,j);
    }
  }
}
rs.setFromTraceArray= function (n,traces,choiceFunctions,ifn) { //ifn = installation function
  debugger;
  let {numRows,numCols} = this;
  let nt = traces.length;
  const valueOf = (a,i) => {
    let vm = a[i];
    return vm?vm.value:0;
  }
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let va = [];
      for (let k=0;k<nt;k++) {
        let cf = choiceFunctions[k];
        let tr = traces[k];
        let idx = cf.call(this,i,j);
        let v = valueOf(tr,n+idx);
        va.push(v);
      }
      ifn.call(this,va,i,j);
    }
  }
}

rs.setFrom3Traces = function (n,tr0,tr1,tr2,cfn0,cfn1,cfn2,ifn) { //cfn = choice funtion; ifn = installation function
  this.setFromTraceArray(n,[tr0,tr1,tr2],[cfn0,cfn1,cfn2],ifn);
 }

rs.upCfn = function (i,j) {
  return j;
}

rs.downCfn = function (i,j) {
  let {numRows} = this;
  return numRows-j;
}
rs.toLeftCfn = function (i,j) {
  return i;
}
rs.toRightCfn = function (i,j) {
  let {numCols} = this;
  return numCols - i;
}


rs.timeStep = () => {};


export {rs}