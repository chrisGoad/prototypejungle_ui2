
const saveItem = function (path,itm,dbval,cb) {
  let metadata = fb.jsonMetadata;
  core.beforeSaveStateHooks.forEach((fn) => {fn();});
  let str = core.stringify(itm);
  core.log("save","DOING THE SAVE");
  fb.saveString(path,str,metadata,dbval,cb);
}


const saveHistory = function (path,dbval,cb) {
  let metadata = fb.jsonMetadata;
  let str = JSON.stringify(core.encodeHistory());
  core.log("save","DOING THE SAVE");
  fb.saveString(path,str,metadata,dbval,cb);
}
const saveJson = function (path,str,cb) {
	debugger;
	core.httpPost('www/'+path,str,cb);
 //fb.saveString(path,str,fb.jsonMetadata,undefined,cb);
}

const saveJavascript = function (path,str,cb) {
  fb.saveString(path,str,fb.javascriptMetadata,undefined,cb);
}


const saveText = function (path,str,cb) {
  fb.saveString(path,str,fb.txtMetadata,undefined,cb);
}


const saveSvg = function (path,cb) {
  let str,note,metadata;
  metadata = fb.svgMetadata;
  str = dom.svgMain.svgString(400,40);
  if  (dom.vars.imageFound) {
    note = "imageFound,"+core.nDigits(dom.vars.svgAspectRatio,3);
  }
  core.log("save","DOING THE SAVE");
  fb.saveString(path,str,metadata,note,cb);
}

export {saveItem,saveHistory,saveSvg,saveJson,saveJavascript,saveText};
