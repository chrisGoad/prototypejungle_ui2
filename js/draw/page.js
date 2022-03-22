//okok

/*global setClickFunction enableButtons enableButton enableButton1 disableButton activateTreeClimbButtons enableTreeClimbButtons
afterYes setYesNoText ownedFilePath initFsel insertOwn :true*/
/* begin section: build and layout the page */
let includeTest = false;
let treePadding = 0;
let bkColor = "white";
let saveCatalog,theConfig,theCatalogs;

let actionPanel,actionPanelMessage,actionPanelButton,actionPanelCommon,actionPanelCustom,kitRootBut;
let uiDiv,topbarDiv,deleteBut,editTextBut,addImageBut,cloneBut,openDataInTextEditorBut,redoBut,dragButtons;
let separateBut,moveToBackBut,plusDimBut,minusDimBut,plusdimBut,minusdimBut,animateBut,toggleConnectBut,showCohortBut,doneCloningBut,insertContainer,insertDiv,dragMessage,catalogState;
let moveUpBut, insertCols,insertButs,moveDownBut,saveOrderBut;
let tabContainer,insertDivCol1,insertDivCol2,includeDoc,replaceProtoMode,fromItem;
let resizable;
//let treeVars = tree.vars;
let uiWidth;
let panelMode = 'chain'; // mode of the right panel view; one of 'chain' (view the prototype chains); 'proto','insert','code'
 // the page structure
let actionDiv,cols,fileBut,undoBut,unwrapBut,insertBut,replaceBut,insertTab;
let replaceProtoBut,dataBut,gridBut,fileDisplay,noteDiv,svgDiv;//,protoContainer;
let messageElement,ctopDiv,noteSpan,saveBut,saveMpixBut,runBut,resumeBut,saveAnimationBut,pauseBut,stepBut,stepNoSaveBut,repeatFrameBut,upBut,downBut,topBut,svgMessageDiv;
let dataMessage,JSONMessage,rebuildFromDataBut,changeDataSourceBut,saveDataBut,testBut,saveDataAsBut,checkJSONBut,runningSpan,dataButtons,dataDiv,dataContainer,advancedButs;
let includeActionPanel = false;

let numCatalogHeaderLines = 2;
const closerStyle = 'position:absolute;padding:3px;cursor:pointer;background-color:red;'+
         'font-weight:bold,border:thin solid black;font-size:12pt;color:black';
         
const closer = html.Element.mk('<div style="right:0px;'+closerStyle+'">X</div>');
   
const docClose = html.Element.mk('<div style="right:0px;'+closerStyle+'">X</div>');// right:20 for scroll bar

const docIframe = html.Element.mk('<iframe width="98%" height="98%" id="doc" />');
const docDiv = html.Element.mk('<div id="docDiv" style="position:absolute;width:100%;height:100%;background-color:white;border:solid thin green;display:inline-block"/>').__addChildren([
  docClose,
  docIframe
]);

