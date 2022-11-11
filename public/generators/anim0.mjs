import {rs as basicP} from '/generators/basics.mjs';

let rs = basicP.instantiate();

import {rs as addPathMethods} from '/mlib/path.mjs';	

let rs = basicP.instantiate();
addPathMethods(rs);
rs.setName('anim0');