const rs = {};

rs.applY = function (v) {
  let f = this.f;
  let ov = f(v);
  return ov;
}

rs.mkStraight = function (p0,p1) {
   let vec = p1.difference(p0);
   let ln = vec.length();
   let nvec = vec.times(1/ln);
   let f = (v) => p0.plus(nvec.times(v*ln));
   let ov = Object.create(this);
   ov.f = f;
   return ov;
 }
 
 rs.randomPoint = function () {
  let rv = Math.random();
  let f = this.f;
  let ov = f(rv);
  return ov;
}

export {rs};      
