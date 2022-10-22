//polygon
let rs = function(pgon) {


pgon.shape_name = 'polygon';

/* adjustable parameters */
pgon.fill = "transparent";
pgon.stroke = "red";
pgon['stroke-width'] = 1;

pgon.role = 'spot';
pgon.corners = [];

pgon.update = function () {
	let {corners} = this;
	let ln = corners.length;
	if (!ln) {
		return;
	}
  let p2str = function (point,after) {
    return point.x+' '+point.y+after;
  };
	let path = '';
	for (let i=0;i<=ln;i++) {
		let corner = (i===ln)?corners[0]:corners[i];
		let pstr = p2str(corner,' ');
		path += pstr;
	}
  this.points = path;
}
}
export {rs};

