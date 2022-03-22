
core.defineFieldAnnotation("Note");

const setNote = function (nd,prop,nt) {
  nd.__setNote(prop,nt);
}

core.defineFieldAnnotation("FieldType");
core.ObjectNode.setFieldType = core.ObjectNode.__setFieldType; // expose without the underbar
core.defineFieldAnnotation('UIStatus'); // the status of this field
core.defineFieldAnnotation('InstanceUIStatus');// the status of fields that inherit from this one - ie properties of instances.
core.defineFieldAnnotation("UIWatched");
  
 
  
// when a mark is instantiated, some of its fields are should not be modified in the instance,
// though they may be in the prototype
  
core.ObjectNode.__fieldIsHidden = function (k) {
  let status,proto,istatus;
  if (core.ancestorHasOwnProperty(this,"__hidden")) {
    return true;
  }
  if (this.__mark) {
    proto = Object.getPrototypeOf(this);
    istatus = proto.__getInstanceUIStatus(k);
    if (istatus === 'hidden') {
      return true;
    }
    if (istatus !== undefined) {
      return false;
    }
  }
  status = this.__getUIStatus(k);
  return status  === "hidden";
}

core.ArrayNode.__fieldIsFrozen = function () {return false;}

core.ObjectNode.__fieldIsFrozen = function (k) {
  let status,proto;
  if (core.ancestorHasOwnProperty(this,"__frozen")) {
    return true;
  }
  status = this.__getUIStatus(k);
  if (status === "liquid") {
    return false;
  }
  if (k && (!this.__mark)&& (!this.__markProto) && core.isComputed(this,k)) {
    return true;
  }
  if (status === "frozen") {
    return true;
  }
  proto = Object.getPrototypeOf(this);
  status = proto.__getInstanceUIStatus(k);
  return (status === 'frozen');
}
 
/* a field can be frozen, liquid, hidden, (or neither).  Hidden fields do not even appear in the UI.
*  frozen fields cannot be modified from the UI. liquid fields can be modified
*  from the UI even if they are fields of computed values.
*/
  
const freeze = function (nd,flds) {
  let tpf = typeof flds;
  if (tpf==="undefined") {
    nd.__frozen__ = true;
  } else if (tpf==="string") {
    nd.__setUIStatus(flds,"frozen");
  } else {
    flds.forEach(function (k) {
      nd.__setUIStatus(k,"frozen");
   });
  }
}
  
  
const freezeInInstance = function (nd,flds) {
  let tpf = typeof flds;
  if (tpf==="undefined") {
    nd.__frozen__ = true;
  } else if (tpf==="string") {
    nd.__setInstanceUIStatus(flds,"frozen");
  } else {
    flds.forEach(function (k) {
      nd.__setInstanceUIStatus(k,"frozen");
   });
  }
}
/*
 * melt is used to allow access to properties of marks, all of whose properties are
 * frozen by default (since they are computed)
 */
const melt = function (nd,flds) {
  let tpf = typeof flds;
  if (tpf==="string") {
    nd.__setUIStatus(flds,"liquid");
  } else {
    flds.forEach(function (k) {
      nd.__setUIStatus(k,"liquid");
   });
  }
}
  
  
  
const hide = function (nd,flds) {
  if (typeof flds === "string") {
    nd.__setUIStatus(flds,"hidden");
  } else {
    flds.forEach(function (k) {
      nd.__setUIStatus(k,"hidden");
   });
  }
}


const show = function (nd,flds) {
  if (typeof flds === "string") {
    nd.__setUIStatus(flds,"shown");
  } else {
    flds.forEach(function (k) {
      nd.__setUIStatus(k,"shown");
   });
  }
}

const propertiesExcept = function (nd,flds) {
  let fob = {};
  let allProps = core.treeProperties(nd,true);
  let rs = [];
  flds.forEach(function (f) {
    fob[f] = true;
  })
  allProps.forEach(function (p) {
    if (!fob[p]) {
      rs.push(p);
    }
  });
  return rs;
}
const hideExcept = function (nd,flds) {
  hide(nd,propertiesExcept(nd,flds));
}

const freezeExcept = function (nd,flds) {
  freeze(nd,propertiesExcept(nd,flds));
}
  
  
const hideInInstance = function (nd,flds) {
  let tpf = typeof flds;
  if (tpf==="undefined") {
    nd.__frozen__ = true;
  } else if (tpf==="string") {
    nd.__setInstanceUIStatus(flds,"hidden");
  } else {
    flds.forEach(function (k) { 
      nd.__setInstanceUIStatus(k,"hidden");
   });
  }
}
  
  
core.defineFieldAnnotation('OutF');


core.ObjectNode.__setOutputF = function (k,lib,fn) {
  let pth = core.pathToString(lib.__pathOf(core));
  let fpth = pth+"/"+fn;
  this.__setOutF(k,fpth);
}


core.ObjectNode.__getOutputF = function (k) {
  let pth = this.__getOutF(k);
  if (pth) {
    return core.__evalPath(pth,core);
  }
}

