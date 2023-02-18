const rs = function (rs) {

rs.audioInitialized = 0;
rs.initAudio  = function () {
  debugger;
  let {audioInitialized} = this;
  if (audioInitialized) {
    return;
  }
  this.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioContext = new this.AudioContext();
  this.audioInitialized = 1;
}

}

export {rs};      
