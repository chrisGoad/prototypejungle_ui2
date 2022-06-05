
import {rs} from '/generators/drop_circles_0.mjs';
rs.setName('drop_circles_0_1');

rs.dropParams = {dropTries:150,scale:0.5}

rs.generateDrop= function (p) {
  let {height:ht} = this;
 // let p = Point.mk(0,0);
  debugger;
  let rd;
  let hht = 0.5*ht;
  let {x,y} = p;
  let xa = x + hht;
  let ya = y + hht;

  let hSizes = [0,3,0,5,0,9,0];
  let vSizes = [0,9,0,5,0,3,0];
  let numS = hSizes.length;
  let strh = Math.floor((numS*ya)/ht);
  let strv = Math.floor((numS*xa)/ht);
  const inStripe = (horizontal) => {
    let xory = horizontal?ya:xa;
    return Math.floor((tnumS*xory)/ht);
  }
 // let hs = inStripe(1);
 // let vs = inStripe(0);
  /*let inhs = (strh%2)===1;
  let invs = (strv%2)===1;
  let hsvis = (strh-1)/2;
  let vsvis = (strv-1)/2;*/
  let vsz = vSizes[strv];
  let hsz = hSizes[strh];
  if (hsz && vsz) {
    rd = Math.random()<0.5?vsz:hsz;
  } else if (hsz) {
    rd = hsz;
  } else if (vsz) {
    rd = vsz;
  } else {
    return;
  }
  console.log('xa',xa,'ya',ya,'strh',strh,'strv',strv,'hsz',hsz,'vsz',vsz,'radius',rd);
  return {radius:rd};
}

  

export {rs};