core.ArrayNode.__getOutputF = function () {
  return undefined;
}
  
  
const applyOutputF = function(nd,k,v) {
  let outf;
  if (core.ArrayNode.isPrototypeOf(nd)) {
    return v;
  }
  outf = nd.__getOutputF(k);
  if (outf) {
    return outf(v,nd);
  } else {
    return v;
  }
}

const applyInputF = function(nd,k,vl) {
  let ftp = nd.__getFieldType(k);
  let cv,n;
  if (ftp === 'boolean') { 
    if ((typeof vl === "string") && ($.trim(vl) === 'false')) {
      return false;
    }
    return Boolean(vl);
  }
  cv = nd[k];  
  if (typeof cv === "number") {
    n = parseFloat(vl);
    if (!isNaN(n)) {
      return n;
    }
  }
  return vl;
}
  
  
//   from http://paulgueller.com/2011/04/26/parse-the-querystring-with-jquery/
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
  

  
const disableBackspace = function () {
  //from http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
  let rx = /INPUT|SELECT|TEXTAREA/i;
  $(document).bind("keydown keypress",function(e) {
    if( e.which === 8 ) { // 8 === backspace
      if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ) {
        e.preventDefault();
      }
    }
  });
}

  
  // name of the ancestor just below core; for tellling which top level library something is in 
 core.nodeMethod("__topAncestorName",function (rt) {
   let pr;
   if (this === rt) {
    return undefined;
   }
   pr = this.__get('__parent');
   if (!pr) {
    return undefined;
   }
   if (pr === rt) {
    return this.name;
   }
   return pr.__topAncestorName(rt);
 });
 
  
// used eg for iterating through styles. Follows the prototype chain, but stops at objects in the core
// sofar has the properties where fn has been called so far
core.ObjectNode.__iterAtomicNonstdProperties = function (fn,allowFunctions,isoFar) {
  let soFar = isoFar?isoFar:{};
  let op;
  if (!this.__inCore || this.__inCore()) {
    return;
  }
  op = Object.getOwnPropertyNames(this);
  let thisHere = this;
  op.forEach(function (k) {
    let v,tpv;
    if (core.internal(k) || soFar[k]) {
      return;
    }
    soFar[k] = true;
    v = thisHere[k];
    tpv = typeof v;
    if (v && (tpv === "object" )||((tpv==="function")&&!allowFunctions)) {
      return;
    }
    fn(v,k);
  });
  let pr = Object.getPrototypeOf(this);
  if (pr && pr.__iterAtomicNonstdProperties) {
    pr.__iterAtomicNonstdProperties(fn,allowFunctions,soFar);
  }
}
  
  // an atomic non-internal property, or tree property
 const properProperty = function (nd,k,knownOwn) {
   let v,tp;
   if (!knownOwn &&  !nd.hasOwnProperty(k)) {
    return false;
   }
   if (core.internal(k)) {
    return false;
   }
   v = nd[k];
   tp = typeof v;
   if ((tp === "object" ) && v) {
     return core.isNode(v) && (v.__parent === nd)  && (v.__name === k);
   } else {
     return true;
   }
 };
  
// only include atomic properties, or __properties that are proper treeProperties (ie parent child links)
// exclude internal names too
const ownProperProperties = function (rs,nd) {
  let nms = Object.getOwnPropertyNames(nd);
  nms.forEach(function (nm) {
    if (properProperty(nd,nm,true)) {
      rs[nm] = 1;
    }
  });
  return rs;
}
  
// this stops at the core modules (immediate descendants of core)
const inheritedProperProperties = function (rs,nd) {
  if (!nd.__inCore || nd.__inCore()) {
    return;
  }
  ownProperProperties(rs,nd);
  inheritedProperProperties(rs,Object.getPrototypeOf(nd));
}
 
 
  
core.ObjectNode.__iterInheritedItems = function (fn,includeFunctions,alphabetical) {
  let thisHere = this,ip,keys;
  const perKey = function(k) {
    let kv = thisHere[k];
    if ((includeFunctions || (typeof kv !== "function")) ) {
      fn(kv,k);
    }
  }
  ip = {};
  inheritedProperProperties(ip,this);
  keys = Object.getOwnPropertyNames(ip);
  if (alphabetical) {
    keys.sort();
  }
  keys.forEach(perKey);
  return this;
}
  
  
  
  core.ArrayNode.__iterInheritedItems = function (fn) {
    this.forEach(fn);
    return this;
  }
  
  // is this a property defined in the core modules. 
 core.ObjectNode.__coreProperty = function (p) {
   let proto,crp;
   if (core.ancestorHasOwnProperty(this,"__builtIn")) {
     return true;
   }
   if (this.hasOwnProperty(p)) {
    return false;
   }
   proto = Object.getPrototypeOf(this);
   crp = proto.__coreProperty;
   if (crp) {
     return proto.__coreProperty(p);
   }
 }
 
 core.ArrayNode.__coreProperty = function () {}

