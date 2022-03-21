const rs = function (rs) {


rs.mkSphereParams = function () {
	let wd = this.width;
  return {sphereCenter:Point3d.mk(0,0,-0.3*wd),sphereDiameter:0.5*wd,focalPoint:Point3d.mk(0,0,wd),focalLength:10,cameraScaling:1000};
}
/*rs.initProtos = function () {
	debugger;
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
  circleP.fill = 'transparent';
  circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  
*/
rs.genSegments = function (p) {
	//debugger;
	//console.log('px',p.x);
	rd = 20;
	//rd = 200;
	let gcrc = geom.Circle.mk(p,rd);
	let scrc = this.circleP.instantiate();
	scrc.dimension = 2*rd;
	//scrc.show();
	//scrc.fill = 'red';
	//scrc.moveto(p);
	return [gcrc,scrc];
}
 
 
rs.toPoint3d = function (p) {
	let {sphereCenter,sphereDiameter} = this;
	if (!p.to3d) {
	  debugger;
	}
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		//debugger;
		let v = p3d.difference(sphereCenter).normalize();
	  let sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		return sp;
	}  else {
		return p3d;
	}
	//return undefined;
	
}

/*
rs.genPoint3d = function (i,j) {
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let sp;
//	let p = Point.mk(i-numRows/2,j-numCols/2);
	let p = Point.mk(deltaX*(i-numCols/2),deltaY*(j-numRows/2));

	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		return sp;
	} else {
		return p.to3d();
	}
}
*/
rs.genPoint3d = function (i,j) {
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let p = Point.mk(deltaX*(i-numCols/2),deltaY*(j-numRows/2));
	let p3d = this.toPoint3d(p);
	return p3d;
}




rs.to3dAndBack = function (cell,p) {
	let {camera} = this;
	//let p3d = this.toPoint3d(cell,p);
	let p3d = this.toPoint3d(p);
	if (p3d) {
		let rs = camera.project(p3d);
		return rs;
	}
	return null;
}

rs.pointsTo3dAndBack = function (pnts) {
	let rs = [];
	pnts.forEach((p) => {
		let p3d = this.toPoint3d(p);
		if (p3d && (p3d.category === 'onSphere')) {
			let ppnt = this.camera.project(p3d);
			rs.push(ppnt);
		} 
	});
	return rs;
}

return rs;

 }
 
 export {rs};

