//This code implements the rectangle shape

let rs = function(rect) {

rect.shape_name = 'rectangle';



/* adjustable parameters */
rect.width = 50;
rect.height = 35;
rect.fill = 'transparent';
rect.stroke = 'black';
rect['stroke-width'] = 1;
/*end adjustable parameters*/

rect.update =  function () {
  this.setDomAttribute('x',-0.5*this.width);
  this.setDomAttribute('y',-0.5*this.height);
}
}
export {rs};
