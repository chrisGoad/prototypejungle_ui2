

let rs = function (item) {


item.pstate = {pspace:{},cstate:{}};

item.adjustQuadrantGon = function (qg,dim,ul,ur,ll,lr) { 
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


item.mkQuadrantGon = function (dim,iul,iur,ill,ilr) {
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
 


item.setFromTrace = function (t,tr,cfn,ifn) { //cfn = choice funtion; ifn = installation function
  let {numRows,numCols} = this;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let idx = cfn.call(this,i,j);
      let vm = tr[t+idx];
      let v = vm?vm.value:0;
      ifn.call(this,v,t,i,j);
    }
  }
}


item.setFromTraceArray= function (t,traces,choiceFunctions,ifn) { //ifn = installation function
 // debugger;
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
        let v = valueOf(tr,t+idx);
        va.push(v);
      }
      ifn.call(this,va,t,i,j);
    }
  }
}

item.upCfn = function (i,j) {
  return j;
}

item.downCfn = function (i,j) {
  let {numRows} = this;
  return numRows-j;
}
item.toLeftCfn = function (i,j) {
  return i;
}
item.toRightCfn = function (i,j) {
  let {numCols} = this;
  return numCols - i;
}


item.timeStep = () => {};
}

export {rs}