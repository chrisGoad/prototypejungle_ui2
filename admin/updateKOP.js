



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
                     'animPages.js','animTitles.js','animImages.html',
                     'gridPages.js','gridTitles.js','gridImages.html',
                     'partitionPages.js','partitionTitles.js','partitionImages.html',
                     'webPages.js','webTitles.js','webImages.html',
                     'page.html','pageSupport.js']);
 xferFiles('public/doc',['kop_drop.html','kop_partition.html','kop_grid.html','kop_web.html','kop_lines.html','kop_general.html','style.css']);

//xferFiles('public',['gPages.js','gTitles.js','gLocals.js','page.html','pageSupport.js']);

 




  