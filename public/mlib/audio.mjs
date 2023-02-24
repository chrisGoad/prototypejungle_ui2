const rs = function (rs) {

rs.audioInitialized = 0;
rs.initAudio  = function () {
  //debugger;
  let {audioInitialized} = this;
  if (audioInitialized) {
    return;
  }
  this.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioContext = new this.AudioContext();
  this.audioInitialized = 1;
  this.fileTest('/foo.txt');
  }

rs.fileTest =  function (url) {
 //debugger;
 fetch(url).then((resp) => {
   debugger;
   let txt = resp.text();
   txt.then((rtxt) => {
    // debugger;
     console.log(rtxt);
    });
  });
}
}

export {rs};      
