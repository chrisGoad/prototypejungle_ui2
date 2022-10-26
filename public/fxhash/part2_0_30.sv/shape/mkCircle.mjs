// circle
let rs = function(circle) {


/* adjustable parameters */
circle.dimension = 30;  
circle.fill = 'transparent';
circle.stroke = 'black';
circle['stroke-width']  = 1;
circle.shape_name = 'circle';
/* end adjustable parameters */

// r can also be used for radius
Object.defineProperty(circle,'r',{get() {return 0.5 * this.dimension},set(x) {this.dimension = 2 * x;}});
Object.defineProperty(circle,'radius',{get() {return 0.5 * this.dimension},set(x) {this.dimension = 2 * x;}});

circle.role = 'spot';
circle.resizable = true;
circle.setDimension = function (dim) {
 this.dimension = dim;
}
circle.getDimension = function () {
  return this.dimension;
}


circle.update =  () => {};
}
export {rs};


