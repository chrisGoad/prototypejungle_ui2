//activeMe


//import {rs as addRandomMethods} from '/mlib/dim2dWalker.mjs';
const rs = function (item) {	


item.randomStep = function (iCorrelated,x,y,istepx,istepy,imin,imax,i,j,rg) {
	let {timeStep,params} = rg;
  let oneWay = 0;
	let min,max,stepx,stepy,lb,ub,rs,correlated,stept;;
	let firstT = 1;//(pv === undefined);
	let rp = (typeof params === 'function')?params:undefined;
	if (rp) {
    debugger;
		let params = rp(i,j,timeStep);
		//correlated = !params.noCorrelation;
		let pcor = params.correlated;
	  correlated = pcor || (pcor === undefined);
		min = params.min;
		max = params.max;
		//stept = params.stept;
		if (correlated) {
			stepx = params.stepx;
			if (stepx) {
				stepx = params.stepx;
				stepy = params.stepy;
			} else {
				stepx = stepy = params.step;
			}
		}
	} else {
		correlated = iCorrelated;
		stepx = istepx;
		stepy = istepy;
	//	stept = istept;
		min = imin;
		max = imax;
	}
	if (!correlated) {
		rs =  min + Math.random() * (max - min);
    return rs;
	}
  let sumSteps,sumVals,tlb,tub;
	/*if (!firstT) {
		tub = pv + stept; // temoral upper bound;
		tlb = oneWay?pv:pv - stept;
		//debugger;
	}*/
	if (y !==  undefined) { // 2d case	
	  if (1) {
			sumSteps = stepx+stepy;
			sumVals = x+y;
			ub = 0.5 * (sumVals+sumSteps);
			lb = 0.5 * (sumVals-sumSteps);
		
		} 
			
	} else {
		if (1) {
		  ub = x + stepx;
		  lb = x - stepx;
		} 
	}
	if (min > ub) {  //just march towards this target
		rs = ub;
		//rs = min;
	} else if (max < lb) {
		rs = lb;
		//rs = max;
	} else {
		ub = Math.min(ub,max);
		lb = Math.max(lb,min);
		rs =  lb + Math.random() * (ub - lb);
	}
  if (oneWay && pv && (rs < pv)) {
    debugger;
   // rs = pv;
  }
	return rs;
}
	/*
item.scalarRandomStep = function (correlated,c,pv,step,stept,min,max,i,j,rg) {
	return this.randomStep(correlated,c,undefined,pv,step,undefined,stept,min,max,i,j,rg);
}
*/

item.scalarRandomStep = function (correlated,c,step,min,max,i,j,rg) {
	return this.randomStep(correlated,c,undefined,step,undefined,min,max,i,j,rg);
}



/*
item.dim2randomStep = function (correlated,x, y,pv, stepx,stepy,stept,min,max,i,j,rg) { 
	return this.randomStep(correlated,x,y,pv,stepx,stepy,stept,min,max,i,j,rg);
}

*/

item.dim2randomStep = function (correlated,x, y, stepx,stepy,min,max,i,j,rg) { 
	return this.randomStep(correlated,x,y,stepx,stepy,min,max,i,j,rg);
}

   

item.indexFor = function (numRows,i,j) {
	
  let idx = (this.backwards)?numRows*(numRows - i - 1) + j:i*numRows+j;//(numRows - i -1);
  return idx;
}


item.valueAt = function (grid,i,j) {
  if (!grid) {
    debugger;
  }
 debugger;
	let {params,values,numRows,numCols} = grid;
 // let rv =  grid.values[this.indexFor(numRows,i,j)];
   let idx = this.indexFor(numRows,i,j);
  let rv =  grid.values[idx];//new 4/26/22
  return rv;
 
}
   
    
item.genRandomGrid = function (numCols,numRows,iparams) {
 // let {numRowsinr,numCols} = this;
	 let inr = numRows;
   let inc = numCols;
	debugger;
  let isfun = typeof iparams === 'function';
  let step,stepx,stepy,min,max,cFr,pcor,correlated;
  let stept = 0;
  let oneWay = 0;
  const computeParams = function(i,j) {
    let theParams = isfun?iparams(i,j):iparams;
	  let pcor = theParams.correlation;
		correlated = pcor || (pcor === undefined);		
		min = theParams.min;
		max = theParams.max;
		step = theParams.step;
		stepx = theParams.stepx;
		stepy = theParams.stepy;
		//stept = theParams.stept;
		if (typeof step === 'number') {
			stepx = stepy = step;
		}
  }
  computeParams(0,0);  
  let values = [];
  //debugger;
  let rs = {values,numRows,numCols,iparams};
  let n = numCols * numRows;
  values.length = n;
  let i = 0;
  let j = 0;
	let pv;
	//debugger;
  while (i < numCols) {
    let goingUp = i%2 === 0; //means  j is going up
		j = goingUp?0:numRows-1;
		let firstJ = true;
    while (goingUp?j < numRows: j>=0) {
		  if (isfun) {
        computeParams(i,j);
      }
			let idx = this.indexFor(numRows,i,j);
			if ((i === 0) && cFr) {
				values[idx] === cFr;
				j++;
				continue;
			}					
			if ((i === 0) && (j === 0)) {
				let lb,ub,tlb,tub;
        lb = min;
        ub = max;
				let vl =  lb  +Math.random() * (ub - lb);
			//	console.log('i',i,'j',j,'min ',min,' max ',max,' tlb ',tlb,' tub ', tub,' lb ',lb,' ub ', ub,' vl ',vl);
				values[idx] = vl;
				j++;
				continue;
			}
			let c;
			if (i === 0) {
				c = this.scalarRandomStep(correlated,values[j-1],stepx,min,max,i,j,rs);
			} else if (firstJ){
				let lftidx = this.indexFor(numRows,i-1,goingUp?0:numRows-1);
				c = this.scalarRandomStep(correlated,values[lftidx],stepx,min,max,i,j,rs);       
			} else {
				let lftidx = this.indexFor(numRows,i-1,j)
				let upidx = this.indexFor(numRows,i,goingUp?j-1:j+1)
				c = this.dim2randomStep(correlated,values[lftidx],values[upidx],stepx,stepy,min,max,i,j,rs);
			}
			values[idx] = c;
			j = goingUp?j+1:j-1;
			firstJ = false;
			}
    i++;
  }
  return rs;
}


item.initRandomizer = function () {
	let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	 // addRandomMethods(rm);
	  if (!this.randomGridsForShapes) {
			this.randomGridsForShapes = {};
		}
	  if (!this.randomGridsForBoundaries) {
	    this.randomGridsForBoundaries = {};
		}
	}
	return rm;
}
item.setupRandomGrid = function (tp,nm,params) {
	let numRows = tp === 'randomGridsForBoundaries'?this.numRows+1:this.numRows;
	let numCols = tp === 'randomGridsForBoundaries'?this.numCols+1:this.numCols;
	let rm = this.initRandomizer();
	let rnds = this[tp];
  let rs  = this.genRandomGrid(numCols,numRows,params);
	rnds[nm]  = rs;
	return rs;
}

