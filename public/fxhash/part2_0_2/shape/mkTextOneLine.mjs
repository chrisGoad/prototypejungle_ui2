
//let rs = dom.SvgElement.mk('<g/>');
let rs = function(txt) {

txt.width = 40;
txt.height = 10;

txt.text = 'Text';       
txt["font-size"] = "12";
txt["font-style"] = "normal";
txt["font-family"] = "arial";
txt["font-weight"] = "normal";
txt.stroke = "red"; // turned into fill in the actual text. 
//txt.lineSep = 2;

txt.text = 'test';

let textProperties = 
         ["font-size",
         "font-style",
         "font-family",
         "font-weight"];

txt.update = function () {
	 let singleLine = this.set('singleLine',dom.SvgElement.mk('<text stroke-width="0"  text-anchor="middle"/>'));
	 core.setProperties(singleLine,this,textProperties);
    singleLine.fill = this.stroke;
	  singleLine.show();
    singleLine.setText(this.text);
}
}
export {rs};


