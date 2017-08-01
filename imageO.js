var ImageO = function(filename, cX, cY, width, height){
	this.image = new Image();
	this.image.src = filename;	
	
			
	this.width = width ;
	this.height = height; 
	this.x = cX;
	this.y = cY;
	
	this.update = function(context){
		//console.log(context);
		this.x = this.x - context;// this.rectangle.mVertex[0].x;
		//this.y = this.rectangle.mVertex[0].y; 
	}
	
	this.draw = function(context){
		context.imageSmoothingEnabled = false;
		
		var w = this.image.width;
		var h = this.image.height;
		if(this.image.width <= 0 || this.image.height <= 0){
			var h = 1;
			var w = 1;
		}
		context.drawImage(this.image,this.x,this.y,w,h);
	}
};