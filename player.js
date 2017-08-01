var Player = function(filename, cX, cY, width, height, mass){
	this.image = new Image();
	this.image2 = new Image();
	this.head = new Image();
	this.foot = new Image();

	this.image.src = filename;	
	this.image2.src = "bigger/base2.png";	
	this.head.src = "bigger/head.png";
	this.foot.src = "bigger/foot.png";
	
	this.energy = 10;
	
			
	this.width = width ;
	this.height = height;
	
	this.health = 500;
	
	this.directions = {
		none: "0",
		up: "1",
		down: "2",
		left: "3",
		right: "4"
	}
	this.aimingDirection = this.directions["up"];
	this.moving          = this.directions["none"];
	this.pressingArrow   = this.directions["none"];
	this.lastPressed     = this.directions["none"];
	this.bulletDirection = this.directions["none"];
	
	
	this.index = 0;
	
	this.x = cX;
	this.y = cY;
	//center, width, height, mass, friction, restitution
	this.rectangle = new Rectangle(
		new Vec2(this.x, this.y),
		114, 84,
		mass, 
		0.0, 0.0, true, "player"
	);
	this.rectangle.type = "player";
	
	var lastShot = Date.now();
	this.update = function(context){
		var mCurrentTime = Date.now();
		if(mCurrentTime - lastShot > 750){
			if(this.pressingArrow !== this.directions["none"]){
				shooting = true;
				lastShot = mCurrentTime;
				this.bulletDirection = this.pressingArrow;
			}
		}
		this.x = this.rectangle.mVertex[0].x;
		this.y = this.rectangle.mVertex[0].y;
	}
	
	var lastTurn = Date.now();
	var onTread1 = true;
	
	this.jumping = false;
	var jumpCount = 10;
	var goingUp = true;
	var animationFrame = 0;
	this.draw = function(context){
		context.imageSmoothingEnabled = false;
		if(this.energy < 1){
			this.energy = 1;
		}else if(this.energy > 17){
			this.energy = 17;
		}
		if(Date.now() - lastTurn > 50){
			//if(this.moving !== this.directions["none"]){
				if(onTread1 === true){
					onTread1 = false;
				}else{
					onTread1 = true;
				}
			//}
			if(this.jumping === true){
				if(goingUp){
					if(jumpCount < 20){
						jumpCount++;
						this.rectangle.move(new Vec2(0, -(jumpCount)));
					}else{
						goingUp = false;
					}
				}else{
					if(jumpCount != 10){
						this.rectangle.move(new Vec2(0, (jumpCount)));
						jumpCount--;

					}else{
						jumpCount = 10;
						goingUp = true;
						this.jumping = false;
					}
				}
			}
			
			//console.log(this.energy);
			lastTurn = Date.now();
		}
		context.drawImage(this.foot,this.x,this.y + ((jumpCount) * 3),114,84);
		context.drawImage(this.head,this.x,this.y - ((jumpCount - 10) * 3),114,84);

		if(onTread1){
			context.drawImage(this.image,this.x,this.y,114,84);
		}else{
			context.drawImage(this.image2,this.x,this.y,114,84);
		}
		
	}
};