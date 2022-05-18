debugger;
const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}
const beforeLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(0,idx);
}
const extension = function (string) {
  return afterLastChar(string,'.');
}

const getPage = function () {
  debugger;
	let c_url = window.location.href;
  let c_file = afterLastChar(c_url,'/');
  let c_name = beforeLastChar(c_file,'.');
  let c_page = thePages.indexOf(c_name);
  return c_page;
}

let cWidth;
let cPage;
let lastPage;
let thePages = ['disclaimer','installation'];
const onPrev = function () {
  debugger;
	let cPage = getPage();
	let dest = thePages[cPage-1];
	window.location.href = dest+'.html';
}

const onNext = function () {
  debugger;
  let cPage = getPage();
	let dest = thePages[cPage+1];
	window.location.href = dest+'.html';
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

let imKind,imLocalS,theTitles,theLocals,imurl;
document.addEventListener('DOMContentLoaded', () => {
  debugger;
	let prevSpan = document.getElementById('prevSpan');
	let nextSpan = document.getElementById('nextSpan');
	//prevSpan.addEventListener('click',onPrev);
	nextSpan.addEventListener('click',onNext);
  prevSpan.hidden = true;
	
});	
