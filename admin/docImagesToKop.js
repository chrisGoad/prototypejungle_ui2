


//return;
//let alternate = 0;
let sectionsPath = './docImages.js';

var fs = require('fs');

let sectionsC = require(sectionsPath);
//let imageOrder  = require('./imageOrder.js');

let images = [];
let thumbs = [];

  //let orderMin = -1;
  //let orderMax = 272;
  //let orderMax = 20000;

const thingString = function (ix,dir,order,variant) {
	debugger;
  
  //let {variant} = props;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
  let vpath = (variant?path+'_v_'+variant:path);
  //console.log('variant',variant);
  //console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
	//let imsrc = `public/images/std_size/${vpath}.jpg`;
	let imsrc = `${vpath}.jpg`;
	let thumbsrc = `${vpath}.jpg`;
  images.push(imsrc);
  thumbs.push(thumbsrc);
  //console.log ('imsrc ',imsrc);
  //console.log ('thumbsrc ',thumbsrc);
}
/*
const order2dict = function (order) {
  let rs = {};
  order.forEach( (ln) => {
    let [o,s] = ln;
    rs[s] = o;
  });
  return rs;
}

let orderDict = order2dict(imageOrder);


const getOrder = function (thing) {
 // console.log('getOrder',thing);
    let file = thing[1];
    let props = thing[5];
    let vr = props.variant;
    let ffile = vr?file+'_v_'+vr:file;
    let order = orderDict[ffile];
   // console.log('getOrder',order,ffile,typeof order);
    return order?order:1000;
 }
 */
 /*
    
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
      
  */  
 
let sectionsString = function (things) {
  //things.sort(compareByOrder);
  let ln =  things.length;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
  /*  let ord = getOrder(thing);

    if ((ord <  orderMin) || (ord > orderMax)) {
      continue;
    } */
    let tln = thing.length;
    if (tln > 1) {
   //   console.log("Section");
      let [order,file,directory,useThumb,title,props] = thing;
     let variant = props.variant;
     // console.log('PROPS',props);
    //  console.log('Order',order,'file',file);
     // let tov = typeof variant;
    //  console.log('is variant',tov);
    thingString(file,directory,order,variant);
      //rs += thingString(file,directory,useThumb,title,image);
    }
  }
}



const sectionsStringgg = function (sections) {
	let rs = '';
	sections.forEach((section) => rs += sectionString(section));
	return rs;

}

sectionsString(sectionsC.sections);
//let kopimdir = '../kop/';//public/images/std_size/';
let kopimdir = '../kop/public/images/std_size/';
let imdir = 'public/images/std_size/';
//let kopimdir = '../kop/public/images/';
let kopthumbdir = '../kop/public/images/thumbs/';
let thumbdir = 'public/images/thumbs/';

console.log('images',JSON.stringify(images));
console.log('thumbs',JSON.stringify(thumbs));


const copyImages = function () {
  images.forEach((iim) => {
    let im = imdir +  iim;
    let dst = kopimdir +  iim;   
    console.log('copying ',im,'to',dst);
    fs.copyFileSync(im, dst)
  });
   thumbs.forEach((iim) => {
    let im = thumbdir +  iim;
    let dst = kopthumbdir +  iim;   
    console.log('copying ',im,'to',dst);
    fs.copyFileSync(im, dst)
  });
}

copyImages();
