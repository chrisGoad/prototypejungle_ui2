
import {rs} from '/generators/drop_circles_0.mjs';
rs.setName('drop_circles_0_0');

rs.dropParams = {dropTries:150,scale:0.5,sizes:[27,9,3]}


rs.generateDrop= function (p) {
  debugger;
  let {height:ht,dropParams} = this;
  let {sizes} = dropParams;
  let hht = 0.5*ht;
  let d = p.length();
  if (d>=hht) {
    return;
  }
  let fr = d/hht;
  let ln =sizes.length;
  let numRings = 2*ln - 1;
  let inc = 1/numRings;
  let cT = 0; 
  let szi = 0;
  for (let i=0;i<numRings;i++) {
    let inRing = (cT<=fr) && (fr <= (cT+inc));
    let mixedRing = i%2;
    if (inRing) {
      let rd;    
      if (mixedRing) {
       let r = Math.random();
       rd = (r > 0.5)?sizes[szi]:sizes[szi+1];       
      } else {
        rd = sizes[szi];
      }
      console.log('ring','fr',fr,'i',i,'szi',szi,'rd',rd);
      return {radius:rd}
    }
    cT = cT+inc;
    if (mixedRing) {
      szi++
    }
  }
 }


  

export {rs};


