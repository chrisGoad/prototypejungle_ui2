
let rs = function(line) {

line.shape_name = 'line';
debugger;


line.setEnds = function (p0,p1) {
  debugger;
  this.setPointProperty('end0',p0);
  this.setPointProperty('end1',p1);
}

line.setDomAtts = function () {
  let e0 = this.end0;
  let e1 = this.end1;
  this.setDomAttribute('x1',e0.x);
  this.setDomAttribute('y1',e0.y);
  this.setDomAttribute('x2',e1.x);
  this.setDomAttribute('y2',e1.y);
}


line.update = function () {
  this.setDomAtts(this.__element);
  if (this.text  && this.__parent.updateText) {
    this.__parent.updateText(this.text);
   }
}
}
export {rs};

