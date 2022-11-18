debugger;
const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}

const extension = function (string) {
  return afterLastChar(string,'.');
}
	
const parseQuerystring = function() {
  let nvpair = {};
  let qs = window.location.search.replace('?','');
  let pairs = qs.split('&');
  pairs.forEach(function(v) {
    let pair = v.split('=');
    if (pair.length>1) {
      nvpair[pair[0]] = pair[1];
    }
  });
  return nvpair;
}
let cWidth;
let cPage;
let lastPage;
const onPrev = function () {
  debugger;
	
	let dest = thePages[cPage-1];
	let noTitleArg = noTitle?'&noTitle=1':'';
		window.location.href = `./page.html?image=${dest}&page=${cPage-1}&imKind=${imKind}&local=${imLocalS}${noTitleArg}`;

	//window.location.href = `./page.html?image=${dest}&page=${cPage-1}&imKind=${imKind}`;
}
const onNext = function () {
  debugger;
	
	let dest = thePages[cPage+1];
	let lastPageArg = (cPage === (thePages.length - 2))?'&lastPage=1':'';
  let noTitleArg = noTitle?'&noTitle=1':'';
	window.location.href = `./page.html?image=${dest}&page=${cPage+1}${lastPageArg}&imKind=${imKind}&local=${imLocalS}${noTitleArg}`;
}

const onFull = function () {
  debugger;
	window.location.href = imurl;
}
const onTop = function () {
  debugger;
  let dst = imKind + 'Images.html';
 /* switch (imKind) {
  case'quad'
    dst = 'quadImages';
    break;
  case'dr'
    dst = 'quadImages';
    break;*/
  //let dst = atKOP?'index':'galleries';
	window.location.href = './'+dst;
}

let imKind,imLocalS,thePages,theTitles,theLocals,imurl,noTitle;
document.addEventListener('DOMContentLoaded', () => {
  debugger;
	let cWidth =document.documentElement.clientWidth;
	let cHeight =document.documentElement.clientHeight;
	let cAR = cWidth/cHeight;
  let image = document.images[0];
	let getArgs = parseQuerystring();
	cPage = Number(getArgs.page);
  imKind = getArgs.imKind;
  noTitle = getArgs.noTitle;
  debugger;
  imLocalS = getArgs.local;
  imLocal = (imLocalS==='0')?0:1;
  if (imKind === 'g') {
    thePages = gPages;
    theTitles = gTitles;
    theLocals = gLocals;
  } else if (imKind === 'v') {
    thePages = vPages;
    theTitles = vTitles; 
  } else if (imKind === 'h') {
    thePages = hPages;
    theTitles = hTitles;
  } else if (imKind === 'hnf') {
    thePages = hnfPages;
    theTitles = hnfTitles;
  } else if (imKind === 'sq') {
    thePages = sqPages;
    theTitles = sqTitles;
  } else if (imKind === 'alt') {
    thePages = altPages;
    theTitles = altTitles;
   // theLocals = altLocals;

  } else if (imKind === 'book') {
    thePages = bookPages;
    theTitles = bookTitles;
   // theLocals = altLocals;

  } else if (imKind === 'drop') {
    thePages = dropPages;
    theTitles = dropTitles;
  } else if (imKind === 'lines') {
    thePages = linesPages;
    theTitles = linesTitles;
  }  else if (imKind === 'anim') {
    thePages = animPages;
    theTitles = animTitles;
  } else if (imKind === 'grid') {
    thePages = gridPages;
    theTitles = gridTitles;
  } else if (imKind === 'partition') {
    thePages = partitionPages;
    theTitles = partitionTitles;
  } else if (imKind === 'web') {
    thePages = webPages;
    theTitles = webTitles;
  }
	//lastPage = getArgs.lastPage;
	let title = theTitles[cPage];
	//let imLocal = theLocals[cPage];
  debugger;
	let prevDiv = document.getElementById('prevDiv');
	let nextDiv = document.getElementById('nextDiv');
//	let fullDiv = document.getElementById('fullDiv');
	let fullDiv = document.getElementById('full');
	let topDiv = document.getElementById('topDiv');
	let titleDiv = document.getElementById('titleDiv');
	let imageDiv = document.getElementById('imageDiv');
	let videoDiv = document.getElementById('videoDiv');
	let imageEl =  document.getElementById('theImage');
	let videoEl =  document.getElementById('theVideo');
	let lastPage = cPage === (thePages.length-1);
	if (cPage === 0) {
	 prevDiv.style.visibility = "hidden";
	}
	if (lastPage) {
	  nextDiv.style.visibility = "hidden";
	}
	prevDiv.addEventListener('click',onPrev);
	nextDiv.addEventListener('click',onNext);
	topDiv.addEventListener('click',onTop);
	fullDiv.addEventListener('click',onFull);
	if (title) {
    if (noTitle) {
     // titleDiv.hide();
    } else {
	    titleDiv.innerHTML = decodeURI(title);
    }
	}
	
	//imageEl.width = 0.9*Math.min(cWidth,cHeight);
	//imageEl.width = 0.9*cWidth;
	let im = getArgs.image;
	let ext = extension(im);
	//let dir = (ext==='jpg')?'images/':'videos/';
	let dir = imLocal?'./images/std_size/':'https://kingdomofpattern.com/images/std_size/';
   imurl = dir+'/'+im;
 debugger;
  //console.log('DIR ',dir);
	if (ext === 'mp4') {
	  imageDiv.style.display = 'none';
    videoEl.autoplay = 'true';
		 videoEl.src = dir+im;
    // videoEl.onload = ()=>{ 
     //   videoEl.play();
   //  };
    let vidWd = videoEl.naturalWidth;
		  let vidHt = videoEl.naturalHeight;
			let vidAR = vidWd/vidHt;
			if (vidAR > cAR) {
			  videoEl.width = 0.75*cWidth;
			} else {
			  videoEl.height = 0.75 * cHeight;
			}	 
      fullDiv.style.visibility = 'hidden';
   //   fullDiv.height = 0;

	} else {
	  videoDiv.style.display = 'none';
 	  imageDiv.style.visibility = 'hidden';
   imageEl.src = dir + im;
		imageEl.onload = ()=>{
		  let imWd = imageEl.naturalWidth;
		  let imHt = imageEl.naturalHeight;
			let imAR = imWd/imHt;
			if (imAR > cAR) {
			  imageEl.width = 0.75*cWidth;
			} else {
			  imageEl.height = 0.75 * cHeight;
			}	 
 	    imageDiv.style.visibility = 'visible';

		  debugger;
		}
	}
});	
