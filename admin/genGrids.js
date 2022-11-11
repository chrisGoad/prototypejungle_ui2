
let kind = process.argv[2];
//let forKOPstr = process.argv[3];
let sortByOrderstr = "1";
/*
if (process.argv[3]==="0") {
  sortByOrderstr = "0";
}
*/
const toBoolean = (v) => {
  if (typeof v === 'string') {
    return (v==='0')?false:true;
  } else {
    return false;
  }
}

let signed = 0
//let signed = toBoolean(signedstr);
//let forKOP = toBoolean(forKOPstr);
let forKOP = kind === 'forKOP';
let forPJ = kind === 'forPJ';
let drop = kind === 'drop';
let grid = kind === 'grid';
let lines = kind === 'lines';
let quad = kind === 'quad';
let web = kind === 'web';
let sortByOrder = toBoolean(sortByOrderstr);
let byKind = kind === 'byKind';
let alternate = kind === 'alternate';
let byLikes = kind === 'byLikes';
let byAspect = kind === 'byAspect';
let vertical = kind === 'vertical';
let horizontal = kind === 'horizontal';
let horizontalnf = kind === 'horizontalnf'; // horizontal no frame
let square = kind === 'square';
let imagesHere = kind === 'imagesHere';
let images = (kind === 'images') || imagesHere;

let local_images = (kind === 'local_images') || alternate ;
let whichPage = 1;
let orderMin,orderMax;
if (forKOP) {
  orderMin = -1;
  orderMax = 272;
} else {
  orderMin = -1;
  orderMax = 10000;
}

console.log('kind','['+kind+']','sortByOrder',sortByOrder,'forKOP',forKOP,'byKind',byKind,'byAspect',byAspect,'byLikes',byLikes,'signed',signed,'horizontal',horizontal,'horizontalnf',horizontalnf);
//return;
//let alternate = 0;
let sectionsPath;
let imKind;
if (byLikes) {
  sectionsPath = './gridSections.js';
  imKind = 'g';
} else if (alternate) {
  sectionsPath = './altSections.js';
  sortByOrder = 0;
  imKind = 'alt';
} else if (byKind) {
  sectionsPath = './byKindSections.js';
  imKind = 'g';
} else if (byAspect) {
  sectionsPath = './byAspectSections.js'
} else if (vertical) {
  signed = 0;
  imKind = 'v';
  sectionsPath = './verticalSections.js';
  pagesPath = 'public/vPages.js';
  pagesVar = 'vPages';
  titlesPath = 'public/vTitles.js';
  titlesVar = 'vTitles';
} else if (horizontal) {

  signed = 0;
    console.log('HORIZONTAL');

  imKind = 'h';
  sectionsPath = './horizontalSections.js';
  pagesPath = 'public/hPages.js';
  pagesVar = 'hPages';
  titlesPath = 'public/hTitles.js';
  titlesVar = 'hTitles';

} else if (horizontalnf) {
  console.log('HORIZONTALNF');
  imKind = 'hnf';
  sectionsPath = './horizontalnfSections.js';
  pagesPath = 'public/hnfPages.js';
  pagesVar = 'hnfPages';
  titlesPath = 'public/hnfTitles.js';
  titlesVar = 'hnfTitles';

} else if (square) {
  signed = 0;
  imKind = 'sq';
  sectionsPath = './squareSections.js';
} else if (images || forKOP  || forPJ || drop || grid || lines || quad || web)  {
  sectionsPath = './gridSections.js';
  imKind = 'g'
} else if (local_images)  {
  sectionsPath = './gridSections.js';
  imKind = 'g'
} else {
  console.log("unrecognized kind ","'"+kind+"'");
  return;
}

 pagesPath = `public/${imKind}Pages.js`;
  pagesVar = `${imKind}Pages`;
  titlesPath = `public/${imKind}Titles.js`;
  titlesVar = `${imKind}Titles`;
  localsPath = `public/${imKind}Locals.js`;
  localsVar = `${imKind}Locals`;
  
 console.log('pagesPath',pagesPath)
let outPath;
if (alternate) {
  outPath = 'public/altImages.html';
} else if (alternate) {
  outPath = 'public/altImages.html';
} else if (drop) {
  outPath = 'public/dropImages.html';
} else if (grid) {
  outPath = 'public/gridImages.html';
} else if (lines) {
  outPath = 'public/linesImages.html';
} else if (partition) {
  outPath = 'public/partitionImages.html';
} else if (web) {
  outPath = 'public/webImages.html';
} else if (byKind) {
  outPath = 'public/byKind.html';
} else if (byAspect) {
  outPath = 'public/aspectGrids.html';
} else if (vertical) {
  outPath = 'public/vertical.html';
} else if (horizontal) {
  outPath = 'public/horizontal.html';
} else if (horizontalnf) {
  outPath = 'public/horizontalnf.html';
} else if (square) {
  outPath = 'public/square.html';
} else {
  outPath = (local_images)?"public/local_images.html":'public/images.html';
}
console.log('sectionsPath', sectionsPath,'outPath',outPath);

