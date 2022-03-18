//active

import {rs as rectPP} from '/shape/rectangle.mjs';
//import {rs as rectPP} from '/shape/rectangle.js','/shape/textOneLine.js',function (rectPP,textPP) {
import {rs as textPP} from '/shape/textOneLine.mjs';
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;a
const rs = function (item) {

item.setName = function (name,variant,jsonName) {
  debugger;
  let nameWithV = name+(variant?'_v_'+variant:'');
  let nameWithoutV= name;
	let theName = this.name = nameWithV+(this.signIt?'_s':'');
  this.variant = variant;
	core.vars.whereToSave = theName;
	//let theName = jsonName?jsonName:name+(variant?'_v_'+variant:'');
	let pathPart = jsonName?jsonName:nameWithV;
	this.path = `json/${pathPart}.json`;
}


item.signIt = 0;

item.addSignature = function() {
	let {width,height,sigScale,vSigScale,sigColor='white',sigX=0.45,sigY,sigRectX,sigRectY,backStripeWidth:bkw,backStripeHeight:bkh,backStripePadding:bkp} = this;
	debugger;
    
  this.textP = textPP.instantiate();
	if (!bkw) {
    if (!bkp) {
      console.log("Error: either backStripeWidth of backStripePadding need to be specified for a signature");
      debugger;
      return;
    }
		bkw = width + bkp;
		bkh = height + bkp;
	}
  let square = width === height;
  let vertical = bkh > 1.4* bkw;
  if (!sigY) {
    sigY = square?(vertical?0.27:0.45):.45;
  }
  if (!sigScale) {
    sigScale = (bkw === bkh)?bkw/700:bkw/1000;
  }
  if (!vSigScale) {
    vSigScale = bkh/1000;
  }
	let sigC = this.set('sigC',svg.Element.mk('<g/>'));
/*	if (sigRectX) {
	  let sigR = sigC.set('sigR', this.sigRectP.instantiate());
	  sigR.show();
		sigR.width = 0.05*width;
	  sigR.height = 0.05*width;
	}*/
	let sig = sigC.set('sig',this.textP.instantiate())
	sig.show();
	sig.text = 'C.G.';
	sigC.moveto(Point.mk(sigX*bkw,sigY*bkh));
	sig.stroke = sigColor;
	sig['font-family'] = 'Trattatello';
	sig['font'] = 'fantasy';
	//sig['font-size'] = "30"	;
	sig.setScale(vertical?vSigScale:sigScale);
}

// add a stripe around the image, to control the size of the jpg when saved
item.addBackStripe = function () {
	debugger;
	let {backStripeColor:bkc,backStripePadding:bkp,backStripePaddingX:bkpx,backStripePaddingy:bkpy, 
	backStripeWidth,backStripeHeight,width,height,backStripeVisible,backStripePos:pos,signIt} =  this;
	if ((!bkc) && (!bkp) && (!backStripeWidth)) {
		return;
	}
  if (!bkc) {
    bkc = 'rgb(2,2,2)';
  }
	//core.assignPrototypes(this,'backStripeRectP',rectPP);
	/*this.backStripeRectP = rectPP.instantiate();
	this.backStripeRectP['stroke-width'] = 1;
	this.backStripeRectP.fill = 'transparent';*/
  //let bkr = this.set('brect',this.backStripeRectP.instantiate());
  let bkr = this.set('brect',rectPP.instantiate());
  bkr.fill = 'transparent';
	if (backStripeVisible) {
		bkr['stroke-width'] = backStripeVisible;
		bkr.stroke = 'white';
	} else {
	  bkr.stroke = bkc;
	}
	if (backStripeWidth) {
		bkr.width = backStripeWidth;
		bkr.height = backStripeHeight;
	} else {
		let bkPx = bkpx?bkpx:(bkp?bkp:0.1*width);
		let bkPy = bkpy?bkpy:(bkp?bkp:0.1*height);
		bkr.width = width + bkPx;
		//bkr.width = 20;
		bkr.height = height + bkPy;
		//bkr.height = 10;
	}
	if (pos) {
    console.log('Stripe Pos',pos.x,pos.y);
		bkr.moveto(pos);
	}
  //bkr.width = backStripeWidth?backStripeWidth:width + backStripePadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
  bkr.update();
	bkr.show();
  if (signIt) {
     this.addSignature();
  }
}


item.addBackground = function () {
	let {backgroundColor:bkc,width,height,backgroundPadding:bkp=0} =  this;
  debugger;
	if (!bkc) {
		return;
	}
	//core.assignPrototypes(this,'backgroundRectP',rectPP);
  this.backgroundRectP = rectPP.instantiate();

	this.backgroundRectP['stroke-width'] = 0;
	this.backgroundRectP.fill = bkc;
	//let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
  let bkr = this.set('backRect',this.backgroundRectP.instantiate());
  bkr.width = width+bkp;
	bkr.height = height+bkp;
  //bkr.width = backgroundWidth?backgroundWidth:width + backgroundPadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
	
}


item.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}


