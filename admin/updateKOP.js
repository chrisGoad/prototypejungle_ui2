



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

xferFile('public','galleries.html','index.html');
xferFile('public','reallySetAtKOP.js','setAtKOP.js');
//xferFile('public','galleries.html','index.html');
//xferFile('public','images.html','index.html');
xferFiles('public',['dropPages.js','dropTitles.js','dropImages.html',
                     'linesPages.js','linesTitles.js','linesImages.html',
                     'gridPages.js','gridTitles.js','gridImages.html',
                     'quadPages.js','quadTitles.js','quadImages.html',
                     'webPages.js','webTitles.js','webImages.html',
                     'page.html','pageSupport.js']);
 xferFiles('public/doc',['kop_drop.html','kop_quad.html','kop_grid.html','kop_web.html','kop_lines.html','kop_general.html']);

//xferFiles('public',['gPages.js','gTitles.js','gLocals.js','page.html','pageSupport.js']);

 




  