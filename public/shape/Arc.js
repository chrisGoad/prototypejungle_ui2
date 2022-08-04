core.require('/line/utils.js',function (utils) {

let item = svg.Element.mk('<path/>');


item.end0 = Point.mk(-10,0);
item.end0 = Point.mk(10,0);
item.end1 = undefined;
item.radius = 100;
item.stroke = "black";
item.fill = "transparent";
item['stroke-width'] = 1;
item.sweep = 1;


utils.setup(item);

item.setEnds = function (e0,e1) {
  utils.setEnds(this,e0,e1);
}
item.update = function () {
  const p2str = function (point) {
    return `${core.nDigits(point.x,5)} ${core.nDigits(point.y,5)}`;
  }
  let {end0,end1,radius,sweep} = this;
  let vec = end1.difference(end0);
  let mid = end0.plus(vec.times(0.5));
  let nvec = vec.normalize();
  let center = mid.plus(nvec.times(radius));
  let d = `M ${p2str(end0)} A ${radius} ${radius} 0 0 ${sweep} ${p2str(end1)}`;
  this.d = d;
}

  
  
  


item.controlPoints = function () {
  return utils.controlPoints(this);
}

item.updateControlPoint = function (idx,rpos) {
   utils.updateControlPoint(this,idx,rpos);
}

ui.hide(item,['end0','end1','d']);

return item;
});