var fs = require('fs');

let fileExt = alternate?'mjs':'mjs';
let thePages = [];
let theTitles = [];
let theLocals = []
let pageTop = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>`+(forKOP?'Kingdom of Pattern':'PrototypeJungle')+`</title>
  <style>
    .theGrid {
      display:grid;
      padding-top:10px;
      grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .indent {
      padding-left:40px;
    }
		.centered {
			text-align:center;
		  font-size:13pt;
			display: flex;
		  align-items: center;
		  justify-content: center;
		}
		p {
			padding-top:5px;
			padding-bottom:5px;
			margin-top:0px;
			margin-bottom:0px;
		}
    .topPad {
      padding-top:40px;
    }
    .emphasis {
      font-style:italic;
      font-weight:bold;
     }
    .introLineLarge {
      text-align:center;
      padding-bottom:10px;
      padding-top:10px;
      font-size:16pt;
      color:white;
    }
     .introLineSmall {
      text-align:center;
      padding-bottom:5px;
      padding-top:5px;
      font-size:10pt;
    }
      
  </style>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
</head>
<body style="color:white;font-size:16pt;font-family:arial;background-color:black" >
`;

let headLine = '<p class="introLineLarge"><a style="color:white" href="https://kingdomofpattern.com">Kingdom of Pattern</a></p>';
let pageIntro;
if (imKind === 'g') {
  if (forKOP) {
    pageIntro = 
    `
    <p class="introLineLarge">Kingdom of Pattern</p>
    <p class="introLineLarge">Theory (<a style="color:white;text-decoration:underline" href="essay.html">here</a>)
     and Practice (below). </p>

    <p  class="introLineSmall">As you will see from <a style="color:white;text-decoration:underline" href="essay.html">theory</a>, the phrase "Kingdom of Pattern" is not a claim to grandeur.</p>
    <p class="introLineSmall">Images by Chris Goad, via the JavaScript library at <a style="color:white" href="https://prototypejungle.net">prototypejungle.net</a>.</p> 

  


    <p class="introLineSmall">To expand the images below, click on them.</p>
  `
   <!-- <p class="introLineSmall">Click <a style="color:white;text-decoration:underline" href="https://public.etsy.com/shop/KingdomOfPattern"> here </a> if  you'd like a print of one of these images for your wall.</p>-->
   } else  {
    if (local_images) {
      pageIntro = 
      `
      <p class="introLineLarge"><a href="index.html">PrototypeJungle</a></p>
      <p class="introLineSmall">These are the images that you have rebuilt in your local copy of PrototypeJungle</p>
      <p class="introLineSmall">Initially, no images will appear</p>
      `;
    } else {
       pageIntro = 
      `
      <p class="introLineLarge"><a style="color:white" href="index.html">PrototypeJungle</a></p>
      `;
    }
  }
} else if (imKind === 'h') {
pageIntro = 
`${headLine}
<p class="introLineLarge">Horizontal  Posters (3 to 2 ratio of width to height).</p>
<p class="introLineSmall">A white frame is shown when necessary to indicate the extent of the poster.</p>
`;
}  else if (imKind === 'hnf') {
pageIntro =
`${headLine} 
<p class="introLineLarge">Horizontal Prints (3 to 2 ratio of width to height).</p>
`;
} else if (imKind === 'sq') {
pageIntro = 
`${headLine} 
<p class="introLineLarge">Square Prints</p>
`;
}  else if (imKind === 'v') {
pageIntro = 
`${headLine} 
<p class="introLineLarge">Vertical Posters (3 to 2 ratio of height to width)  Posters.</p>
<p class="introLineSmall">A white frame is shown when necessary to indicate the extent of the poster.</p>
`;
}
let pageScript = 
`<script>
document.addEventListener('DOMContentLoaded', () => {
	debugger;
	let cWidth =document.documentElement.clientWidth;
	let imWid = Math.floor(0.09*cWidth);
	let images = document.querySelectorAll('img');
	images.forEach((im) => {
		im.width = ''+imWid;
	});
});
</script>	
`;
let pageNumber = 0;
let numPages = 0;
const thingString = function (order,ix,dir,useThumb,ititle,props) {
	debugger;
  let {variant,likes,posted,category,sources} = props;
  console.log('POSTED',posted,'category',category,'kind',kind);
  if (category !==  kind) {
    return '</div>';
  }
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
  let title=ititle?ititle:pageNumber+'';
  theTitles.push(ititle?ititle:pageNumber+'');
  let vpath = (variant?path+'_v_'+variant:path);
  //console.log('variant',variant);
  //console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
  thePages.push(vx);
	let imsrc = `images/std_size/${vpath}.jpg`;
	let thumbsrc = `images/thumbs/${vpath}.jpg`;
  let localSrc =`public/images/thumbs/${vpath}.jpg`;
  if (ix === 'drift_web') {
    //console.log('IIIIIXXXX',ix);
  }
  //theLocals.push(localim?1:0);

  if (!(local_images || imagesHere)) {
	  thumbsrc = `https://kingdomofpattern.com/images/thumbs/${vpath}.jpg`;
  }
