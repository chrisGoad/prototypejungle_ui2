/* wall driftweb shelter
*/
module.exports = {
sections: [

[
//['Square'],
// [0,'grid_grid_1_i_3',4,'instances',1,'Grid 5'], 
//// [0,'grid_grid_1_i_3_v_4','instances',1,'Grid 5'], 
// [0,'grid_grid_1_i_3_g_1','instances',1,'Grid 5'], 
// [0,'grid_grid_1_i_3','instances',1,'Grid 5'], 
//   [110,'drop_whorls_v','instances',1,'Whorls',45], // was [1000,'grid0_46','final',1,'Cloudy Sky'],

 [0,'drop_whorls','generators',1,'Whorls',45], 
 [0,'random_stripes','generators',1,'Stripes 3',26], 
 [0,'grid_fade','generators',1,'Fade'], 
 [0,'grid_incoming','generators',1,'Incoming'], 
 [0,'grid_ramp','generators',1,'Ramp',14], 
 [0,'grid_superposition','generators',1,'Superposition',103], 
 [0,'grid_vortex','generators',1,'Vortex',10], 
 [0,'grid_enigma','generators',1,'Enigma',10],
 [0,'grid_cloudy_sky','generators',1,'Cloudy Sky',2],
 [0,'web_triangles','generators',1,'Triangles',5],
 [0,'web_spokes','generators',1,'Spokes',4],
  //[0,'web_stripes_2','generators',1,'Stripes 2'],
  [0,'web_stripes_1','generators',1,'Stripes 1',10],
  [0,'web_diamond','generators',1,'Diamond',137],
   [0,'drop_iris','generators',1,'Iris'], //was [0,'drop0_1_27','final',1,'Iris'],
  [0,'drop_aphelion','generators',1,'Aphelion',31],
  [0,'web_wheel','generators',1,'Wheel',30],
  [0,'web_drift','generators',1,'Drift',30],
  [0,'drop_arrows','generators',1,'Arrows',27],  //was [0,'drop0_1_21','final',1,'Leaves']
  [0,'drop_leaves','generators',1,'Leaves'],  //was [0,'drop0_1_21','final',1,'Leaves']
  [0,'drop_dandelion','generators',1,'Dandelion',78],// was [0,'drop0_1_24','final',1,'Dandelion'],
  [0,'drop_metal_2','generators',1,'Metal 2'], // was [0,'drop0_5','final',1,'Metal 2'],
		 [0,'grid_bubbles','generators','square','Bubbles',101],
	[0,'spatter_variants','generators','square','Variants',74], // was [0,'grid0_14_0','final','square','Variants'],
	    [0,'drop_ice','generators',1,'Ice',44], // was   [0,'drop0_0','final',1,'Ice'],
    [0,'grid_bump','generators',1,'Bump'],
    [0,'drop_clouds','generators',1,'Clouds',7], // was [0,'drop0_0_1','final',1,'Clouds'],
[0,'drop_horizon','generators',1,'Horizon'], //was  [0,'drop0_3','final',1,'Horizon']
    [0,'drop_starry_night','generators',1,'Starry Night',47], // was [0,'drop0__13','final',1,'Starry Night']
   [0,'grid_sphere','generators',1,'Sphere',4],
    [0,'grid_distortion_field','generators',1,'Distortion Field',11],  // was [0,'grid0_28','final',1,'Distortion Field'],
    [0,'grid_waves','generators',1,'Waves',24], //was [0,'grid0_16_1','final',1,'Waves'],
    [0,'grid_code','generators',1,'Code'],  // was [0,'grid0_45','final',1,'Code'],
		 [0,'grid_quilt_1','generators','square','Quilt 1',23],// was //[0,'grid0_8_15.jpg','final','square','Quilt 1'],
	 	 [0,'grid_world','generators','square','World',64],  // was [0,'grid0_19.jpg','final','square','World'],
		 	 [0,'lines_1','generators','square','Lines 1',31],
	 [0,'grid_shield','generators','square','Shield'],
			 [0,'lines_chaos_within_order','generators','wide2','Chaos Within Order',152],
   [0,'grid_message','generators','square','Message',6],
	[0,'grid_mat','generators','square','Mat',17],
		[0,'grid_smoke_1','generators','square','Smoke 1'],
	[0,'grid_cloth','generators','square','Cloth',54],
	// [0,'grid_quilt_2','generators','square','Quilt 2',19],
	 [0,'grid_two_quilts','generators','square','Two Quilts'],
	 [0,'grid_quilt_3','generators','square','Quilt 3',45],
	 	[0,'grid_metal','generators','square','Metal'],
		[0,'grid_tube','generators','square','Tube',10],
	[0,'grid_1','generators','square','Grid 1'],
	[0,'grid_2','generators','square','Droplets'],
	
	[0,'lines_2','generators','wide2','Lines 2'],
   [0,'grid_maze','generators','square','Maze',38],  // was [0,'grid0_8','final','square','Maze'],
   [0,'lines_bugeyes','generators','square','Bug Eyes',6],
	   [1000,'lines_lights','generators','square','Lightss',12],  // VV 

	 [0,'grid_eye','generators',1,'Eye',34],
	
	 [0,'grid_3','generators','square','Grid 3'],
	 [0,'grid_atlas','generators','wide2','Atlas',10],
	 [0,'grid_book','generators','wide2','Book'],

	// [0,'grid_smoke_2','generators','square','Smoke 2'],
	 [0,'grid_signals','generators','square','Signals',18],
	 [0,'grid_beacons','generators','square','Beacons'],
	//	 [0,'grid_decos','generators','square','Deco'],
				[0,'grid_star_maps','generators','wide2','Star Maps',2],
		
				 	[0,'grid_tracks','generators',0,'Tracks'],
		   [0,'grid_4','generators','square','Grid 4'],// was [0,'grid_0_5','final','square','Grid 4']
//	[0,'spatter_spatter','generators','square','Spatter'],
		 	[0,'grid_void','generators','wide1','Void',100], // was [0,'grid0_8_18','final','wide1','Void'], 
      
],
/* animations 
[
   ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],
	 ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],
	

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],

	 ['pulse0_3.mp4','gen2','wide2'],
	 ['spin0_2.mp4','gen2','wide2'],
	 ['spatter0_7.mp4','gen2','square'],
	 ['wander0_3.mp4','gen2','square'],

	 ['mlines0_5.mp4','gen2','wide2'],
	 ['broken1_2.gif','gen2','square'],
	 ['broken1_0.gif','gen2','wide2'],
	 ['broken1_4.gif','gen2','wide2'],

	 ['broken1_5.gif','gen2','square'],
	 ['broken1_6.gif','gen2','square'],
	 ['lines0_4.gif','gen2','square'],
	 ['lines0_5.gif','gen2','square'],

	 ['grid_1_5.gif','gen2','square'],
	 ['grid_1_9.gif','gen2','square'],
	 ['grid_1_13.gif','gen2','wide2'],
]
*/
]
};
	
 