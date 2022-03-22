
const standardDelete = function (iitem) {
  unselect();
  let deleteMe = core.ancestorWithProperty(iitem,'__deleteLevel');
  let item = deleteMe?deleteMe:iitem;
  if (core.hasRole(item,'vertex')) {
    graph.disconnectVertex(item);
  } else if (core.hasRole(item,'edge')) {
    graph.disconnectEdge(item);
  }
  
  item.remove();
  if (vars.setSaved) {
    vars.setSaved(false);
  }
  core.root.draw();
}

//vars.theInserts = {};

const setImageSize = function (image,natWd,natHt) {
  let imwid = 30;
  let imheight = imwid*(natHt/natWd);
  image.width = imwid;
  image.height = imheight;
  image.aspectRatio = imwid/imheight;
}

const mkImageProto = function (natWd,natHt,url) {  //point and scale will be defined if the image has been dropped
  let image  = svg.tag.image.mk(10,10,url);
  hide(image,'scalable');
  setImageSize(image,natWd,natHt);
//  image.role = 'vertex';
  image.draggable = true;
  image.__imageUrl = url;
  return image;
}


const afterImageUrl = function (url,cb) {
/*
 url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Guido_Cagnacci_003.jpg/800px-Guido_Cagnacci_003.jpg';
 https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg
 */
  //let ins = vars.theInserts[url];

  let isSvg = false;//core.endsIn(url,'.svg');
    if (isSvg) {
      core.httpGet(url,function (err,rs) {
        let dataUrl = "data:image/svg+xml,"+rs;//;base64,"+(window.btoa(rs));
        let proto = mkImageProto(100,100,dataUrl);
        cb(undefined,proto);
      });
      return;
    }
  let ins = core.installedItems[url];

  if (ins) {
   cb(undefined,ins);
   return;
  }
  let img = vars.imageElement.__element;
  img.crossOrigin = "Anonymous";
  let listener = function () {
  let proto;
  img.removeEventListener('load',listener);
  if (false) {
   /* works when the image is crossOrigin, but not otherwise. A downside in any case: causes storage of images at prototypejungle, and they might be big */
    let canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
    canvas.getContext('2d').drawImage(this, 0, 0);
    let dataUrl = canvas.toDataURL('image/png');
    proto = mkImageProto(this.naturalWidth,this.naturalHeight,dataUrl);
  } else {
    proto = mkImageProto(this.naturalWidth,this.naturalHeight,url);
  }
  core.installedItems[url] = proto;
  cb(undefined,proto);
 }
 img.addEventListener('load',listener);
 img.addEventListener('error',function (e) {
   vars.uiAlert('Not found, or not loadable');
 });
 img.src = url;
}

core.vars.afterImageUrl = afterImageUrl;


const setImageOf = function (item,url) {
  afterImageUrl(url,function (erm,proto) {
      let oldImage = item.image;
      if (oldImage) {
        standardDelete(oldImage);
      }
      proto.roles = 'image';
     // vars.theInserts[url]= proto;
      core.installedItems[url] = proto;
      let imProto = prepareInsertProto(proto,'image');
      item.set('image',imProto.instantiate().unhide());
      item.image.unselectable = true;
      item.update('width');
      item.draw();
      return imProto;
    }); 
  
}

const isImage = function (url) {
  let ext = core.afterLastChar(url,'.');
  return (ext === 'jpg') || (ext === 'png') || (ext === 'gif');
}


const findImage = function (node) {
  return core.descendantWithProperty(node,'__imageUrl');
}

export {setImageOf,afterImageUrl,standardDelete,mkImageProto,isImage,findImage};