let mpg;
const buildPage = function () {
	//debugger;
saveBut = document.getElementById('saveButton');
saveMpixBut = document.getElementById('saveMpixButton');
runBut = document.getElementById('runButton');
resumeBut = document.getElementById('resumeButton');
saveAnimationBut = document.getElementById('saveAnimationButton');
pauseBut = document.getElementById('pauseButton');
stepBut = document.getElementById('stepButton');
stepNoSaveBut = document.getElementById('stepNoSaveButton');
repeatFrameBut = document.getElementById('repeatFrameButton');
//saveBut.addEventListener("click", () => {alert(23);});
saveBut.addEventListener("click", () => saveTheImage(0));
saveMpixBut.addEventListener("click", () => saveTheImage(1));
runBut.addEventListener("click", runAnimation);
resumeBut.addEventListener("click", resumeAnimation);
saveAnimationBut.addEventListener("click", saveAnimation);
pauseBut.addEventListener("click", pauseAnimation);
stepBut.addEventListener("click", stepAnimation);
stepNoSaveBut.addEventListener("click", turnOnAudio);
//stepNoSaveBut.addEventListener("click", stepNoSaveAnimation);
repeatFrameBut.addEventListener("click", repeatFrame);

mpg =  html.wrap("main",'div',{style:{position:"absolute","margin":"0px",padding:"0px",display:"none"}}).
__addChildren([
  topbarDiv = html.wrap('topbar','div',{style:{position:"absolute",height:"10px",left:"0px","background-color":bkColor,margin:"0px",padding:"0px"}}).
  __addChildren([
 /* actionDiv =  html.Element.mk('<div id="action" style="position:absolute;margin:0px;overflow:none;padding:5px;height:20px"/>').
  __addChildren([
      fileBut = html.Element.mk('<div class="ubutton">File</div>'),
      undoBut = html.Element.mk('<div  class="ubutton">Undo</div>'),
      redoBut = swapMachine?null:html.Element.mk('<div class="ubutton">Redo</div>'),
      unwrapBut = html.Element.mk('<div class="ubutton">Unwrap</div>'),
      testBut = includeTest?html.Element.mk('<div class="ubutton">Test</div>'):null, 
    //  replaceBut = html.Element.mk('<div class="ubutton">Swap</div>'),
    //  replaceProtoBut = html.Element.mk('<div class="ubutton">Swap Prototype</div>'),
      dataBut = swapMachine?null:html.Element.mk('<div style="display:nonee" class="ubutton">Data</div>'),
      gridBut = swapMachine?null:html.Element.mk('<div style="display:none" class="ubutton">Activate Grid</div>'),
      fileDisplay = html.Element.mk('<span style="font-size:11pt;padding-left:40px"></span>'),
      messageElement = html.Element.mk('<span id="messageElement" style="overflow:none;padding:5px;height:20px"></span>'),
      ui.vars.imageElement = html.Element.mk('<img style="display:none;"/>')
    ])*/
    ctopDiv = html.wrap('topbarInner','div',{style:{float:"right"}})
  ]),

  cols = html.Element.mk('<div id="columns" style="left:0px;position:relative"/>').
  __addChildren([
    
    
    
    docDiv,
    /* actionPanel = actionPanel = html.Element.mk('<div id="actionPanel"  draggable="true" style="background-color:white;border:solid thin black;position:absolute;height:400px;width:600px;display:inline-block"></div>').__addChildren([
        html.Element.mk('<div style="border:solid thin black;"></div>').__addChildren([
        actionPanelMessage = html.Element.mk('<div style="margin:10px;width:80%;padding-right:10px">Nothing is selected</div>'),
        actionPanelButton = html.Element.mk('<div class="colUbutton"></div>')
       ]),
       actionPanelCommon = html.Element.mk('<div style="margin:0;width:100%"></div>').__addChildren([
          kitRootBut = html.Element.mk('<div class="colUbutton left">Select Kit Root</div>'),
          deleteBut = html.Element.mk('<div class="colUbutton left">Delete</div>'),
          editTextBut = html.Element.mk('<div class="colUbutton left">Edit Text</div>'),
          addImageBut = html.Element.mk('<div class="colUbutton left">Add Image</div>'),
         cloneBut= html.Element.mk('<div class="colUbutton left">Copy</div>'),
          showCohortBut = html.Element.mk('<div  class="colUbutton left">Show Cohort</div>'),
          separateBut= html.Element.mk('<div class="colUbutton left">Separate</div>'),
          moveToBackBut= html.Element.mk('<div class="colUbutton left">Move to Back</div>'),
          plusDimBut= html.Element.mk('<div class="colUbutton left">+big Dim</div>'),
          minusDimBut= html.Element.mk('<div class="colUbutton left">-big Dim</div>'),
          plusdimBut= html.Element.mk('<div class="colUbutton left">+small Dim</div>'),
          minusdimBut= html.Element.mk('<div class="colUbutton left">-small Dim</div>'),
         // animateBut= html.Element.mk('<div class="colUbutton left">Animate</div>'),
       
          toggleConnectBut= html.Element.mk('<div class="colUbutton left">Disable Connections</div>'),

           ]),
       actionPanelCustom= html.Element.mk('<div style="float:left;margin:0;width:100%"></div>')
     ]),*/
   
    svgDiv = html.Element.mk('<div id="svgDiv" draggable="true" style="position:absolute;height:400px;width:600px;background-color:white;border:solid thin black;display:inline-block"/>').
    __addChildren([
      noteDiv = html.Element.mk('<div style="font:10pt arial;background-color:white;position:absolute;top:0px;left:90px;padding-left:4px;border:solid thin black"/>').__addChildren([
        //noteSpan = html.Element.mk('<span>Click on things to adjust them. Hierarchy navigation:</span>'),
        //saveBut =html.Element.mk('<div class="roundButton">Save Image</div>'), 
        upBut =html.Element.mk('<div class="roundButton">Up</div>'), 
        downBut =html.Element.mk('<div class="roundButton">Down</div>'),
        topBut =html.Element.mk('<div class="roundButton">Top</div>')
        ]),
        svgMessageDiv = html.Element.mk('<div style="display:none;margin-left:auto;padding:40px;margin-right:auto;width:50%;margin-top:20px;border:solid thin black">AAAAUUUU</div>')
     ]),
 /* treeVars.objectContainer = uiDiv = html.Element.mk('<div id="uiDiv" cgstub720 style="position:absolute;margin:0px;padding:0px"></div>').
    __addChildren([
      dragButtons = html.Element.mk('<div id="dragButtons" style="height:30px;width:100%;background-color:white;border:solid thin black;"></div>').__addChildren([
        insertBut = swapMachine?null:html.Element.mk('<div class="ubutton">Insert</div>'),
        replaceBut = html.Element.mk('<div class="ubutton">Swap</div>'),
        replaceProtoBut = html.Element.mk('<div class="ubutton">Swap Prototype</div>')
      ]),     
      treeVars.obDivRest =treeVars.obDiv = html.Element.mk('<div id="obDiv" style="position:absolute;background-color:white;border:solid thin black;overflow:auto;vertical-align:top;margin:0px;padding:'+treePadding+'px">TREE</div>'),
      insertContainer =  html.Element.mk('<div id="insertContainer" style="background-color:white;border:solid thin black;position:absolute;"></div>').
      __addChildren([
        dragMessage = html.Element.mk('<div id="dragMessage" style="font-size:10pt;padding-bottom:5px;padding-left:45px;">Drag to  insert</div>'),
        tabContainer = html.Element.mk(
          `<div id="tabContainer" style="font-size:10pt;vertical-align:top;border-bottom:thin solid black;height:${numCatalogHeaderLines*30}px;"></div>`).
        __addChildren([
            insertTab = html.Element.mk('<div id="tab" style="width:80%;vertical-align:bottom;borderr:thin solid green;display:inline-block;height:30px;"></div>')
        ]),  
        insertDiv = html.Element.mk('<div id="insertDiv" style="overflow:auto;positionn:absolute;ttop:60px;height:400px;width:600px;background-color:white;bborder:solid thin black;"/>').
        __addChildren([  
          insertButs =html.Element.mk('<div/>').__addChildren([
               moveUpBut = html.Element.mk('<div id="moveUp" class="ubutton">Up</div>'),
               moveDownBut = html.Element.mk('<div id="moveDown" class="ubutton">Down</div>'),
               saveOrderBut = html.Element.mk('<div id="saveOrder" class="ubutton">Save</div>')
          ]),
          insertCols = html.Element.mk('<div/>').__addChildren([
            insertDivCol1 = html.Element.mk('<div id="col1" style="display:inline-block;bborder:thin solid black;width:49%;"></div>'),
            insertDivCol2 = html.Element.mk('<div id="col2" style="vertical-align:top;display:inline-block;bborder:thin solid black;width:49%;"></div>')
          ])
        ]),
      
    
    ]),
    dataContainer =  html.Element.mk('<div id="dataContainer" style="background-color:white;border:solid thin green;position:absolute;margin:0px;padding:0px"></div>').
      __addChildren([
      dataMessage =html.Element.mk('<div style="margin-left:10px;margin-bottom:5px;color:red;font-size:10pt">Data</div>'),
      JSONMessage =html.Element.mk('<div style="margin-left:10px;margin-bottom:5px;color:red;font-size:10pt"></div>'),
      dataButtons = html.Element.mk('<div id="codeButtons" style="bborder:solid thin red;"></div>').__addChildren([
         rebuildFromDataBut =html.Element.mk('<div style = "font-size:9pt" class="roundButton">Rebuild from Data</div>'),
         changeDataSourceBut =html.Element.mk('<div style = "font-size:9pt" class="roundButton">Change source</div>'),
         saveDataBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Save</div>'),// @todo put back
         saveDataAsBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Save As</div>'),// @todo put back
         checkJSONBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Check JSON</div>'),// @todo put back
        openDataInTextEditorBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Open Data in Text Editor</div>'),// @todo put back
       runningSpan = html.Element.mk('<span style="display:none;padding-left:15px;font-size:10pt">...running...</span>')
      ]),
       dataDiv = html.Element.mk('<div id="dataDiv" style="border:solid thin green;positionn:absolute;">Code Div</div>')
    ])

 ])*/
])
]);
advancedButs =  
  [cloneBut,showCohortBut,separateBut,moveToBackBut,toggleConnectBut];
//advancedButs =  
//  [showCohortBut,separateBut,moveToBackBut,toggleConnectBut];

return mpg;
}

   // there is some mis-measurement the first time around, so this runs itself twice at fist