item.genLine = function (sg,lineP,ext=0) {
  let {end0,end1} = sg;
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
	let theLineP = lineP?lineP:this.lineP;
	
  let line = theLineP.instantiate();
  line.setEnds(end0,end1);
  return line;
}


item.installLine = function (line) {
  let lines =  this.lines;
	if (!lines) {
		lines = this.lines =this.set('lines',core.ArrayNode.mk());
	}
  lines.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}

item.initBasis = function () {
	if (this.initProtos) {
	  this.initProtos();
	}
	this.addBackground();
	this.addBackStripe();
//  this.set('shapes',core.ArrayNode.mk());

}

// a utility
const numPowers = function(n,p) {
	if (n === 0) {
		return 0;
	}
	if (n === p) { 
	  return 1;
	}
	if (n%p === 0) {
		return 1 + numPowers(n/p,p);
	}
	return 0;
}
item.numPowers = function (n,p) {
	return numPowers(n,p);
}
//cells and coordinates, based on width,height,numRows, numCols

item.point2cell = function (p) {
    let {width,height,numRows,numCols} = this;
    let {x,y} = p;
    let hw = 0.5*width;
    let hh = 0.5*height;
    let cx = Math.floor((x -hw)/numCols);
    let cy = Math.floor((y -hh)/numRows);
    return {x:cx,y:cy};
}



item.assignValueToPath = function (path,value) {
  let spath = path.split('/');
	let ln = spath.length;
	let cvl = this;
	for (let i=0;i<ln-1;i++) {
		let pel = spath[i];
		let nvl = cvl[pel];
		if (!nvl) {
			nvl = {};
			cvl[pel] = nvl;
		}
		cvl = nvl;
	}
	let lst = spath[ln-1];
	//if (cvl[lst] === undefined) {
	  cvl[lst] = value;
	//}
}
	
item.assignValues = function (vls) {
	vls.forEach( (vl) => {
		let [path,value] = vl;
		this.assignValueToPath(path,value);
	});
}
		
item.getTheState = function (cb) {
  let {path} = this;
  debugger;
  core.httpGet(path, (error,json) => {
    debugger;
    let state = JSON.parse(json);
    this.assignValues(state);
//    this.initializeGrid();
    if (cb) {
      cb();
    }
  });
}

item.saveTheState = function (cb) {
  let {path} = this;
  debugger;
  let state = this.computeState?this.computeState():null;
  if (state) {
    let jsn = JSON.stringify(state);
    core.saveJson(path,jsn,function (err,rs) {
      if (cb) {
        cb();
      } else {
        debugger;
      }
    });
  }
}

item.horizontalize = function (p,noFrame) {
  if (p.width) {
    this.height = p.width;
    this.width = p.height;
  }
  this.backStripeWidth = p.backStripeHeight;
  this.backStripeHeight = p.backStripeWidth;
  if (noFrame) {
    this.backStripeVisible =0;
  }
  debugger;
}

}
export {rs};
 
