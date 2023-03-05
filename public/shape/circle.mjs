// circle

let rs =  svg.Element.mk('<circle/>');

/* adjustable parameters */
rs.dimension = 30;  
rs.fill = 'transparent';
rs.stroke = 'black';
rs['stroke-width']  = 1;
rs.shape_name = 'circle';
/* end adjustable parameters */

// r can also be used for radius
Object.defineProperty(rs,'r',{get() {return 0.5 * this.dimension},set(x) {this.dimension = 2 * x;}});
Object.defineProperty(rs,'radius',{get() {return 0.5 * this.dimension},set(x) {this.dimension = 2 * x;}});
ui.hide(rs,['r']);

rs.role = 'spot';
rs.resizable = true;
rs.setDimension = function (dim) {
 this.dimension = dim;
}
rs.getDimension = function () {
  return this.dimension;
}


rs.setDomAtts = function () {
  this.setDomAttribute('r',0.5*this.dimension);
  this.setDomAttribute('fill',this.fill);
  this.setDomAttribute('visibility',this.visibility);
  if (this.center) {
    let {x,y} = this.center;
    this.setDomAttribute('cx',x);
    this.setDomAttribute('cy',y);
  }

}

rs.update =  function () {
  this.setDomAtts();
}

// used to compute where connections (eg arrows) terminate on this shape's periphery
graph.installCirclePeripheryOps(rs);

rs.transferState = function (src,own) { //own = consider only the own properties of src
  debugger;
  core.setProperties(this,src,ui.stdTransferredProperties,own);
}

export {rs};


