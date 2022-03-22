
// html components for the UI : pulldown (select), and tab; some utilities too
const Select = core.ObjectNode.mk();

Select.mk = function (o) {
  let rs = Object.create(Select);
  core.extend(rs,o);
  return rs;
}
  
Select.build = function () {
  let el = this.domEl;
  let opts,cnt,op,ln,thisHere,opels,sl,i,o,opel;
  if (el) {
    return el;
  }
  opts = this.options;
  cnt = this.containerP.instantiate();
  op = this.optionP;
  ln=opts.length;
  thisHere = this;
  // generate a separate closure for each n
  const selector = function (n) {
    return function () {
      thisHere.__select(n);
      thisHere.domEl.$css({"display":"none"});
    }
  }
  opels = [];
  sl = this.selected;
  this.disabled = {};
  for (i=0;i<ln;i++) {
    o = opts[i];
    opel = op.instantiate();
    opels.push(opel);
    cnt.addChild(opel);
    opel.$click(selector(i));
    opel.text = (this.isOptionSelector)&&(i===sl)?"&#x25CF; "+o:o;
  }
  this.optionElements = opels;
  this.domEl = cnt;
  return cnt;
}

Select.hide = function () {
  if (this.domEl) {
    this.domEl.$hide();
  }
}
Select.setDisabled = function (oId,iv) {
  let v = Boolean(iv); 
  let  disabled = this.disabled;
  let cd = disabled[oId];
  let idx,opels,opel;
  if (cd === v) {
    return;//no change
  }
  disabled[oId] = v;
  idx = this.optionIds.indexOf(oId);
  opels = this.optionElements;
  if (!opels) {
    return;
  }
  opel = opels[idx];
  if (v) {
    opel.$css('color','gray');
  } else {
    opel.$css('color','black');
  }
}
   
   
  
Select.updateDisabled = function () {
  let  disabled = this.disabled;
  let opIds = this.optionIds;
  let ln = opIds.length;
  let opEls = this.optionElements;
  let i,d,opel;
  for (i=0;i<ln;i++) {
    d = disabled[opIds[i]];
    opel = opEls[i];
    if (d) {
      opel.$css('color','gray');
    } else {
      opel.$css('color','black');
    }
  }
}

Select.__select = function (n) {
 let opts = this.options;
 let optels = this.optionElements;
 let ln = opts.length;
 let i,oi,oe;
 this.selected = n;
 for (i=0;i<ln;i++) {
   oi = opts[i];
   oe  = optels[i];
   if (i===n) {
     oe.$html(((this.isOptionSelector)?"&#x25CF; ":"") + oi);
   } else {
     oe.$html(oi);
   }
 }
 if (this.onSelect) {
   this.onSelect(n);
 }
}

const popped = {};

const popFromButton = function (nm,button,toPop) {
  let p,pr,pof,ht,ofs,rofL,rofT;
  unpop(nm);
  p = popped;
  if (p[nm]) {
    toPop.$css({"display":"none"});
    p[nm] = false;
    return;
  }
  pr = toPop.__parent;
  pof = pr.$offset();
  ht = button.$height();
  ofs = button.$offset();
  rofL = ofs.x-pof.x;
  rofT = ofs.y-pof.y;
  toPop.$css({"display":"block","left":rofL+"px","top":(rofT+ht)+"px"});
  p[nm] = toPop;
}
  

const unpop = function (except) {
  let p = popped;
  let k,pp;
  for (k in p) {
    if (k === except) {
      continue;
    }
    pp = p[k];
    if (pp) {
      pp.$css({"display":"none"});
      p[k] = false;
    }
  }
}

const Tab = core.ObjectNode.mk();

Tab.mk = function (elements,initialState,action) {
  let rs = Object.create(Tab);
  rs.elements = elements;
  rs.action = action;
  rs.initialState = initialState;
  return rs;
}
  