//console.log('thumbsrc',thumbsrc);
	let pageArg = 'page='+pageNumber;
  let kindArg = 'imKind='+imKind;
  let localArg = 'local='+(local_images||imagesHere?1:0);
	let theImageArg = '';
	pageNumber++;
	let lastPageArg = (pageNumber === numPages)?'&lastPage=1':'';
	let rs,srcUrl;
	let astart = `<a style="color:white" href="page.html?image=${vx}&${pageArg}&${kindArg}&${localArg}">`;
  //console.log('ASTART',astart);
  let propsStr = imagesHere?`<span style="font-size:10pt">${likes?'Likes '+likes:''} ${posted?"":" NOT POSTED"} ${local_images?'Local':''} ${category}</span><br/>`:'';;
  let sourcenm = `source${sources?'s':''}`;
	if (forKOP || forPJ) {
		//let titleLink = title?`${astart}${title}</a></p>`:'';
		let titleLink = title?`${astart}${title}</a>`:'';
		console.log('forKOP');
    srcUrl = (sources)?`https://prototypejungle.net/doc/${path}_sources.html`:`https://prototypejungle.net/${dir}/${path}.${fileExt}`;
    if (forKOP){
      rs = `<div><p class="centered">${titleLink}</p>`
    } else {
      rs = `<div><p class="centered"><a style="color:white" href="http://localhost:8081/draw.html?source=/${dir}/${path}.${fileExt}${theImageArg}">${title}</a><p/>`;
    }
    console.log("RRRRSSS",rs);
    rs = rs +
    `<p class="centered"><a style="color:white" href="${srcUrl}">${sourcenm}</a></p>
    <p class="centered">${astart}<img width="200" src="${thumbsrc}" alt="Image Missing"></a></p></div>`;
	} else {
    srcUrl = (sources)?`doc/${path}_sources.html`:`${dir}/${path}.${fileExt}`;
		console.log('not for KOP');
    rs = `<div><p style="text-align:center"><a href="http://localhost:8081/draw.html?source=/${dir}/${path}.${fileExt}${theImageArg}">${title}</a><br/>
    <a href="${srcUrl}">${sourcenm}</a><br/>
    ${propsStr}
    ${astart}<img width="200" src="${thumbsrc}"></a></p></div>
    `;
	}
  console.log ('rs = ',rs);
	return rs;
}

let numThingsPerLine = 4;

const stripOrnt = function (str) {
    let spl = str.split('_');
    let sln = str.length;
    let ln = spl.length;
    let rs = str;
    let lst;
    if (ln > 1) {
      lst = spl[ln-1];
      if ((lst === 'v') || (lst === 'h')) {
        rs = str.substring(0,sln-2);
      } else if (lst === 'sq') {
        rs = str.substring(0,sln-3);
      }
    }
   // console.log('stripOrnt','lst',lst,str,' = ',rs);
    return rs;
  }
 const getOrder = function (thing) {
 // console.log('getOrder',thing);
    let file = stripOrnt(thing[1]);
    let props = thing[5];
    let vr = props.variant;
    let ffile = vr?file+'_v_'+vr:file;
    let order = orderDict[ffile];
   // console.log('getOrder',order,ffile,typeof order);
    return order?order:1000;
 }
 
    
  const compareByOrder = function (thing1,thing2) {
  //  console.log('compareByOrder',thing1,thing2);
    if ((thing1.length === 1) || (thing2.length ===1)) {
      return 0;
    }
    let file1 = stripOrnt(thing1[1]);
    let file2 = stripOrnt(thing2[1]);
    let order1 = getOrder(thing1);
    let order2 = getOrder(thing2);
    let rs;
    if (order1 === order2) {
      rs = 0;
    } else if (order1 > order2) { 
      rs = 1;
    } else {
      rs = -1;
    }
  //  console.log('file1',file1,'file2',file2,'order1',order1,'order2',order2,'rs',rs);
    return rs;

  }
      
 
