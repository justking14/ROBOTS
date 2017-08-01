var Sprite = function(filename, cX, cY, width, height, mass){
	this.image = new Image();
	this.image.src = filename;	
	
	this.image2 = new Image();
	this.image2.src = "bigger/bolt2.png";	
			
	this.width = width ;
	this.height = height; 
	this.x = cX;
	this.y = cY;
	//center, width, height, mass, friction, restitution
	this.rectangle = new Rectangle(
		new Vec2(this.x, this.y),
		this.width, this.height,
		mass, 
		0.0, 0.0, true, "block"
	); 
	
	this.update = function(context){
		this.x = this.rectangle.mVertex[0].x;
		this.y = this.rectangle.mVertex[0].y; 
	}
	var tint = 0;
	var goingUp = true;
	this.onFrame1 = true;
	this.draw = function(context){
		context.imageSmoothingEnabled = false;
		
		var w = this.image.width;
		var h = this.image.height;
		if(this.image.width <= 0 || this.image.height <= 0){
			var h = 1;
			var w = 1;
		}
		if(this.rectangle.type === "block"){
			if(this.onFrame1){
				context.drawImage(this.image,this.x,this.y,w,h);
			}else{
				context.drawImage(this.image2,this.x,this.y,w,h);
			}
		}else{
			context.drawImage(this.image,this.x,this.y,w,h);
		}
	}
};