item.setupRandomGridForShapes = function (nm,params) {
  return this.setupRandomGrid('randomGridsForShapes',nm,params);
}


item.setupRandomGridForBoundaries = function (nm,params) {
  return this.setupRandomGrid('randomGridsForBoundaries',nm,params);
}        		

//addRandomMethods(item);


//item.setupColorRandomizer = function (params) {
item.setupColorGridsForShapes = function (params) {
  this.setupRandomGridForShapes('r',params);
  this.setupRandomGridForShapes('g',params);
  this.setupRandomGridForShapes('b',params);
}

 
item.randomValueAtCell = function (randomGrids,prop,i,j) {
  debugger;
	if (!randomGrids) {
		return;
	}
	let randomValues  = randomGrids[prop];
	if (!randomValues) {
		return;
	}
  let {randomizer} = this;  
	let rs = this.valueAt(randomValues,i,j);
	return rs;
}
    

item.randomValuesAtCell = function (randomGrids,i,j) {
	if (!randomGrids) {
		return;
	}
	let randomizer = this.initRandomizer();
  //let {randomizer} = this;  
	let rs = {}; 
	for (let prop in randomGrids) {
	  let randomValues = randomGrids[prop];
    if ((prop !== 'interpolateTo') && (prop !== 'interpolateFrom') && (prop !== 'nowInterpolating')) {
	    rs[prop] = this.valueAt(randomValues,i,j);
    }
	}
	return rs;
}

item.rvsAtCell = function (cell) {
	return this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
}   


item.randomizerColor = function (p) {
  let {randomGridsForShapes} = this;
  let angle;
  let cell = this.cellOf(p);
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} =rvs;
  return {r,g,b}
}

item.randomColor = function () {
  const rrgb = () => {
    return 0 + Math.floor(Math.random()*154);
  }
  let r = rrgb();
  let g = rrgb();
  let b = rrgb();
  return {r,g,b}
}

}

export {rs};


