var Animation = function(filename, cX, cY, width, height, frameCount, time){
	this.image = new Image();
	this.image.src = filename;	
			
	this.width = width ;
	this.height = height; 
	this.x = cX;
	this.y = cY;
	
	var lastTurn = Date.now();
	var animationFrame = 0;
	var done = false;
	
	this.draw = function(context){
		context.imageSmoothingEnabled = false;
		
		if(Date.now() - lastTurn > time){
			lastTurn = Date.now();
			animationFrame++;
			if(animationFrame > frameCount){
				this.done = true;
			}
		}
		context.drawImage(this.image, this.width * (animationFrame - 1), 0, this.width, this.height, this.x,this.y, this.width, this.height);

		//context.drawImage(this.image,this.x,this.y,this.image.width,this.image.height);
	}
};