"use strict";
function MyGame() {
    var width = gEngine.Core.mWidth;
    var height = gEngine.Core.mHeight;
	var block = "bigger/bolt1.png";
	var turret = "bigger/turret1.png";
	var turretD = "bigger/turret1D.png";
	var player = "bigger/base1.png";
	
	var wall = "bigger/rail.png";
	var i = 0
	for(i; i < 1000; ){
		var left  = new ImageO(wall,i , height - 48 , 114, 48);
		gEngine.Core.mAllObjects["image"].push(left);
		i = i + 57;

	}
	
	var image = new Player(player, width * 1/5, height - 84 + 18, 114, 84, 100);
	gEngine.Core.mAllObjects["player"] = image;
				
		var left1  = new Sprite("bigger/person.png", width * 4/4, height - 84 + 18, 54, 84, 100);
	left1.rectangle.type = "person";
	gEngine.Core.mAllObjects["block"].push(left1);	
				
	/*
	var left  = new Sprite(block,200 , 200 , 54, 84, 0,0,1);
	left.rectangle.type = "block";
	gEngine.Core.mAllObjects["block"].push(left);
	
	var left2  = new Sprite(block,300 ,300 , 54, 84, 0,0,1);
	left2.rectangle.type = "block";
	gEngine.Core.mAllObjects["block"].push(left2);
	
	var left3  = new Sprite(block,100 , 100 , 54, 84, 0,0,1);
	left3.rectangle.type = "block";
	gEngine.Core.mAllObjects["block"].push(left3);
	*/
}


