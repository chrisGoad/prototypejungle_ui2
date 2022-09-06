//core.require(function () {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;
 // return function (item) {

const rs = function (item) {
/*
item.setName = function (name,jsonName) {
	this.name = name;
	core.vars.whereToSave = name;
	let theName = jsonName?jsonName:name;
	this.path = `json/${theName}.json`;
}*/
 /*
item.shapeTimeStep  = function() {
	let {numRows,numCols,shapes} = this;
	for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
			let cnt = this.centerPnt(i,j);
      let idx = i*numRows + j;
			let rvs = this.randomValuesAtCell(randomGridsForShapes,i,j);
			let cell = {x:i,y:j,index:idx};
			let shp = this.shapeGenerator(rvs,cell,cnt);
	*/

item.breakAtStep = -1;

item.animateIt = function (numFrames,interval,resume,ssaf=0) { // ssaf start saving at frame
 // let numFrames = 10;
    //svgMain.draw();
	let {everyNthFrame,breakAtStep,frameNumber} = this;
//	let everyNthFrame = this.everyNthFrame;
	let animationUnderway = 0;
	if (resume) {
	  animationUnderway = animationUnderway?animationUnderway:0;
	}
	this.animationUnderway = 1;
	let nfr,frameCount;
	if (!animationUnderway) {
		nfr = 0;
		this.timeStep = 0;
		frameNumber = this.frameNumber = 0;
		
	} else {
		//frameNumber = this.frameNumber;
		nfr = timeStep;
	}
	this.paused = false;
	//let interval = 500;
  //dom.svgDraw();
  const doStep = () => {
		if (this.paused) {
			return;
		}
		console.log('timeStepp',nfr,' frameNumber ',frameNumber,'ssaf',ssaf); 
		if (nfr === breakAtStep) {
			this.paused = true;
			return;
			debugger;
		}
		if (nfr === numFrames) {
			alert('Animation done. Numframes = '+numFrames);
			return;
		}
		this.timeStep = nfr;
		frameNumber++;
		this.frameNumber = frameNumber;
		this.step();
		dom.svgDraw();	
  //  debugger;
		if (this.saveVideo && (frameNumber >= ssaf)) {
			if ((!everyNthFrame) || (frameNumber%everyNthFrame === 0)) {
		    draw.saveFrame(everyNthFrame?frameNumber/everyNthFrame:frameNumber-ssaf);
			}
		}
		nfr++;

		setTimeout(doStep,interval);
  }
//  debugger;
	this.step();//new
  if (this.saveVideo) {
		draw.saveFrame(frameNumber);
	}
  setTimeout(doStep,interval);
}

item.oneStepp = function (save) {
 // let numFrames = 10;
    //svgMain.draw();
		//debugger;
		let everyNthFrame = this.everyNthFrame;
    let nfr = this.timeStep;
		nfr++;
		if (nfr >= this.frameCount) {
			console.log('Done at frame ',nfr);
			return;
		}
		console.log('timeStep ',nfr,' frameNumber ',this.frameNumber); 
		this.timeStep = nfr;

		this.step();
		dom.svgDraw();
		if (save && this.saveVideo) {
			let fr = this.frameNumber++;
			if ((!everyNthFrame) || (fr%everyNthFrame === 0)) {
		    draw.saveFrame(everyNthFrame?fr/everyNthFrame:fr);
			}
	  }
}

item.repeatFrame = function (n) {
 // let numFrames = 10;
    //svgMain.draw();
		frameNumber = this.frameNumber;
		if (!this.saveVideo) {
			alert('not saving video');
			return;
		}
		let  {numFramesToRepeat} = this;
		if (!numFramesToRepeat) {
			numFramesToRepeat = 1;
		}
	  dom.svgDraw();
    alert('repeating this frame '+numFramesToRepeat+' times ');
		for (let i=0;i<numFramesToRepeat;i++) {
		  draw.saveFrame(frameNumber++);
	  }
		this.frameNumber = frameNumber;
}


item.pauseAnimation = function () {
	this.paused = true;
}
// faint box - otherwise ffmpeg gets confused

item.addBox = function (lineP,ipadding,istrokeWidth,icolor) {
	//debugger;
	let {width,height} = this;
	let padding = ipadding?ipadding:0;
	let strokeWd = istrokeWidth?istrokeWidth:1;
	let color = icolor?icolor:'rgba(255,255,255,.2)';
	let hw = padding + 0.5*width;
	let hh = padding + 0.5*height;
	let ul = Point.mk(-hw,-hh);
	let ur = Point.mk(hw,-hh);
	let lr = Point.mk(hw,hh);
	let ll = Point.mk(-hw,hh);
	let line0 = this.lineP.instantiate();
	let line1 = this.lineP.instantiate();
	let line2 = this.lineP.instantiate();
	let line3 = this.lineP.instantiate();
	let lines = [line0,line1,line2,line3];
	let points = [ul,ur,lr,ll,ul];
  for (let i=0;i<4;i++) {
		let line = lines[i];
		line.stroke = color;
		line['stroke-width'] = strokeWd;
		this.set('line'+i,line);
		line.setEnds(points[i],points[i+1]);
		line.show();
		line.update();
	}
	return;
}


}
export {rs};



 
