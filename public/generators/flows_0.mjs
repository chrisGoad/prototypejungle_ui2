import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPathMethods} from '/mlib/path.mjs';	


let rs = basicP.instantiate();
addPathMethods(rs);

rs.setName('flows_0');


rs.pstate = {pspace:{},cstate:{}};


 



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

rs.setFrom3Traces = function (n,tr0,tr1,tr2,cfn0,cfn1,cfn2,ifn) { //cfn = choice funtion; ifn = installation function
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