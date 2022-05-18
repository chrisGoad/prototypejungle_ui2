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
	  
		window.location.href = `./page.html?image=${dest}&page=${cPage-1}&imKind=${imKind}&local=${imLocalS}`;

	//window.location.href = `./page.html?image=${dest}&page=${cPage-1}&imKind=${imKind}`;
}
const onNext = function () {
  debugger;
	
	let dest = thePages[cPage+1];
	let lastPageArg = (cPage === (thePages.length - 2))?'&lastPage=1':'';

	window.location.href = `./page.html?image=${dest}&page=${cPage+1}${lastPageArg}&imKind=${imKind}&local=${imLocalS}`;
}

const onFull = function () {
  debugger;
	window.location.href = imurl;
}

const onTop = function () {
  debugger;
  let dst;
	if (imKind === 'g') {
    dst = 'index';
  } else if (imKind === 'h') {
    dst = 'horizontal';
  } else if (imKind === 'hnf') {
    dst = 'horizontalnf';
  } else if (imKind === 'v') {
    dst = 'vertical';
 } else if (imKind === 'sq') {
    dst = 'square';
 }
	window.location.href = './'+dst+'.html';
}

let imKind,imLocalS,thePages,theTitles,theLocals,imurl;
document.addEventListener('DOMContentLoaded', () => {
  debugger;
	let prevDiv = document.getElementById('prevDiv');
	let nextDiv = document.getElementById('nextDiv');
	prevDiv.addEventListener('click',onPrev);
	nextDiv.addEventListener('click',onNext);
	
});	
