
"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || {};
// initialize the variable while ensuring it is not redefined
gEngine.Core = (function () {
	
    var mCanvas, mContext, mWidth = 868, mHeight = 558;
    mCanvas = document.getElementById('canvas');
	document.body.style.background = "rgb(256, 256, 256)";
    mContext = mCanvas.getContext('2d');
	mContext.imageSmoothingEnabled = false;
    mCanvas.height = mHeight;
    mCanvas.width = mWidth;

    var mGravity = new Vec2(0, 50);
    var mMovement = true;

    var mCurrentTime, mElapsedTime, mPreviousTime = Date.now(), mLagTime = 0;
    var kFPS = 45;          // Frames per second
    var kFrameTime = 1 / kFPS;
    var mUpdateIntervalInSeconds = kFrameTime;
    var kMPF = 1000 * kFrameTime; // Milliseconds per frame.
    var mAllObjects = {block:[], rigidshapes:[], image:[]};

    var initializeEngineCore = function () { 
        runGameLoop();
    };
	
	var timeOfLastTurretFire = Date.now();
	var timeOfLastLightChange = Date.now();

	
    var draw = function () {
		clearTheChaft();
        mContext.clearRect(0, 0, mWidth, mHeight);
		mContext.fillStyle = 'rgb(0, 0, 40)';
		mContext.fillRect(0,0,mWidth,mHeight);
		var i;
        for (i = 0; i < mAllObjects["rigidshapes"].length; i++) {
			if(mAllObjects["rigidshapes"][i] !== undefined){
				mContext.strokeStyle = 'blue';
				if (i === gObjectNum) {
					mContext.strokeStyle = 'red';
				}
			 	//mAllObjects["rigidshapes"][i].draw(mContext);
			}
        }
		var shouldIChange = false;
		if(Date.now() - timeOfLastLightChange > 40){
			timeOfLastLightChange = Date.now();
			shouldIChange = true;
		}
		for (i = 0; i < mAllObjects["block"].length; i++) {
			if(shouldIChange){
				mAllObjects["block"][i].onFrame1 = !mAllObjects["block"][i].onFrame1;
			}
			mAllObjects["block"][i].draw(mContext);
		}
		mAllObjects["player"].draw(mContext);
		
		for (i = 0; i < mAllObjects["image"].length; i++) {
			mAllObjects["image"][i].draw(mContext);
		}
    };
	
	var clearTheChaft = function(){
		var lowerCount = 0;
		var il
		for (var i = 0; i < mAllObjects["rigidshapes"].length - lowerCount; i++) {
			if(mAllObjects["rigidshapes"][i] !== undefined){
			if(mAllObjects["rigidshapes"][i].dead){
				mAllObjects["rigidshapes"].splice(i,1);
				lowerCount++;
			}
			}
		}
		lowerCount = 0;
		for (var i = 0; i < mAllObjects["block"].length - lowerCount; i++) {
			if(mAllObjects["block"][i] !== undefined){
			if(mAllObjects["block"][i].rectangle.dead){
				mAllObjects["block"].splice(i,1);
				lowerCount++;
			}
			}
		}
	}
	
	
    var update = function () {
        var i;
				var energy = mAllObjects["player"].energy;

        for (i = 0; i < mAllObjects["rigidshapes"].length; i++) {
			if(mAllObjects["rigidshapes"][i] !== undefined){
				
				if(mAllObjects["rigidshapes"][i].type === "block"){
					mAllObjects["rigidshapes"][i].move(new Vec2(-energy,0));
					/*
					if(mAllObjects["rigidshapes"][i].mVertex[1].x < 0){
						//console.log(mAllObjects["rigidshapes"][i].mCenter.y);
						mAllObjects["rigidshapes"][i].move(new Vec2(0, -mAllObjects["rigidshapes"][i].mCenter.y));
						mAllObjects["rigidshapes"][i].move(new Vec2(mWidth + Math.floor(Math.random() * mWidth/2) + 1  ,Math.floor(Math.random() * (mHeight * 0.9)) + 25));
					}*/
				}else 
				if(mAllObjects["rigidshapes"][i].type === "person" ){
					mAllObjects["rigidshapes"][i].move(new Vec2(-energy,0));
					
					if(mAllObjects["rigidshapes"][i].mVertex[1].x < 0){
						//console.log(mAllObjects["rigidshapes"][i].mCenter.y);
						mAllObjects["rigidshapes"][i].move(new Vec2(0, 0));
						mAllObjects["rigidshapes"][i].move(new Vec2(mWidth + Math.floor(Math.random() * mWidth/2) + 1  , 0));
					
						var block = "bigger/bolt1.png";

						var left  = new Sprite(block,mAllObjects["rigidshapes"][i].mVertex[1].x + mWidth * 1/4 ,400 , 54, 84, 0,0,1);
						//console.log(mAllObjects["rigidshapes"][i].mVertex[1].x + mWidth/2 );
						left.rectangle.type = "block";
						mAllObjects["block"].push(left);
					
					}
				}
				
				mAllObjects["rigidshapes"][i].update(mContext);
			}
        }
		for (i = 0; i < mAllObjects["block"].length; i++) {
			mAllObjects["block"][i].update(mContext);
		}
		var highestX = 0;
		for (i = 0; i < mAllObjects["image"].length; i++) {
			if(mAllObjects["image"][i].x > highestX){
				highestX = mAllObjects["image"][i].x;
			}
		}
		for (i = 0; i < mAllObjects["image"].length; i++) {
			if(mAllObjects["image"][i].x < -57){
				mAllObjects["image"][i].x = highestX + 56;
			}
			mAllObjects["image"][i].update(energy);
		}
		mAllObjects["player"].update(mContext);

    };
	
    var runGameLoop = function () {
        requestAnimationFrame(function () {
            runGameLoop();
        });

        //      compute how much time has elapsed since we last runGameLoop was executed
        mCurrentTime = Date.now();
        mElapsedTime = mCurrentTime - mPreviousTime;
		var FPS = 1000 / (mElapsedTime);
        mPreviousTime = mCurrentTime;
        mLagTime += mElapsedTime;

        updateUIEcho();
        draw();
        //      Make sure we update the game the appropriate number of times.
        //      Update only every Milliseconds per frame.
        //      If lag larger then update frames, update until caught up.
        while (mLagTime >= kMPF) {
            mLagTime -= kMPF;
            gEngine.Physics.collision();
            update();
        }
    };

	
	var updateUIEcho = function () {
        document.getElementById("uiEchoString").innerHTML =
                "<p><b>SCORE:</b>:</p>" +
                "<ul style=\"margin:-20px\">" +
                "" + (mAllObjects["player"].energy - 10) + ""
                ;
    };
	
	
    var mPublic = {
        initializeEngineCore: initializeEngineCore,
        mAllObjects: mAllObjects,
        mWidth: mWidth,
        mHeight: mHeight,
        mContext: mContext,
        mGravity: mGravity,
        mUpdateIntervalInSeconds: mUpdateIntervalInSeconds,
        mMovement: mMovement
    };
    return mPublic;
}());