
"use strict";

function RigidShape(center, mass, friction, restitution) {

	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false;

    this.mCenter = center;
    this.mInertia = 0;
    if (mass !== undefined) {
        this.mInvMass = mass;
    } else {
        this.mInvMass = 1;
    }

    if (friction !== undefined) {
        this.mFriction = friction;
    } else {
        this.mFriction = 0.8;
    }

    if (restitution !== undefined) {
        this.mRestitution = restitution;
    } else {
        this.mRestitution = 0.2;
    }

    this.mVelocity = new Vec2(0, 0);

    this.mAcceleration = new Vec2(0, 0);
   
	this.type = "";
	this.dead = false;
    //angle
    this.mAngle = 0;

    //negetive-- clockwise
    //postive-- counterclockwise
    this.mAngularVelocity = 0;

    this.mAngularAcceleration = 0;

    this.mBoundRadius = 0;

    gEngine.Core.mAllObjects["rigidshapes"].push(this);
}
RigidShape.prototype.updateAcceleration = function(addOn){
	this.mAcceleration.x += addOn.x;
	this.mAcceleration.y += addOn.y;
}
RigidShape.prototype.update = function () {
    if (gEngine.Core.mMovement && this.dead === false) {
        var dt = gEngine.Core.mUpdateIntervalInSeconds;
        //v += a*t
        this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));
		//console.log(this.mVelocity + " " + this.mAcceleration + " " + dt);
        //s += v*t 
		 ///this.mVelocity = this.mVelocity.scale(0.95);
		/*
		if(this.mVelocity.x > 150){
			this.mVelocity.x  = 150;
		}else if(this.mVelocity.x < -150){
			this.mVelocity.x = -150;
		}
		if(this.mVelocity.y > 150){
			this.mVelocity.y  = 150;
		}else if(this.mVelocity.y < -150){
			this.mVelocity.y = -150;
		}
		*/
		
		 this.move(this.mVelocity.scale(dt));

        this.mAngularVelocity += this.mAngularAcceleration * dt;
        this.rotate(this.mAngularVelocity * dt);        
    }
};

RigidShape.prototype.updateMass = function (delta) {
    var mass;
    if (this.mInvMass !== 0) {
        mass = 1 / this.mInvMass;
    } else {
        mass = 0;
    }

    mass += delta;
    if (mass <= 0) {
        this.mInvMass = 0;
        this.mVelocity = new Vec2(0, 0);
        this.mAcceleration = new Vec2(0, 0);
        this.mAngularVelocity = 0;
        this.mAngularAcceleration = 0;
    } else {
        this.mInvMass = 1 / mass;
        this.mAcceleration = gEngine.Core.mGravity;
    }
    this.updateInertia();
};

RigidShape.prototype.updateInertia = function () {
    // subclass must define this.
    // must work with inverted this.mInvMass
};



RigidShape.prototype.boundTest = function (otherShape) {
    var vFrom1to2 = otherShape.mCenter.subtract(this.mCenter);
    var rSum = this.mBoundRadius + otherShape.mBoundRadius;
    var dist = vFrom1to2.length();
    if (dist > rSum) {
        //not overlapping
        return false;
    }
    return true;
};