Tab.build= function () {
  let jq = this.domEl;
  let cnt,els,jels,thisHere;
  if (jq) {
    return jq;
  }
  cnt =  html.Element.mk('<div style="border:solid thin black;position:absolute"/>');
  els = this.elements;
  jels = {};
  thisHere = this;
  els.forEach(function (el) {
    let del = html.Element.mk('<div class="tabElement"/>');
    del.$click(function () {thisHere.selectElement(el);});
    del.$html(el);
    cnt.set(el,del);
    jels[el] = del;
  });
  this.domEl = cnt;
  this.domElements = jels;
  if (this.initialState) {
    this.selectElement(this.initialState,true);
  }
  return cnt;    
}
  
Tab.selectElement = function (elName,noAction) {
  let jels,jel,k,kel;
  if (elName === this.selectedElement) {
    return;
  }
  this.selectedElement = elName;
  jels = this.domElements;
  jel = jels[elName];
  jel.$css({"background-color":"#bbbbbb",border:"solid thin #777777"});
  for (k in jels) {
    if (k!==elName) {
      kel = jels[k];
      kel.$css({"background-color":"#dddddd",border:"none"});
    }
  }
  if (!noAction && this.action) {
    this.action(elName);
  }
}

Tab.enableElement = function (elName,vl) {
  let jel = this.domElements[elName];
  jel.$css({color:vl?"black":"grey"});
}
  
// for processing an input field; checking the value, inserting it if good, and alerting otherwise. Returns a message if there is an error
// the value true if there was a change, and false otherwise (no change);
// inherited will be set to false if this fellow is at the frontier;

// If the current value of a field is numerical, it is enforced that it stay numerical.
const processInput = function (inp,nd,k,inherited,computeWd,colorInput) { //colorInput comes from the color chooser
  let isbk = (k==="backgroundColor") && (nd === core.root);// special case
  let ipv = nd.__get(k);
  let pv = (ipv===undefined)?"inherited":applyOutputF(nd,k,ipv);  // previous value
  let isnum = typeof nd[k] === "number";
  let vl,nv,nwd;
  if (colorInput) {
    vl = colorInput.toName();
    if (!vl) {
      vl =  colorInput.toRgbString();
    }
  
  } else {
    vl = inp.$prop("value");
  }
  if (vl === "") {
    if (inherited) {
      inp.$prop("value","inherited");
    } else {
      delete nd[k];
    }
  } else {
    if (vl === "inherited") {
      return false;
    }
    if (colorInput) { // no need for check in this case, but the input function might be present as a monitor
      nv = vl;
      applyInputF(nd,k,vl,"colorChange");
    } else {
      nv = applyInputF(nd,k,vl);
      if (nv) {
        if (core.isObject(nv)) { // an object return means that the value is illegal for this field
          inp.$prop("value",pv);// put previous value back in
          return nv.message;
        }
      } else {
        if (isnum) {
          nv = parseFloat(vl);
          if (isNaN(nv)) {
            return "Expected number"; 
          }
        } else if (typeof nv === 'string') {
          nv = $.trim(nv); 
        }
      }
    }
    if (pv === nv) {
      core.log("tree",k+" UNCHANGED ",pv,nv);
      return false;
    } else {
      core.log("tree",k+" CHANGED",pv,nv);
    }
    nd.set(k,nv);
    nd.__update();
    if (isbk) {
      dom.svgMain.addBackground();
    }
    afterSetValue(nd);
    nwd = computeWd(String(nv));
    if (inp) {
      inp.$css({'width':nwd+"px"});
    }
    return true;
  }
}

const afterSetValue = function (node) {
  if (node.__mark) { // part of a spread
    let marks = node.__parent.__parent;
    marks.assertModified(node);
  }
  //ui.assertObjectsModified();  
}

let measureSpan;

const setMeasureSpan = function (span) {
  measureSpan = span;
}
const measureText = function (txt) {
  let sp = measureSpan;
  let rs;
  if (sp) {
    sp.$show();
  } else {
    sp = html.Element.mk('<span/>');
    sp.$css('font','8pt arial');
    sp.draw(document.body);
    measureSpan = sp;
  }
  sp.$html(txt)
  rs = sp.$width();
  sp.$hide();
  return rs;
  }

export {Select,measureText,popFromButton,processInput};