core.nodeMethod("__treeSize",function () {
  let rs = 1;
  core.forEachTreeProperty(this,function (x) {
    if (x && (typeof x==="object")) {
      if (x.__treeSize) {
        rs = rs + x.__treeSize() + 1;
      } 
    } else {
      rs++;
    }
  });
  return rs;
});

  
// __get the name of the nearest proto declared as a tyhpe for use in tree browser
core.ObjectNode.__protoName = function () {
  let p = Object.getPrototypeOf(this);
  let pr = p.__parent;
  let rs;
  if (!pr) {
    return "";
  }
  if (p.__get('__isType')) {
    let nm = p.__name;
    rs = nm?nm:"";
  } else {
    rs = p.__protoName();
  }
  return rs;

}

  
core.ArrayNode.__protoName = function () {
  return "Array";
}



core.ObjectNode.__hasTreeProto = function () {
 let pr = Object.getPrototypeOf(this);
 return pr && (pr.__parent);
}

//Function.prototype.__hasTreeProto = function () {return false;}

core.ArrayNode.__hasTreeProto = function () {
  return false;
}
  
  
  
// how many days since 7/19/2013
const dayOrdinal = function () {
  let d = new Date();
  let o = Math.floor(d.getTime()/ (1000 * 24 * 3600));
  return o - 15904;
}

const numToLetter = function (n,letterOnly) {
  // numerals and lower case letters
  let a;
  if (n < 10) {
    if (letterOnly) {
      a = 97+n;
    } else {
      a = 48 + n;
    }
  } else  {
    a = 87 + n;
  }
  return String.fromCharCode(a);
}
const randomName  = function () {
  let rs = "i";
  for (let i=0;i<9;i++) {
    rs += core.numToLetter(Math.floor(Math.random()*35),1);
  }
  return rs;
}
 

const matchesStart = function (a,b) {
  let ln = a.length;
  let i;
  if (ln > b.length) {
    return false;
  }
  for (i=0;i<ln;i++) {
    if (a[i]!==b[i]) {
      return false;
    }
  }
  return true;
}
  
    
const stripDomainFromUrl = function (url) {
  let r = /^http:\/\/[^/]*\/(.*)$/
  let m = url.match(r);
  return m?m[1]:m;
}

const displayMessage = function (el,msg,isError) {
  el.$show();
  el.$css({color:isError?"red":(msg?"black":"transparent")});
  el.$html(msg);
}


const displayError = function(el,msg) {
  displayMessage(el,msg,true);
}

const displayTemporaryError = function(el,msg,itimeout) {
  let timeout = itimeout?itimeout:2000;
  displayMessage(el,msg,true);
  window.setTimeout(function () {el.$hide();},timeout);
}

const stdTransferredProperties = ['stroke','stroke-width','fill','unselectable',
                                   'neverselectable','undraggable','resizable',
                                  'includeEndControls','draggableInKit','role','text'];

const stdTextTransferredProperties = ['font-size','font-weight','font-family','font-style','font','text-anchor','fill','lineSep'];

// in settings, points are represented by arrays (Point(x,y) by [x,y]
// arrays of points are represented by [[x0,y0],[x1,y1],...]

const  interpretSettings = function (settings) {
  let rs = {};
  for (let p in settings) { 
    let v = settings[p];
    let arrayOfArrays = Array.isArray(v) && Array.isArray(v[0]);
    if (arrayOfArrays) { 
       rs[p] = v.map((iv) => Array.isArray(iv)?geom.Point.mk(iv[0],iv[1]):iv);
    } else {
      rs[p] = Array.isArray(v)?geom.Point.mk(v[0],v[1]):v;
    }
  }
  return rs;
}

      
  
/* the proto has been loaded; this installs the prototype in the state */
const prepareInsertProto = function (proto,id,settings) {
  let rs = core.installPrototype(id,proto);
  if (settings) {
    rs.set(interpretSettings(settings));  
  }
 /* if (rs.ype) {
    rs.initializePrototype();
  }
  */
  //core.installPrototype(id,rs);
  core.propagateDimension(rs);
 // resizable = false;
  return rs;
}

const updateInheritors = function (iitem) {
  let item = iitem?iitem:vars.whatToAdjust;
  let inheritors = core.inheritors(item);
  inheritors.forEach(function (x) {
        x.update();
        x.draw();
      });
  }

core.vars.onInstall = function (val) {
}


vars.setSaved = function () {}; // overwritten in the editors

const containingGraph = function (item) {
  return core.ancestorWithPropertyValue(item,'__sourceUrl',"/diagram/graph.js");
}


const wrap = function (item) {
  core.forEachTreeProperty(item,(child) => {
    if (svg.Element.isPrototypeOf(child)) {
      child.unselectable = true;
    }
  });
}

vars.unwrapAll = false;

export {parseQuerystring,applyInputF,hide,show,freeze,hideExcept,matchesStart,displayMessage,displayError,
       stdTransferredProperties,stdTextTransferredProperties,//replaceProtoCallback,
       prepareInsertProto,displayTemporaryError,//setReplaceProtoCallback,
       updateInheritors,setNote,freezeExcept,hideInInstance,containingGraph};
