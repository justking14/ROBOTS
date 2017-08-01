"use strict";

var gObjectNum = 0;
const keyA = 65;
const keyD = 68;
const keyW = 87;
const keyS = 83;
	
const keyArrowLeft = 37;
const keyArrowRight = 39;
const keyArrowUp = 38;
const keyArrowDown = 40;
	
var directions = {
	none: "0",
	up: "1",
	down: "2",
	left: "3",
	right: "4"
}

function userControlUp(event) {
	var keycode;
	if (window.event) {
        keycode = event.keyCode;
    } else if (event.which) {
        keycode = event.which;
    }
	
	if (keycode === keyArrowLeft) {
		gEngine.Core.mAllObjects["player"].pressingArrow = directions["none"];
    }else if (keycode === keyArrowRight) {
		gEngine.Core.mAllObjects["player"].pressingArrow = directions["none"];
	}else if (keycode === keyArrowDown) {	
		gEngine.Core.mAllObjects["player"].pressingArrow = directions["none"];
    }else if (keycode === keyArrowUp) {//W	
		gEngine.Core.mAllObjects["player"].pressingArrow = directions["none"];
    }
	
	
}

function userControl(event) {
    var keycode;

    if (window.event) {
        //alert('ie');
        keycode = event.keyCode;
    } else if (event.which) {
        //alert('firefox ');
        keycode = event.which;
    }
	
	if([32, 37, 38, 39, 40].indexOf(keycode) > -1) {
        event.preventDefault();
    }
	if(keycode === 32){
		if(gEngine.Core.mAllObjects["player"].jumping === false){
			gEngine.Core.mAllObjects["player"].jumping = true;//rectangle.updateAcceleration(new Vec2(0, -50));
		}
	}
}