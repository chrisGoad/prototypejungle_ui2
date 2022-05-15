



var fs = require('fs');



  var xferFile = function(dir,ifl,iofl) {
    let ofl = iofl?iofl:ifl;
     let ipath = dir+'/'+ifl;
         console.log('read',ipath);

    var vl = fs.readFileSync(ipath).toString();
    let opath = '../kop/'+dir+'/'+ofl;
    console.log('writing',opath);
    fs.writeFileSync(opath,vl);
  }
  
  
const xferFiles = function (dir,files) {
  files.forEach( (file) => xferFile(dir,file));
}

xferFile('public','images.html','index.html');
xferFiles('public',['gPages.js','gTitles.js','gLocals.js','page.html','pageSupport.js']);

 




  