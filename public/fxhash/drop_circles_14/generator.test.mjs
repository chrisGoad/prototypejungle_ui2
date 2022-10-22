debugger;
console.log('importing part2_0.mjs');
//F {rs as generatorP} from './generators/part2_0.mjs';

let rs = function (mods,item) {
let {linePP,circlePP,rectanglePP,polygonPP,textPP} = mods;
item.initialize = function () {
  let lineP = this.lineP = linePP.instantiate();
  lineP.stroke = 'blue';
  lineP['stroke-width'] = 1;
  let line = lineP.instantiate();
  line.setEnds(Point.mk(0,0),Point.mk(100,100));
  this.set('line',line);
  
  
   let circleP = this.circleP = circlePP.instantiate();
  circleP.stroke = 'green';
  circleP['stroke-width'] = 1;
  let circle = circleP.instantiate();
  circle.dimension = 100;
  this.set('circle',circle);
  
  
   let txtP = this.txtP = textPP.instantiate();
   txtP.stroke = 'white';
  let txt = txtP.instantiate();
  txt.text = 'Hello';
  this.set('txt',txt);
  
  
   let rectangleP = this.rectangleP = rectanglePP.instantiate();
  rectangleP.stroke = 'green';
  rectangleP['stroke-width'] = 1;
  let rectangle = rectangleP.instantiate();
  rectangle.width= 70;
  rectangle.height= 100;
  this.set('rectangle',rectangle);
  
   let polygonP = this.polygonP = polygonPP.instantiate();
  polygonP.stroke = 'red';
  polygonP['stroke-width'] = 1;
  let polygon = polygonP.instantiate();
  polygon.corners = [Point.mk(-100,0),Point.mk(0,100),Point.mk(100,0)];
  this.set('polygon',polygon);
  
}
}
export {rs};


