let mouseHistory = [];
let nowRecording = false;
let nowPlayingHistory = false;
let theTransform;
const recording = function (v=true) {
  nowRecording = v;
}

const addToHistory = function (kind,coords,ovr) {
    let d = new Date();
    let tm = d.getTime();
    let ovrPath = core.stringPathOf(ovr,core.root);
    let frame = [kind,coords,ovrPath,tm];
    mouseHistory.push(frame);
}

const addCursor = function () {
	debugger;
  if (core.root.cursor) {
    return;
  }
  let c = svg.Element.mk('<polyline stroke="black" stroke-width="0.2" fill="white" />');//<circle  r="2" stroke="green" stroke-width="0.2" fill="white" />');
  let points = '';const addPoint = function (x,y,eol) {
    points += x+','+y+eol;
  }
  let sc = 0.7;
  let w = sc*3;
  let h = sc*5;
  let offh = sc*7.5;
  addPoint(0.2*w,offh -1.5*h,',');
  addPoint(0.2*w,offh +0.3*h,',');
  addPoint(0.9*w,offh-0.3*h,',');
  addPoint(1.2*w,offh+0.2*h,',');// end
  addPoint(1.57*w,offh+0.13*h,',');
  addPoint(1.3*w,offh-0.35*h,',');
  addPoint(2.36*w,offh-0.35*h,',');
  addPoint(0.2*w,offh-1.5*h,'');
  c.points = points;
  core.root.set('cursor',c);
}

const playFrame = function (frame) {
  addCursor();
  let kind = frame[0];
  let cp = frame[1];
  let ovr = frame[2];
  let ovrNode;
  if (ovr) {
     ovrNode = core.evalPath(ovr);
  }
  let svgroot = dom.svgMain;
  nowPlayingHistory = true;
  let xf = theTransform?theTransform:svgroot.contents.transform;
  let cpnt =  xf.applyInverse(cp);
  core.root.cursor.moveto(cpnt);
  switch (kind) {
    case "down":
      mouseDown(svgroot,frame[1],ovrNode);
      break;
    case "move":
      mouseMove(svgroot,frame[1],ovrNode);
      break;
    case "up":
      mouseUpOrOut(svgroot,frame[1],true);
  }
 // nowPlayingHistory = false;
}

let frameNumber = 0;
let theHistory;
let frameInterval = 60;
let  frameCount;
const playNextFrame = function (cb) {
  if (frameNumber < frameCount) {
    let frame =  theHistory[frameNumber++];
    playFrame(frame);
    window.setTimeout(function () {playNextFrame(cb)},frameInterval);
  } else if (cb) {
   nowPlayingHistory = false;
    cb();
  }
}

// moves less than trimConst milliseconds apart are discarded
let trimConst = 40;
const trimMoves = function (history) {
  let rs = [];
  let ctm = 0;
  history.forEach(function (frame) {
    if (frame[0] !== 'move') {
      rs.push(frame);
      ctm = 0;
      return;
    }
    let ftm = frame[3];
    if ((ftm - ctm) > trimConst) {
      rs.push(frame);
      ctm = ftm;
    }
  })
  return rs;
}


const playHistory = function (cb) {
  if (nowPlayingHistory) {
     return;
  }
  if (!theHistory) {
    theHistory = mouseHistory;
    core.log('history','frames before trim',theHistory.length);
   theHistory = trimMoves(theHistory);
   core.log('history','frames after trim',theHistory.length);
  }
  frameCount = theHistory.length;
  frameNumber = 0;
  nowPlayingHistory = true;
  window.setTimeout(function () {playNextFrame(cb);},2000);
}

const saveHistory = function (num=0) {
  recording(false);  
  let path = `/forMainPage/history${num}.json`;
  theHistory = mouseHistory;
  core.log('history','frames before trim',theHistory.length);
  theHistory = trimMoves(theHistory);
  core.log('history','frames after trim',theHistory.length);
  let xf = dom.svgMain.contents.transform;
  let toSave = {history:theHistory,scale:xf.scale,translationX:xf.translation.x,translationY:xf.translation.y}
  let str = JSON.stringify(toSave);
  fb.saveString(path,str,fb.jsonMetadata,undefined,function () {alert('save done');});
}

const restoreHistory = function (inum,cb,startFramesToOmit,endFramesToOmit) {
 let path = `(sys)/forMainPage/history${inum?inum:0}.json`;
 theHistory = undefined;
 core.httpGetForInstall(path,function (err,rs)  {
    let rst = JSON.parse(rs);
    theHistory = rst.history;
    let ln = theHistory.length;
    if (startFramesToOmit && endFramesToOmit) {
       theHistory = theHistory.slice(startFramesToOmit,ln-endFramesToOmit);
    }
    let trPoint = geom.Point.mk(rst.translationX,rst.translationY);
    theTransform = geom.Transform.mk({scale:rst.scale,translation:trPoint})
    theHistory.forEach(function (frame) {
      let p = frame[1];
      let pnt = geom.Point.mk(p.x,p.y);
      frame[1] =pnt;
    });
    playHistory(cb);
  });
}
export {recording,mouseHistory,theHistory,frameInterval,
        nowPlayingHistory,playHistory,saveHistory,restoreHistory,addCursor};

/* how to use

ui.recording(true);

// do some stuff

ui.saveHistory(<num>);
ui.playHistory(<num>);

ui.saveHistory(4);
*/

 