let sectionString = function (things) {
	let numThingsThisLine = 0;
	let startLine =  `
<div class="theGrid">
  <div></div>
  `;
	let rs = `
<div class="theGrid">
  <div></div>
  `;
	let ln = things.length;
  const compareLikes = function (thing1,thing2) {
    let likes1 = (thing1.length >= 6)?thing1[5]:0;
    let likes2 = (thing1.length >= 6)?thing2[5]:0;
    if (likes1 === likes2) {
      return 0;
    }
    if (likes1 < likes2) { 
      return 1;
    }
    return -1;
  }
  if (byLikes) {
    things.sort(compareLikes);
  }
  /*const compareByOrder = function (thing1,thing2) {
    let order1 = thing1[0];
    let order2 = thing2[0];
    if (order1 === order2) {
      return 0;
    }
    if (order1 > order2) { 
      return 1;
    }
    return -1;
  }*/
  
  //console.log('things unordered',things);
  if (sortByOrder) {
    things.sort(compareByOrder);
  }
  // console.log('things ordered',things);
//  ln = 2;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
    let tln = thing.length;
    if (tln === 1) {
   //   console.log("Section");
      let txt = thing[0];
      numThingsThisLine = numThingsPerLine;
   //  rs += `</div>${startLine}<div>${txt}</div></div>`;
      rs += `</div><br/><div style="text-align:center">${txt}</div><br/><div>`;
    } else {
      let [order,file,directory,useThumb,title,props] = thing;
     // console.log('PROPS',props);
    //  console.log('Order',order,'file',file);
     // let tov = typeof variant;
    //  console.log('is variant',tov);

      let ord = getOrder(thing);
      if ((ord <  orderMin) || (ord > orderMax)) {
        continue;
      }
      let ts = thingString(ord,file,directory,useThumb,title,props);
      if (ts!=='</div>') {
        rs+=ts;
       //rs += thingString(file,directory,useThumb,title,image);
       numThingsThisLine++;
      }
    }
	//	console.log('numThingsThisLine',numThingsThisLine,'i',i,'ln',ln);
		if ((numThingsThisLine === numThingsPerLine) && (i<(ln-1))) {
		//	console.log('EOL');
			rs += `</div><br/>
	`+ startLine;
			numThingsThisLine = 0;
	  }
  };
  rs += `</div><br/>
`;
 debugger;
 return rs;
}



const sectionsString = function (sections) {
	let rs = '';
	sections.forEach((section) => rs += sectionString(section));
	return rs;

}
const writeThePages = function () {
	let js = `let ${pagesVar}= ${JSON.stringify(thePages)};`;
  //console.log('writeThePagess',js,pagesVar,pagesPath);
	fs.writeFileSync(pagesPath,js);
	//fs.writeFileSync(alternate?'public/altPages.js':(byKind?'public/byKindPages.js':'public/thePages.js'),js);
}
const writeTheTitles = function () {
	let js = `let ${titlesVar} = ${JSON.stringify(theTitles)};`
    console.log('writeTheTitles',js,titlesPath);

	fs.writeFileSync(titlesPath,js);
//	fs.writeFileSync(alternate?'public/altTitles.js':(byKind?'public/byKindTitles.js':'public/theTitles.js'),js);
}
const writeTheLocals = function () {
	let js = `let ${localsVar} = ${JSON.stringify(theLocals)};`
   // console.log('writeTheTitles',js,titlesPath);
	fs.writeFileSync(localsPath,js);
}

		
const writePage = function (sections) {
	
	let frs = '';
	frs += pageTop;
  frs += pageIntro;
  frs += pageScript;
	let ss =sectionsString(sections);
	frs +=ss;
 // console.log('sectionsScript',ss);
	fs.writeFileSync(outPath,frs);
}

//let sectionsC = require(alternate?'./altSections.js':'./gridSections.js');
let sectionsC = require(sectionsPath);
let imageOrder  = require('./imageOrder.js');
//console.log('imageOrder',imageOrder);

const order2dict = function (order) {
  let rs = {};
  order.forEach( (ln) => {
    let [o,s] = ln;
    rs[s] = o;
  });
  return rs;
}

let orderDict = order2dict(imageOrder);

//console.log('orderDict',orderDict);

const countPages = function (sections) {
	let rs = 0;
	sections.forEach((section) => {
		section.forEach((thing) =>  rs++);
	});
	return rs;
}
		
numPages = countPages(sectionsC.sections);

 writePage(sectionsC.sections);
 writeThePages();
 writeTheTitles();
 //writeTheLocals();
 console.log('numPages',numPages);
 