


//return;
//let alternate = 0;
let sectionsPath = './gridSections.js';

var fs = require('fs');

let sectionsC = require(sectionsPath);

let images = [];
let thumbs = [];

  

const thingString = function (ix,dir,useThumb,ititle,props) {
	debugger;
  let {variant} = props;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
  let vpath = (variant?path+'_v_'+variant:path);
  //console.log('variant',variant);
  //console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
	let imsrc = `public/images/std_size/${vpath}.jpg`;
	let thumbsrc = `public/images/thumbs/${vpath}.jpg`;
  images.push(imsrc);
  thumbs.push(imsrc);
  console.log ('imsrc ',imsrc);
  console.log ('thumbsrc ',thumbsrc);
}

    
 
let sectionString = function (things) {
  let ln =  things.length;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
    let tln = thing.length;
    if (tln > 1) {
   //   console.log("Section");
      let [order,file,directory,useThumb,title,props] = thing;
     // console.log('PROPS',props);
    //  console.log('Order',order,'file',file);
     // let tov = typeof variant;
    //  console.log('is variant',tov);
    thingString(file,directory,useThumb,title,props);
      //rs += thingString(file,directory,useThumb,title,image);
    }
  }
}



const sectionsString = function (sections) {
	let rs = '';
	sections.forEach((section) => rs += sectionString(section));
	return rs;

}

sectionsString(sectionsC.sections);
let kopimdir = '../kop/';//public/images/std_size/';

const copyImages = function () {
  images.forEach((im) => {
    let fim = "../"+im;
    console.log('copying ',im);
    let dst = kopimdir + im;
    fs.copyFileSync(im, dst)
  });
}

copyImages();