let firstLayout = true;
let svgwd,svght;
const layout = function(noDraw) { // in the initialization phase, it is not yet time to draw, and adjust the transform
  // aspect ratio of the UI
  let canvas = document.getElementById('imageCanvas');
  let noteWidth,noteLeft,treeHt,pageHeight,pageWidth,lrs;
  let actionLeft,actionHt,actionDivWidth,actionPanelWd,treeInnerWidth,treeOuterWidth;
  let topHt,docwd,docTop,twtp;
  let bkg = "white";
  svgwd = 500;
  svght = 500;
  let ar = 0.3;//0.48;
  let wpad = 5;
  let vpad = 5;//5;//20;//minimum sum of padding on top and bottom
  //let awinwid = $(window).width();
  //let awinht = $(window).height();
	let awinwid = window.innerWidth;
	let awinht = window.innerHeight;
  let pwinwid = awinwid - (2 * wpad);
  let pwinht = awinht - (2 * vpad);
  if (pwinht < ar * pwinwid) { // the page is bounded by height 
    pageHeight = pwinht;
    pageWidth = pageHeight/ar;
    lrs = (awinwid - pageWidth)/2;  
  } else { // the page is bounded by width
    pageWidth = pwinwid;
    pageHeight = ar * pageWidth;
  }
  pageHeight = pwinht;
  pageWidth = pwinwid;
  lrs = wpad;
  docTop = 0;
  twtp = 2*treePadding;
  actionDivWidth  = 0.4 * pageWidth;
  actionPanelWd = 0; 
  docwd = 0;
  includeActionPanel = true;
  if (includeActionPanel) {
    actionPanelWd = pageWidth/7;
  }
  if (panelMode === 'catalog') {
    uiWidth = pageWidth/6;
  } else {
    uiWidth = pageWidth/6;
    //uiWidth = 0.25 * pageWidth;
   // svgwd = core.vars.svgwd?core.vars.svgwd:0.75 * pageWidth;
  }
  let svgwdAvail = pageWidth - actionPanelWd - docwd - uiWidth;
  svgwd = core.vars.svgwd?core.vars.svgwd:svgwdAvail;
  let svgPad = svgwdAvail - svgwd;
  treeOuterWidth = uiWidth;
  treeInnerWidth = treeOuterWidth - twtp;
  Object.assign(mpg.__element.style,{left:lrs+"px",width:pageWidth+"px",height:(pageHeight-0)+"px",display:"block"});
  topHt = -15 + topbarDiv.__element.offsetHeight;
  cols.$css({left:"5px",width:pageWidth+"px",top:topHt+"px"});
  ctopDiv.$css({"padding-top":"0px","padding-bottom":"20px","padding-right":"10px",left:svgwdAvail+"px",top:"0px"});
  /*actionLeft = includeDoc?docwd +10 + "px":"210px";
  actionDiv.$css({width:(actionDivWidth + "px"),"padding-top":"10px","padding-bottom":"20px",left:actionLeft,top:"0px"});
  actionHt = actionDiv.__element.offsetHeight;*/
  topbarDiv.$css({height:actionHt,width:pageWidth+"px",left:"0px","padding-top":"10px"});
  let svghtAvail = pageHeight-70;// - actionHt;
  svght = core.vars.svght?core.vars.svght:svghtAvail;// + 20;
  treeHt = svghtAvail;
  treeHt = svghtAvail;
  // treeVars.myWidth = treeInnerWidth; cgstub7/20
  //treeVars.obDiv.$css({width:(treeInnerWidth   + "px"),height:treeHt+"px",top:"30px",left:"0px"}); cgstub7/20
  svgDiv.$css({id:"svgdiv",left:(actionPanelWd + docwd)+"px",width:svgwd +"px",height:svght + "px","background-color":bkg});
  canvas.style.width = svgwd;
  canvas.style.height = svght;
  /*treeVars.obDiv.setVisibility(panelMode=== 'chain'); cgstub7/20
  insertContainer.setVisibility(panelMode === 'catalog');
  dataContainer.setVisibility(panelMode === 'data');*/
 
   dom.svgMain.resize(svgwd,svght); 
   dom.svgMain.positionButtons(svgwd);
   noteWidth = Math.min(svgwdAvail-40,570);
   noteLeft = 0.5 * (svgwdAvail - 40 - noteWidth);
	// let bbox = svgElement.getBBox();

   //noteDiv.$css({left:noteLeft+"px",width:noteWidth +"px"});
   if (firstLayout) {
     firstLayout = false; 
     layout(noDraw);
   }
}

